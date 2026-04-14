import blog2Parent2 from "@/assets/BLOG 2 PARENT FORMAT 2.pdf";
import blog2Teen from "@/assets/BLOG 2 TEEN FORMAT.pdf";
import blog3Parent from "@/assets/BLOG 3 PARENT FORMAT.pdf";
import blog3Teen from "@/assets/BLOG 3 TEEN FORMAT.pdf";
import blog4Parent from "@/assets/BLOG 4 PARENT FORMAT.pdf";
import blog4Teen from "@/assets/BLOG 4 TEEN FORMAT.pdf";
import blog5Parent from "@/assets/BLOG 5 PARENT FORMAT.pdf";
import blog5Teen from "@/assets/BLOG 5 TEEN FORMAT.pdf";
import { articleBodies, type ArticleContentBlock } from "@/lib/articleBodies";

export type Article = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  author: string;
  pdfUrl: string;
  readTime: string;
  publishedOn: string;
  content?: ArticleContentBlock[];
};

export const articles: Article[] = [
  {
    slug: "from-tool-to-trap-digital-dependence-in-teens",
    title: "From Tool to Trap: When Digital Use Quietly Turns into Digital Dependence in Teens",
    audience: "For Parents",
    summary:
      "Digital dependence rarely begins with extreme behaviour. It begins with small, invisible changes in daily life. The child who once put the phone down easily now becomes irritated when asked to.",
    author: "Ikigai Teen",
    pdfUrl: blog2Parent2,
    readTime: "5 min read",
    publishedOn: "Jan 22, 2024",
    content: articleBodies["from-tool-to-trap-digital-dependence-in-teens"],
  },
  {
    slug: "social-media-self-worth-comparison-culture",
    title: "Social Media, Self-Worth, and Comparison Culture: Why Today's Teens Feel 'Never Enough'",
    audience: "For Parents",
    summary:
      "Today's teenagers are not just growing up with social media. They are growing up inside a comparison machine, and many high-functioning teens still end up feeling like they are failing at life.",
    author: "Ikigai Teen",
    pdfUrl: blog3Parent,
    readTime: "4 min read",
    publishedOn: "Jan 29, 2024",
    content: articleBodies["social-media-self-worth-comparison-culture"],
  },
  {
    slug: "digital-is-not-the-enemy-for-parents",
    title: "Digital Is Not the Enemy: The Missed Opportunities Parents Overlook While Focusing Only on Screen Time",
    audience: "For Parents",
    summary:
      "Most conversations about teens and technology revolve around one question: how much screen time is too much. But that is the wrong starting point.",
    author: "Ikigai Teen",
    pdfUrl: blog4Parent,
    readTime: "5 min read",
    publishedOn: "Feb 5, 2024",
    content: articleBodies["digital-is-not-the-enemy-for-parents"],
  },
  {
    slug: "digital-is-not-the-enemy-parent-guide",
    title: "Digital Is Not the Enemy: A Parent's Guide to Healthy Digital Habits for Teens",
    audience: "For Parents",
    summary:
      "Teens do not need a world without screens, they need adults who can coach them toward healthier digital routines. This guide helps parents move from control-focused rules to skill-building conversations.",
    author: "Ikigai Teen",
    pdfUrl: blog5Parent,
    readTime: "4 min read",
    publishedOn: "Feb 12, 2024",
    content: articleBodies["inside-the-teen-brain-digital-world"],
  },
  {
    slug: "your-brain-isnt-broken",
    title: "Your Brain Isn't Broken. It's Just Growing Up in a Crazy Digital World.",
    audience: "For Teens",
    summary:
      "If you've ever said 'I'll stop scrolling after 5 minutes' and then it's suddenly 1 hour later, that does NOT mean you're weak, lazy, or have no self-control. It means your brain is growing up in a highly addictive digital world.",
    author: "Irene Pais",
    pdfUrl: blog2Teen,
    readTime: "5 min read",
    publishedOn: "Jan 15, 2024",
    content: articleBodies["your-brain-isnt-broken"],
  },
  {
    slug: "from-tool-to-trap-phone-starts-using-you",
    title: "From Tool to Trap: How to Know When Your Phone Starts Using You",
    audience: "For Teens",
    summary:
      "Your phone is useful. It helps you learn, relax, connect, and escape boredom. But if you're honest, you might also recognise this feeling: 'I open my phone for one thing and suddenly a lot of time is gone.'",
    author: "Ikigai Teen",
    pdfUrl: blog3Teen,
    readTime: "3 min read",
    publishedOn: "Jan 22, 2024",
    content: articleBodies["from-tool-to-trap-phone-starts-using-you"],
  },
  {
    slug: "social-media-comparison-and-you",
    title: "Social Media, Comparison, and You: Why So Many Teens Feel 'Never Enough'",
    audience: "For Teens",
    summary:
      "Have you ever looked at someone's post and suddenly felt worse about your own life? If yes, you're not alone. And you're not broken.",
    author: "Ikigai Teen",
    pdfUrl: blog4Teen,
    readTime: "4 min read",
    publishedOn: "Jan 29, 2024",
    content: articleBodies["social-media-comparison-and-you"],
  },
  {
    slug: "digital-is-not-the-enemy-for-teens",
    title: "Digital Is Not the Enemy: How to Use Your Phone Without Wasting Your Life",
    audience: "For Teens",
    summary:
      "That doesn't mean you're lazy. It means you're living in a world designed to pull attention. Your phone is not the enemy. Unconscious use is.",
    author: "Ikigai Teen",
    pdfUrl: blog5Teen,
    readTime: "4 min read",
    publishedOn: "Feb 5, 2024",
    content: articleBodies["digital-is-not-the-enemy-for-teens"],
  },
];

export const findArticleBySlug = (slug?: string) => articles.find((article) => article.slug === slug);
