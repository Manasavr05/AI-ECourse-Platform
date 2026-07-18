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
    <aside
      className="sidebar"
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1E3A8A, #2563EB)",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
            🎓 AI E-Course
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#DCE7FF",
            }}
          >
            Learn Smarter with AI
          </p>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: "14px 18px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "16px",
                fontWeight: "600",
                transition: "0.3s",
                background:
                  activeTab === item.id
                    ? "#ffffff"
                    : "rgba(255,255,255,0.15)",
                color:
                  activeTab === item.id
                    ? "#1E3A8A"
                    : "white",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "13px",
          color: "#DCE7FF",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: "20px",
        }}
      >
        <p>AI PDF to E-Course Platform</p>
        <p>Version 1.0</p>
      </div>
    </aside>
  );
}