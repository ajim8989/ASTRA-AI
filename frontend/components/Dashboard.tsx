type DashboardCardProps = {
  title: string;
  value: string;
  color: string;
};

export default function DashboardCard({
  title,
  value,
  color,
}: DashboardCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#666",
          fontSize: "15px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          fontSize: "36px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}