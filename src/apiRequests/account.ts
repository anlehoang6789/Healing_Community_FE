import http from "@/lib/http";
import { ChangePasswordBodyType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
  changePasswordForUser: (body: ChangePasswordBodyType) =>
    http.post<{ message: string }>("user/reset-password", body),
};

export default accountApiRequest;
