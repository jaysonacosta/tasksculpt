import DashboardCard from "../DashboardCard";

export default function Overview() {
  let content;

  return (
    <DashboardCard title="Overview" className="lg:col-start-1 lg:col-end-3">
      {content}
    </DashboardCard>
  );
}
