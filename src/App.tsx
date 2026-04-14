import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import FounderTeam from "./pages/FounderTeam.tsx";
import GroundingPhilosophy from "./pages/GroundingPhilosophy.tsx";
import ValuesVisionMission from "./pages/ValuesVisionMission.tsx";
import Journey from "./pages/Journey.tsx";
import Teenzone from "./pages/Teenzone.tsx";
import KnowYourself from "./pages/KnowYourself.tsx";
import TeenToolkit from "./pages/TeenToolkit.tsx";
import IkigaiTeenClub from "./pages/IkigaiTeenClub.tsx";
import IkigaiTeenApp from "./pages/IkigaiTeenApp.tsx";
import ParentHub from "./pages/ParentHub.tsx";
import ResourceArticle from "./pages/ResourceArticle.tsx";
import ResourceBlogs from "./pages/ResourceBlogs.tsx";
import ResourceVideos from "./pages/ResourceVideos.tsx";
import GetInvolved from "./pages/GetInvolved.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToHash = () => {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(window.history.state, "", `${pathname}${search}`);
    }
  }, [hash, pathname, search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/values-vision-mission" element={<ValuesVisionMission />} />
          <Route path="/about/grounding-philosophy" element={<GroundingPhilosophy />} />
          <Route path="/about/journey" element={<Journey />} />
          <Route path="/about/founder-team" element={<FounderTeam />} />
          <Route path="/teenzone" element={<Teenzone />} />
          <Route path="/teenzone/know-yourself" element={<KnowYourself />} />
          <Route path="/teenzone/teen-toolkit" element={<TeenToolkit />} />
          <Route path="/teenzone/ikigai-teen-club" element={<IkigaiTeenClub />} />
          <Route path="/teenzone/ikigai-teen-app" element={<IkigaiTeenApp />} />
          <Route path="/parent-hub" element={<ParentHub />} />
          <Route path="/resources" element={<Navigate to="/resources/blogs" replace />} />
          <Route path="/resources/blogs" element={<ResourceBlogs />} />
          <Route path="/resources/videos" element={<ResourceVideos />} />
          <Route path="/resources/blog/:slug" element={<ResourceArticle />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
