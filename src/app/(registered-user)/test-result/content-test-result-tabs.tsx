"use client";

import Advice from "@/components/test-result/advice";
import DialogRecommendGroup from "@/components/test-result/dialog-recommend-group";
import Impact from "@/components/test-result/impact";
import Reason from "@/components/test-result/reason";
import Solution from "@/components/test-result/solution";
import Symptom from "@/components/test-result/symptom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users as UserIcon, ChevronsRight } from "lucide-react";
import React, { useState } from "react";

export default function ContentTestResultTabs() {
  const [activeSection, setActiveSection] = useState("reason");

  const renderContent = () => {
    switch (activeSection) {
      case "reason":
        return <Reason />;
      case "symptom":
        return <Symptom />;
      case "impact":
        return <Impact />;
      case "solution":
        return <Solution />;
      case "advice":
        return <Advice />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="w-full hidden p-4 sticky top-0 md:w-1/4 md:block">
        <div className="border border-muted-foreground p-2 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-4">
            Tìm hiểu về Acute Stress
          </h2>
          <nav>
            <ul className="space-y-2">
              <li
                onClick={() => setActiveSection("reason")}
                className={`cursor-pointer ${
                  activeSection === "reason"
                    ? "text-green-600 font-medium"
                    : "hover:translate-x-4 hover:scale-110 transition ease-in-out delay-150 duration-300"
                }`}
              >
                Nguyên nhân
              </li>
              <li
                onClick={() => setActiveSection("symptom")}
                className={`cursor-pointer ${
                  activeSection === "symptom"
                    ? "text-green-600 font-medium"
                    : "hover:translate-x-4 hover:scale-110 transition ease-in-out delay-150 duration-300"
                }`}
              >
                Triệu chứng
              </li>
              <li
                onClick={() => setActiveSection("impact")}
                className={`cursor-pointer ${
                  activeSection === "impact"
                    ? "text-green-600 font-medium"
                    : "hover:translate-x-4 hover:scale-110 transition ease-in-out delay-150 duration-300"
                }`}
              >
                Tác động ngắn hạn và dài hạn
              </li>
              <li
                onClick={() => setActiveSection("solution")}
                className={`cursor-pointer ${
                  activeSection === "solution"
                    ? "text-green-600 font-medium"
                    : "hover:translate-x-4 hover:scale-110 transition ease-in-out delay-150 duration-300"
                }`}
              >
                Một số biện pháp để có thể cải thiện tình trạng
              </li>
              <li
                onClick={() => setActiveSection("advice")}
                className={`cursor-pointer ${
                  activeSection === "advice"
                    ? "text-green-600 font-medium"
                    : "hover:translate-x-4 hover:scale-110 transition ease-in-out delay-150 duration-300"
                }`}
              >
                Lời khuyên
              </li>
            </ul>
          </nav>
        </div>
        <DialogRecommendGroup />
      </div>
      {/* Nội dung bên phải */}
      <div className="md:w-3/4 p-4">
        <ScrollArea className="h-[400px] px-4 md:block hidden">
          {renderContent()}
        </ScrollArea>
        <div className=" md:hidden">
          <div>
            <Reason />
            <Symptom />
            <Impact />
            <Solution />
            <Advice />
          </div>
        </div>
      </div>
    </div>
  );
}
