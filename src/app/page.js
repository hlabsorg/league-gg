import { Hero } from "@/components/Hero";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Welcome to League GG</h1>
        <p className="text-lg text-muted-foreground">
          Your one-stop destination for League of Legends statistics and analysis
        </p>
      </main>
    </div>
  );
}
