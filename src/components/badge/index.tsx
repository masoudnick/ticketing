import React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import clsx from 'clsx';


const Badge = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & { asChild?: boolean, variant: string }) => {
  const Comp = asChild ? SlotPrimitive.Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={clsx("inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-sm px-[0.25rem] h-4 min-w-4 gap-1 text-[0.625rem] leading-[0.5rem] [&_svg]:size-3", className)}
      {...props}
    />
  );
}

export default Badge;