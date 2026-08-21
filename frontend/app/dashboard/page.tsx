"use client";

const stats = [
  {
    title: "AI Conversations",
    value: "124",
    description: "12 conversations this week",
    icon: "🤖",
  },
  {
    title: "Projects",
    value: "18",
    description: "4 active projects",
    icon: "📁",
  },
  {
    title: "Documents",
    value: "256",
    description: "18 added this week",
    icon: "📄",
  },
  {
    title: "Tasks",
    value: "12",
    description: "5 due today",
    icon: "✅",
  },
];

const activities = [
  {
    icon: "🤖",
    title: "AI Research Project",
    description: "Created a new research workspace",
    time: "10 minutes ago",
  },
  {
    icon: "📄",
    title: "Documents Uploaded",
    description: "4 documents were added",
    time: "1 hour ago",
  },
  {
    icon: "💻",
    title: "Code Studio",
    description: "Started a new coding session",
    time: "2 hours ago",
  },
  {
    icon: "✅",
    title: "Tasks Completed",
    description: "3 tasks marked as completed",
    time: "3 hours ago",
  },
];

const schedule = [
  {
    time: "10:00 AM",
    title: "Team Meeting",
    type: "Meeting",
  },
  {
    time: "12:30 PM",
    title: "AI Research",
    type: "Research",
  },
  {
    time: "03:00 PM",
    title: "Code Review",
    type: "Development",
  },
  {
    time: "06:00 PM",
    title: "Project Update",
    type: "Project",
  },
];

const quickActions = [
  {
    icon: "🤖",
    title: "Start AI Chat",
    description: "Ask ASTRA anything",
  },
  {
    icon: "📚",
    title: "Start Research",
    description: "Explore a new topic",
  },
  {
    icon: "💻",
    title: "Open Code Studio",
    description: "Start coding with AI",
  },
  {
    icon: "📄",
    title: "Create Document",
    description: "Create a new document",
  },
];

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "32px",
      }}
    >
      {/* Header */}
      <section
        style={{
          marginBottom: "30px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#2563eb",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          ASTRA AI WORKSPACE
        </p>

        <h1
          style={{
            margin: "8px 0",
            fontSize: "36px",
            color: "#111827",
          }}
        >
          Welcome back 👋
        </h1>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Manage your AI workspace, projects and daily productivity from one
          place.
        </p>
      </section>

      {/* Statistics */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "22px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "12px",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "21px",
                marginBottom: "15px",
              }}
            >
              {stat.icon}
            </div>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              {stat.title}
            </p>

            <h2
              style={{
                margin: "6px 0",
                fontSize: "30px",
                color: "#111827",
              }}
            >
              {stat.value}
            </h2>

            <p
              style={{
                margin: 0,
                color: "#10b981",
                fontSize: "13px",
              }}
            >
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section
        style={{
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            color: "#111827",
            marginBottom: "15px",
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {quickActions.map((action) => (
            <button
              key={action.title}
              style={{
                textAlign: "left",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  marginBottom: "10px",
                }}
              >
                {action.icon}
              </div>

              <strong
                style={{
                  display: "block",
                  color: "#111827",
                  fontSize: "15px",
                  marginBottom: "5px",
                }}
              >
                {action.title}
              </strong>

              <span
                style={{
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                {action.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Activity + Schedule */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* Recent Activity */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "20px",
              color: "#111827",
            }}
          >
            Recent Activity
          </h2>

          {activities.map((activity) => (
            <div
              key={activity.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "15px 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "19px",
                }}
              >
                {activity.icon}
              </div>

              <div style={{ flex: 1 }}>
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    fontSize: "14px",
                  }}
                >
                  {activity.title}
                </strong>

                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  {activity.description}
                </span>
              </div>

              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "12px",
                }}
              >
                {activity.time}
              </span>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "20px",
              color: "#111827",
            }}
          >
            Today's Schedule
          </h2>

          {schedule.map((event) => (
            <div
              key={event.time}
              style={{
                padding: "13px 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <span
                style={{
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {event.time}
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "4px",
                  color: "#111827",
                  fontSize: "14px",
                }}
              >
                {event.title}
              </strong>

              <span
                style={{
                  color: "#6b7280",
                  fontSize: "12px",
                }}
              >
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}