import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaSearch, FaTimes } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FilterModel } from "@/app/constants/models/FilterModel";
import { IoAddCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface FilterProps {
    filters: FilterModel[];
    searchPlaceholder: string;
    onApply: (selectedFilters: FilterModel[], searchString: string) => void;
    onSearchApply: (searchString: string) => void;
}

const Filter = ({ filters, searchPlaceholder: placeholder, onApply, onSearchApply }: FilterProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState<FilterModel[]>([...filters]);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [searchString, setSearchString] = useState<string>(''); // Default rows per page
    const [isSearching, setIsSearching] = useState<boolean>(false); // New state for search status
    const router = useRouter()

    const togglePanel = () => setIsOpen(!isOpen);

    // Handle the input changes in the Autocomplete components
    const handleInputChange = (event: any, value: any, filter: FilterModel) => {
        const updatedFilters = selectedFilters.map((f: FilterModel) =>
            f.type === filter.type ? { ...f, selectedData: value } : f
        );
        setSelectedFilters(updatedFilters);
    };

    const onSearch = () => {
        if (searchString.trim())
            setIsSearching(true);
        else
            setIsSearching(false);
        onSearchApply(searchString);
    }

    const clearSearch = () => {
        setSearchString(''); // Clear the search string
        onSearchApply(''); // Clear search on parent component
        setIsSearching(false); // Update search status
    };
    // Validate the form inputs
    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {};
        let isValid = true;

        selectedFilters.forEach((filter) => {
            if (filter.isMandatory && !filter.selectedData) {
                newErrors[filter.label] = true;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const filtersCount = selectedFilters.filter((f) => f.selectedData).length;
            setAppliedFiltersCount(filtersCount);

            onApply(selectedFilters, searchString); // Return data to the parent component
            togglePanel(); // Close panel after applying
        } else {
            console.log("Validation failed");
        }
    };

    // Handle resetting the form
    const handleReset = () => {
        const resetFilters: FilterModel[] = selectedFilters.map((f) => ({
            ...f,
            selectedData: null, // Reset the selected data to null
        }));
        setSelectedFilters(resetFilters);
        setErrors({});
        setAppliedFiltersCount(0);
        clearSearch(); // Clear the search input and reset search state
    };

    const navigateToAdd = () => {
        router.push('/ui/sadhsangat/add');
    }

    return (
        <div className="relative">
            <div className="flex flex-row gap-4 items-center mb-2">
                {filters && filters.length > 0 && (
                    <button
                        type="button"
                        className="flex flex-row gap-1 items-center text-white bg-primary hover:bg-blue-800 focus:ring-4 rounded-md text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap"
                        onClick={togglePanel}
                    >
                        <span>Filters {appliedFiltersCount > 0 && `(${appliedFiltersCount})`}</span>
                        {isOpen ? <FaCaretUp size={12} /> : <FaCaretDown size={12} />}
                    </button>
                )}

                <div className="relative w-full">
                    <input
                        type="text"
                        id="simple-search"
                        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={placeholder}
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();  // Prevent form submission or page reload
                                onSearch();          // Trigger the search function
                            }
                        }}
                        required
                    />
                    {!isSearching ? (
                        <button
                            type="button"
                            className="absolute search-icon-btn right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg" style={{ padding: '3px' }}
                            onClick={onSearch}
                        >
                            <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="absolute search-icon-btn right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg" style={{ padding: '3px' }}
                            onClick={clearSearch}
                        >
                            <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                        </button>
                    )}
                    <span className="sr-only">Search</span>
                </div>
                <button
                    type="button"
                    className="flex flex-row gap-1 items-center text-white bg-primary hover:bg-blue-800 focus:ring-4 rounded-md text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap"
                    onClick={navigateToAdd}
                >
                    <IoAddCircleOutline size={22} />
                    <span>
                        Add
                    </span>
                </button>
            </div>

            {filters && filters.length > 0 && (
                <div className={` transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'} rounded-md`}>
                    <form className="w-full border border-gray-300 p-4 bg-white grid grid-cols-2 gap-4" onSubmit={handleApply}>
                        {selectedFilters.map((filter) => (
                            <div className="relative w-full" key={filter.label}>
                                <Autocomplete
                                    disablePortal
                                    options={filter.options}
                                    value={filter.selectedData || null} // Ensure the field is controlled with the correct value
                                    onChange={(e, v) => handleInputChange(e, v, filter)}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={filter.label + (filter.isMandatory ? ' *' : '')}
                                            error={!!errors[filter.label]}
                                            helperText={errors[filter.label] ? "This field is required" : ""}
                                        />
                                    )}
                                />
                            </div>
                        ))}

                        {/* Buttons */}
                        <div className="col-span-2 flex justify-end gap-4">
                            <button
                                type="button"
                                className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-md text-sm px-5 py-2"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="text-white bg-primary hover:bg-blue-600 font-medium rounded-md text-sm px-5 py-2"
                            >
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Filter;
