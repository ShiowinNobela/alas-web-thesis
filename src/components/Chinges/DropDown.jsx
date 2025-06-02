import { Label, Select } from "flowbite-react";

function DropDown({label = "changeable input", options = [], ...props}) {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="spiciness">{label}:</Label>
      </div>
      <Select id="spiciness" required {...props}>
         {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default DropDown