import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  threshold = 0.1
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once
  });
  const getDirectionalVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: {
            y: 50,
            opacity: 0
          },
          visible: {
            y: 0,
            opacity: 1
          }
        };
      case 'down':
        return {
          hidden: {
            y: -50,
            opacity: 0
          },
          visible: {
            y: 0,
            opacity: 1
          }
        };
      case 'left':
        return {
          hidden: {
            x: 50,
            opacity: 0
          },
          visible: {
            x: 0,
            opacity: 1
          }
        };
      case 'right':
        return {
          hidden: {
            x: -50,
            opacity: 0
          },
          visible: {
            x: 0,
            opacity: 1
          }
        };
      case 'none':
        return {
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1
          }
        };
      default:
        return {
          hidden: {
            y: 50,
            opacity: 0
          },
          visible: {
            y: 0,
            opacity: 1
          }
        };
    }
  };
  const variants = getDirectionalVariants();
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} transition={{
    duration,
    delay
  }} className={className}>
    {children}
  </motion.div>;
};
export default AnimatedSection;