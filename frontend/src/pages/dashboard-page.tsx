import { useNavigate } from 'react-router-dom'
import { LogOut, User, Settings, Glasses } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function DashboardPage() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'User'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <main className="min-h-screen w-full bg-background">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-2">
            <Glasses className="h-6 w-6 text-white" />
            <p className="text-2xl font-bold italic tracking-tight text-white">VibeGlasses</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/70">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{username}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Welcome back, {username}!</h1>
          <p className="mt-2 text-white/50">You're now logged into VibeGlasses.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Glasses className="h-5 w-5" />
                Device Status
              </CardTitle>
              <CardDescription>Your connected VibeGlasses device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-white/70">Connected</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="h-5 w-5" />
                Configuration
              </CardTitle>
              <CardDescription>Manage your device settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Open Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">Username: {username}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-black hover:bg-white/90">
              Start Navigation
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              View Tutorial
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Get Support
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
