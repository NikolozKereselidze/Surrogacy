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

  // Note: Team pages are under (public) so they don't have locale in the URL
  // They are accessible from all locale pages via links
  const canonicalUrl = `https://www.ivftourgeorgia.com/team/${teamMember.id}`;

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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${teamMember.name} - ${teamMember.role} | Miracle Makers Team`,
      description: `Meet ${teamMember.name}, ${teamMember.role} at Miracle Makers. ${teamMember.description}`,
      url: canonicalUrl,
      siteName: "Miracle Makers - Surrogacy & Egg Donation Services",
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
    twitter: {
      card: "summary_large_image",
      title: `${teamMember.name} - ${teamMember.role}`,
      description: `Meet ${teamMember.name}, ${teamMember.role} at Miracle Makers.`,
      images: [teamMember.image],
      creator: "@miraclemakers",
      site: "@miraclemakers",
    },
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id } = await params;
  return <TeamMemberDetails id={id} />;
}
