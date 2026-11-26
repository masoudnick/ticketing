import * as React from 'react';
import clsx from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

// Define input size variants
const inputVariants = cva(
  `flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,border] text-foreground placeholder:text-muted-foreground/80 outline-0 focus:border-zinc-400 aria-invalid:border-red-400 aria-invalid:focus:border-red-500 dark:focus:border-zinc-600`,
  {
    variants: {
      variant: {
        lg: 'h-10 px-4 text-sm rounded-md',
        md: 'h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md',
        sm: 'h-7 px-2.5 text-xs rounded-md',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);


export default function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return <input data-slot="input" type={type} className={clsx(inputVariants({ variant }), className)} {...props} />;
}
