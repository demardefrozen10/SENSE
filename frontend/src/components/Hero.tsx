import { ArrowUpRight, Glasses, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useTheme, type ThemeMode } from '@/context/ThemeContext'
import csHubLogo from '@/assets/CS Hub (4).png'
import heroBackground from '@/assets/rb-hp-pday-sun-d.jpg'

type HeroProps = {
  onGetStarted: () => void
  onSignIn: () => void
}

export function Hero({ onGetStarted, onSignIn }: HeroProps) {
  const { theme, toggleTheme } = useTheme()

  const themeLabel: Record<ThemeMode, string> = {
    dark: 'Dark',
    light: 'Light',
    'high-contrast': 'High Contrast',
  }

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      <img
        src={heroBackground}
        alt=""
        role="presentation"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--bg-main) 30%, transparent) 0%, color-mix(in srgb, var(--bg-main) 60%, transparent) 40%, var(--bg-main) 100%)',
        }}
      />

      <header className="absolute inset-x-0 top-0 z-20" role="banner">
        <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-2">
            <Glasses className="h-7 w-7 text-foreground" aria-hidden="true" />
            <span className="sr-only">SENSE</span>
            <span aria-hidden="true" className="text-3xl font-bold italic tracking-tight text-foreground">
              S.E.N.S.E.
            </span>
          </div>

          <nav aria-label="Main navigation" className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 rounded-lg px-4 text-sm font-semibold sm:px-5 sm:text-base"
              onClick={toggleTheme}
              aria-label={`Theme: ${themeLabel[theme]}. Activate to switch theme.`}
              title="Switch theme"
            >
              {themeLabel[theme]}
            </Button>
            <Button
              variant="ghost"
              className="h-11 rounded-lg px-3 text-sm font-medium text-foreground sm:px-5 sm:text-base"
              onClick={onSignIn}
              aria-label="Sign in to your account"
            >
              Sign in
            </Button>
            <Button
              className="hero-cta-primary h-11 rounded-lg px-4 text-sm font-semibold sm:px-6 sm:text-base"
              onClick={onGetStarted}
              aria-label="Get started with SENSE"
            >
              Get started
            </Button>
          </nav>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-screen min-h-[100dvh] w-full max-w-5xl flex-col items-center justify-center px-6 pb-28 pt-36 text-center sm:px-10">
        <h1
          id="hero-heading"
          aria-label="SENSE"
          className="mt-12 max-w-4xl text-6xl font-bold leading-tight tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          <span aria-hidden="true">S.E.N.S.E.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Design and program smart glasses for your visually impaired loved ones.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          role="group"
          aria-label="Call to action buttons"
        >
          <Button
            size="lg"
            className="hero-cta-primary h-14 gap-2 rounded-xl px-9 text-lg font-semibold"
            onClick={onGetStarted}
            aria-label="Get started with SENSE - opens sign in dialog"
          >
            Get Started
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            asChild
            size="lg"
            className="hero-cta-secondary h-14 gap-2 rounded-xl px-9 text-lg font-semibold"
          >
            <Link to="/carousel" aria-label="Watch demo video of SENSE">
              <Play className="h-4 w-4" aria-hidden="true" />
              Watch Demo
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Powered By
          </p>
          <img
            src={csHubLogo}
            alt="CS Hub - powering SENSE"
            className="hero-brand-logo mt-2 h-auto w-24 object-contain"
          />
        </div>

        <div
          className="absolute bottom-8 left-1/2 w-[min(100%,44rem)] -translate-x-1/2 px-6"
          aria-label="Product features"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 px-6 py-3">
            <span className="text-sm font-medium text-muted-foreground">Open Source</span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Arduino Powered</span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">AI Enhanced</span>
          </div>
        </div>
      </div>
    </section>
  )
}
