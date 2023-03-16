import DEV_URL from "@/modules/common/globals";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import jsCookie from "js-cookie";

interface ProductProps {
  image: any;
  product_name: string | null;
  product_description: string | null;
  product_price: string | null;
}
export const userAddProduct = async (params: ProductProps) => {
  const user_id = jsCookie.get("id");
  const axiosConfig = {
    headers: {
      Accept: "application/json",
    },
    withCredentials: true, // add this line to send the cookie in the request
  };

  const data = await axios.post(
    `${DEV_URL.ROOT_URL}/user/add-product/${user_id}`,
    params,
    axiosConfig
  );

  return data;
};
export const userAddProductRequest = () => {
  const { mutate, isSuccess, isError, isLoading, data } = useMutation(
    userAddProduct,
    {
      onSuccess: async (details: AxiosResponse) => {},
    }
  );

  return { mutate, isSuccess, isError, isLoading, data };
};

export const getUserProductList = async (): Promise<AxiosResponse> => {
  const userId = jsCookie.get("id");
  const role_id = jsCookie.get("role_id");

  return axios({
    method: "GET",
    withCredentials: true,
    url: `${DEV_URL.ROOT_URL}/user/get-product-list?role_id=${role_id}&user_id=${userId}`,
  });
};
