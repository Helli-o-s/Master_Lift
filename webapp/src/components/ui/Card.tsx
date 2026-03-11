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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden bg-white border border-slate-200 transition-all hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50",
        className
      )}
    >
      {/* Top Image Half */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            loading="lazy" 
            className="h-full w-full object-cover transition-transform duration-700 ease-[0.2,0,0,1] group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 border border-slate-300 rounded-none" />
          </div>
        )}
        {/* Hardware data tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 px-2.5 py-1 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Sys_Ready
        </div>
      </div>

      {/* Bottom Text Half */}
      <div className="relative z-10 flex flex-col flex-grow p-6 md:p-8">
        {icon && (
          <div className="mb-6 inline-flex h-10 w-10 items-center justify-center bg-slate-50 border border-slate-100 text-primary">
            {icon}
          </div>
        )}
        <h3 className="mb-3 text-xl font-bold text-secondary tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-grow">{description}</p>
        
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest transition-all group-hover:text-primary cursor-pointer">
          <span>View Specs</span>
          <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
};
