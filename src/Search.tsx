import React from "react";
import { observer } from "mobx-react-lite";
import { action, IObservableValue } from "mobx";

let Search = function Search({
  searchQuerry
}: {
  searchQuerry: IObservableValue<string>
}) {
  return (
    <span>
      <input
        placeholder="Search"
        value={searchQuerry.get()}
        onInput={action((e) => searchQuerry.set(e.currentTarget["value"]))}>
      </input>
    </span>
  );
};

Search = observer(Search);

export default Search;