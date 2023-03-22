import DEV_URL from "@/modules/common/globals";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import jsCookie from "js-cookie";

interface userAddMembersProps {
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  password: string | null;
  email: string | null;
  role_id: number | null;
}

export const userAddMembers = async (params: userAddMembersProps) => {
  const user_id = jsCookie.get("id");
  const axiosConfig = {
    headers: {
      Accept: "application/json",
    },
    withCredentials: true, // add this line to send the cookie in the request
  };

  const data = await axios.post(
    `${DEV_URL.ROOT_URL}/users/create?created_by_id=${user_id || ""}`,
    params,
    axiosConfig
  );

  return data;
};
export const userGetAddMemberRequest = () => {
  const { mutate, isSuccess, isError, isLoading, data } = useMutation(
    userAddMembers,
    {
      onSuccess: async (details: AxiosResponse) => {},
    }
  );

  return { mutate, isSuccess, isError, isLoading, data };
};
