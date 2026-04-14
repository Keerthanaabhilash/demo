import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Be Our Experts", description: "Share your expertise in youth development, psychology, education, or coaching to help shape the Ikigai Teen programs." },
  { title: "Be Our Collaborators", description: "Partner with us as an organization, school, or community group to bring Ikigai-based programs to more teens." },
  { title: "Be Our Trainee Coaches", description: "Join our coaching program and learn to guide teens through their Ikigai journey with our certified training." },
  { title: "Be Our Interns/Guests", description: "Gain hands-on experience in youth empowerment through internship opportunities or guest speaking engagements." },
  { title: "Be Our Patrons", description: "Support the Ikigai Teen movement financially and help us reach more teenagers who need guidance and purpose." },
  { title: "IkigaiTeen Patrons", description: "Meet the generous patrons who make our mission possible and learn about the impact of their contributions." },
];

const GetInvolved = () => (
  <SectionPageLayout
    title="Get Involved"
    subtitle="Join our mission and make a difference in a teen's life."
    sections={sections}
  />
);

export default GetInvolved;
