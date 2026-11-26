import type { IconSvgElement } from "@hugeicons/react";

export interface MenuItemProps {
    label: string;
    href?: string;
    type: "parent" | "child";
    icon?: IconSvgElement,
    children?: MenuItemProps[];
}