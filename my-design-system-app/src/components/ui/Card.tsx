export const Card = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 rounded-xl border border-slate-200 bg-surface-lowest shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-xl font-bold text-brand-primary mb-2">{title}</h3>
    <p className="text-brand-secondary leading-relaxed">{description}</p>
  </div>
);
