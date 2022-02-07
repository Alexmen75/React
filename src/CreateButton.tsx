import React from "react";
import { observer } from "mobx-react-lite";
import { Todo, Todos } from "./model";
import { action, IObservableArray, observable } from "mobx";

let CreateButton = function CreateButton({
  empty
}: {
  empty: IObservableArray<Todo>
}): JSX.Element {
  return (
    <div>
      <input
        type="button"
        value="Add"
        onClick={action(() => empty.push(new Todo(-1, "", false)))}>
      </input>
    </div>
  );
};

CreateButton = observer(CreateButton);

export default CreateButton;