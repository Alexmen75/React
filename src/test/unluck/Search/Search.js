import React, {useContext}from "react";
import { observer } from "mobx-react-lite";
import { DispatchContext } from "../context";
import { action } from "mobx";


let Search = function Search({
  searchQuerry
}) {
  return (
    <div>
      <input
        placeholder="Search"
          onInput={action(e => searchQuerry.value = e.target.value)}
          value={searchQuerry.value}
      >
      </input>
      {/* {searchQuerry ? 
        <ToogleMany></ToogleMany>:
        null} */}
    </div>
  );
};


// function ToogleMany() {
//   const dispatch = useContext(DispatchContext);
//   return (
//     <span>
//       <input
//         type="button"
//         value="Mark all"
//         onClick={() => dispatch({type: actions.toogleMany, isDone: true})}
//       >
//       </input>
//       <input
//         type="button"
//         value="Сancel all"
//         onClick={() => dispatch({type: actions.toogleMany, isDone: true})}
//       >
//       </input>
//     </span>
//   )
// }

Search = observer(Search);

export default Search;