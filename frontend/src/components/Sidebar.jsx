"use client";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "overview", label: "📘 Overview" },
    { id: "modules", label: "📚 Modules" },
    { id: "quiz", label: "📝 Quiz" },
    { id: "progress", label: "📊 Progress" },
    { id: "certificate", label: "🏆 Certificate" },
     { id: "aitutor", label: "🤖 AI Tutor" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>🎓 AI E-Course</h2>
      </div>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${
              activeTab === item.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}