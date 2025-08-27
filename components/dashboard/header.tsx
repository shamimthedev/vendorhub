// src/components/dashboard/header.tsx
export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>User Menu</div>
      </div>
    </header>
  );
}