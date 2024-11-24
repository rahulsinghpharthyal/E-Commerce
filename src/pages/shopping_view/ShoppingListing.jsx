import React, { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import { RiArrowUpDownLine } from "react-icons/ri";
import { sortOptions } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductCard from "../../components/shopping_view/ShoppingProductCard";
import {
  getShopProductByIdAction,
  shopProductAction,
} from "../../store/actions/shopProductAction";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ShoppingProductDetails from "../../components/shopping_view/ShoppingProductDetails";
import { addToCartAction, getItemsToCartAction } from "../../store/actions/cartAction";

// this is for our search parameter url be cahnge'
const createSearchParamsHelper = (filterParams) => {
  // console.log('tis is fiterpara', filterParams);
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  // console.log('this is queryParams', queryParams);
  return queryParams.join("&");
};

const ShoppingListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { productList, productDetials } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state)=> state.auth);

  const categorySearchParam = searchParams.get('category')

  const handleFilter = (getSectionId, getCurrentOption) => {
    console.log(getSectionId, getCurrentOption);
    let copyFilters = { ...filter };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    // console.log(indexOfCurrentSection);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    // console.log('this is copy filter', copyFilters);
    setFilter(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const handleGetProductDetails = async (id) => {
    try {
      // console.log("this is product id ", id);
      const { payload } = await dispatch(getShopProductByIdAction(id));
      // console.log(payload, "getproduct details by id");
      setOpenProductDetails(!openProductDetails);
      return payload;
    } catch (err) {
      toast.error("Error get Detail of product", err.message);
    }
  };

  const handleAddToCart = async (getProductId) => {
    try{
    const {payload}= await dispatch(addToCartAction({userId: user._id, productId: getProductId, quantity: 1}))
    if(payload.success){
      toast.success(payload.message)
      dispatch(getItemsToCartAction(user?._id))
    }
    }catch(err){
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      console.log("this is the createQueryString", createQueryString);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter]);

  useEffect(() => {
    setSort("price-lowtohigh");
    const filterData = JSON.parse(sessionStorage.getItem("filters"));
    setFilter(filterData || {});
  }, [categorySearchParam]);

  // console.log('filter',filter);

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(shopProductAction({ filterParams: filter, sortParams: sort }));
  }, [dispatch, sort, filter]);


  useEffect(()=>{
    if(productDetials.length > 0)
    setOpenProductDetails(!openProductDetails) 
  },[productDetials])

  console.log(searchParams.toString());
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">All Products</h2>
          <div className="flex items-center gap-10">
            <span className="text-slate-400">
              {productList?.length} Products
            </span>
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                <RiArrowUpDownLine className="h-4 w-4" />
                <span>Sort by</span>
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2">
                    {sortOptions.map((sortItem) => (
                      <label
                        key={sortItem.id}
                        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                      >
                        <span className="text-sm font-medium text-gray-800">
                          {sortItem.label}
                        </span>
                        <input
                          type="radio"
                          name="sortOption"
                          checked={sort === sortItem.id}
                          onClick={() => {
                            setSort(sortItem.id);
                            setIsOpen(!isOpen);
                            // Close dropdown after selecting
                          }}
                          className="form-radio h-4 w-4 text-slate-900 focus:ring-slate-900 border-gray-300"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 dm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <ShoppingProductCard
            products={productList}
            handleGetProductDetails={handleGetProductDetails}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {openProductDetails && (
        <ShoppingProductDetails
          open={openProductDetails}
          setOpen={setOpenProductDetails}
          productDetails={productDetials}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ShoppingListing;
