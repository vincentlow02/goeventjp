import { Button } from "@/components/ui/Button";

export const Hero = () => {
  return (
    <section className="text-center mb-16">
      <h1 className="text-5xl font-extrabold text-brand-primary tracking-tight mb-6">
        Build with System Thinking
      </h1>
      <p className="text-xl text-brand-secondary max-w-2xl mx-auto mb-8">
        A foundation designed for scale, readability, and effortless iteration.
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="ghost" size="lg">Documentation</Button>
      </div>
    </section>
  );
};
