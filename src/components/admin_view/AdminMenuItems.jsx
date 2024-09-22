import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiDeerTrack } from "react-icons/gi";
import { FcShipped } from "react-icons/fc";

const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LuLayoutDashboard/>,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <FcShipped />,
    },
    {
      id: "traking",
      label: "Track Performance",
      path: "/admin/track-performance",
      icon: <GiDeerTrack />,
    },
  ];
const AdminMenuItems = ({setOpen}) => {
    const navigate = useNavigate();
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {adminSidebarMenuItems?.map((menuItem) => (
          <div
            key={menuItem?.id}
            onClick={() => {
              navigate(menuItem?.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {menuItem?.icon}
            <span>{menuItem?.label}</span>
          </div>
        ))}
      </nav>
    )
}

export default AdminMenuItems