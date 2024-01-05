'use client';
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
export default function Home() {

  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  React.useEffect(() => {
    window.location.href = "http://localhost:3001/new";
  }, [user]);
  return (
    <main>
      <a href="/api/auth/login" className="st">Login</a>
    </main>
  )
}
