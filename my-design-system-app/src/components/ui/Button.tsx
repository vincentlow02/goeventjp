import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: "bg-brand-accent text-white hover:bg-blue-600",
    secondary: "bg-brand-primary text-white hover:opacity-90",
    ghost: "bg-transparent hover:bg-slate-100 text-brand-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={cn(
        "rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
