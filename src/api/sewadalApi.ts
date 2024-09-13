// src/api/filtersApi.ts
import { SortByMaster, SortType } from "@/app/constants/AppEnum";
import { FilterOption } from "@/app/constants/models/FilterModel";
import { GetSadhsangatResultModel, SadhsangatDataModel } from "@/app/constants/models/sadhsangatDataModel";
import axiosInstance from "@/utils/theme/axios/axiosInstance";

export const fetchSewadals = async (
  unitId: number,
  pageNo: number,
  limit: number,
  sortBy: SortByMaster,
  sortType: string,
  searchString: string
): Promise<GetSadhsangatResultModel> => {
  const response = await axiosInstance.get(
    `/sewadal?unitNo=${unitId}pageNo=${pageNo}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&searchString=${searchString}`
  ); // Replace with your API endpoint
  return response.data.data; // Assuming your API returns FilterModel[]
};
