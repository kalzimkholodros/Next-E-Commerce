'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AppBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      // Bakiyeyi getir
      fetch('http://localhost:3001/api/balance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setBalance(data.balance))
        .catch(console.error);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-white text-lg font-semibold ${pathname === '/' ? 'text-blue-400' : 'hover:text-gray-300'}`}
        >
          Next.js App
        </Link>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-white">Balance: ${balance}</span>
              <Link 
                href="/favorites" 
                className={`text-white ${pathname === '/favorites' ? 'text-blue-400' : 'hover:text-gray-300'}`}
              >
                Favorites
              </Link>
              <Link 
                href="/cart" 
                className={`text-white ${pathname === '/cart' ? 'text-blue-400' : 'hover:text-gray-300'}`}
              >
                Cart
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`text-white ${pathname === '/login' ? 'text-blue-400' : 'hover:text-gray-300'}`}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className={`text-white ${pathname === '/signup' ? 'text-blue-400' : 'hover:text-gray-300'}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBar; 