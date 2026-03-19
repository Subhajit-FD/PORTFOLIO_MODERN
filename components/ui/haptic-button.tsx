"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { hapticFeedback, hapticVariants } from "@/lib/haptics";

interface HapticButtonProps extends ButtonProps {
  /** The type of haptic feedback to trigger on click */
  vibe?: keyof typeof hapticVariants;
}

const HapticButton = React.forwardRef<HTMLButtonElement, HapticButtonProps>(
  ({ vibe = "default", onClick, ...props }, ref) => {
    
    const handleClick: ButtonProps["onClick"] = (event) => {
      // Trigger the haptic feedback based on the vibe prop
      hapticFeedback(hapticVariants[vibe]);

      // Call the original onClick if it exists
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Button
        {...props}
        ref={ref}
        onClick={handleClick}
      />
    );
  }
);

HapticButton.displayName = "HapticButton";

export { HapticButton };