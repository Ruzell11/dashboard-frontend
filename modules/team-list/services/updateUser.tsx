import DEV_URL from "@/modules/common/globals";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";

interface UserUpdateDetailsParams {
    _id: string | null;
    first_name?: string | null;
    last_name?: string | null;
    username?: string | null;
    password?: string | null;
    email?: string | null;
    role_id?: number | null;
  }
  
  export const userUpdateDetails = async (params: UserUpdateDetailsParams) => {
 
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true, // add this line to send the cookie in the request
    };
  
    const data = await axios.patch(
      `${DEV_URL.ROOT_URL}/user/edit-profile/${params._id}`,
      params,
      axiosConfig
    );
  
    return data;
  };
  
  export const userGetEditRequest = () => {
    const { mutate, isSuccess, isError, isLoading, data } = useMutation<
      AxiosResponse,
      unknown,
      UserUpdateDetailsParams
    >(userUpdateDetails, {
      onSuccess: async (details: AxiosResponse) => {
        // implementation
      },
    });
  
    return { mutate, isSuccess, isError, isLoading, data };
  };
  