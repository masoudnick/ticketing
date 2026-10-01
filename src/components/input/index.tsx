import * as React from 'react';
import clsx from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

// Define input size variants
const inputVariants = cva(
  `
    flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,border] text-foreground placeholder:text-muted-foreground/80 outline-0 focus:border-zinc-400 dark:focus:border-zinc-600`,
  {
    variants: {
      variant: {
        lg: 'h-10 px-4 text-sm rounded-md file:pe-4 file:me-4',
        md: 'h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md file:pe-3 file:me-3',
        sm: 'h-7 px-2.5 text-xs rounded-md file:pe-2.5 file:me-2.5',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);


function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return <input data-slot="input" type={type} className={clsx(inputVariants({ variant }), className)} {...props} />;
}


export { Input };