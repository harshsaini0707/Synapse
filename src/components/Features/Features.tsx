import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for developers",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Pricing like no other",
      description:
        "Our prices are best in the market. No cap, no lock, no credit card required.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconHelp />,
    },
    {
      title: "Money back guarantee",
      description:
        "If you donot like EveryAI, we will convince you to like us.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto gap-0">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col relative group/feature cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105",
        "bg-white/90 backdrop-blur-sm border border-green-200/50 hover:border-green-400/80",
        "shadow-lg hover:shadow-xl hover:shadow-green-500/20",
        "rounded-xl m-2 p-6 overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-50/50 before:to-emerald-100/30 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "dark:bg-gray-900/90 dark:border-green-500/30 dark:hover:border-green-400/60 dark:before:from-green-900/20 dark:before:to-emerald-800/20"
      )}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-300/5 to-lime-400/10 opacity-0 group-hover/feature:opacity-100 transition-all duration-500 ease-out" />
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 opacity-75 animate-pulse" style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }} />
      </div>

      {/* Icon container with animation */}
      <div className="mb-6 relative z-10 flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-800 dark:to-emerald-700 rounded-full shadow-md group-hover/feature:shadow-lg group-hover/feature:shadow-green-400/25 transition-all duration-300">
        <div className="text-green-600 dark:text-green-400 transform group-hover/feature:scale-110 group-hover/feature:rotate-6 transition-all duration-300">
          {icon}
        </div>
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full bg-green-400/20 scale-0 group-hover/feature:scale-150 opacity-100 group-hover/feature:opacity-0 transition-all duration-500" />
      </div>

      {/* Title with enhanced styling */}
      <div className="text-xl font-bold mb-4 relative z-10 text-center">
        {/* Animated accent line */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 h-0 group-hover/feature:h-8 w-1 rounded-full bg-gradient-to-b from-green-400 to-emerald-500 transition-all duration-300 origin-center" />
        <span className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 bg-clip-text text-transparent group-hover/feature:from-green-700 group-hover/feature:to-emerald-700 dark:group-hover/feature:from-green-300 dark:group-hover/feature:to-emerald-300 transition-all duration-300">
          {title}
        </span>
      </div>

      {/* Description with improved styling */}
      <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed relative z-10 group-hover/feature:text-gray-700 dark:group-hover/feature:text-gray-200 transition-colors duration-300">
        {description}
      </p>

      {/* Floating particles animation */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-green-400/40 rounded-full opacity-0 group-hover/feature:opacity-100 group-hover/feature:animate-bounce transition-all duration-300" style={{ animationDelay: '0.1s' }} />
      <div className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-emerald-400/40 rounded-full opacity-0 group-hover/feature:opacity-100 group-hover/feature:animate-bounce transition-all duration-300" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-1/2 right-6 w-1 h-1 bg-lime-400/40 rounded-full opacity-0 group-hover/feature:opacity-100 group-hover/feature:animate-pulse transition-all duration-300" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};
