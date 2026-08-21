"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setError(
        "Please enter username and password."
      );
      return;
    }

    setLoading(true);

    try {
      console.log(
        "Sending login request:",
        {
          username: cleanUsername,
        }
      );

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username: cleanUsername,
            password: password,
          }),
        }
      );

      // Read response as text first.
      // This prevents JSON parsing errors if
      // Spring sends a plain-text error.

      const responseText =
        await response.text();

      console.log(
        "Java response:",
        responseText
      );

      let data: any = {};

      try {
        data =
          JSON.parse(responseText);
      } catch {
        data = {
          message: responseText,
        };
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Invalid username or password."
        );
      }

      // ===================================================
      // SAVE USER
      // ===================================================

      const loggedInUser = {
        id: data.id,
        username: data.username,
        displayName:
          data.displayName,
      };

      console.log(
        "Logged-in user:",
        loggedInUser
      );

      localStorage.setItem(
        "astra_user",
        JSON.stringify(
          loggedInUser
        )
      );

      // ===================================================
      // REDIRECT
      // ===================================================

      router.push("/chat");

    } catch (error) {
      console.error(
        "Frontend login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Login failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg,#f8fafc,#e2e8f0)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "18px",
          padding: "35px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.12)",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              margin:
                "0 auto 12px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "white",
              fontSize: "25px",
              fontWeight: "800",
            }}
          >
            A
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            Welcome to ASTRA AI
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Sign in to your AI workspace
          </p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 14px",
              borderRadius: "8px",
              background: "#fef2f2",
              border:
                "1px solid #fecaca",
              color: "#dc2626",
              fontSize: "13px",
            }}
          >
            ❌ {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
        >

          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              placeholder="Enter username"
              autoComplete="username"
              disabled={loading}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding:
                  "12px 14px",
                borderRadius: "9px",
                border:
                  "1px solid #cbd5e1",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "22px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              autoComplete="current-password"
              disabled={loading}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding:
                  "12px 14px",
                borderRadius: "9px",
                border:
                  "1px solid #cbd5e1",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "9px",
              background: loading
                ? "#93c5fd"
                : "#2563eb",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/register"
              )
            }
            style={{
              border: "none",
              background: "none",
              color: "#2563eb",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Create account
          </button>
        </div>

      </div>
    </main>
  );
}