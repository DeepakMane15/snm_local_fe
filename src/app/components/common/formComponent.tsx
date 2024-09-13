"use client";
import { Button, Label, Select, TextInput, Checkbox } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { MemberFormModel, SadhSangatAddFormModel } from "@/app/constants/models/sadhsangatDataModel";
import { useMutation } from "react-query";
import { submitForm } from "@/api/sadhsangatApi";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
// Form field configuration for multiple steps
const formSteps = [
    [
        { id: "name", label: "Your Name", type: "text", placeholder: "Your Name", required: true },
        { id: "area", label: "Area", type: "text", placeholder: "John Doe", required: true },
        { id: "address", label: "Address", type: "text", placeholder: "Kisan Nagar", required: true },
        { id: "pincode", label: "Pin Code", type: "number", placeholder: "400604", required: true },
        { id: "contactNo", label: "Contact No", type: "text", placeholder: "9082958346", required: true },
        { id: "gender", label: "Gender", type: "select", options: [{ key: 1, value: "Male" }, { key: 2, value: "Female" }], required: true },
        { id: "dob", label: "DOB", type: "date", required: true },
        { id: "qualification", label: "Qualification", type: "text", placeholder: "MA", required: true },
        { id: "occupation", label: "Occupation", type: "text", placeholder: "Service", required: true },
        { id: "dateOfGyan", label: "Date Of Gyan", type: "date", required: true },
        {
            id: "bloodGroup", label: "Blood Group", type: "select", options: [{ key: "A+", value: "A+" },
            { key: "A-", value: "A-" },
            { key: "B+", value: "B+" },
            { key: "B-", value: "B-" },
            { key: "AB+", value: "AB+" },
            { key: "AB-", value: "AB-" },
            { key: "O+", value: "O+" },
            { key: "O-", value: "O-" },
            { key: "None", value: "None" }], required: true
        },
        { id: "isSewadal", label: "Is Sewadal", type: "checkbox", default: false },
    ],
    [
        { id: "name", label: "Your Name", type: "text", placeholder: "Your Name", required: true },
        { id: "contactNo", label: "Contact No", type: "text", placeholder: "9082958346", required: true },
        { id: "gender", label: "Gender", type: "select", options: [{ key: 1, value: "Male" }, { key: 2, value: "Female" }], required: true },
        { id: "dob", label: "DOB", type: "date", required: true },
        { id: "qualification", label: "Qualification", type: "text", placeholder: "MA", required: true },
        { id: "occupation", label: "Occupation", type: "text", placeholder: "Service", required: true },
        { id: "dateOfGyan", label: "Date Of Gyan", type: "date", required: true },
        {
            id: "bloodGroup", label: "Blood Group", type: "select",
            options: [{ key: "A+", value: "A+" },
            { key: "A-", value: "A-" },
            { key: "B+", value: "B+" },
            { key: "B-", value: "B-" },
            { key: "AB+", value: "AB+" },
            { key: "AB-", value: "AB-" },
            { key: "O+", value: "O+" },
            { key: "O-", value: "O-" },
            { key: "None", value: "None" }], required: true
        },
        { id: "isSewadal", label: "Is Sewadal", type: "checkbox", default: false },
    ]
];

const stepsLabels = ["HOF Info", "Members Info", "Preview"];

const FormComponent = () => {
    const [step, setStep] = useState(0); // Current step in the form
    const [formData, setFormData] = useState<SadhSangatAddFormModel>(new SadhSangatAddFormModel());
    const [errors, setErrors] = useState<any>({}); // Track errors for validation
    const [isStepValid, setIsStepValid] = useState(false); // To check if the step is valid
    const [touchedFields, setTouchedFields] = useState<any>({}); // Track which fields have been touched

    const mutation = useMutation({
        mutationFn: submitForm,
        onSuccess: (data) => {
            resetForm();
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Optional: Add smooth scrolling
            });
            // Optionally reset the form or navigate
        },
        onError: (error: any) => {
            console.error("Form submission failed:", error);
            // Optionally show error message to the user
        }
    });

    // Handle input changes for text, number, date, select, and checkbox fields
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));

        // Mark the field as touched
        setTouchedFields((prevTouched) => ({
            ...prevTouched,
            [id]: true,
        }));

        // Remove error on change
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "", // Clear the error for this field
        }));
    };

    const handleMemberChange = (index, id, e) => {
        const { value, type } = e.target;
        const newMembers = [...formData.members];
        newMembers[index] = {
            ...newMembers[index],
            [id]: type === "checkbox" ? e.target.checked : value,
        };
        setFormData((prevData) => ({
            ...prevData,
            members: newMembers,
        }));

        // Mark the field as touched
        setTouchedFields((prevTouched) => ({
            ...prevTouched,
            [id]: true,
        }));

        // Remove error on change
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "", // Clear the error for this field
        }));
    };

    // Add a new member
    const addMember = () => {
        setFormData((prevData) => ({
            ...prevData,
            members: [
                ...prevData.members,
                new MemberFormModel()
            ],
        }));
    };

    // Validate the current step and return true if all fields are valid
    const validateStep = () => {
        const currentStepFields = formSteps[step];
        const newErrors = {};

        // Validate common fields
        for (let field of currentStepFields) {
            if (field.required && !formData[field.id] && field.id !== "members") {
                newErrors[field.id] = `${field.label} is required`; // Mark the field with an error
            }
        }

        // Validate members' details
        if (step === 1) {
            formData.members.forEach((member, index) => {
                for (let field in member) {
                    if (formSteps[step].some(f => f.id === field && f.required) && !member[field]) {
                        newErrors[`members[${index}].${field}`] = `${formSteps[step].find(f => f.id === field).label} is required`;
                    }
                }
            });

        }

        // Validate Sewadal fields only if 'isSewadal' is checked
        if (formData.isSewadal) {
            if (!formData.personalNo) {
                newErrors["personalNo"] = "Personal No is required";
            }
            if (!formData.sewadalNo) {
                newErrors["sewadalNo"] = "Sewadal No is required";
            }
            if (!formData.recruitmentDate) {
                newErrors["recruitmentDate"] = "Recruitment Date is required";
            }
            if (!formData.badgeBeltDate) {
                newErrors["badgeBeltDate"] = "Badge-Belt Date is required";
            }
        }

        setErrors(newErrors); // Update the errors state
        return Object.keys(newErrors).length === 0; // If no errors, the step is valid
    };

    // Check validity of the step whenever form data or step changes
    useEffect(() => {
        setIsStepValid(validateStep());
    }, [formData, step]);

    const handleNext = () => {
        const isValid = validateStep();
        if (isValid && step < formSteps.length - 1) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleStepClick = (index: number) => {
        if (index <= step) {
            setStep(index);
        }
    };

    const handleSubmit = () => {
        const isValid = validateStep();
        if (isValid) {

            const formattedFormData = {
                ...formData,
                dateOfGyan: convertDateFormat(formData.dateOfGyan),
                dob: convertDateFormat(formData.dob),
                recruitmentDate: formData.recruitmentDate ? convertDateFormat(formData.recruitmentDate) : "",
                badgeBeltDate: formData.badgeBeltDate ? convertDateFormat(formData.badgeBeltDate) : "",
                members: formatMemberDates(formData.members),
            };

            mutation.mutate(formattedFormData);
        }
    };

    const resetForm = () => {
        setFormData(new SadhSangatAddFormModel());
        setErrors({})
        setTouchedFields({});
        setStep(0);
    }

    const formatMemberDates = (members: any[]): any[] => {
        return members.map(member => ({
            ...member,
            dob: member.dob ? convertDateFormat(member.dob) : "",
            dateOfGyan: member.dateOfGyan ? convertDateFormat(member.dateOfGyan) : "",
            recruitmentDate: member.recruitmentDate ? convertDateFormat(member.recruitmentDate) : "",
            badgeBeltDate: member.badgeBeltDate ? convertDateFormat(member.badgeBeltDate) : "",
        }));
    };

    const convertDateFormat = (dateString: string): string => {
        let d = new Date(dateString);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleDeleteMemberForm = (index: number) => {
        const newMembers = [...formData.members];
        newMembers.splice(index, 1);
        setFormData((prevData) => ({
            ...prevData,
            members: newMembers,
        }));
    }

    return (
        <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
            <h5 className="card-title form-title">Add Sadhsangat</h5>

            {/* MUI Stepper */}
            <Stepper activeStep={step} alternativeLabel>
                {stepsLabels.map((label, index) => (
                    <Step key={index} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label': { fontSize: '1.1rem' },
                                '& .MuiStepIcon-root': { fontSize: '1.8rem' },
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className="mt-6">
                <Box sx={{ mt: 2 }}>
                    <div className="grid grid-cols-12 gap-4">
                        {/* Render fields for the current step */}
                        {step === 0 && formSteps[step].map((field) => (
                            <div key={field.id} className="lg:col-span-6 col-span-12">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor={field.id} value={field.label} />
                                        </div>

                                        {/* Render input types conditionally */}
                                        {field.type === "text" || field.type === "email" || field.type === "password" || field.type === "number" ? (
                                            <TextInput
                                                id={field.id}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                required={field.required}
                                                className={`form-control ${errors[field.id] ? "border-red-500" : ""}`}
                                            />
                                        ) : field.type === "select" ? (
                                            <Select
                                                id={field.id}
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                required={field.required}
                                                className={`select-rounded ${errors[field.id] ? "border-red-500" : ""}`}
                                            >
                                                <option value="" disabled>Select {field.label}</option>
                                                {field.options?.map((option, idx) => (
                                                    <option key={idx} value={option.key}>
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </Select>
                                        ) : field.type === "date" ? (
                                            <TextInput
                                                id={field.id}
                                                type="date"
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                required={field.required}
                                                className={`form-control ${errors[field.id] ? "border-red-500" : ""}`}
                                            />
                                        ) : field.type === "checkbox" ? (
                                            <Checkbox
                                                id={field.id}
                                                checked={formData[field.id]}
                                                onChange={handleChange}
                                                className={`checkbox-rounded ${errors[field.id] ? "border-red-500" : ""}`}
                                            />
                                        ) : null}

                                        {/* Error message display */}
                                        {errors[field.id] && touchedFields[field.id] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors[field.id]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Render fields for the Members Info step */}
                        {step === 1 && formData.members.map((member, index) => (
                            <div key={index} className="col-span-12">
                                <div className="border p-4 mb-4">
                                    <div className="flex flex-row justify-between">
                                        <h6 className="text-lg font-semibold mb-2">Member {index + 1}</h6>
                                        {formData.members.length > 1 && (
                                            <Button style={{ fontSize: '12px' }} variant="outlined" color="error" onClick={() => handleDeleteMemberForm(index)}>
                                                <span>Remove</span>
                                                <MdDeleteForever size={13} />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        {formSteps[step].map((field) => (
                                            <div key={field.id} className="flex flex-col gap-4">
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor={`members[${index}].${field.id}`} value={field.label} />
                                                    </div>

                                                    {/* Render input types conditionally */}
                                                    {field.type === "text" || field.type === "email" || field.type === "password" || field.type === "number" ? (
                                                        <TextInput
                                                            id={`members[${index}].${field.id}`}
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            value={member[field.id]}
                                                            onChange={(e) => handleMemberChange(index, field.id, e)}
                                                            required={field.required}
                                                            className={`form-control ${errors[`members[${index}].${field.id}`] ? "border-red-500" : ""}`}
                                                        />
                                                    ) : field.type === "select" ? (
                                                        <Select
                                                            id={member[field.id]}
                                                            value={member[field.id]}
                                                            onChange={(e) => handleMemberChange(index, field.id, e)}
                                                            required={field.required}
                                                            className={`select-rounded ${errors[`members[${index}].${field.id}`] ? "border-red-500" : ""}`}
                                                        >
                                                            <option value="" disabled>Select {field.label}</option>
                                                            {field.options?.map((option, idx) => (
                                                                <option key={idx} value={option.key}>
                                                                    {option.value}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    ) : field.type === "date" ? (
                                                        <TextInput
                                                            id={member[field.id]}
                                                            type="date"
                                                            value={member[field.id]}
                                                            onChange={(e) => handleMemberChange(index, field.id, e)}
                                                            required={field.required}
                                                            className={`form-control ${errors[`members[${index}].${field.id}`] ? "border-red-500" : ""}`}
                                                        />
                                                    ) : field.type === "checkbox" ? (
                                                        <Checkbox
                                                            id={member[field.id]}
                                                            checked={member[field.id]}
                                                            onChange={(e) => handleMemberChange(index, field.id, e)}
                                                            className={`checkbox-rounded ${errors[`members[${index}].${field.id}`] ? "border-red-500" : ""}`}
                                                        />
                                                    ) : null}

                                                    {/* Error message display */}
                                                    {errors[`members[${index}].${field.id}`] && touchedFields[`members[${index}].${field.id}`] && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors[`members[${index}].${field.id}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {member.isSewadal && (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <Label htmlFor="personalNo" value="Personal No" />
                                                        <TextInput
                                                            id="personalNo"
                                                            type="number"
                                                            value={member.personalNo}
                                                            onChange={(e) => handleMemberChange(index, 'personalNo', e)}
                                                            required
                                                            className={`form-control ${errors.personalNo ? "border-red-500" : ""}`}
                                                        />
                                                        {errors.personalNo && touchedFields.personalNo && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.personalNo}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <Label htmlFor="sewadalNo" value="Sewadal No" />
                                                        <TextInput
                                                            id="sewadalNo"
                                                            type="text"
                                                            value={member.sewadalNo}
                                                            onChange={(e) => handleMemberChange(index, 'sewadalNo', e)}
                                                            required
                                                            className={`form-control ${errors.sewadalNo ? "border-red-500" : ""}`}
                                                        />
                                                        {errors.sewadalNo && touchedFields.sewadalNo && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.sewadalNo}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <Label htmlFor="recruitmentDate" value="Recruitment Date" />
                                                        <TextInput
                                                            id="recruitmentDate"
                                                            type="date"
                                                            value={member.recruitmentDate}
                                                            onChange={(e) => handleMemberChange(index, 'recruitmentDate', e)}
                                                            required
                                                            className={`form-control ${errors.recruitmentDate ? "border-red-500" : ""}`}
                                                        />
                                                        {errors.recruitmentDate && touchedFields.recruitmentDate && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.recruitmentDate}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <Label htmlFor="badgeBeltDate" value="Badge-Belt Date" />
                                                        <TextInput
                                                            id="badgeBeltDate"
                                                            type="date"
                                                            value={member.badgeBeltDate}
                                                            onChange={(e) => handleMemberChange(index, 'badgeBeltDate', e)}
                                                            required
                                                            className={`form-control ${errors.badgeBeltDate ? "border-red-500" : ""}`}
                                                        />
                                                        {errors.badgeBeltDate && touchedFields.badgeBeltDate && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.badgeBeltDate}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Member Button */}
                        {step === 1 && (
                            <div className="col-span-12">
                                <Button color="primary" onClick={addMember}>
                                    Add More Members
                                </Button>
                            </div>
                        )}


                        {/* Conditionally render Sewadal fields */}
                        {formData.isSewadal && step === 0 && (
                            <>
                                <div className="lg:col-span-6 col-span-12">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <Label htmlFor="personalNo" value="Personal No" />
                                            <TextInput
                                                id="personalNo"
                                                type="number"
                                                value={formData.personalNo}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errors.personalNo ? "border-red-500" : ""}`}
                                            />
                                            {errors.personalNo && touchedFields.personalNo && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.personalNo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-6 col-span-12">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <Label htmlFor="sewadalNo" value="Sewadal No" />
                                            <TextInput
                                                id="sewadalNo"
                                                type="text"
                                                value={formData.sewadalNo}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errors.sewadalNo ? "border-red-500" : ""}`}
                                            />
                                            {errors.sewadalNo && touchedFields.sewadalNo && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.sewadalNo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-6 col-span-12">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <Label htmlFor="recruitmentDate" value="Recruitment Date" />
                                            <TextInput
                                                id="recruitmentDate"
                                                type="date"
                                                value={formData.recruitmentDate}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errors.recruitmentDate ? "border-red-500" : ""}`}
                                            />
                                            {errors.recruitmentDate && touchedFields.recruitmentDate && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.recruitmentDate}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-6 col-span-12">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <Label htmlFor="badgeBeltDate" value="Badge-Belt Date" />
                                            <TextInput
                                                id="badgeBeltDate"
                                                type="date"
                                                value={formData.badgeBeltDate}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errors.badgeBeltDate ? "border-red-500" : ""}`}
                                            />
                                            {errors.badgeBeltDate && touchedFields.badgeBeltDate && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.badgeBeltDate}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Navigation buttons */}
                        <div className="col-span-12 flex gap-3 justify-between mt-4">
                            <Button onClick={handlePrevious} disabled={step === 0}>
                                Previous
                            </Button>

                            {step < formSteps.length - 1 ? (
                                <Button color={"primary"} onClick={handleNext} disabled={!isStepValid}>
                                    Next
                                </Button>
                            ) : (
                                <Button color={"primary"} onClick={handleSubmit} disabled={!isStepValid}>
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default FormComponent;
