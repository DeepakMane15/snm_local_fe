export interface FormFieldModel {
    id: string;
    label: string;
    type: "text" | "email" | "password" | "number" | "select" | "checkbox" | "date";
    placeholder?: string;
    required: boolean;
    options?: string[]; // Only for select fields
}