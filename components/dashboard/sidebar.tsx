// src/components/dashboard/sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: 'Overview',
    href: '/',
    icon: '📊', // You can replace with an icon library later (e.g., Lucide)
  },
  {
    label: 'Products',
    href: '/products',
    icon: '📦',
  },
  {
    label: 'Orders',
    href: '/orders',
    icon: '📝',
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: '👥',
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r p-6 hidden md:block">
      <h2 className="text-xl font-semibold tracking-tight mb-10">VendorHub</h2>
      <nav>
        <ul className="space-y-2">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <span>{route.icon}</span>
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}