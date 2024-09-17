import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { PiArrowCircleDownRightDuotone, PiBaby } from "react-icons/pi";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { GiBallerinaShoes, GiFishMonster, GiZebraShield } from "react-icons/gi";
import { Si2Fas, SiAdidas, SiNike, SiPuma, SiZara } from "react-icons/si";
import ShoppingProductCard from "../../components/shopping_view/ShoppingProductCard";
import { getShopProductByIdAction, shopProductAction } from "../../store/actions/shopProductAction";
import { useNavigate } from "react-router-dom";
import ShoppingProductDetails from "../../components/shopping_view/ShoppingProductDetails";
import {
  addToCartAction,
  getItemsToCartAction,
} from "../../store/actions/cartAction";
import { toast } from "react-toastify";

const ShoppingHome = () => {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const { productList, productDetials } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: FcBusinessman },
    { id: "women", label: "Women", icon: FcBusinesswoman },
    { id: "kids", label: "Kids", icon: PiBaby },
    {
      id: "accessories",
      label: "Accessories",
      icon: PiArrowCircleDownRightDuotone,
    },
    { id: "footwear", label: "Footwear", icon: GiBallerinaShoes },
  ];

  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "levi", label: "Levi's", icon: Si2Fas },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "h&m", label: "H&M", icon: GiFishMonster },
  ];

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  const handleGetProductDetails = async (getCurrentProductId) => {
    console.log(getCurrentProductId);
    const { payload } = await dispatch(getShopProductByIdAction(getCurrentProductId));
      console.log(payload, "getproduct details by id");
      setOpenDetailsDialog(!openDetailsDialog);
      return payload;
  };

  const handleAddToCart = async (getCurrentProductId) => {
    try {
      const { payload } = await dispatch(
        addToCartAction({
          userId: user?._id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      );
      if (payload?.success) {
        toast.success(payload.message);
        dispatch(getItemsToCartAction(user?._id));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    dispatch(
      shopProductAction({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItemsToCartAction(user?._id));
  }, [dispatch]);

  console.log("product list from home", productList);
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <Carousel
          showThumbs={false} // Disable thumbnails
          showStatus={false} // Disable status indicators
          infiniteLoop={true} // Enable infinite loop
          autoPlay={true} // Enable autoplay
          interval={3000} // Set autoplay interval
          transitionTime={600} // Set transition duration
          swipeable={true} // Allow swipe gestures
          dynamicHeight={true}
        >
          {slides?.map((slide, index) => (
            <div key={index} className="relative h-[700px]">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-fit rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.label}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center"
              >
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryItem.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <div
                key={brandItem.label}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center"
              >
                <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{brandItem.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ShoppingProductCard
              handleGetProductDetails={handleGetProductDetails}
              products={productList}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>
      {openDetailsDialog && (
        <ShoppingProductDetails
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetials}
          handleAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default ShoppingHome;
