// src/api/filtersApi.ts
import { FilterOption } from "@/app/constants/models/FilterModel";
import axiosInstance from "@/utils/theme/axios/axiosInstance";

export const fetchFilters = async (): Promise<FilterOption[]> => {
    const response = await axiosInstance.get("/filters/1"); // Replace with your API endpoint
    return response.data.data;  // Assuming your API returns FilterModel[]
};
