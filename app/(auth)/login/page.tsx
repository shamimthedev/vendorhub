export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Log in to VendorHub</h1>
        <p className="text-center text-sm text-gray-600">
          Demo Login: Try <strong>admin@demo.com</strong> / <strong>password</strong>
        </p>
        {/* We will add the form here later with shadcn components */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@demo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign in
          </button>
        </div>
        <p className="text-center text-sm text-gray-600">
          This is a demo. Any credentials will work.
        </p>
      </div>
    </div>
  );
}