import { Button, Label, Select, TextInput } from "flowbite-react";
import React from "react";

// Form field configuration
const formFields = [
  { id: "name", label: "Your Name", type: "text", placeholder: "Your Name", required: true },
  { id: "email1", label: "Your Email", type: "email", placeholder: "name@materialm.com", required: true },
  { id: "password1", label: "Your Password", type: "password", placeholder: "", required: true },
  { id: "country", label: "Country", type: "select", options: ["India", "Canada", "France", "Germany"], required: true },
  { id: "state", label: "State", type: "select", options: ["Delhi", "Gujarat", "Mumbai", "Chennai"], required: true },
  { id: "city", label: "City", type: "select", options: ["Rajkot", "Ahmedabad"], required: true },
];

const FormComponent = () => {
  return (
    <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <h5 className="card-title">Form</h5>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Iterate over formFields and render dynamically */}
          {formFields.map((field, index) => (
            <div key={field.id} className="lg:col-span-6 col-span-12">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor={field.id} value={field.label} />
                  </div>

                  {/* Render input types conditionally */}
                  {field.type === "text" || field.type === "email" || field.type === "password" ? (
                    <TextInput
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="form-control"
                    />
                  ) : field.type === "select" ? (
                    <Select id={field.id} required={field.required} className="select-rounded">
                      {field.options?.map((option, idx) => (
                        <option key={idx}>{option}</option>
                      ))}
                    </Select>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {/* Submit and Cancel buttons */}
          <div className="col-span-12 flex gap-3">
            <Button color={"primary"}>Submit</Button>
            <Button color={"error"}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
