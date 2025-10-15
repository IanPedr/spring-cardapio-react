import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";


const postData = async (data: FoodData): Promise<AxiosResponse<any>> => {
  return axios.post(`${API_URL}/food`, data);
}


export function useFoodDataMutate(): UseMutationResult<AxiosResponse<any>, Error, FoodData> {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, Error, FoodData>({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-data'] });
    }
  });
}