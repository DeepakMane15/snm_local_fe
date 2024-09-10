import { useState } from "react";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

    // State to store the selected values for the Autocomplete inputs
    const [selectedMovies, setSelectedMovies] = useState({
        movie1: null,
        movie2: null,
        movie3: null,
        movie4: null,
    });

    // State for form validation errors
    const [errors, setErrors] = useState({
        movie1: false,
        movie2: false,
        movie3: false,
        movie4: false,
    });

    const togglePanel = () => setIsOpen(!isOpen);

    const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
        { label: 'The Dark Knight', id: 3 },
        { label: 'Forrest Gump', id: 4 },
        { label: 'Inception', id: 5 },
        { label: 'Fight Club', id: 6 },
        // Add more items if needed
    ];

    // Handle the input changes in the Autocomplete components
    const handleInputChange = (event, value, field) => {
        setSelectedMovies({ ...selectedMovies, [field]: value });
    };

    // Validate the form inputs
    const validateForm = () => {
        // this will be dynamic
        const newErrors = {
            movie1: selectedMovies.movie1 === null,
            movie2: selectedMovies.movie2 === null,
            movie3: selectedMovies.movie3 === null,
            movie4: selectedMovies.movie4 === null,
        };
        setErrors(newErrors);

        // Return true if there are no errors
        return !Object.values(newErrors).includes(true);
    };

    // Handle form submission
    const handleApply = (e: Event) => {
        e.preventDefault();

        if (validateForm()) {
            let filtersCount = Object.values(selectedMovies).filter(Boolean).length;
            setAppliedFiltersCount(filtersCount);

            console.log('Form Submitted:', selectedMovies);
            togglePanel();
            // Submit the form data
        } else {
            console.log('Validation failed');
        }
    };

    // Handle resetting the form
    const handleReset = () => {
        setSelectedMovies({
            movie1: null,
            movie2: null,
            movie3: null,
            movie4: null,
        });
        setErrors({
            movie1: false,
            movie2: false,
            movie3: false,
            movie4: false,
        });
    };

    return (
        <div className="relative">
            <div className="flex flex-row gap-4 items-center mb-2">
                <button
                    type="button"
                    className="flex flex-row gap-1 items-center text-white bg-primary hover:bg-blue-800 focus:ring-4 rounded-md text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap"
                    onClick={togglePanel}
                >
                    <span>Filters {appliedFiltersCount > 0 && `(${appliedFiltersCount})`}</span>
                    {isOpen ? <FaCaretUp size={12} /> : <FaCaretDown size={12} />}
                </button>

                <div className="relative w-full">
                    <input
                        type="text"
                        id="simple-search"
                        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search branch name..."
                        required
                    />
                    <button
                        type="button"
                        className="absolute search-icon-btn right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                    >
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400 search-svg"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>

            <div className={` transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'} rounded-md`}>
                <form className="w-full border border-gray-300 p-4 bg-white grid grid-cols-2 gap-4" onSubmit={handleApply}>
                    <div className="relative w-full">
                        <Autocomplete
                            disablePortal
                            options={options}
                            value={selectedMovies.movie1}
                            onChange={(e, v) => handleInputChange(e, v, 'movie1')}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Movie 1"
                                    error={errors.movie1}
                                    helperText={errors.movie1 ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </div>
                    <div className="relative w-full">
                        <Autocomplete
                            disablePortal
                            options={options}
                            value={selectedMovies.movie2}
                            onChange={(e, v) => handleInputChange(e, v, 'movie2')}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Movie 2"
                                    error={errors.movie2}
                                    helperText={errors.movie2 ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </div>
                    <div className="relative w-full">
                        <Autocomplete
                            disablePortal
                            options={options}
                            value={selectedMovies.movie3}
                            onChange={(e, v) => handleInputChange(e, v, 'movie3')}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Movie 3"
                                    error={errors.movie3}
                                    helperText={errors.movie3 ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </div>
                    <div className="relative w-full">
                        <Autocomplete
                            disablePortal
                            options={options}
                            value={selectedMovies.movie4}
                            onChange={(e, v) => handleInputChange(e, v, 'movie4')}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Movie 4"
                                    error={errors.movie4}
                                    helperText={errors.movie4 ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </div>

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
        </div>
    );
};

export default Filter;
