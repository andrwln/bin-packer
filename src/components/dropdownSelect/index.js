import React from "react";

import { setDimensions } from "../../store/features/canvas/actions";

import "./dropdownSelect.scss";

const DropdownSelect = ({ items, type, dispatch }) => {
  let options = [];
  let showEl;

  function handleSelectedOption(e) {
    //using onClick and e.detail allows the event to be fired even
    //if the same value is selected
    if (e.detail === 0) {
      const selectedItem = items[e.target.value];
      const dimensions =
        type === "canvas"
          ? selectedItem.printable_dimensions
          : selectedItem.dimensions;
      dispatch(
        setDimensions({
          type: type,
          payload: dimensions
        })
      );
    }
  }

  items.forEach((item, idx) => {
    options.push(
      <option key={idx} value={idx}>
        {item.name}
      </option>
    );
  });
  showEl = (
    <div className="dropdown select is-small">
      <select type="select" onClick={e => handleSelectedOption(e)}>
        {options}
      </select>
    </div>
  );

  return <React.Fragment>{showEl}</React.Fragment>;
};

export default DropdownSelect;
