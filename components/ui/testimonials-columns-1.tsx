"use client";

import React from "react";
import { motion } from "framer-motion";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="group p-6 sm:p-8 rounded-lg border border-border bg-card hover:border-primary transition-all duration-500 max-w-xs w-full shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10" 
                  key={i}
                >
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{text}</p>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border border-border"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-foreground tracking-tight leading-5">{name}</div>
                      <div className="text-sm text-muted-foreground leading-5 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

