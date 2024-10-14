"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const questions = [
  {
    id: 1,
    text: "Trong một buổi tiệc, bạn sẽ:",
    options: [
      {
        value: "option1",
        label: "Thoải mái trò chuyện với tất cả mọi người, kể cả người lạ",
      },
      { value: "option2", label: "Chỉ tương tác với những người bạn quen" },
    ],
  },
  {
    id: 2,
    text: "Bạn thích làm gì trong thời gian rảnh?",
    options: [
      { value: "option3", label: "Đọc sách" },
      { value: "option4", label: "Đi dạo" },
    ],
  },
  {
    id: 3,
    text: "Bạn thường xem loại phim nào?",
    options: [
      { value: "option5", label: "Hành động" },
      { value: "option6", label: "Hài hước" },
    ],
  },
  {
    id: 4,
    text: "Bạn thích ăn món nào?",
    options: [
      { value: "option7", label: "Món chay" },
      { value: "option8", label: "Món mặn" },
    ],
  },
  {
    id: 5,
    text: "Bạn có thích đi du lịch không?",
    options: [
      { value: "option9", label: "Có, rất thích" },
      { value: "option10", label: "Không, tôi thích ở nhà" },
    ],
  },
  {
    id: 6,
    text: "Bạn thường thức dậy vào lúc mấy giờ?",
    options: [
      { value: "option11", label: "Sớm" },
      { value: "option12", label: "Muộn" },
    ],
  },
  {
    id: 7,
    text: "Bạn thích mùa nào trong năm?",
    options: [
      { value: "option13", label: "Mùa hè" },
      { value: "option14", label: "Mùa đông" },
    ],
  },
  {
    id: 8,
    text: "Bạn thích nghe thể loại nhạc nào?",
    options: [
      { value: "option15", label: "Nhạc pop" },
      { value: "option16", label: "Nhạc cổ điển" },
    ],
  },
  {
    id: 9,
    text: "Bạn thường tập thể dục bao lâu mỗi tuần?",
    options: [
      { value: "option17", label: "Nhiều" },
      { value: "option18", label: "Ít" },
    ],
  },
  {
    id: 10,
    text: "Bạn có thích nuôi thú cưng không?",
    options: [
      { value: "option19", label: "Có, rất thích" },
      { value: "option20", label: "Không, không thích" },
    ],
  },
];

export default function PsychologicalTestForm() {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const totalQuestions = questions.length;

  const handleOptionChange = (index: number, selectedValue: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questions[index].id]: selectedValue,
    }));

    // Scroll to the next question
    const nextQuestionRef = questionRefs.current[index + 1];
    if (nextQuestionRef) {
      const scrollOffset =
        nextQuestionRef.getBoundingClientRect().top + window.scrollY - 400;
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }

    // Update current question index
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const progressValue =
    (Object.keys(selectedOptions).length / totalQuestions) * 100;

  useEffect(() => {
    const handleScroll = () => {
      questionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
          if (isInView) {
            setCurrentQuestionIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10  p-4 shadow-md">
        <Progress
          value={progressValue}
          className="w-full bg-green-700 h-4 opacity-65"
        />
        <p className="text-right mt-2">{`${
          Object.keys(selectedOptions).length
        }/${totalQuestions}`}</p>
      </div>

      {questions.map((items, index) => (
        <div
          ref={(el) => {
            if (el) {
              questionRefs.current[index] = el;
            }
          }}
          key={items.id}
          className={`mb-5 ${
            currentQuestionIndex !== index ? "opacity-50" : "opacity-100"
          }`}
        >
          <Card key={items.id} className=" text-muted-foreground">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">{items.text}</h2>
              <RadioGroup
                className="gap-4 md:space-x-4 flex flex-col sm:flex-row items-center justify-center"
                onValueChange={(value) => handleOptionChange(index, value)}
              >
                {items.options.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center justify-between p-4 border border-gray-300 rounded-full cursor-pointer sm:w-auto w-full ${
                      selectedOptions[items.id] === option.value
                        ? "bg-green-700"
                        : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`question-${items.id}-${option.value}`}
                      dotColor="white"
                      className={`mr-4 border w-5 h-5 ${
                        selectedOptions[items.id] === option.value
                          ? "border-white"
                          : "border-gray-300"
                      }`}
                    />
                    <Label
                      htmlFor={`question-${items.id}-${option.value}`}
                      className={`w-full leading-5 ${
                        selectedOptions[items.id] === option.value
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
