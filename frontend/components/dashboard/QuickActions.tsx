"use client";

import { useRouter } from "next/navigation";

type QuickAction = {
  icon: string;
  title: string;
  description: string;
  path: string;
  color: string;
};

const quickActions: QuickAction[] = [
  {
    icon: "🤖",
    title: "Start AI Chat",
    description: "Ask ASTRA anything",
    path: "/chat",
    color: "#2563eb",
  },
  {
    icon: "📚",
    title: "Start Research",
    description: "Explore a new topic",
    path: "/research",
    color: "#7c3aed",
  },
  {
    icon: "💻",
    title: "Open Code Studio",
    description: "Start coding with AI",
    path: "/code",
    color: "#059669",
  },
  {
    icon: "📄",
    title: "Create Document",
    description: "Create a new document",
    path: "/documents",
    color: "#d97706",
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <section className="mb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start working with ASTRA AI
          </p>
        </div>

        <span className="hidden sm:block text-xs text-slate-400">
          4 available actions
        </span>

      </div>

      {/* =====================================================
          ACTION CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {quickActions.map((action) => (

          <button
            key={action.title}
            onClick={() => router.push(action.path)}
            className="
              group
              w-full
              text-left
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-5
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >

            {/* =================================================
                ICON
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-center
                w-12
                h-12
                mb-4
                text-2xl
                rounded-xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
              style={{
                background: `${action.color}12`,
              }}
            >
              {action.icon}
            </div>

            {/* =================================================
                TITLE + ARROW
            ================================================= */}

            <div className="flex items-center justify-between gap-3">

              <h3 className="font-semibold text-slate-900">
                {action.title}
              </h3>

              <span
                className="
                  flex-shrink-0
                  text-slate-300
                  transition-all
                  duration-200
                  group-hover:text-blue-600
                  group-hover:translate-x-1
                "
              >
                →
              </span>

            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="mt-1 text-sm text-slate-500">
              {action.description}
            </p>

            {/* =================================================
                OPEN MODULE
            ================================================= */}

            <div
              className="mt-4 text-xs font-medium"
              style={{
                color: action.color,
              }}
            >
              Open module →
            </div>

          </button>

        ))}

      </div>

    </section>
  );
}