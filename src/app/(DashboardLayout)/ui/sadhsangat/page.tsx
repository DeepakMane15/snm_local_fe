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
import { fetchSadhsangat } from "@/api/sadhsangatApi";

const Sadhsangat = () => {
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [unitId, setUnitId] = useState<number>(0);
    const [sadhsangatData, setSadhsangatData] = useState<SadhsangatDataModel[]>([]);
    const [page, setPage] = useState(0); // Page starts from 0
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [totalRecords, setTotalRecords] = useState(0); // Track total records from the API
    const [searchString, setSearchString] = useState<string>(''); // Default rows per page
    const [sortBy, setSortBy] = useState<SortByMaster>(SortByMaster.NAME);
    const [sortType, setSortType] = useState<SortType>(SortType.ASC);


    // Fetch filter options
    const { data: filterData, isLoading: isLoadingFilters, error: filterError } = useQuery<FilterOption[], Error>(
        'filters',
        fetchFilters,
        {
            staleTime: 5 * 60 * 1000,  // 5 minutes of cache validity
            cacheTime: 10 * 60 * 1000,  // Keep the data for 10 minutes in cache
            refetchOnWindowFocus: false,  // Disable refetching on window focus
        }
    );

    // Fetch Sewadal data
    const { data: sadhsangatDataResult, isLoading: isLoadingSadhsangat, error: sadhsangatError } = useQuery<GetSadhsangatResultModel
        , Error>(
            ['sadhsangat', unitId, page, rowsPerPage, sortBy, sortType, searchString],
            () => fetchSadhsangat(unitId, page + 1, rowsPerPage, sortBy, sortType, searchString),
            {
                enabled: unitId !== null,  // Only fetch when unitId is set
                staleTime: 0,  // Set to 0 to always refetch when keys change
                keepPreviousData: true,  // Helps with pagination transitions
                refetchOnWindowFocus: false,  // Disable refetching on window focus
                onSuccess: (data) => {
                    setSadhsangatData(data.data);
                    setTotalRecords(data.count); // Update total records for pagination
                },
            }
        );

    // Define table columns
    const columns: TableColumnModel[] = [
        { key: 'name', value: 'Name', isSortable: true },
        { key: 'contactNo', value: 'Contact No', isSortable: true },
        { key: 'area', value: 'Area', isSortable: true },
        { key: 'age', value: 'Age', isSortable: true },
        { key: 'bloodGroup', value: 'Blood Group', isSortable: true },
        { key: 'qualification', value: 'Qualification', isSortable: true },
        { key: 'occupation', value: 'Occupation', isSortable: true },
    ];

    // After successful API call, initialize the filter data
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

    // Handle filter application
    const handleFilterApply = (selectedFilters: FilterModel[], search: string) => {
        // if(search.trim()) {
        setSearchString(search);
        // }
        const selectedUnit = selectedFilters.find(filter => filter.type === FilterType.SEWADAL)?.selectedData?.id;
        if (selectedUnit) {
            setUnitId(selectedUnit);  // Set the unitId in state
        }
    };

    const onSearch = (search: string) => {
        // if(search.trim()) {
        setSearchString(search);
        setPage(0);
        // }
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

    return (
        <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
            {/* Conditionally render the Filter component when filters are available */}
            {filters.length > 0 && (
                <Filter filters={filters} searchPlaceholder={SearchPlaceholders.NAME} onApply={handleFilterApply} onSearchApply={onSearch} />
            )}
            <div className="mt-3">
                {/* Conditionally render the PopularProducts table when data is available */}
                {!isLoadingSadhsangat && sadhsangatData ? (
                    <PopularProducts
                        data={sadhsangatData}
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
                    <p>Loading Sadhsangat data...</p>  // Show a loading message while the data is being fetched
                )}
            </div>
        </div>
    );
};

export default Sadhsangat;
