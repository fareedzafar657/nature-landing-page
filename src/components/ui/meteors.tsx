import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);

  const [containerWidth, setContainerWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const update = () => setContainerWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden w-screen h-screen absolute inset-0"
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across the available width
        // centered around 0, so left can be negative/positive relative to container
        const position = idx * (containerWidth / meteorCount) - containerWidth / 20;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px", // Start above the container
              left: position + "px",
              animationDelay: Math.random() * 20 + "s", // Random delay between 0-5s
              animationDuration: Math.floor(Math.random() * (10 - 5) + 20) + "s", // Keep some randomness in duration
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
