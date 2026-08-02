import {
  Box,
  Briefcase,
  GitPullRequestDraft,
  LayoutDashboardIcon,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import { Field } from "./ui/field";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";

export default function navSidebar() {
  const navbtns = {
    nav: [
      { name: "dashboard", icon: LayoutDashboardIcon, link: "/dashboard" },
      {
        name: "invoice",
        icon: GitPullRequestDraft,
        link: "/dashboard/invoice",
      },
      { name: "employees", icon: Users, link: "/dashboard/employees" },
      { name: "clients", icon: Briefcase, link: "/dashboard/clients" },
      { name: "products", icon: Box, link: "/dashboard/products" },
      { name: "settings", icon: Settings, link: "/dashboard/settings" },
      {},
    ],
  };
  return (
    <div>
      <SidebarGroup>
        <SidebarMenu>
          {navbtns.nav.map((item) => (
            <Link href={item.link}>
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton tooltip={item.name}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
