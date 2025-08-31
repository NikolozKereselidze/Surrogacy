export interface TeamMember {
  id: string;
  image: string;
  honorific: string;
  name: string;
  role: string;
  description: string;
  email: string;
  linkedin: string;
  featured?: boolean; // For homepage display
}

export const teamMembers: TeamMember[] = [
  {
    id: "natia-devdariani",
    image: "/src/assets/img/team/natia-devdariani.jpg",
    honorific: "Mrs.",
    name: "Natia Devdariani",
    role: "Founder & CEO",
    description:
      "Over 15 years of experience in healthcare and professional service consulting, helping families grow. Ms. Devdariani graduated from Tbilisi State Medical University and Tbilisi State University.",
    email: "natia@miraclemakers.com",
    linkedin: "https://linkedin.com/in/natia-devdariani",
    featured: true,
  },
  {
    id: "kelvin-smith",
    image: "/src/assets/img/team/test-doctor.webp",
    honorific: "Dr.",
    name: "Kelvin Smith",
    role: "Fertility Specialist",
    description:
      "Board-certified fertility specialist with expertise in advanced reproductive technologies and personalized treatment plans.",
    email: "kelvin@miraclemakers.com",
    linkedin: "https://linkedin.com/in/kelvin-smith",
    featured: true,
  },
  {
    id: "anna-smith",
    image: "/src/assets/img/team/test-doctor2.webp",
    honorific: "Dr.",
    name: "Anna Smith",
    role: "Coordinator & IVF Specialist",
    description:
      "Over 15 years of experience helping families grow. Specializes in IVF coordination and patient care management.",
    email: "anna@miraclemakers.com",
    linkedin: "https://linkedin.com/in/anna-smith",
    featured: true,
  },
  {
    id: "michael-johnson",
    image: "/src/assets/img/team/test-doctor.webp",
    honorific: "Dr.",
    name: "Michael Johnson",
    role: "Medical Director",
    description:
      "Leading medical director with extensive experience in reproductive medicine and clinical oversight.",
    email: "michael@miraclemakers.com",
    linkedin: "https://linkedin.com/in/michael-johnson",
  },
  {
    id: "sarah-wilson",
    image: "/src/assets/img/team/test-doctor2.webp",
    honorific: "Ms.",
    name: "Sarah Wilson",
    role: "Patient Care Coordinator",
    description:
      "Dedicated patient care coordinator ensuring smooth communication and support throughout your journey.",
    email: "sarah@miraclemakers.com",
    linkedin: "https://linkedin.com/in/sarah-wilson",
  },
  {
    id: "david-brown",
    image: "/src/assets/img/team/test-doctor.webp",
    honorific: "Dr.",
    name: "David Brown",
    role: "Legal Advisor",
    description:
      "Experienced legal advisor specializing in surrogacy law and family formation legal matters.",
    email: "david@miraclemakers.com",
    linkedin: "https://linkedin.com/in/david-brown",
  },
  {
    id: "emily-chen",
    image: "/src/assets/img/team/test-doctor2.webp",
    honorific: "Dr.",
    name: "Emily Chen",
    role: "Genetic Counselor",
    description:
      "Specialized genetic counselor providing comprehensive genetic testing and counseling services.",
    email: "emily@miraclemakers.com",
    linkedin: "https://linkedin.com/in/emily-chen",
  },
  {
    id: "robert-garcia",
    image: "/src/assets/img/team/test-doctor.webp",
    honorific: "Dr.",
    name: "Robert Garcia",
    role: "Psychologist",
    description:
      "Licensed psychologist specializing in fertility counseling and family support services.",
    email: "robert@miraclemakers.com",
    linkedin: "https://linkedin.com/in/robert-garcia",
  },
  {
    id: "lisa-martinez",
    image: "/src/assets/img/team/test-doctor2.webp",
    honorific: "Ms.",
    name: "Lisa Martinez",
    role: "International Coordinator",
    description:
      "Experienced coordinator managing international surrogacy programs and cross-border arrangements.",
    email: "lisa@miraclemakers.com",
    linkedin: "https://linkedin.com/in/lisa-martinez",
  },
];

// Helper function to get featured team members (for homepage)
export const getFeaturedTeamMembers = (): TeamMember[] => {
  return teamMembers.filter((member) => member.featured);
};

// Helper function to get all team members
export const getAllTeamMembers = (): TeamMember[] => {
  return teamMembers;
};
