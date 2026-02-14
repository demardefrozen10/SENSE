import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const glassesStyles = [
  {
    title: 'Classic Round',
    description: 'Timeless frame for creative and casual looks.',
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Minimal Rectangle',
    description: 'Modern lines for everyday confidence and clarity.',
    image:
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Bold Statement',
    description: 'High-contrast acetate for standout style moments.',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Metal Edge',
    description: 'Lightweight premium metal built for all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=1400&q=80',
  },
]

export function CarouselPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-16 pt-10 sm:px-10">
      <div className="mb-8 space-y-3">
        <Badge variant="outline" className="w-fit border-white/20 text-sm text-white/70">
          Style Gallery
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Browse frame collections</h1>
        <p className="max-w-2xl text-muted-foreground">
          Slide through popular glasses styles and pick what fits your personality best.
        </p>
      </div>

      <div className="mx-auto w-full max-w-4xl px-12">
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {glassesStyles.map((style) => (
              <CarouselItem key={style.title} className="md:basis-1/2">
                <Card className="overflow-hidden border-white/10 bg-card">
                  <img
                    src={style.image}
                    alt={style.title}
                    className="h-64 w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{style.title}</CardTitle>
                    <CardDescription>{style.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">Virtual Try-On Ready</Badge>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  )
}
