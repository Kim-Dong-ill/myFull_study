import React, { useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const continents = [
  { key: 1, value: "seoul" },
  { key: 2, value: "busan" },
  { key: 3, value: "gangwon" },
  { key: 4, value: "suwon" },
  { key: 5, value: "daegu" },
];

function PostWrite() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    continents: 1,
    images: [],
  });

  const navigate = useNavigate();

  function handelChange(e) {
    const { name, value } = e.target; //e.target의 값과 속성'name'을 가져온다
    console.log(value, name);
    setProduct((prevState) => {
      //set 안에 함수가 들어가고 인자에 prevState가 들어간다(관례적)
      return {
        ...prevState, //이전의 State를 복사하고 넣을때 사용한다.
        [name]: value, //속성값을 불러올때는 [] 대괄호 안에 넣는다
      };
    });
  }

  async function handelSubmit(e) {
    e.preventDefault(); //form작성하고 전송하면 페이지가 이동되거나 새로고침된다. 그걸 막기위함
    const body = {
      ...product,
    };
    try {
      await axiosInstance.post("/products", body);
      navigate("/"); //useNavigate() 사용해서 작성하면 url로 이동하게끔
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <h2 className="my-5">자료입력</h2>
      {product.title} / {product.description}
      <form onSubmit={handelSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="mb-3 block">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-3 block">
            설명
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.description}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="mb-3 block">
            가격
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.price}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="continents" className="mb-3 block">
            지역
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            name="continents"
            id="continents"
            onChange={handelChange}
            value={product.continents}
          >
            {continents.map((item, idx) => {
              return (
                <option key={idx} value={item.key}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700">
            글작성완료
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostWrite;
