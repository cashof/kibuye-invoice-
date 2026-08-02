"use client"; // Required at the top to use usePathname hook

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to detect current URL
import {
  Box,
  Briefcase,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export default function NavSidebar() {
  const pathname = usePathname(); // Get the current active URL path

  const navbtns = {
    nav: [
      { name: "dashboard", icon: LayoutDashboard, link: "/dashboard" },
      { name: "invoice", icon: FileText, link: "/dashboard/invoice" },
      { name: "employees", icon: Users, link: "/dashboard/employees" },
      { name: "clients", icon: Briefcase, link: "/dashboard/clients" },
      { name: "products", icon: Box, link: "/dashboard/products" },
      { name: "settings", icon: Settings, link: "/dashboard/settings" },
    ],
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navbtns.nav.map((item) => {
          const Icon = item.icon;

          // Exact match for dashboard, sub-route match for others (e.g. /dashboard/invoice/new stays active)
          const isActive =
            item.link === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.link);

          return (
            <Link key={item.name} href={item.link}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.name}
                  isActive={isActive} // shadcn component applies automatic active styling
                  className={
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" // Extra fallback styling to ensure it pops out
                      : ""
                  }
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="capitalize">{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
