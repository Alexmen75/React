import React from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

let Search = function Search({
  searchQuerry
}) {
  return (
    <span>
      <input
        placeholder="Search"
        value={searchQuerry.get()}
        onInput={action((e) => searchQuerry.set(e.target.value))}>
      </input>
    </span>
  );
};

Search = observer(Search);

export default Search;