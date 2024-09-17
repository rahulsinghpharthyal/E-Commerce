import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { LuBedSingle, LuLogOut } from "react-icons/lu";
import { logoutAction } from "../../store/actions/authAction";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserCartWrapper from "./UserCartWrapper";
import { getItemsToCartAction } from "../../store/actions/cartAction";

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("this is user from HeaderRightContent", user.userName);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cartItems } = useSelector((state) => state.shopcart);

  console.log(cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { payload } = await dispatch(logoutAction());
      if (payload?.success) {
        toast.success(payload?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error on Logout", err.message);
    }
  };

  useEffect(() => {
    dispatch(getItemsToCartAction(user?._id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 h-full">
      <div>
        <button onClick={() => setOpenCart(!openCart)}>
          <FaShoppingCart className="w-6 h-6 mt-4 mr-3" />
          <span className="sr-only">User cart</span>
          {cartItems?.items?.length > 0 && (
            <div className="absolute top-3 right-20 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              <span>{cartItems?.items?.length}</span>
            </div>
          )}
        </button>
        {openCart ? (
          <div>
            <UserCartWrapper
              openCart={openCart}
              setOpenCart={setOpenCart}
              cartItems={cartItems}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="relative">
        <button
          className="flex items-center bg-black text-white rounded-full w-10 h-10 justify-center"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span>{user?.userName[0].toUpperCase()}</span>
        </button>
        {openDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
            <div className="p-4 border-b">
              <p className="text-sm font-medium">Logged in as</p>
              <p className="text-sm">{user?.userName}</p>
            </div>
            <button
              onClick={() =>{setOpenDropdown(!openDropdown); navigate("/shop/account");}}
              className="flex items-center w-full p-2 hover:bg-gray-100"
            >
              <MdAccountBox className="w-4 h-4 mr-2" />
              Account
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 hover:bg-gray-100"
            >
              <LuLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderRightContent;
