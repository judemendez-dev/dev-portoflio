import type { IconName } from "@/components/icons";

export type NavItem = { href: string; label: string; icon: IconName };

/** The main navigation. Used by the header, mobile menu, command palette and footer. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/projects", label: "Projects", icon: "folder" },
  { href: "/about", label: "About", icon: "user" },
  { href: "/experience", label: "Experience", icon: "briefcase" },
  { href: "/contact", label: "Contact", icon: "at-sign" },
];

/** True when `href` is the current page or a parent of it. */
export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
