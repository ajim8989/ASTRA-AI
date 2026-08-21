export default function ChatSidebar() {
  const chats = [
    "New Chat",
    "AI Research",
    "Project Discussion",
    "Code Review",
    "Meeting Notes",
  ];

  return (
    <aside
      style={{
        width: "260px",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          marginBottom: "25px",
          fontWeight: "bold",
        }}
      >
        + New Chat
      </button>

      {chats.map((chat) => (
        <div
          key={chat}
          style={{
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            background: "#1f2937",
            cursor: "pointer",
          }}
        >
          {chat}
        </div>
      ))}
    </aside>
  );
}