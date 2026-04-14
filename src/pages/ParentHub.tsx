import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Parent Role", description: "Understand the crucial role parents play in helping teens discover their Ikigai. Learn how to guide without directing." },
  { title: "Parent Challenges", description: "Explore common parenting challenges during the teenage years and find research-backed approaches to navigate them." },
  { title: "Parent Collab", description: "Collaborate with other parents, educators, and mentors to create a supportive ecosystem for your teen's growth." },
  { title: "IkigaiTeen Parent Circle", description: "Join our exclusive parent community for workshops, discussions, and resources designed to strengthen the parent-teen bond." },
];

const ParentHub = () => (
  <SectionPageLayout
    title="Parent Hub"
    subtitle="Resources and community for parents supporting their teen's purpose journey."
    sections={sections}
  />
);

export default ParentHub;
