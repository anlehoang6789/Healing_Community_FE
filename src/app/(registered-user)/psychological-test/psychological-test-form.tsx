"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { useGetDass21QuizQuery } from "@/queries/useQuizz";
import { useSubmitDass21QuizMutation } from "@/queries/useQuizz";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { SubmitQuizScoreType } from "@/schemaValidations/quizz.schema";

export default function PsychologicalTestForm() {
  const router = useRouter();
  const { data: quizData, isLoading } = useGetDass21QuizQuery();

  const submitQuizMutation = useSubmitDass21QuizMutation({
    onSuccess: (data) => {
      // Hiển thị thông báo thành công
      toast({
        description: data.message || "Nộp bài kiểm tra thành công!",
        variant: "success",
      });

      // Lưu kết quả vào localStorage để trang kết quả có thể truy cập
      localStorage.setItem("quizResult", JSON.stringify(data));

      // Điều hướng đến trang kết quả
      router.push("/test-result");
    },
    onError: (error: any) => {
      handleErrorApi({
        error,
      });
    },
  });

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, number>
  >({});
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  if (isLoading) {
    return <div>Đang tải câu hỏi...</div>;
  }

  const questions =
    quizData?.data.dass21Categories.flatMap((category) =>
      category.questions.map((question, index) => ({
        id: `${category.categoryName}-${index}`,
        text: question.questionText,
        options: question.options.map((option, optionIndex) => ({
          value: optionIndex,
          label: option,
        })),
      }))
    ) || [];

  const totalQuestions = questions.length;

  const handleOptionChange = (index: number, selectedValue: number) => {
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

  const handleSubmitQuiz = () => {
    // Tạo điểm số cho từng danh mục
    const scores: SubmitQuizScoreType["score"] = {
      stress: [],
      anxiety: [],
      depression: [],
    };
    quizData?.data.dass21Categories.forEach((category) => {
      const categoryScores = category.questions.map((_, questionIndex) => {
        const selectedOptionValue =
          selectedOptions[`${category.categoryName}-${questionIndex}`];
        return selectedOptionValue !== undefined ? selectedOptionValue : 0;
      });

      switch (category.categoryName) {
        case "Stress":
          scores.stress = categoryScores;
          break;
        case "Anxiety":
          scores.anxiety = categoryScores;
          break;
        case "Depression":
          scores.depression = categoryScores;
          break;
      }
    });

    // Gọi mutation submit quiz
    submitQuizMutation.mutate({ score: scores });
  };

  const progressValue =
    (Object.keys(selectedOptions).length / totalQuestions) * 100;

  return (
    <div>
      <div className="sticky top-0 z-10 mb-4 p-4 shadow-md ">
        <Progress
          value={progressValue}
          className="w-full bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] h-4 opacity-65"
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
                onValueChange={(value) =>
                  handleOptionChange(index, Number(value))
                }
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
                      value={option.value.toString()}
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
      {Object.keys(selectedOptions).length === totalQuestions && (
        <Button
          onClick={handleSubmitQuiz}
          className="rounded-[20px] w-full float-right md:w-40 h-12 md:text-base bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] text-black"
        >
          Xem kết quả
        </Button>
      )}
    </div>
  );
}
