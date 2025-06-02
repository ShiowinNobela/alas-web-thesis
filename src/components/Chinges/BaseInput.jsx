import { Label, TextInput } from "flowbite-react";

function BaseInput ({label = "changable input", onlyNumber = false, ...props}){
  const handleKeyDown = (e) => {
    if (onlyNumber) {
      if (
        !(
          (e.key >= '0' && e.key <= '9') ||
          ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(e.key)
        )
      ) {
        e.preventDefault();
      }
    }
    if (props.onKeyDown) props.onKeyDown(e);
  };
    return(
        <div>
        <div className="mb-2 block">
          <Label htmlFor="base">{label}</Label>
        </div>
        <TextInput id="base"
        type={onlyNumber ? "text" : "text"}
        sizing="md"
        {...props}
        onKeyDown={handleKeyDown}/>
      </div>
    )
}

export default BaseInput