import { Metadata } from "next";
import TeamMemberDetails from "@/components/Team/TeamMemberDetails";
import { getTeamMember } from "@/data/teamMembers";

interface TeamMemberPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { id } = await params;
  const teamMember = getTeamMember(id);

  if (!teamMember) {
    return {
      title: "Team Member Not Found",
      description: "The requested team member could not be found.",
    };
  }

  return {
    title: `${teamMember.name} - ${teamMember.role} | Miracle Makers Team`,
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
    openGraph: {
      title: `${teamMember.name} - ${teamMember.role} | Miracle Makers Team`,
      description: `Meet ${teamMember.name}, ${teamMember.role} at Miracle Makers. ${teamMember.description}`,
      url: `https://www.ivftourgeorgia.com/team/${teamMember.id}`,
      type: "profile",
      images: [
        {
          url: teamMember.image,
          width: 400,
          height: 400,
          alt: `${teamMember.name} - ${teamMember.role} at Miracle Makers`,
        },
      ],
    },
    alternates: {
      canonical: `/team/${teamMember.id}`,
    },
  };
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id } = params;
  return <TeamMemberDetails id={id} />;
}
