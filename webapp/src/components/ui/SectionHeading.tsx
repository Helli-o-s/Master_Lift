import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { motion, type Variants } from 'framer-motion';

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  alignment?: 'left' | 'center';
  className?: string;
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export const SectionHeading: FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  className 
}) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className={cn(
        "mb-16",
        alignment === 'center' ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      <div 
        className={cn(
          "w-12 h-1 bg-primary -skew-x-12 mb-6",
          alignment === 'center' ? "mx-auto" : ""
        )}
      />
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
