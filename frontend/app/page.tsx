import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { dashboardStats } from "@/lib/dashboard-data";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN APPLICATION
      ===================================================== */}

      <div className="flex-1 min-w-0">

        {/* ===================================================
            TOP NAVBAR
        =================================================== */}

        <Navbar />

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <main className="min-h-[calc(100vh-72px)] bg-slate-100 p-4 sm:p-6 lg:p-8">

          {/* =================================================
              WELCOME
          ================================================= */}

          <section className="mb-6 sm:mb-8">

            <p className="text-xs sm:text-sm font-semibold text-blue-600">
              ASTRA AI WORKSPACE
            </p>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Welcome back 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-500">
              Manage your AI workspace, projects and daily productivity
              from one place.
            </p>

          </section>

          {/* =================================================
              STEP 5 — DASHBOARD STATISTICS
          ================================================= */}

          <section className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:mb-8">

            {dashboardStats.map((stat) => (
              <DashboardCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                change={stat.change}
                trend={stat.trend}
                icon={stat.icon}
                accent={stat.accent}
              />
            ))}

          </section>

          {/* =================================================
              STEP 9 — QUICK ACTIONS
          ================================================= */}

          <QuickActions />

          {/* =================================================
              STEP 6 — ANALYTICS
          ================================================= */}

          <AnalyticsSection />

          {/* =================================================
              STEP 7 — CALENDAR
          ================================================= */}

          <CalendarWidget />

          {/* =================================================
              STEP 8 — RECENT ACTIVITY
          ================================================= */}

          <div className="mb-6 sm:mb-8">
            <RecentActivity />
          </div>

          {/* =================================================
              QUICK INSIGHTS
          ================================================= */}

          <section className="mb-6 sm:mb-8">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">

              {/* AI INSIGHT */}

              <div className="p-5 sm:p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white">

                <div className="flex items-center justify-between">

                  <span className="text-2xl">
                    🤖
                  </span>

                  <span className="px-2 py-1 text-xs rounded-lg bg-white/10">
                    AI Insight
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Your AI usage is growing
                </h3>

                <p className="mt-2 text-sm text-blue-100">
                  You have increased your AI workspace activity
                  by 18.4% compared with last month.
                </p>

              </div>

              {/* PRODUCTIVITY */}

              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl">

                <div className="flex items-center justify-between">

                  <span className="text-2xl">
                    ⚡
                  </span>

                  <span className="text-xs font-semibold text-green-600">
                    +12.5%
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Productivity Score
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Your current workspace productivity is above
                  your previous average.
                </p>

              </div>

              {/* WORKSPACE HEALTH */}

              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl">

                <div className="flex items-center justify-between">

                  <span className="text-2xl">
                    📊
                  </span>

                  <span className="text-xs font-semibold text-blue-600">
                    70%
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Workspace Health
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Your projects, documents and tasks are
                  actively being managed.
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="pt-5 pb-4 text-center sm:pt-6">

            <p className="text-xs text-slate-400">
              ASTRA AI • Intelligent Workspace Platform
            </p>

            <p className="mt-1 text-xs text-slate-300">
              AI-powered productivity workspace
            </p>

          </footer>

        </main>
      </div>
    </div>
  );
}