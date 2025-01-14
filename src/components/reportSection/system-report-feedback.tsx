"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, Send, ThumbsUp } from "lucide-react";
import { useAddSystemReportMutation } from "@/queries/useReport";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";

export default function SystemReportFeedback() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendSystemReportMutation = useAddSystemReportMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendSystemReportMutation.isPending) return;
    try {
      const res = await sendSystemReportMutation.mutateAsync({
        content: feedback,
      });
      setIsSubmitted(true);
      toast({
        description: res.payload.message,
        variant: "success",
      });
      setFeedback("");
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Card className=" text-textChat shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Hệ thống Góp ý & Hỗ trợ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="feedback">Góp ý</TabsTrigger>
              <TabsTrigger value="info">Thông tin & Hỗ trợ</TabsTrigger>
            </TabsList>
            <TabsContent value="feedback">
              <FeedbackForm
                feedback={feedback}
                setFeedback={setFeedback}
                handleSubmit={handleSubmit}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            </TabsContent>
            <TabsContent value="info">
              <SystemInfo />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function FeedbackForm({
  feedback,
  setFeedback,
  handleSubmit,
  isSubmitted,
  setIsSubmitted,
}: {
  feedback: string;
  setFeedback: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
}) {
  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => {
        setIsSubmitted(false); // Ẩn thông báo sau 2 giây
      }, 2000);
      return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount hoặc `isSubmitted` thay đổi
    }
  }, [isSubmitted, setIsSubmitted]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Chia sẻ ý kiến của bạn để chúng tôi có thể phục vụ bạn tốt hơn..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="max-h-[150px] overflow-y-auto resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit">
          <Send className="mr-2 h-4 w-4" /> Gửi góp ý
        </Button>
      </div>
      {isSubmitted && (
        <div className="flex items-center justify-center p-2 rounded-md font-semibold">
          <ThumbsUp className="mr-2 h-4 w-4" /> Cảm ơn bạn đã gửi góp ý!
        </div>
      )}
    </form>
  );
}

function SystemInfo() {
  return (
    <ScrollArea className="h-[400px] rounded-md p-4">
      <FAQItem
        question="Làm thế nào để thay đổi mật khẩu?"
        answer="Để thay đổi mật khẩu, hãy đăng nhập vào tài khoản của bạn, vào phần 'Tường nhà', và chọn 'Thay đổi mật khẩu'. Làm theo hướng dẫn để cập nhật mật khẩu mới."
      />
      <FAQItem
        question="Làm sao để cập nhật thông tin cá nhân?"
        answer="Đăng nhập vào tài khoản, truy cập mục 'Tường nhà', và nhấn vào nút 'Thông tin cá nhân'. Sau khi cập nhật, nhớ nhấn 'Lưu thay đổi'."
      />
      <FAQItem
        question="Tôi có thể xóa tài khoản không?"
        answer="Không, bạn không thể xóa tài khoản."
      />
      <FAQItem
        question="Làm thế nào để liên hệ với bộ phận hỗ trợ?"
        answer="Bạn có thể liên hệ bộ phận hỗ trợ qua email healingcommunity@gmail.com hoặc gửi điền vào biểu mẫu góp ý của chúng tôi. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc."
      />
      <FAQItem
        question="Chính sách bảo mật của hệ thống như thế nào?"
        answer="Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Mọi dữ liệu được mã hóa và lưu trữ an toàn. Chúng tôi không chia sẻ thông tin với bên thứ ba mà không có sự đồng ý của bạn. Xem chi tiết tại trang 'Chính sách bảo mật' trên website."
      />
      <FAQItem
        question="Điều khoản sử dụng có những gì quan trọng?"
        answer="Điều khoản sử dụng bao gồm các quy định về quyền và trách nhiệm của người dùng, giới hạn trách nhiệm của chúng tôi, quyền sở hữu trí tuệ, và cách giải quyết tranh chấp. Chúng tôi khuyến khích bạn đọc kỹ trước khi sử dụng dịch vụ."
      />
    </ScrollArea>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <p className="mt-2 text-muted-foreground font-medium">{answer}</p>
      )}
    </div>
  );
}
