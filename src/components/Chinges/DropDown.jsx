import { Label, Select } from "flowbite-react";

function DropDown() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="spiciness">Spiciness:</Label>
      </div>
      <Select id="spiciness" required>
        <option>Mild</option>
        <option>Spicy</option>
        <option>Very Spicy</option>
        <option>Extreme</option>
      </Select>
    </div>
  );
}

export default DropDown