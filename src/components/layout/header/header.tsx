import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 text-foreground bg-background border-b">
      <div className="container">
        <div className="max-w-screen-2xl mx-auto flex items-center h-[60px]">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">Julia's ecommerce</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
