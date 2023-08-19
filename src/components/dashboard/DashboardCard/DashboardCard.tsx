export default function DashboardCard({
  children,
  title,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-y-3 bg-white p-3 shadow ${className}`}>
      <p className="font-semibold">{title}</p>
      {children}
    </div>
  );
}
