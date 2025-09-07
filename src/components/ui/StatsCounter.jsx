import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const StatsCounter = ({
  end,
  duration = 2,
  label,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  useEffect(() => {
    if (inView) {
      let startTime;
      let animationFrame;
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      animationFrame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, end, duration]);
  const variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} transition={{
    duration: 0.5
  }} className={`text-center ${className}`}>
    <motion.h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3f1403]">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.h3>
    <p className="text-gray-600 mt-2 font-medium">{label}</p>
  </motion.div>;
};
export default StatsCounter;