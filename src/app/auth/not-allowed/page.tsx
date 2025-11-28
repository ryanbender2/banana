'use client';

import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'motion/react';

const NotAllowedPage: React.FC = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="text-center text-3xl font-bold md:text-7xl dark:text-white">
          Beep boop, nice robot here. Go away hacker man.
        </div>
        <div className="py-4 text-base font-extralight md:text-4xl dark:text-neutral-200">
          {"You're not allowed here."}
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default NotAllowedPage;
