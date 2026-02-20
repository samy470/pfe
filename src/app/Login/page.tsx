'use client'
import Login from "@/components/login/Login";

export default function LoginPage() {
  return (
    <main>
      <Login onLogin={() => console.log("Logged in!")} />
    </main>
  );
}