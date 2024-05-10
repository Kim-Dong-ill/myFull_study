import React from "react";

function RadioBox({ prices, checkedPrice, onFilters }) {
  return (
    <div>
      <h2>금액</h2>
      <div className="flex gap-4">
        {prices?.map((price, idx) => {
          return (
            <div key={idx} className="py-4 px-2">
              <input
                type="radio"
                id={`radio${price._id}`}
                name="radio"
                checked={checkedPrice === price.array}
                onChange={(e) => {
                  onFilters(e.target.value);
                }}
                value={price._id}
              />
              <label htmlFor={`radio${price._id}`}>{price.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RadioBox;
