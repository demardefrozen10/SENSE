import { Link, NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/carousel', label: 'Styles' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Echo-Sight
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button key={item.to} asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'font-medium text-white' : ''
                  }
                >
                  {item.label}
                </NavLink>
              </Button>
            ))}
          </nav>

          <Button size="sm" variant="outline" className="gap-1.5 rounded-full border-white/25 bg-transparent text-sm text-white hover:bg-white hover:text-black">
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
