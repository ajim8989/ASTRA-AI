"use client";

export default function Navbar() {
  return (
    <header
      style={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#111827",
          }}
        >
          Dashboard
        </h2>

        <span
          style={{
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          Welcome back to ASTRA AI
        </span>
      </div>

      {/* Center */}
      <div
        style={{
          width: "420px",
        }}
      >
        <input
          placeholder="Search anything..."
          style={{
            width: "100%",
            padding: "12px 18px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button
          style={buttonStyle}
        >
          🔔
        </button>

        <button
          style={buttonStyle}
        >
          ⚙️
        </button>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          M
        </div>
      </div>
    </header>
  );
}

const buttonStyle: React.CSSProperties = {
  width: "42px",
  height: "42px",
  border: "none",
  borderRadius: "10px",
  background: "#f3f4f6",
  cursor: "pointer",
  fontSize: "18px",
};