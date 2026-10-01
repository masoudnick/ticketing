import type { ReactNode } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import clsx from 'clsx';


interface TimelineItemProps {
  icon: IconSvgElement;
  iconBgClass?: string;
  line: boolean;
  children: ReactNode;
}

export function ActionItem({
  line,
  icon,
  iconBgClass,
  children,
}: TimelineItemProps) {
  return (
    <div className={clsx("flex items-center relative", line && "pb-7")}>
      {line && (
        <div className="w-9 inset-s-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-border"></div>
      )}
      <div className={clsx("flex items-center justify-center shrink-0 rounded-full size-9", iconBgClass)}>
        <HugeiconsIcon icon={icon} size={18} />
      </div>
      <div className='ps-2.5 text-base grow'>
        {children}
      </div>
    </div>
  );
}
