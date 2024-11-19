import { z } from "zod";

// Định nghĩa kiểu dữ liệu cho câu hỏi
const QuestionSchema = z.object({
  questionText: z.string(),
  type: z.string(), // Thay "radio" bằng z.string() vì type có thể có giá trị khác trong tương lai
  options: z.array(z.string()),
});

// Định nghĩa kiểu dữ liệu cho danh mục DASS21
const Dass21CategorySchema = z.object({
  categoryName: z.string(),
  questions: z.array(QuestionSchema),
});

// Định nghĩa kiểu dữ liệu cho dữ liệu quiz
const QuizDataSchema = z.object({
  id: z.string(),
  dass21Categories: z.array(Dass21CategorySchema),
});

// Định nghĩa kiểu dữ liệu cho phản hồi từ API
export const QuizResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: QuizDataSchema, // Sử dụng QuizDataSchema đã định nghĩa
  errors: z.any(), // Để phù hợp với kiểu 'errors: any' trong interface của bạn
  timestamp: z.string(),
});

// Tạo type từ schema
export type QuizResponseType = z.infer<typeof QuizResponseSchema>;

// Định nghĩa kiểu dữ liệu cho việc gửi kết quả quiz DASS21
export const SubmitQuizScoreSchema = z.object({
  score: z.object({
    stress: z.array(z.number()),
    anxiety: z.array(z.number()),
    depression: z.array(z.number()),
  }),
});

export type SubmitQuizScoreType = z.infer<typeof SubmitQuizScoreSchema>;
