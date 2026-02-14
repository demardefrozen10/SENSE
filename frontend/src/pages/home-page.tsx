import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Play, X, Glasses, ArrowRight, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import heroBackground from '@/assets/rb-hp-pday-sun-d.jpg'
import csHubLogo from '@/assets/CS Hub (4).png'

export function HomePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Login failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('username', username)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full">
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] w-full overflow-hidden">
        <img
          src={heroBackground}
          alt="Close-up of eyeglasses frame"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />

        <div className="absolute left-0 right-0 top-0 z-20">
          <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
            <div className="flex items-center gap-2">
              <Glasses className="h-7 w-7 text-white" />
              <p className="text-3xl font-bold italic tracking-tight text-white">VibeGlasses</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="h-10 px-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="h-9 rounded-md bg-white px-5 text-sm font-semibold text-black hover:bg-white/90"
                onClick={() => setShowLogin(true)}
              >
                Get started
              </Button>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-5xl flex-col items-center justify-center px-6 pb-16 pt-32 text-center sm:px-10">
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl mt-12">
            VibeGlasses
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Design & program smart glasses for your visually impaired loved ones.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-black hover:bg-white/90"
              onClick={() => setShowLogin(true)}
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 gap-2 rounded-lg border-white/20 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Link to="/carousel">
                <Play className="h-3.5 w-3.5" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Powered By */}
          <div className="mt-10 flex flex-col items-center">
            <p className="text-l uppercase tracking-widest text-white/40 mb-5">Powered By</p>
            <img
              src={csHubLogo}
              alt="CS Hub"
              className="mt-2 h-auto w-20 object-contain"
            />
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-4 text-xs text-white/40 sm:text-sm">
            <span>Open source</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Arduino powered</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>AI-enhanced</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
        <Separator className="mb-14 bg-white/10" />

        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Designed around real accessibility needs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Echo-Sight targets micro-navigation—finding a chair, sensing a half-open door, or detecting a step—using a lightweight wearable hardware stack.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="border-white/10 bg-card">
            <CardHeader>
              <CardTitle className="text-white">Spatial Feedback</CardTitle>
              <CardDescription>
                Camera input is processed and converted into directional haptic cues and spatial audio.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Users sense distance and orientation without needing to rely on visual focus.
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card">
            <CardHeader>
              <CardTitle className="text-white">Hardware Stack</CardTitle>
              <CardDescription>
                Arduino, servo and DC motors, accelerometer, IR and ultrasonic sensors, camera, and flashlight.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Compact enough for a glasses clip or wearable chassis attachment.
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card">
            <CardHeader>
              <CardTitle className="text-white">Real Impact</CardTitle>
              <CardDescription>
                Bridges the gap between macro wayfinding and close-range obstacle awareness.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Increases confidence and independence for visually impaired users in everyday spaces.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Login Modal ── */}
      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="relative w-full max-w-xs rounded-2xl border border-white/10 bg-background px-6 pb-6 pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-5 top-5 text-white/50 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white">
              <Glasses className="h-8 w-8 text-black" />
            </div>

            {/* Header */}
            <h2 className="mb-1 text-center text-2xl font-bold text-white">Welcome back!</h2>
            <p className="mb-6 text-center text-sm text-white/50">Please sign in to continue.</p>

            {/* Error Message */}
            {error && (
              <p className="mb-4 text-center text-sm text-red-400">{error}</p>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-lg border-white/10 bg-white/5 px-4"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-lg border-white/10 bg-white/5 px-4"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full gap-2 rounded-lg bg-white text-base font-semibold text-black hover:bg-white/90 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-white/40">
              Beta access only. Contact us to get access.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
