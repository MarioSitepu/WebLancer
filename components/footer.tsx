"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Feature197Props {
  features: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "Ready-to-Use UI Blocks",
    image: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    description:
      "Browse through our extensive collection of pre-built UI blocks designed with shadcn/ui. Each block is carefully crafted to be responsive, accessible, and easily customizable. Simply copy and paste the code into your project.",
  },
  {
    id: 2,
    title: "Tailwind CSS & TypeScript",
    image: "https://shadcnblocks.com/images/block/placeholder-2.svg",
    description:
      "Built with Tailwind CSS for rapid styling and TypeScript for type safety. Our blocks leverage the full power of Tailwind's utility classes while maintaining clean, type-safe code that integrates seamlessly with your Next.js projects.",
  },
  {
    id: 3,
    title: "Dark Mode & Customization",
    image: "https://shadcnblocks.com/images/block/placeholder-3.svg",
    description:
      "Every block supports dark mode out of the box and can be customized to match your brand. Modify colors, spacing, and typography using Tailwind's configuration. The shadcn/ui theming system makes it easy to maintain consistency across your site.",
  },
  {
    id: 4,
    title: "Accessibility First",
    image: "https://shadcnblocks.com/images/block/placeholder-4.svg",
    description:
      "All blocks are built with accessibility in mind, following WCAG guidelines. They include proper ARIA labels, keyboard navigation support, and semantic HTML structure. Ensure your website is usable by everyone without extra effort.",
  },
  {
    id: 5,
    title: "Modern Development Stack",
    image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
    description:
      "Built for modern web development with React 18, Next.js 14, and the latest shadcn/ui components. Take advantage of React Server Components, TypeScript strict mode, and other cutting-edge features while maintaining excellent performance.",
  },
];

const Feature197 = ({ features = defaultFeatures }: Feature197Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageChange = (newImage: string, id: number) => {
    setImageLoaded(false);
    setTimeout(() => {
      setActiveImage(newImage);
      setActiveTabId(id);
      setImageLoaded(true);
    }, 150);
  };

  return (
    <section className="w-full py-16 md:py-20 bg-black border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Features</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-sm sm:text-base">
            Discover what makes our platform unique and powerful
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row w-full items-start justify-between gap-6 lg:gap-8 xl:gap-12">
          <div className="w-full lg:w-1/2">
            <Accordion 
              type="single" 
              className="w-full" 
              defaultValue="item-1"
              onValueChange={(value) => {
                const id = value ? parseInt(value.replace('item-', '')) : null;
                if (id) {
                  const feature = features.find(f => f.id === id);
                  if (feature) {
                    handleImageChange(feature.image, id);
                  }
                }
              }}
            >
              {features.map((tab) => (
                <AccordionItem 
                  key={tab.id} 
                  value={`item-${tab.id}`}
                  className="border-b border-neutral-800"
                >
                  <AccordionTrigger
                    onClick={() => {
                      handleImageChange(tab.image, tab.id);
                    }}
                    className="cursor-pointer py-6 !no-underline transition hover:text-foreground group"
                  >
                    <h6
                      className={`text-lg md:text-xl font-semibold text-left transition-colors ${
                        tab.id === activeTabId 
                          ? "text-foreground" 
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mt-2 leading-relaxed">
                      {tab.description}
                    </p>
                    <div className="mt-6 md:hidden">
                      <div className="relative overflow-hidden rounded-lg bg-muted aspect-[4/3]">
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="hidden lg:block relative w-1/2">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-xl bg-muted border border-neutral-800 shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <img
                    src={activeImage}
                    alt="Feature preview"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                    key={activeImage}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Footer() {
  const demoData = {
    features: [
      {
        id: 1,
        title: "Ready-to-Use UI Blocks",
        image: "https://shadcnblocks.com/images/block/placeholder-1.svg",
        description:
          "Browse through our extensive collection of pre-built UI blocks designed with shadcn/ui. Each block is carefully crafted to be responsive, accessible, and easily customizable. Simply copy and paste the code into your project.",
      },
      {
        id: 2,
        title: "Tailwind CSS & TypeScript",
        image: "https://shadcnblocks.com/images/block/placeholder-2.svg",
        description:
          "Built with Tailwind CSS for rapid styling and TypeScript for type safety. Our blocks leverage the full power of Tailwind's utility classes while maintaining clean, type-safe code that integrates seamlessly with your Next.js projects.",
      },
      {
        id: 3,
        title: "Dark Mode & Customization",
        image: "https://shadcnblocks.com/images/block/placeholder-3.svg",
        description:
          "Every block supports dark mode out of the box and can be customized to match your brand. Modify colors, spacing, and typography using Tailwind's configuration. The shadcn/ui theming system makes it easy to maintain consistency across your site.",
      },
      {
        id: 4,
        title: "Accessibility First",
        image: "https://shadcnblocks.com/images/block/placeholder-4.svg",
        description:
          "All blocks are built with accessibility in mind, following WCAG guidelines. They include proper ARIA labels, keyboard navigation support, and semantic HTML structure. Ensure your website is usable by everyone without extra effort.",
      },
      {
        id: 5,
        title: "Modern Development Stack",
        image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
        description:
          "Built for modern web development with React 18, Next.js 14, and the latest shadcn/ui components. Take advantage of React Server Components, TypeScript strict mode, and other cutting-edge features while maintaining excellent performance.",
      },
    ],
  };

  return <Feature197 {...demoData} />;
}

export { Feature197 };
