"use client";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Overview from "../components/Overview";
import Modules from "../components/Modules";
import Quiz from "../components/Quiz";
import Progress from "../components/Progress";
import Certificate from "../components/Certificate";
import AITutor from "../components/AITutor";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [completedModules, setCompletedModules] = useState([]);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResult(data);
      setCompletedModules([]);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="main-content">
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

        {activeTab === "certificate" && (
          <Certificate
            completed={completedModules.length}
            totalModules={
              result ? result.course.modules.length : 0
            }
            courseTitle={
              result ? result.course.title : "AI Course"
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