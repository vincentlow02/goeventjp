import { Card } from "@/components/ui/Card";

export const Features = () => {
  const features = [
    { title: "Design Tokens", description: "Manage colors and spacing from a single config file." },
    { title: "Type Safe", description: "TypeScript ensures your components never break silently." },
    { title: "App Router", description: "Leverage the latest React server components for speed." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  );
};
