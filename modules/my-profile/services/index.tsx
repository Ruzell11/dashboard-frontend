import DEV_URL from "@/modules/common/globals";

import axios, { AxiosResponse } from "axios";
import jsCookie from "js-cookie";

export const userProfileRequest = async (): Promise<AxiosResponse> => {
  const userId = jsCookie.get("id");

  return axios({
    method: "GET",
    withCredentials: true,
    url: `${DEV_URL.ROOT_URL}/users/profile/${userId}`,
  });
};
