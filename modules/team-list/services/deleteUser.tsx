import DEV_URL from "@/modules/common/globals";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";

interface UserUpdateDetailsParams {
   user_id:string | null;
   created_by_id:string | null;
  }
  
  export const userUpdateDetails = async (params: UserUpdateDetailsParams) => {
 
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true, // add this line to send the cookie in the request
    };
  
    const data = await axios.delete(
      `${DEV_URL.ROOT_URL}/user/delete-user?user_id=${params.user_id}&created_by_id=${params.created_by_id}`,
          axiosConfig
    );
  
    return data;
  };
  
  export const userGetDeleteRequest = () => {
    const { mutate, isSuccess, isError, isLoading, data } = useMutation<
      AxiosResponse,
      unknown,
      UserUpdateDetailsParams
    >(userUpdateDetails, {
     
    });
  
    return { mutate, isSuccess, isError, isLoading, data };
  };
  