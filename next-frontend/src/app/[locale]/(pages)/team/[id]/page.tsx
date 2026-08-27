import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamMemberDetails from "@/components/Team/TeamMemberDetails";
import { generatePageMetadata } from "@/lib/seo";
import { fetchTeamMember, fetchTeamMembers } from "@/lib/teamMembers";
interface TeamMemberPageProps {
    params: Promise<{
        id: string;
        locale?: string;
    }>;
}
export async function generateStaticParams() {
    const members = await fetchTeamMembers("en");
    return members.map((member) => ({
        id: member.slug,
    }));
}
export const dynamicParams = true;
export async function generateMetadata({ params, }: TeamMemberPageProps): Promise<Metadata> {
    const { id, locale } = await params;
    const teamMember = await fetchTeamMember(id, locale);
    if (!teamMember) {
        return {
            title: "Team Member Not Found",
            description: "The requested team member could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
    return generatePageMetadata(Promise.resolve({ locale }), {
        title: `${teamMember.name} - ${teamMember.role}`,
        description: `Meet ${teamMember.name}, ${teamMember.role} at Happy Family. ${teamMember.shortDescription} Contact our expert team for personalized surrogacy and egg donation services.`,
        keywords: [
            `${teamMember.name} surrogacy`,
            `${teamMember.role} fertility`,
            "fertility specialist",
            "surrogacy expert",
            "egg donation professional",
            "reproductive medicine",
            "fertility team member",
            "Happy Family team",
        ],
        path: `/team/${teamMember.slug}`,
    });
}
export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
    const { id, locale } = await params;
    const member = await fetchTeamMember(id, locale);
    if (!member) notFound();
    return <TeamMemberDetails member={member}/>;
}
