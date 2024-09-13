// src/api/filtersApi.ts
import { SortByMaster } from "@/app/constants/AppEnum";
import { FilterOption } from "@/app/constants/models/FilterModel";
import {
  GetSadhsangatResultModel,
  SadhSangatAddFormModel,
  SadhsangatDataModel,
} from "@/app/constants/models/sadhsangatDataModel";
import axiosInstance from "@/utils/theme/axios/axiosInstance";

export const fetchSadhsangat = async (
  unitId: number,
  pageNo: number,
  limit: number,
  sortBy: SortByMaster,
  sortType: string,
  searchString: string
): Promise<GetSadhsangatResultModel> => {
  const response = await axiosInstance.get(
    `/sadhsangat?unitId=${unitId}&pageNo=${pageNo}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&searchString=${searchString}`
  ); // Replace with your API endpoint
  return response.data.data; // Assuming your API returns FilterModel[]
};

export const submitForm = async (formData: SadhSangatAddFormModel): Promise<any> => {
  const response = await axiosInstance.post("/sadhsangat", formData);
  return response.data;
};
