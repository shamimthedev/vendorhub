// src/app/(dashboard)/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

// This is mock data. We will replace it with dynamic data later.
const stats = [
  { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month" },
  { title: "Total Orders", value: "+2350", description: "+180.1% from last month" },
  { title: "New Customers", value: "+12,234", description: "+19% from last month" },
  { title: "Active Now", value: "+573", description: "+201 since last hour" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Title and Action Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <Button>
          View Reports <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {/* You can add unique icons per card here later */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Recent Activity Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Card - Will take more space */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-80">Chart will go here (Recharts)</div>
          </CardContent>
        </Card>

        {/* Recent Sales Card */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* We will map through recent orders here */}
              <p className="text-center text-muted-foreground py-10">
                Recent orders will be listed here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}