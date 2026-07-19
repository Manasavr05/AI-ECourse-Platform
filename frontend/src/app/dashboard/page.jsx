"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Overview from "../../components/Overview";
import Modules from "../../components/Modules";
import Quiz from "../../components/Quiz";
import Progress from "../../components/Progress";
import History from "../../components/History";
import Certificate from "../../components/Certificate";
import AITutor from "../../components/AITutor";

export default function Dashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://ai-ecourse-backend.onrender.com/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json();

console.log("========== API RESPONSE ==========");
console.log(data);
console.log(JSON.stringify(data, null, 2));
console.log("==================================");

setResult(data);
setHistoryId(data.history_id);
setCompletedModules([]);

      
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div className="layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="content">
        <Header />

        {activeTab === "overview" && (
          <Overview
            file={file}
            setFile={setFile}
            uploadPDF={uploadPDF}
            loading={loading}
            result={result}
          />
        )}

        {activeTab === "modules" && (
          <Modules
            result={result}
            historyId={historyId}
            completedModules={completedModules}
            setCompletedModules={setCompletedModules}
          />
        )}

        {activeTab === "quiz" && (
          <Quiz result={result} />
        )}

        {activeTab === "progress" && (
          <Progress
            completed={completedModules.length}
            totalModules={
              result ? result.course.modules.length : 0
            }
          />
        )}

        {activeTab === "history" && (
          <History />
        )}

        {activeTab === "certificate" && (
          <Certificate
            completed={completedModules.length}
            totalModules={
  result?.course?.modules?.length || 0
}
            courseTitle={
              result?.course?.title || "AI Course"
            }
          />
        )}

        {activeTab === "aitutor" && (
          <AITutor />
        )}
      </div>
    </div>
  );
}