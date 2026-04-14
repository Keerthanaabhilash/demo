import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  {
    title: "Vision, Mission & Values",
    path: "/about/values-vision-mission",
    description: "Our vision is a world where every teenager discovers their unique purpose and lives a life of meaning. Our mission is to guide teens through self-discovery using the Ikigai framework, grounded in strong values.",
  },
  { title: "Grounding Philosophy", path: "/about/grounding-philosophy", description: "Rooted in the Japanese concept of Ikigai, we help teens find balance, direction, and meaningful growth." },
  { title: "The Journey", path: "/about/journey", description: "From a small initiative to a growing movement, Ikigai Teen has been on a mission to empower teenagers across communities to live with purpose and passion." },
  { title: "Founder & Team", description: "Meet the passionate team behind Ikigai Teen — educators, mentors, and youth advocates dedicated to making a difference in every teen's life." },
];

const About = () => (
  <SectionPageLayout
    title="About Us"
    subtitle="Learn about our mission to empower teens through purpose and self-discovery."
    sections={sections}
  />
);

export default About;
