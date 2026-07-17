"use client";

import UploadCard from "./UploadCard";
import CourseDetails from "./CourseDetails";

export default function Overview({
  file,
  setFile,
  uploadPDF,
  loading,
  result,
}) {
  return (
    <>
      <UploadCard
        file={file}
        setFile={setFile}
        uploadPDF={uploadPDF}
        loading={loading}
      />

      <CourseDetails result={result} />
    </>
  );
}