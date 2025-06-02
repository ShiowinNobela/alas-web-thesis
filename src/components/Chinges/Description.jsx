import { Label, Textarea } from "flowbite-react";

function Description() {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="comment">Your message</Label>
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." required rows={4} className="dark:bg-gray-700"/>
    </div>
  );
}

export default Description