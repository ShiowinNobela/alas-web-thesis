import { Label, Textarea } from "flowbite-react";

function Description({label = "changeable input", ...props}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="comment">{label}</Label>
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." required rows={4} className="dark:bg-gray-700" {...props}/>
    </div>
  );
}

export default Description