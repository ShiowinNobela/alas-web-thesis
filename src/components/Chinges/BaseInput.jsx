import { Label, TextInput } from "flowbite-react";

function BaseInput (){
    return(
        <div>
        <div className="mb-2 block">
          <Label htmlFor="base">Base input</Label>
        </div>
        <TextInput id="base" type="text" sizing="md"/>
      </div>
    )
}

export default BaseInput