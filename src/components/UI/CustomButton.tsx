import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import './CustomButton.scss';

// Omit conflicting props that exist in both React and Framer Motion
interface CustomButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
}

const CustomButton = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: CustomButtonProps) => {
  const buttonClasses = [
    'custom-button',
    `custom-button--${variant}`,
    `custom-button--${size}`,
    fullWidth && 'custom-button--full-width',
    isLoading && 'custom-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      {...props}
    >
      {isLoading ? (
        <span className="custom-button__loader" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="custom-button__icon">{icon}</span>
          )}
          <span className="custom-button__text">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="custom-button__icon">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default CustomButton;
