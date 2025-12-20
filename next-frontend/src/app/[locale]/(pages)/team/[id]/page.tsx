import { Metadata } from "next";
import TeamMemberDetails from "@/components/Team/TeamMemberDetails";
import { getTeamMember } from "@/data/teamMembers";
import { generatePageMetadata } from "@/lib/seo";

interface TeamMemberPageProps {
  params: Promise<{ id: string; locale?: string }>;
}

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const teamMember = getTeamMember(id);

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
    description: `Meet ${teamMember.name}, ${teamMember.role} at Miracle Makers. ${teamMember.description} Contact our expert team for personalized surrogacy and egg donation services.`,
    keywords: [
      `${teamMember.name} surrogacy`,
      `${teamMember.role} fertility`,
      "fertility specialist",
      "surrogacy expert",
      "egg donation professional",
      "reproductive medicine",
      "fertility team member",
      "Miracle Makers team",
    ],
    path: `/team/${teamMember.id}`,
  });
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id } = await params;
  return <TeamMemberDetails id={id} />;
}
