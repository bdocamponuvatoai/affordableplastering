import type { IconName } from "@/components/ui/icon";

// Short copy lists used on the home page.

export const highlights: readonly { icon: IconName; label: string }[] = [
  { icon: "layers", label: "Smooth plaster finishes" },
  { icon: "square", label: "Drywall & repairs" },
  { icon: "home-icon", label: "Room to renovation" },
  { icon: "pin", label: "Based in Hudson, NH" },
];

export const approachValues: readonly string[] = [
  "Talk directly with the owner",
  "Discuss the scope before work begins",
  "Find a finish that fits your space",
];

export const processSteps: readonly {
  icon: IconName;
  title: string;
  text: string;
}[] = [
  {
    icon: "chat",
    title: "Tell us what you have in mind.",
    text: "A quick repair, a fresh surface, or a full room. Call Dominic to discuss your space, location, and timing.",
  },
  {
    icon: "measure",
    title: "Work through the details.",
    text: "Talk through the existing condition, the finish you want, and what an estimate needs to cover.",
  },
  {
    icon: "layers",
    title: "Make a plan for the finish.",
    text: "Confirm the scope, preparation, and schedule together before moving your project forward.",
  },
];
