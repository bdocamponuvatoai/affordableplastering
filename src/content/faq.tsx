import type { ReactNode } from "react";
import { site } from "@/config/site";

type Faq = { question: string; answer: ReactNode };

export const faqs: readonly Faq[] = [
  {
    question: "What’s the difference between plastering and drywall?",
    answer:
      "Drywall uses pre-made gypsum boards to form walls and ceilings. Plaster is applied wet and worked to create a finished surface. The right option depends on what is already there and the result you want. Dominic can discuss the options for your room.",
  },
  {
    question: "Can I discuss a small repair?",
    answer:
      "Yes—call to describe the area, the type of damage, and your location. Dominic can confirm whether the project is a fit and what information is needed next. For water-related damage, the source of moisture should be addressed before surface repairs.",
  },
  {
    question: "What should I have ready for an estimate?",
    answer:
      "Have your town, approximate room or repair size, current surface condition, desired finish, and preferred timing ready. Photos can help describe the work; ask Dominic how best to share them when you call.",
  },
  {
    question: "Do you work outside Hudson?",
    answer: `Affordable Plastering is based at ${site.address.street} in ${site.address.locality}, ${site.address.regionName}. Call with your project address to confirm service availability in your area.`,
  },
  {
    question: "How do I get started?",
    answer: (
      <>
        Call <a href={site.phone.href}>{site.phone.display}</a>
        {
          " to speak with Dominic. You can also use the project planner on this page to organize your details before calling. The planner keeps your notes in your browser and does not submit a service request."
        }
      </>
    ),
  },
];
