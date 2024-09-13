"use client";
import Filter from "@/app/components/common/filter";
import PopularProducts from "../table/page";
import { useEffect, useState } from "react";
import { FilterModel, FilterOption } from "@/app/constants/models/FilterModel";
import { FilterType, SortByMaster, SearchPlaceholders, SortType, TableColumnModel } from "@/app/constants/AppEnum";
import { useQuery } from "react-query";
import { fetchFilters } from "@/api/filterApi";
import { GetSadhsangatResultModel, SadhsangatDataModel } from "@/app/constants/models/sadhsangatDataModel";
import { fetchSewadals } from "@/api/sewadalApi";
import { GetUnitsMasterResultModel, UnitsMasterDataModel } from "@/app/constants/models/unitsDataModel";
import { fetchUnits } from "@/api/unitsApi";

const Unit = () => {
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [unitData, setUnitData] = useState<UnitsMasterDataModel[]>([]);
    const [page, setPage] = useState(0); // Page starts from 0
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [totalRecords, setTotalRecords] = useState(0); // Track total records from the API
    const [searchString, setSearchString] = useState<string>(''); // Default rows per page
    const [sortBy, setSortBy] = useState<SortByMaster>(SortByMaster.NAME);
    const [sortType, setSortType] = useState<SortType>(SortType.ASC);

    // Fetch Units data
    const { data, isLoading, error } = useQuery<GetUnitsMasterResultModel, Error>(
        ['units', page, rowsPerPage, sortBy, sortType, searchString],  // Use an array with the query key and unitId
        () => fetchUnits(page+1, rowsPerPage, sortBy, sortType, searchString),
        {
            staleTime: 0,  // Set to 0 to always refetch when keys change
            keepPreviousData: true,  // Helps with pagination transitions
            refetchOnWindowFocus: false,  // Disable refetching on window focus
            onSuccess: (data) => {
                setUnitData(data.data);
                setTotalRecords(data.count); // Update total records for pagination
            },
        }
    );

    // Define table columns
    const columns: TableColumnModel[] = [
        { key: 'name', isSortable: true, value: 'Name' },
        { key: 'unitNo', isSortable: true, value: 'Unit No' },
    ];

    // Handle filter application
    const handleFilterApply = (selectedFilters: FilterModel[], search: string) => {
        setSearchString(search);
    };

    const onSearch = (search: string) => {
        setSearchString(search);
        setPage(0);
    }

    const handleSort = (columnKey: SortByMaster) => {
        if (sortBy === columnKey) {
            // Toggle sort direction if the same column is clicked
            setSortType(prev => (prev === SortType.ASC ? SortType.DESC : SortType.ASC));
        } else {
            // Change sort column and reset to ascending order
            setSortBy(columnKey);
            setSortType(SortType.ASC);
        }
    };

    const { data: filterData, isLoading: isLoadingFilters, error: filterError } = useQuery<FilterOption[], Error>(
        'filters',
        fetchFilters,
        {
            staleTime: 5 * 60 * 1000,  // 5 minutes of cache validity
            cacheTime: 10 * 60 * 1000,  // Keep the data for 10 minutes in cache
            refetchOnWindowFocus: false,  // Disable refetching on window focus
        }
    );

    useEffect(() => {
        if (filterData) {
            const filterOptions: FilterModel[] = [
                {
                    label: 'Unit Name',
                    type: FilterType.SEWADAL,
                    options: filterData,  // Use the fetched data for options
                    selectedData: undefined,
                    isMandatory: true
                },
                {
                    label: 'Category',
                    type: FilterType.NONE,
                    options: [
                        { label: 'Category 1', id: 1 },
                        { label: 'Category 2', id: 2 }
                    ],
                    selectedData: undefined,
                    isMandatory: false
                },
                // Add more filters if necessary
            ];
            setFilters(filterOptions);  // Set the filters after data is fetched
        }
    }, [filterData]);

    return (
        <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
            {/* Conditionally render the Filter component when filters are available */}
            {filters.length > 0 && (
                <Filter filters={[]} searchPlaceholder={SearchPlaceholders.NAME} onApply={handleFilterApply} onSearchApply={onSearch} />
            )}
            <div className="mt-3">
                {/* Conditionally render the PopularProducts table when data is available */}
                {!isLoading && unitData ? (
                    <PopularProducts
                        data={unitData}
                        columns={columns}
                        totalPages={totalRecords}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        sortBy={sortBy}
                        sortType={sortType}
                        onSort={handleSort} />
                ) : (
                    <p>Loading Units data...</p>  // Show a loading message while the data is being fetched
                )}
            </div>
        </div>
    );
};

export default Unit;
