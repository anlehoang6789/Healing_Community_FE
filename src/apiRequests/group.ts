import http from "@/lib/http";
import { GetAllGroupsResponseType } from "@/schemaValidations/group.schema";

const groupApiRequest = {
  getAllGroups: () =>
    http.get<GetAllGroupsResponseType>("group/api/group/get-all"),
};

export default groupApiRequest;
