import PsychologicalTestForm from "@/app/(registered-user)/psychological-test/psychological-test-form";
import React from "react";

export default function PsychologicalTest() {
  return (
    <div className="min-h-screen p-8 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-muted-foreground">
          Làm bài trắc nghiệm PSS tâm lý miễn phí
        </h1>
        <p className="text-center mb-8 text-muted-foreground">
          Hiểu rõ stress, kiểm soát cuộc sống
        </p>

        <PsychologicalTestForm />
      </div>
    </div>
  );
}
