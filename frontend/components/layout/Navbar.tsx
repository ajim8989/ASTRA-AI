"use client";

import { useState } from "react";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      style={{
        height: "72px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.96)",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          minWidth: "220px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "21px",
              fontWeight: "700",
              letterSpacing: "-0.4px",
            }}
          >
            Dashboard
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "3px",
              fontSize: "12px",
              color: "#9ca3af",
            }}
          >
            <span>ASTRA AI</span>
            <span>/</span>
            <span style={{ color: "#6b7280" }}>Overview</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: "480px",
          margin: "0 30px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9ca3af",
            fontSize: "17px",
          }}
        >
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search your workspace..."
          style={{
            width: "100%",
            height: "42px",
            boxSizing: "border-box",
            padding: "0 80px 0 42px",
            borderRadius: "11px",
            border: "1px solid #e5e7eb",
            background: "#f8fafc",
            color: "#111827",
            outline: "none",
            fontSize: "13px",
          }}
        />

        <span
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "3px 7px",
            borderRadius: "5px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            color: "#9ca3af",
            fontSize: "10px",
          }}
        >
          Ctrl K
        </span>
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* AI Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "7px 11px",
            borderRadius: "9px",
            background: "#f0fdf4",
            border: "1px solid #dcfce7",
            marginRight: "4px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />

          <span
            style={{
              color: "#15803d",
              fontSize: "11px",
              fontWeight: "600",
            }}
          >
            AI Online
          </span>
        </div>

        {/* Notification */}
        <button
          aria-label="Notifications"
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            background: "#ffffff",
            cursor: "pointer",
            fontSize: "17px",
            position: "relative",
          }}
        >
          ♢

          <span
            style={{
              position: "absolute",
              top: "7px",
              right: "7px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
        </button>

        {/* Theme */}
        <button
          aria-label="Theme"
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            background: "#ffffff",
            cursor: "pointer",
            fontSize: "17px",
          }}
        >
          ☼
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "30px",
            background: "#e5e7eb",
            margin: "0 4px",
          }}
        />

        {/* User */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #2563eb, #7c3aed)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              M
            </div>

            <div
              style={{
                textAlign: "left",
                display: "block",
              }}
            >
              <div
                style={{
                  color: "#111827",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Maruti
              </div>

              <div
                style={{
                  color: "#9ca3af",
                  fontSize: "10px",
                  marginTop: "2px",
                }}
              >
                AI Developer
              </div>
            </div>

            <span
              style={{
                color: "#9ca3af",
                fontSize: "11px",
                marginLeft: "3px",
              }}
            >
              ▾
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div
              style={{
                position: "absolute",
                top: "52px",
                right: 0,
                width: "220px",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "8px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  marginBottom: "5px",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    fontSize: "13px",
                  }}
                >
                  Maruti
                </strong>

                <span
                  style={{
                    color: "#9ca3af",
                    fontSize: "11px",
                  }}
                >
                  AI Developer
                </span>
              </div>

              <button
                style={dropdownButton}
                onClick={() => setShowProfile(false)}
              >
                👤 Profile
              </button>

              <button
                style={dropdownButton}
                onClick={() => setShowProfile(false)}
              >
                ⚙ Settings
              </button>

              <button
                style={{
                  ...dropdownButton,
                  color: "#ef4444",
                }}
                onClick={() => setShowProfile(false)}
              >
                ↪ Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const dropdownButton: React.CSSProperties = {
  width: "100%",
  border: "none",
  background: "transparent",
  textAlign: "left",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#374151",
  fontSize: "13px",
};