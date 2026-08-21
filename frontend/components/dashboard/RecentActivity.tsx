"use client";

type Activity = {
  icon: string;
  title: string;
  description: string;
  time: string;
  category: string;
};

const activities: Activity[] = [
  {
    icon: "🤖",
    title: "AI Research Project",
    description: "Created a new research workspace",
    time: "10 minutes ago",
    category: "AI",
  },
  {
    icon: "📄",
    title: "Documents Uploaded",
    description: "4 documents were added to your workspace",
    time: "1 hour ago",
    category: "Documents",
  },
  {
    icon: "💻",
    title: "Code Studio",
    description: "Started a new coding session",
    time: "2 hours ago",
    category: "Development",
  },
  {
    icon: "✅",
    title: "Tasks Completed",
    description: "3 tasks were marked as completed",
    time: "3 hours ago",
    category: "Tasks",
  },
  {
    icon: "📚",
    title: "Research Updated",
    description: "Added notes to AI research workspace",
    time: "5 hours ago",
    category: "Research",
  },
];

export default function RecentActivity() {
  return (
    <section className="p-6 bg-white border border-slate-200 rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity across your workspace
          </p>
        </div>

        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
        </button>

      </div>

      {/* Activity List */}
      <div>

        {activities.map((activity, index) => (

          <div
            key={`${activity.title}-${index}`}
            className={`flex items-center gap-4 py-4 transition-all hover:bg-slate-50 rounded-xl px-2 ${
              index !== activities.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >

            {/* Icon */}
            <div
              className="flex items-center justify-center flex-shrink-0 w-11 h-11 text-lg rounded-xl bg-slate-100"
            >
              {activity.icon}
            </div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">

              <div className="flex items-center gap-2">

                <h3 className="text-sm font-semibold text-slate-900">
                  {activity.title}
                </h3>

                <span
                  className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-slate-100 rounded-md"
                >
                  {activity.category}
                </span>

              </div>

              <p className="mt-1 text-xs text-slate-500 truncate">
                {activity.description}
              </p>

            </div>

            {/* Time */}
            <span className="hidden flex-shrink-0 text-xs text-slate-400 sm:block">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

      {/* Footer */}
      <div className="pt-4 mt-2 text-center border-t border-slate-100">

        <button
          className="text-xs font-medium text-slate-500 hover:text-blue-600"
        >
          View complete activity history →
        </button>

      </div>

    </section>
  );
}