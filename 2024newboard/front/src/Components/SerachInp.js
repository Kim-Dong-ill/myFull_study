import React from "react";

function SerachInp({ searchForm, onSearch }) {
  return (
    <input
      className="px-2 py-4 border"
      type="text"
      placeholder="검색하세요"
      onChange={onSearch}
      value={searchForm}
    />
  );
}

export default SerachInp;
