import * as React from 'react';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

// Define the variants for the Checkbox using cva.
const checkboxVariants = cva(
  `group peer bg-background shrink-0 rounded-md border border-border ring-offset-background focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
    aria-invalid:border-danger/60 aria-invalid:ring-danger/10 dark:aria-invalid:border-danger dark:aria-invalid:ring-danger/20
    [[data-invalid=true]_&]:border-danger/60 [[data-invalid=true]_&]:ring-danger/10  dark:[[data-invalid=true]_&]:border-danger dark:[[data-invalid=true]_&]:ring-danger/20,
    data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-white`,
  {
    variants: {
      size: {
        sm: 'size-4.5 [&_svg]:size-3',
        md: 'size-5 [&_svg]:size-3.5',
        lg: 'size-5.5 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

function Checkbox({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={clsx(checkboxVariants({ size }), className)} {...props}>
      <CheckboxPrimitive.Indicator className={clsx('flex items-center justify-center text-current')}>
        <Check className="group-data-[state=indeterminate]:hidden" />
        <Minus className="hidden group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
