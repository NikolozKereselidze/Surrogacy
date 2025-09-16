export interface TeamMember {
  id: string;
  image: string;
  honorific: string;
  name: string;
  role: string;
  description: string;
  detailedDescription: string;
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
    detailedDescription:
      "As the Founder and CEO of Miracle Makers, I leverage over ten years of extensive experience in healthcare and professional service consulting to revolutionize the surrogacy and egg donation landscape. Our agency is committed to guiding prospective parents through every step of their journey, providing access to qualified surrogates and egg donors, and ensuring a seamless experience from the initial consultation to the successful completion of the process. At Miracle Makers, we understand that the path to parenthood can be both exciting and challenging. That's why we are dedicated to offering comprehensive support tailored to the unique needs of each intended parent. Our team is passionate about facilitating connections between intended parents and surrogates or egg donors, ensuring that every match is made with care and consideration. In my role, I oversee all aspects of data management, application processing, and medical consultations. This includes meticulous attention to detail in maintaining accurate records and ensuring compliance with all legal and medical requirements. My commitment to excellence ensures that intended parents receive the highest level of service and support throughout their journey. To date, I am proud to have facilitated the birth of over 3,200 children, each representing a unique story of hope, joy, and fulfillment for my team and me. Witnessing the happiness of families as they welcome their new children into the world is the most rewarding aspect of my work. At Miracle Makers, we are not just a surrogacy and egg donation agency; we are a compassionate partner in the journey to parenthood. Our team is here to provide emotional support, expert guidance, and practical resources, ensuring that intended parents feel empowered and informed every step of the way. We believe that every family deserves the opportunity to grow, and we are dedicated to making dreams of parenthood a reality. Whether you are considering surrogacy or egg donation, we invite you to reach out to us and discover how we can assist you on this incredible journey. Together, let's create a brighter future filled with love, joy, and family.",
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
    detailedDescription:
      "Kelvin Smith is a board-certified fertility specialist with expertise in advanced reproductive technologies and personalized treatment plans.",
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
    detailedDescription:
      "Anna Smith is a coordinator and IVF specialist with over 15 years of experience helping families grow. She specializes in IVF coordination and patient care management.",
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
    detailedDescription:
      "Michael Johnson is a leading medical director with extensive experience in reproductive medicine and clinical oversight.",
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
    detailedDescription:
      "Sarah Wilson is a dedicated patient care coordinator ensuring smooth communication and support throughout your journey.",
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
    detailedDescription:
      "David Brown is an experienced legal advisor specializing in surrogacy law and family formation legal matters.",
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
    detailedDescription:
      "Emily Chen is a specialized genetic counselor providing comprehensive genetic testing and counseling services.",
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
    detailedDescription:
      "Robert Garcia is a licensed psychologist specializing in fertility counseling and family support services.",
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
    detailedDescription:
      "Lisa Martinez is an experienced coordinator managing international surrogacy programs and cross-border arrangements.",
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
