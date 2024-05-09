import React from "react";

function CheckBox({ continents, checkedContinents, onFilters }) {
  const handleToggle = (continentsId) => {
    const currentIndex = checkedContinents.indexOf(continentsId); //없으면 -1 있으면 해당 데이터의 index값나옴

    const newChecked = [...checkedContinents];
    if (currentIndex === -1) {
      newChecked.push(continentsId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 ">
      {continents?.map((continents, idx) => {
        return (
          <div className="bg-blue-100 px-2 py-4" key={idx}>
            <input
              //   hidden
              type="checkbox"
              id={continents._id}
              onChange={() => {
                handleToggle(continents._id);
              }}
              checked={
                checkedContinents.indexOf(continents._id) === -1 ? false : true
              } //indexOf는 ()안에 정보가 있는지 없는지 -1은 없는거다. 정보가 있다면 해당 정보의 index가 나온다.
              //정보가 있으면 체크, 없으면 체크안함
            />
            <label htmlFor={continents._id}> {continents.name}</label>
          </div>
        );
      })}
    </div>
  );
}

export default CheckBox;
