import { useState } from 'react';

function SidebarLinkGroup({
  children,
  activecondition,
}) {

  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li className={`pr-4 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${activecondition && 'to-violet-500/[0.12] from-violet-500/[0.04] dark:to-violet-500/[0.24]'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;