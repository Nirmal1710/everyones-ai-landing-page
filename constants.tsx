import React from 'react';
import { MessageSquare, Image, Video, Music, Code, PenTool } from 'lucide-react';
import { Story, Tool, Mission, NavItem } from './types';







// Placeholder for external forms (Google Forms, Typeform, etc.)
export const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSfff7ZEucppfYljUxwzRpm8brOFW7hWy9ULFf2S3RERUHldKg/viewform?usp=header";

export const NAV_ITEMS: NavItem[] = [
  { id: 'why', label: 'Why AI?' },
  { id: 'stories', label: 'Stories' },
  { id: 'learn', label: 'Learn Tools' },
  { id: 'get-involved', label: 'Get Involved' },
];

export const HERO_CONTENT = {
  headline: "Making AI friendly — for kids, parents, teachers, and elders.",
  subheading: "Let’s explore AI the way we explore a new world — with curiosity, not complexity.",
  ctaPrimary: "Spark your idea",
  ctaSecondary: "Read stories",
};

export const STORIES: Story[] = [
  {
    id: '1',
    title: "Maya and the Helpful Robot",
    excerpt: "Maya learns how a small chatbot helped her finish a story — and she keeps writing.",
    // Using descriptive placeholders to represent the AI-generated illustrations requested
    imageUrl: "https://placehold.co/800x600/5B21B6/FFF?text=Maya+and+Helpful+Robot",
    videoUrl: "https://www.youtube.com/watch?v=DBQH_ZwASJ4&t=3s",
  },
  {
    id: '2',
    title: "Grandpa’s First AI Question",
    excerpt: "A grandfather asks one simple question and sparks a curious conversation.",
    imageUrl: "https://placehold.co/800x600/06B6D4/FFF?text=Grandpa+and+AI",
    videoUrl:"https://www.youtube.com/watch?v=0B3cI1wE7lw",
  },
  {
    id: '3',
    title: "The Teacher’s Tiny Assistant",
    excerpt: "A teacher uses a short prompt to create a lesson plan in minutes.",
    imageUrl: "https://placehold.co/800x600/F43F5E/FFF?text=Teacher+and+Laptop",
    videoUrl:"https://www.youtube.com/watch?v=hJP5GqnTrNo",
  },
  {
    id: '4',
    title: "The Parent’s Creative Hour",
    excerpt: "AI helps a family turn a rainy afternoon into a craft and story workshop.",
    imageUrl: "https://placehold.co/800x600/F59E0B/FFF?text=Family+Crafting+Time",
    videoUrl:"https://www.youtube.com/watch?v=h6gBU7BnQeY",
  }
];

// Add a playlist / "all stories" link constant if you like:
export const STORIES_PLAYLIST = "https://www.youtube.com/watch?v=2g3l5q2nPkE&list=PL_SazjdcB6DklaZntosVLM5Hp1H9dnCWz";

export const TOOLS: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'A conversation partner for ideas.',
    href: "https://chat.openai.com/",
    icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
    samplePrompt: "Tell me a bedtime story about a brave toaster.",
  },
  {
    id: 'dalle',
    name: 'DALL·E',
    description: 'Turn words into paintings.',
    href: "https://labs.openai.com/",
    icon: <Image className="w-8 h-8 text-blue-500" />,
    samplePrompt: "A futuristic city made of candy, digital art.",
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'Magic wand for video editing.',
    href: "https://runwayml.com/",
    icon: <Video className="w-8 h-8 text-purple-500" />,
    samplePrompt: "Make the clouds in this video move faster.",
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Dreamy, artistic image creation.',
    href: "https://www.midjourney.com/", 
    icon: <PenTool className="w-8 h-8 text-pink-500" />,
    samplePrompt: "Portrait of a cat admiral, oil painting style.",
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    description: 'Create avatars that speak.',
    href: "https://www.synthesia.io/",
    icon: <Music className="w-8 h-8 text-indigo-500" />,
    samplePrompt: "Say 'Hello class!' in a friendly voice.",
  },
  {
    id: 'stablediffusion',
    name: 'Stable Diffusion',
    description: 'Open creative image generation.',
    href: "https://stability.ai/",
    icon: <Code className="w-8 h-8 text-orange-500" />,
    samplePrompt: "A photograph of an astronaut riding a horse on Mars.",
  }
];

// replace the FORM_URL_PLACEHOLDER with your real links
export const JOIN_FORM_URL = "https://huggingface.co/"; // sign-up mini-missions form
export const SUBMIT_IDEA_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfff7ZEucppfYljUxwzRpm8brOFW7hWy9ULFf2S3RERUHldKg/viewform?usp=header";
export const UPLOAD_CREATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdz2gl_Bcm2Hah5xeflB0p8-YMOsgIGbEwQYxDYetXNnDwr2w/viewform?usp=publish-editor";
export const FEEDBACK_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeWwCWHLvFBArpKaHRdAvJZW7E2xsGpTIr1dOefcjsddYQK7g/viewform?usp=publish-editor";


export const MISSIONS: Mission[] = [
  {
    id: 'join',
    title: "Join the AI comunity",
    instruction: "The AI community building the future. The platform where the machine learning community collaborates on models, datasets, and applications. Explore AI Apps.",
    ctaText: "Sign Up Now",
    colorClass: "from-purple-500 to-indigo-500",
    formUrl: JOIN_FORM_URL,
  },
  {
    id: 'submit',
    title: "Submit your idea",
    instruction: "Tried something interesting with AI? Share your idea and help our community explore new possibilities.",
    ctaText: "Share Idea",
    colorClass: "from-cyan-500 to-blue-500",
    formUrl: SUBMIT_IDEA_FORM_URL,
  },
  {
    id: 'share',
    title: "Share your creation",
    instruction: "Share a link to your live website or hosted project so we can explore your work in action. Don’t forget to include your GitHub, GitLab, or code repository link so we can review the source as well.",
    ctaText: "Upload Now",
    colorClass: "from-rose-400 to-red-500",
    formUrl: UPLOAD_CREATION_FORM_URL,
  },
  {
    id: 'feedback',
    title: "Community Feedback",
    instruction: "Tell us what’s working well and what we can make better. Your feedback guides us in building a friendlier and more accessible AI journey for everyone.",
    ctaText: "Give Feedback",
    colorClass: "from-amber-400 to-orange-500",
    formUrl: FEEDBACK_FORM_URL,
  }
];