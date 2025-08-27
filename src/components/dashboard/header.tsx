// src/components/dashboard/header.tsx
'use client';

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { Menu } from "lucide-react"; // We'll use Lucide for icons

// Import the same routes from the sidebar
const routes = [
  { label: 'Overview', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Orders', href: '/orders' },
  { label: 'Customers', href: '/customers' },
];

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background border-b p-4 md:p-6">
      <div className="flex justify-between items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 pt-12">
            <nav>
              <ul className="space-y-4">
                {routes.map((route) => (
                  <li key={route.href}>
                    <a
                      href={route.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {route.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div>User Menu (Coming Soon)</div>
      </div>
    </header>
  );
}