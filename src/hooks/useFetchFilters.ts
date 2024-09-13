// src/hooks/useFetchFilters.ts
import { useQuery } from 'react-query';
import { FilterModel } from '@/app/constants/models/FilterModel';
import { fetchFilters } from '@/api/filterApi';

export const useFetchFilters = () => {
    return useQuery<FilterModel[], Error>('filters', fetchFilters, {
        staleTime: 5 * 60 * 1000,  // 5 minutes of cache validity
        cacheTime: 10 * 60 * 1000,  // Keep the data for 10 minutes in cache
        refetchOnWindowFocus: false,  // Disable refetching on window focus
    });
};
