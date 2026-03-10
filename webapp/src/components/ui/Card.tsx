import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imageUrl?: string;
  className?: string;
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Card: FC<CardProps> = ({ 
  title, 
  description, 
  icon,
  imageUrl,
  className 
}) => {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:shadow-xl",
        className
      )}
    >
      {imageUrl && (
        <div className="absolute inset-0 z-0 opacity-10 transition-opacity group-hover:opacity-20">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h3 className="mb-3 text-xl font-bold text-secondary">{title}</h3>
        <p className="text-slate-600 leading-relaxed flex-grow">{description}</p>
        
        <div className="mt-8 flex items-center text-primary font-medium opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer">
          Learn more <span className="ml-2">→</span>
        </div>
      </div>
    </motion.div>
  );
};
