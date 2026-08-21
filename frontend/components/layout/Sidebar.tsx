"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = {
  name: string;
  icon: string;
  path: string;
};

const mainMenu: MenuItem[] = [
  {
    name: "Dashboard",
    icon: "⌂",
    path: "/",
  },
  {
    name: "AI Chat",
    icon: "✦",
    path: "/chat",
  },
  {
    name: "Research",
    icon: "◉",
    path: "/research",
  },
  {
    name: "Code Studio",
    icon: "⌘",
    path: "/code",
  },
  {
    name: "AI Studio",
    icon: "◇",
    path: "/ai-studio",
  },
];

const workspaceMenu: MenuItem[] = [
  {
    name: "Documents",
    icon: "▤",
    path: "/documents",
  },
  {
    name: "Projects",
    icon: "▣",
    path: "/projects",
  },
  {
    name: "Calendar",
    icon: "□",
    path: "/calendar",
  },
  {
    name: "Tasks",
    icon: "✓",
    path: "/tasks",
  },
];

const collaborationMenu: MenuItem[] = [
  {
    name: "Notifications",
    icon: "♢",
    path: "/notifications",
  },
  {
    name: "Team Workspace",
    icon: "♧",
    path: "/team",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const renderMenu = (items: MenuItem[]) => {
    return items.map((item) => {
      const isActive =
        pathname === item.path ||
        (item.path !== "/" && pathname.startsWith(item.path));

      return (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className="w-full flex items-center gap-3 px-3 py-2.5 mb-1 rounded-[10px] text-left transition-all duration-200"
          style={{
            background: isActive
              ? "rgba(59, 130, 246, 0.18)"
              : "transparent",
            color: isActive ? "#60a5fa" : "#cbd5e1",
            fontSize: "14px",
            fontWeight: isActive ? 600 : 400,
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = "#1f2937";
              e.currentTarget.style.color = "#ffffff";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#cbd5e1";
            }
          }}
        >
          <span
            style={{
              width: "22px",
              display: "flex",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            {item.icon}
          </span>

          <span className="flex-1">
            {item.name}
          </span>

          {item.name === "Notifications" && (
            <span
              style={{
                minWidth: "20px",
                height: "20px",
                borderRadius: "10px",
                background: "#ef4444",
                color: "#ffffff",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
          )}
        </button>
      );
    });
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex lg:hidden items-center justify-center w-11 h-11 rounded-xl bg-slate-900 text-white shadow-lg"
        aria-label="Open navigation"
      >
        ☰
      </button>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          w-[260px]
          h-screen
          bg-[#0f172a]
          text-white
          flex flex-col
          flex-shrink-0
          border-r border-[#1e293b]
          transition-transform duration-300
          ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <div
          style={{
            padding: "22px 20px 18px",
            borderBottom: "1px solid #1e293b",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
            }}
          >

            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "11px",
                background:
                  "linear-gradient(135deg, #2563eb, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              A
            </div>

            <div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "19px",
                  fontWeight: "700",
                  letterSpacing: "-0.3px",
                }}
              >
                ASTRA AI
              </h1>

              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                AI Workspace
              </p>

            </div>

            {/* Mobile Close Button */}

            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto flex lg:hidden items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              ✕
            </button>

          </div>

        </div>

        {/* =================================================
            NEW CHAT
        ================================================= */}

        <div
          style={{
            padding: "18px 15px 8px",
          }}
        >

          <button
            onClick={() => navigate("/chat")}
            style={{
              width: "100%",
              height: "42px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow:
                "0 4px 12px rgba(37, 99, 235, 0.25)",
            }}
          >
            <span style={{ fontSize: "19px" }}>
              +
            </span>

            New Chat
          </button>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "8px 15px",
          }}
        >

          {/* MAIN */}

          <p
            style={{
              margin: "12px 8px 8px",
              color: "#64748b",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Main
          </p>

          {renderMenu(mainMenu)}

          {/* WORKSPACE */}

          <p
            style={{
              margin: "22px 8px 8px",
              color: "#64748b",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Workspace
          </p>

          {renderMenu(workspaceMenu)}

          {/* COLLABORATION */}

          <p
            style={{
              margin: "22px 8px 8px",
              color: "#64748b",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Collaboration
          </p>

          {renderMenu(collaborationMenu)}

          {/* SYSTEM */}

          <p
            style={{
              margin: "22px 8px 8px",
              color: "#64748b",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            System
          </p>

          <button
            onClick={() => navigate("/settings")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 13px",
              borderRadius: "10px",
              border: "none",
              background:
                pathname === "/settings"
                  ? "rgba(59, 130, 246, 0.18)"
                  : "transparent",
              color:
                pathname === "/settings"
                  ? "#60a5fa"
                  : "#cbd5e1",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "14px",
            }}
          >
            <span
              style={{
                width: "22px",
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              ⚙
            </span>

            Settings
          </button>

        </div>

        {/* =================================================
            USER PROFILE
        ================================================= */}

        <div
          style={{
            borderTop: "1px solid #1e293b",
            padding: "15px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: "8px",
              borderRadius: "10px",
            }}
          >

            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              M
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >

              <p
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Maruti
              </p>

              <p
                style={{
                  margin: "3px 0 0",
                  color: "#64748b",
                  fontSize: "11px",
                }}
              >
                AI Developer
              </p>

            </div>

            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ⋯
            </button>

          </div>

        </div>

      </aside>
    </>
  );
}