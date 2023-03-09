import DEV_URL from "@/modules/common/globals";
import axios from "axios";
import { useMutation } from "react-query";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";

interface LoginProps {
  email: string;
  password: string;
}

export const userLoginRequest = async (params: LoginProps) => {
  const axiosConfig = {
    headers: {
      Accept: "application/json",
    },
    withCredentials: true, // add this line to send the cookie in the request
  };

  const data = await axios.post(
    `${DEV_URL.ROOT_URL}/user/login`,
    params,
    axiosConfig
  );

  return data;
};
export const userGetLoginRequest = () => {
  const router = useRouter();
  const { mutate, isSuccess, isError, isLoading, data } = useMutation(
    userLoginRequest,
    {
      onSuccess: async () => {
        const cookies = parseCookies();
        const accessToken = cookies["access-token"];
        console.log(accessToken);
        if (accessToken) {
          setCookie(null, "access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });

          router.push("/dashboard/charts");
        }
      },
    }
  );

  return { mutate, isSuccess, isError, isLoading, data };
};
