import { useEffect, useState } from "react";
import { useGetSingleOrAllProductsQuery } from "../../Redux/api/api";
import { useAppSelector } from "../../Redux/feathcer/hoocks";
import SectionTittle from "../Ui/SectionTittle";
import SignleProductCard, { Tproduct } from "../Ui/SignleProductCard";

const HomeAllProducts = () => {
  // const{data}=useGetSingleOrAllProductsQuery({id:"3049e7b6-3cec-4a00-8b37-562825e21bd6"})
  const {loggedInUser}=useAppSelector(a=>a.authStore)

  const [crd, setCrd] = useState({ offset: 0, limit: 10 });

  const { data } = useGetSingleOrAllProductsQuery(crd);

  const { filterStore } = useAppSelector((s) => s);

  useEffect(() => {
    if (filterStore.price.max && filterStore.price.min) {
      setCrd((prev) => ({
        ...prev,
        max: filterStore.price.max,
        min: filterStore.price.min,
        limit: 10,
      }));
    }

    if (filterStore.searchTerm !== "") {
      setCrd((prev) => ({
        ...prev,
        limit: 10,
        search: filterStore.searchTerm,
      }));
    }

    if (filterStore.category !== "") {
      setCrd((prev) => ({
        ...prev,
        limit: 10,
        category: filterStore.category,
      }));
    }

    // if (loggedInUser?.userId) {
    //   setCrd((prev) => ({
    //     ...prev,
    //     limit: 10,
    //     shopFollower:loggedInUser?.userId
    //   }));
    // }
  }, [filterStore]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        console.log("toched.");
        setCrd((prev) => ({ ...prev, limit: prev.limit + 10 }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
 
  return (
    <div className="min-h-[300px] ">
      <SectionTittle txt="All products" />

      {data?.data?.result?.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 pl-5 gap-5">
          {data?.data?.result?.map((item: Tproduct, idx: number) => (
            <SignleProductCard key={idx} data={item} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-5 min-h-[300px] ">
          <h1 className="text-xl font-semibold">No product found</h1>
        </div>
      )}
    </div>
  );
};

export default HomeAllProducts;
