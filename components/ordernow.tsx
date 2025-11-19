"use client";

import React, { useState } from 'react';
import Stepper, { Step } from './ui/stepper';

export default function OrderNow() {
  const [name, setName] = useState('');

  return (
    <section id="order" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 text-balance">Order Now</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance mb-0">
            Follow the simple steps below to place your order
          </p>
        </div>

        <div className="flex justify-center">
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2 className="text-2xl font-bold text-foreground mb-4">Welcome!</h2>
              <p className="text-muted-foreground">Let's get started with your order. Click Next to continue.</p>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold text-foreground mb-4">Choose Your Package</h2>
              <img 
                className="h-48 w-full object-cover rounded-lg mt-4" 
                src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" 
                alt="Package"
              />
              <p className="text-muted-foreground mt-4">Select the package that best fits your needs.</p>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Information</h2>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name?" 
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </Step>
            <Step>
              <h2 className="text-2xl font-bold text-foreground mb-4">Final Step</h2>
              <p className="text-muted-foreground">You're almost done! Click Complete to finish your order.</p>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
