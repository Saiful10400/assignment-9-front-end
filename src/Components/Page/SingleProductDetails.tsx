import { useParams } from "react-router";
import { useGetSingleOrAllProductsQuery } from "../../Redux/api/api";
import { Link } from "react-router-dom";
import { FlipHorizontal, Star, StarHalfIcon } from "lucide-react";
import SectionTittle from "../Ui/SectionTittle";
import "./css/singlleProduct.css";
import { useState } from "react";

type Tproduct = {
  image: string;
  name: string;
  productId: string;
  categoryref: {
    name: string;
  };
  description: string;
  flashSale: boolean;
  inventoryCount: number;
  price: number;
  _count: {
    review: number;
  };
  created: string; // ISO 8601 timestamp
  shop: {
    name: string;
    logo: string;
    shopId: string;
  };
};

const SingleProductDetails = () => {
  const { id } = useParams();

  const { data } = useGetSingleOrAllProductsQuery({ id });

  const product: Tproduct = data?.data;
  const { data: sameCAtgoryData } = useGetSingleOrAllProductsQuery({
    category: product?.categoryref?.name,
  });

  const thisCategoryDatas: Tproduct[] = sameCAtgoryData?.data?.result;


  const[product1,setProduct1]=useState(null)
  const[product2,setProduct2]=useState(null)



  return (
    <div className="lg:mt-16">
      <div>
        {/* product description. */}

        <div className="flex flex-col lg:flex-row items-start lg:gap-16">
          <img className="w-[500px] object-cover" src={product?.image} alt="" />

          <div>
            <h1 className="text-4xl font-bold">{product?.name}</h1>

            <div className="mt-5">
              <span className="bg-gray-200 p-1 rounded-md shadow-md font-semibold">
                {product?.categoryref?.name}
              </span>
            </div>

            <Link
              to={`/shop/${product?.shop?.shopId}`}
              className="flex items-center gap-5 mt-8"
            >
              <img
                className="w-[50px] rounded-full object-cover h-[50px]"
                src={product?.shop?.logo}
                alt=""
              />
              <span className="font-semibold">{product?.shop?.name}</span>
            </Link>

            <h1 className="text-4xl font-bold mt-3">
              Price: {product?.price} Tk{" "}
              <span className="text-xs font-mono">
                (only {product?.inventoryCount} on stock.)
              </span>
            </h1>

            <div className="flex gap-1 mt-4">
              <Star fill="#faca51" color="#faca51" />
              <Star fill="#faca51" color="#faca51" />
              <Star fill="#faca51" color="#faca51" />
              <Star fill="#faca51" color="#faca51" />
              <StarHalfIcon fill="#faca51" color="#faca51" />
              <span>({product?._count.review})</span>
            </div>

            <div className="flex gap-2">
              <button className="btn  text-lg lg:px-36 mt-5 hover:text-black btn-primary bg-[#f27f20] text-white hover:bg-transparent hover:border-[#f27f20] border-[#f27f20]">
                Add to cart
              </button>
              <a
                href="#compare"
                className="btn  text-lg  mt-5 hover:text-black btn-primary bg-[#f27f20] text-white hover:bg-transparent hover:border-[#f27f20] border-[#f27f20]"
              >
                <FlipHorizontal />
              </a>
            </div>
          </div>
        </div>

        {/* description */}

        <SectionTittle txt="Description" />
        <p className="mt-3">{product?.description}</p>
      </div>

      {/* comparison */}
      <div id="compare" className="mt-16">
      <SectionTittle txt="Compare" />
      <div className="">
        <div>
         

          <table className="w-full">
            <thead>
              <tr>

                <th></th>
                <th>
                  <select
                    disabled
                    value={JSON.stringify(product)}
                    className="w-full"
                  >
                    <option value="">Select one</option>
                    {thisCategoryDatas?.map((item) => (
                      <option
                        key={item?.productId}
                        value={JSON.stringify(item)}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </th>

 
                <th>
                  <select onChange={(e)=>setProduct1(JSON.parse(e.target.value))} className="w-full">
                    <option value="">Select one</option>
                    {thisCategoryDatas?.map((item) => (
                      <option
                        key={item?.productId}
                        value={JSON.stringify(item)}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </th>




                <th>
                  <select onChange={(e)=>setProduct2(JSON.parse(e.target.value))} className="w-full">
                    <option value="">Select one</option>
                    {thisCategoryDatas?.map((item) => (
                      <option
                        key={item?.productId}
                        value={JSON.stringify(item)}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </th>




              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td></td>
                <td> <img className="h-[200px] mx-auto" src={product?.image} alt="" /></td>
                <td> <img className="h-[200px] mx-auto" src={product1?.image} alt="" /></td>
                <td> <img className="h-[200px] mx-auto" src={product2?.image} alt="" /></td>
                
              </tr>
              <tr>
                <td>Name</td>
                <td>{product?.name}</td>
                <td>{product1?.name}</td>
                <td>{product2?.name}</td>
              </tr>
              <tr>
                <td>Price (tk)</td>
                <td>{product?.price} </td>
                <td>{product1?.price} </td>
                <td>{product2?.price} </td>
              </tr>
              <tr>
                <td>Store</td>
                <td>{product?.shop?.name}</td>
                <td>{product1?.shop?.name} </td>
                <td>{product2?.shop?.name}</td>
              </tr>
              <tr>
                <td>Available stock (pc)</td>
                <td>{product?.inventoryCount}</td>
                <td>{product1?.inventoryCount} </td>
                <td>{product2?.inventoryCount}</td>
              </tr>
              <tr>
                <td>Flash seal</td>
                <td>{product?.flashSale?"Yes":"No"}</td>
                <td>{product1 ?product1?.flashSale?"Yes":"No":""} </td>
                <td>{product2 ?product2?.flashSale?"Yes":"No":""}</td>
              </tr>
             
              
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;