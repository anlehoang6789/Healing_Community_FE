import quizApiRequest from "@/apiRequests/quizz";
import { QuizResponseType } from "@/schemaValidations/quizz.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook to get the DASS21 quiz questions
export const useGetDass21QuizQuery = () => {
  return useQuery<QuizResponseType>({
    queryKey: ["dass21-quiz"],
    queryFn: quizApiRequest.getDass21Quiz,
  });
};

// Hook to submit the quiz answers
export const useSubmitDass21QuizMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: quizApiRequest.submitDass21Quiz,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ["dass21-quiz"],
        exact: true,
      });
    },
  });
};
