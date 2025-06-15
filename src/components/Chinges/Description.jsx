import { Label, Textarea } from "flowbite-react";

function Description({
  label = "changeable input",
  textColor = "text-white",
  ...props
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="comment" className={textColor}>
          {label}
        </Label>
      </div>
      <Textarea
        id="comment"
        placeholder="Leave a comment..."
        required
        rows={4}
        className={`dark:bg-gray-700 ${textColor}`}
        {...props}
      />
    </div>
  );
}

export default Description;
