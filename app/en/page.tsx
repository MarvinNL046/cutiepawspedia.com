import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          Your Ultimate Pet Directory
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-cpDark sm:text-5xl md:text-6xl">
          Welcome to{" "}
          <span className="text-cpPink">CutiePawsPedia</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Discover everything about pets. The comprehensive pet directory for pet lovers worldwide.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" className="bg-cpPink hover:bg-cpPink/90">
            Explore Directory
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-cpDark">
            Everything You Need
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-cpAqua">Pet Breeds</CardTitle>
                <CardDescription>
                  Comprehensive information about dog, cat, and other pet breeds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore detailed profiles, characteristics, and care guides for hundreds of breeds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-cpYellow">Care Guides</CardTitle>
                <CardDescription>
                  Expert tips for keeping your pets healthy and happy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From nutrition to grooming, find everything you need to care for your furry friends.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-cpPink">Community</CardTitle>
                <CardDescription>
                  Connect with fellow pet enthusiasts worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share stories, ask questions, and learn from our passionate pet-loving community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
