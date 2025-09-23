
"use client"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import FirebaseIcon from '../../icons/firebase'
import HamburgerButton from './hamburger-button'
import CartIcon from './cart-icon'
import { useEffect, useState } from 'react'

type Props = {
  navigation: { label: string; href: string }[];
  initialDarkMode: boolean;
};
export default function Header({ navigation, initialDarkMode }: Props) {
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className={`sticky top-0 z-40 text-foreground bg-background border-b${darkMode ? ' dark' : ''}`}>
      <div className="container relative">
        <div className="max-w-screen-2xl mx-auto flex gap-10 items-center h-[60px]">
          <HamburgerButton />
          {/* Dark mode toggle button */}
          <button
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors mr-2"
            style={{ fontSize: '1.5rem' }}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          <Link
            href="/"
            className="flex items-center gap-1 max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 z-50"
          >
            <FirebaseIcon className="size-8 shrink-0" />
            <span className="text-2xl font-bold whitespace-nowrap mt-1">Julia's ecommerce</span>
          </Link>
          {/* Navigation and other header content */}
          <nav className={cn('w-full max-lg:mobile-nav-menu lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center lg:mx-auto')}>
            <ul className="flex max-lg:flex-col gap-3 lg:gap-1">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="max-lg:block max-lg:w-full max-lg:text-lg lg:px-3 py-1.5 rounded-full lg:bg-gray-200 lg:hover:bg-gray-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-2 items-center max-lg:ml-auto z-50">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
