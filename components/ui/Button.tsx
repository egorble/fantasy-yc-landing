import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  fullWidth, 
  children, 
  ...props 
}) => {
  const baseStyles = "font-bold uppercase tracking-wider py-4 px-8 transition-transform active:translate-y-1 font-mono text-sm border-2 border-black";
  
  const variants = {
    primary: "bg-[#F26522] text-black shadow-[4px_4px_0px_0px_rgba(5,5,5,1)] hover:shadow-[6px_6px_0px_0px_rgba(5,5,5,1)] hover:-translate-y-[2px]",
    secondary: "bg-[#CCFF00] text-black shadow-[4px_4px_0px_0px_rgba(5,5,5,1)] hover:shadow-[6px_6px_0px_0px_rgba(5,5,5,1)] hover:-translate-y-[2px]",
    outline: "bg-transparent text-black shadow-[4px_4px_0px_0px_rgba(5,5,5,1)] hover:bg-black hover:text-white"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)} 
      {...props}
    >
      {children}
    </button>
  );
};