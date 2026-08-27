import { prisma } from "../lib/prisma.js";
import { teamMemberInputSchema } from "../schemas/teamMemberSchema.js";
import { deleteFileFromS3 } from "../services/s3Service.js";
const normalizeLocale = (locale) => {
    if (locale === "ge")
        return "ka";
    return typeof locale === "string" ? locale : "en";
};
const publicMember = (member, locale) => {
    const translation = member.translations.find((item) => item.locale === locale) ??
        member.translations.find((item) => item.locale === "en") ??
        member.translations[0];
    const { translations, ...shared } = member;
    return {
        ...shared,
        locale: translation?.locale ?? "en",
        role: translation?.role ?? "",
        shortDescription: translation?.shortDescription ?? "",
        longDescription: translation?.longDescription ?? "",
    };
};
const isManagedImage = (imagePath) => Boolean(imagePath && !imagePath.startsWith("/") && !imagePath.startsWith("http"));
const validationError = (res, error) => res.status(400).json({
    error: "Invalid team member data",
    details: error,
});
const getPublicTeamMembers = async (req, res) => {
    try {
        const locale = normalizeLocale(req.query.locale);
        const featured = req.query.featured === "true" ? true : undefined;
        const members = await prisma.teamMember.findMany({
            where: { published: true, featured },
            include: { translations: true },
            orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
        });
        res.json(members.map((member) => publicMember(member, locale)));
    }
    catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({ error: "Failed to fetch team members" });
    }
};
const getPublicTeamMember = async (req, res) => {
    try {
        const locale = normalizeLocale(req.query.locale);
        const member = await prisma.teamMember.findFirst({
            where: { slug: req.params.slug, published: true },
            include: { translations: true },
        });
        if (!member)
            return res.status(404).json({ error: "Team member not found" });
        res.json(publicMember(member, locale));
    }
    catch (error) {
        console.error("Error fetching team member:", error);
        res.status(500).json({ error: "Failed to fetch team member" });
    }
};
const getAdminTeamMembers = async (_req, res) => {
    try {
        const members = await prisma.teamMember.findMany({
            include: { translations: { orderBy: { locale: "asc" } } },
            orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
        });
        res.json(members);
    }
    catch (error) {
        console.error("Error fetching admin team members:", error);
        res.status(500).json({ error: "Failed to fetch team members" });
    }
};
const createTeamMember = async (req, res) => {
    const parsed = teamMemberInputSchema.safeParse(req.body);
    if (!parsed.success)
        return validationError(res, parsed.error.flatten());
    const { translations, email, linkedin, ...data } = parsed.data;
    try {
        const member = await prisma.teamMember.create({
            data: {
                ...data,
                email: email || null,
                linkedin: linkedin || null,
                translations: { create: translations },
            },
            include: { translations: true },
        });
        res.status(201).json(member);
    }
    catch (error) {
        console.error("Error creating team member:", error);
        res.status(409).json({ error: "A team member with this slug may already exist" });
    }
};
const updateTeamMember = async (req, res) => {
    const parsed = teamMemberInputSchema.safeParse(req.body);
    if (!parsed.success)
        return validationError(res, parsed.error.flatten());
    const current = await prisma.teamMember.findUnique({ where: { id: req.params.id } });
    if (!current)
        return res.status(404).json({ error: "Team member not found" });
    const { translations, email, linkedin, ...data } = parsed.data;
    try {
        const member = await prisma.$transaction(async (transaction) => {
            await transaction.teamMemberTranslation.deleteMany({
                where: { teamMemberId: req.params.id },
            });
            return transaction.teamMember.update({
                where: { id: req.params.id },
                data: {
                    ...data,
                    email: email || null,
                    linkedin: linkedin || null,
                    translations: { create: translations },
                },
                include: { translations: true },
            });
        });
        if (current.imagePath !== member.imagePath && isManagedImage(current.imagePath)) {
            await deleteFileFromS3(current.imagePath).catch((error) => console.error("Failed to delete replaced team image:", error));
        }
        res.json(member);
    }
    catch (error) {
        console.error("Error updating team member:", error);
        res.status(409).json({ error: "Unable to update team member; check that the slug is unique" });
    }
};
const deleteTeamMember = async (req, res) => {
    try {
        const member = await prisma.teamMember.findUnique({ where: { id: req.params.id } });
        if (!member)
            return res.status(404).json({ error: "Team member not found" });
        await prisma.teamMember.delete({ where: { id: req.params.id } });
        if (isManagedImage(member.imagePath)) {
            await deleteFileFromS3(member.imagePath).catch((error) => console.error("Failed to delete team image:", error));
        }
        res.json({ message: "Team member deleted" });
    }
    catch (error) {
        console.error("Error deleting team member:", error);
        res.status(500).json({ error: "Failed to delete team member" });
    }
};
export default {
    getPublicTeamMembers,
    getPublicTeamMember,
    getAdminTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
};
