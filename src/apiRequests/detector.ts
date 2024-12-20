import http from "@/lib/http";
import { GetDetectorResType } from "@/schemaValidations/detector.schema";

const detectorApiRequest = {
  checkContentByAI: (text: string) =>
    http.post<GetDetectorResType>("detector/check-content", { text }),
};

export default detectorApiRequest;
