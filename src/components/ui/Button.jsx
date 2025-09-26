import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  fullWidth = false
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none';
  const variantStyles = {
    primary: 'bg-[#3f1403] text-white hover:bg-[#5d2007]',
    secondary: 'bg-[#ec9a4e] text-white hover:bg-[#3f1403]',
    outline: 'bg-transparent border-2 border-[#3f1403] text-[#3f1403] hover:bg-[#00000080] hover:text-white hover:border-transparent'
  };
  const sizeStyles = {
    sm: 'text-xs px-4 py-1.5',
    md: 'text-sm px-6 py-2.5',
    lg: 'text-base px-8 py-3'
  };
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${className}`;
  const buttonMotion = {
    whileHover: {
      scale: disabled ? 1 : 1.03
    },
    whileTap: {
      scale: disabled ? 1 : 0.98
    }
  };
  if (to) {
    return <motion.div {...buttonMotion}>
      <Link to={to} className={buttonStyles}>
        {children}
      </Link>
    </motion.div>;
  }
  if (href) {
    return <motion.div {...buttonMotion}>
      <a href={href} className={buttonStyles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </motion.div>;
  }
  return <motion.button type={type} className={buttonStyles} onClick={onClick} disabled={disabled} {...buttonMotion}>
    {children}
  </motion.button>;
};
export default Button;