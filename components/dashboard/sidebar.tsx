// src/components/dashboard/sidebar.tsx
export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
      <h2 className="text-xl font-semibold">VendorHub</h2>
      <nav className="mt-10">
        <ul className="space-y-2">
          <li>Overview</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Customers</li>
        </ul>
      </nav>
    </aside>
  );
}