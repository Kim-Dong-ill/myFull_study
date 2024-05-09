import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../Components/CardItem";
import { continents, prices } from "../utils/filterData";
import CheckBox from "../Components/CheckBox";
import SerachInp from "../Components/SerachInp";

function MainPage() {
  const [products, setProducts] = useState([]);

  const limit = 4; //한 화면에 4개씩 보이게
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [1, 2], //1,2,4 이런 체크한 id가 들어간다.
    price: [],
  });

  //search
  const [searchForm, setSearchForm] = useState("");

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
  }) => {
    const params = {
      skip,
      limit,
      filters,
    };
    try {
      const res = await axiosInstance.get("/products", { params });
      console.log(res.data);

      if (loadMore) {
        //loadMore가 참일때 (데이터가 더 있을때)
        setProducts([...products, ...res.data.products]); //더보기 했을때 나와있던 데이터는 그대로 두고 추가로 나와야하기때문에
      } else {
        setProducts(res.data.products);
      }
      setHasMore(res.data.hasMore); //back에서 asios로 해당 값이 온다.
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  function handelLoadMore() {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
    };
    fetchProducts(body);
    setSkip(Number(skip) + Number(limit));
  }

  function handleFilter(newFilteredData) {
    //체크박스 클릭시 해당 _id가 담겨서 오게했다.
    console.log(newFilteredData);
    const newFilters = { ...filters }; //filters를 대괄호 벗겨서 복사한다.
    newFilters["continents"] = newFilteredData; //contitnents에 newFilteredData를 넣는다.

    showFilterResult(newFilters); //DB에 가서 저장하기위해 필요하다.

    setFilters(newFilters); //화면에 보여주는걸 변경한다.
  }

  function showFilterResult(filters) {
    console.log(filters);
    const body = {
      skip: 0,
      limit,
      filters,
    };
    fetchProducts(body);
    setSkip(0);
  }

  //search 함수
  function handleSearch(e) {
    console.log(e.target.value);
    setSearchForm(e.target.value);
  }

  return (
    <section>
      <h2>글 리스트</h2>

      {/* filter */}
      <div className="flex gap-3 mb-4">
        <div className="w-full px-2">
          <h3>지역 선택</h3>
          <div>
            <CheckBox
              continents={continents}
              checkedContinents={filters.continents}
              onFilters={(filters) => {
                handleFilter(filters);
              }}
            />
          </div>
        </div>
        {/* <div className="w-1/2">radio</div> */}
      </div>

      {/* search */}
      <div className="flex justify-end mb-3">
        <SerachInp searchForm={searchForm} onSearch={handleSearch} />
      </div>

      {/* products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
        {products &&
          products.map((product, idx) => {
            return <CardItem key={idx} product={product} />;
          })}
      </div>

      {/* more */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handelLoadMore}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
}

export default MainPage;
