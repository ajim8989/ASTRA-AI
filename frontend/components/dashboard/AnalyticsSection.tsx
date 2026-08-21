"use client";

const weeklyData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 47 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 64 },
  { day: "Sat", value: 38 },
  { day: "Sun", value: 51 },
];

const productivityData = [
  { label: "AI Chat", value: 78, icon: "🤖" },
  { label: "Research", value: 64, icon: "📚" },
  { label: "Coding", value: 86, icon: "💻" },
  { label: "Documents", value: 52, icon: "📄" },
];

export default function AnalyticsSection() {
  const maxValue = Math.max(...weeklyData.map((item) => item.value));

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Analytics Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Understand how you use your ASTRA AI workspace
          </p>
        </div>

        <select
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none"
          defaultValue="7"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
        {/* Weekly Activity */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Workspace Activity
              </p>

              <div className="flex items-end gap-3 mt-2">
                <h3 className="text-3xl font-bold text-slate-900">
                  372
                </h3>

                <span className="mb-1 text-xs font-semibold text-green-600">
                  ↑ 18.4%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-11 h-11 text-lg rounded-xl bg-blue-50">
              📈
            </div>
          </div>

          {/* Chart */}
          <div
            style={{
              height: "230px",
              display: "flex",
              alignItems: "flex-end",
              gap: "14px",
              paddingTop: "20px",
            }}
          >
            {weeklyData.map((item) => {
              const height = (item.value / maxValue) * 170;

              return (
                <div
                  key={item.day}
                  style={{
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    title={`${item.value} activities`}
                    style={{
                      width: "100%",
                      maxWidth: "42px",
                      height: `${height}px`,
                      borderRadius: "8px 8px 4px 4px",
                      background:
                        "linear-gradient(180deg, #3b82f6, #60a5fa)",
                      transition: "height 0.3s ease",
                    }}
                  />

                  <span className="text-xs text-slate-400">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Productivity */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
          <div className="mb-5">
            <p className="text-sm font-medium text-slate-500">
              Productivity
            </p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              70%
            </h3>
          </div>

          <div className="space-y-5">
            {productivityData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>

                    <span className="text-sm text-slate-700">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500">
                    {item.value}%
                  </span>
                </div>

                <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    style={{
                      width: `${item.value}%`,
                      height: "100%",
                      borderRadius: "999px",
                      background: "#2563eb",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}