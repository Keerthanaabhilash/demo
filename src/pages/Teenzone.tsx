import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Know Yourself", description: "Explore who you are — your strengths, passions, and values. Build a strong sense of self through guided activities and reflections.", path: "/teenzone/know-yourself" },
  { title: "Teen Toolkit", description: "Discover actionable strategies, practical tools, and frameworks designed specifically for teenagers facing real-world challenges and growth.", path: "/teenzone/teen-toolkit" },
  { title: "IkigaiTeen Club", description: "Join the IkigaiTeen Club for exclusive access to events, mentorship, and a community of teens on their Ikigai journey.", path: "/teenzone/ikigai-teen-club" },
  { title: "IkigaiTeen App", description: "Explore our upcoming app designed to guide your Ikigai journey with interactive tools, progress tracking, and personalized insights.", path: "/teenzone/ikigai-teen-app" },
];

const Teenzone = () => (
  <SectionPageLayout
    title="Teen Zone"
    subtitle="A dedicated space for teens to explore, learn, and grow."
    sections={sections}
  />
);

export default Teenzone;
