// src/api/filtersApi.ts
import { SortByMaster, SortType } from "@/app/constants/AppEnum";
import { GetUnitsMasterResultModel } from "@/app/constants/models/unitsDataModel";
import axiosInstance from "@/utils/theme/axios/axiosInstance";

export const fetchUnits = async (
  pageNo: number,
  limit: number,
  sortBy: SortByMaster,
  sortType: string,
  searchString: string
): Promise<GetUnitsMasterResultModel> => {
  const response = await axiosInstance.get(
    `/units?pageNo=${pageNo}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&searchString=${searchString}`
  ); // Replace with your API endpoint
  return response.data.data; // Assuming your API returns FilterModel[]
};
