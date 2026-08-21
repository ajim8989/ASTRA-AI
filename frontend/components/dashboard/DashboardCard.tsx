"use client";

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  change: string;
  icon: string;
  trend: "up" | "down";
  accent: string;
};

export default function DashboardCard({
  title,
  value,
  description,
  change,
  icon,
  trend,
  accent,
}: DashboardCardProps) {
  return (
    <div
      style={{
        position: "relative",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "22px",
        minHeight: "170px",
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "4px",
          height: "100%",
          background: accent,
        }}
      />

      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            background: `${accent}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "21px",
          }}
        >
          {icon}
        </div>

        {/* Menu */}
        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ⋯
        </button>
      </div>

      {/* Title */}
      <p
        style={{
          margin: "18px 0 5px",
          color: "#6b7280",
          fontSize: "13px",
          fontWeight: "500",
        }}
      >
        {title}
      </p>

      {/* Value */}
      <h2
        style={{
          margin: 0,
          color: "#111827",
          fontSize: "32px",
          lineHeight: 1.2,
          letterSpacing: "-0.7px",
        }}
      >
        {value}
      </h2>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            color: trend === "up" ? "#16a34a" : "#dc2626",
            background:
              trend === "up" ? "#f0fdf4" : "#fef2f2",
            padding: "3px 7px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          {trend === "up" ? "↑" : "↓"} {change}
        </span>

        <span
          style={{
            color: "#9ca3af",
            fontSize: "11px",
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
}