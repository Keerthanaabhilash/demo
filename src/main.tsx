import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import logoWhite from "@/assets/ikigai-logo-white.jpeg";

const setFavicon = () => {
	const existingIcons = document.querySelectorAll<HTMLLinkElement>("link[rel~='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']");
	existingIcons.forEach((link) => link.remove());

	const iconSizes = ["48x48", "32x32", "16x16"];

	iconSizes.forEach((sizes, index) => {
		const link = document.createElement("link");
		link.rel = index === 0 ? "icon" : "shortcut icon";
		link.type = "image/jpeg";
		link.href = logoWhite;
		link.sizes = sizes;
		document.head.appendChild(link);
	});

	const appleTouchIcon = document.createElement("link");
	appleTouchIcon.rel = "apple-touch-icon";
	appleTouchIcon.href = logoWhite;
	appleTouchIcon.sizes = "180x180";
	document.head.appendChild(appleTouchIcon);
};

setFavicon();

createRoot(document.getElementById("root")!).render(<App />);
