import axios from "@/utils/axios";
import { AxiosResponse } from "axios";
import { UserData } from "@/types/faker";

const getFakerData = (count: number): Promise<AxiosResponse<UserData[]>> => {
  return axios.get(
    `/api/v2/persons?_quantity=${count}&_gender=female&_birthday_start=2005-01-01`
  );
};

export { getFakerData };
