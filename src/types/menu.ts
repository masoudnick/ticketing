import type { IconSvgElement } from "@hugeicons/react";

export interface MenuItemProps {
    label: string;
    href?: string;
    icon?: IconSvgElement,
    children?: MenuItemProps[];
}