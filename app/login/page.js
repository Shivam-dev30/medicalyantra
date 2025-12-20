"use client";

export default function Login() {
  return (
    <div className="container-hero mt-20 card-glass p-10 neon-outline">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="subtle mb-4">Demo login page. You can add authentication later.</p>
      
      <div className="mt-4">
        <input type="text" placeholder="Email" className="p-3 w-full rounded mb-3 bg-transparent border" />
        <input type="password" placeholder="Password" className="p-3 w-full rounded mb-6 bg-transparent border" />

        <button className="btn-accent w-full">Login</button>
      </div>
    </div>
  );
}

