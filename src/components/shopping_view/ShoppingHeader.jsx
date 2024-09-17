import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import HeaderRightContent from "./HeaderRightContent";


const MenuItem = ({isMenuOpen, setIsMenuOpen}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleNavigate = (getCurrentMenuItem) => {
    console.log('this is currentMenuItem', getCurrentMenuItem);
    if(isMenuOpen)setIsMenuOpen(!isMenuOpen)
    sessionStorage.removeItem('filters');
    const currentFilter = getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products' ? {
      category : [getCurrentMenuItem.id]
    } : null

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    location.pathname.includes('listing') && currentFilter !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) :
    navigate(getCurrentMenuItem.path)
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems?.map((menuItem) => (
        <label
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer"
          onClick={()=>handleNavigate(menuItem)}
        >
          {" "}
          {menuItem.label}
        </label>
      ))}
    </nav>
  );
};



const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link t0="/shop/home" className="flex items-center gap-2">
          <FaHome className="h-6 w-6" />
          <span>Ecommerce</span>
        </Link>
        <button className="lg:hidden p-2 border rounded-md bg-slate-900 text-white" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
          <CiMenuFries className="h-6 w-6" />
          <span className="sr-only">Toggle header menu</span>
        </button>
        {
          isMenuOpen && (
            <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:hidden`}
          >
            <button
              className="p-2 border-b w-full text-right bg-slate-900 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>
            <div className="p-4">
              <MenuItem isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            </div>
          </div>
          )
        }

        <div className="hidden lg:block">
          <MenuItem />
        </div>
        {isAuthenticated ? (
          <div className="hidden lg:block">
            <HeaderRightContent/>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default ShoppingHeader;
