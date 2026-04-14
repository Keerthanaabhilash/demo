import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Blog/Articles", description: "Read insightful articles on teen development, purpose-finding, mental wellness, and the Ikigai philosophy.", path: "/resources/blogs" },
  { title: "Video/Podcast Links", description: "Watch and listen to inspiring content from teen coaches, educators, and young leaders making a difference." },
  { title: "Recent Events", description: "Catch up on our latest workshops, webinars, and community gatherings that brought teens and families together." },
  { title: "Upcoming Events", description: "Stay updated on future events, programs, and opportunities to engage with the Ikigai Teen community." },
  { title: "IkigaiTeen Facts & Stats", description: "Explore data-driven insights about teen well-being, purpose-finding, and the impact of the Ikigai approach." },
];

const Resources = () => (
  <SectionPageLayout
    title="Resources"
    subtitle="Explore our library of content, events, and insights."
    sections={sections}
  />
);

export default Resources;
