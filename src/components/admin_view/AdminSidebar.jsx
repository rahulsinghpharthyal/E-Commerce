import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import AdminMenuItems from "./AdminMenuItems";

const AdminSidebar = ({open, setOpen}) => {

  const navigate = useNavigate();
  return (
    <>
     {/* Drawer for mobile screens */}
     {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setOpen(false)}
          ></div>
          <div className="relative w-64 bg-white shadow-lg h-full">
            <div className="flex flex-col h-full">
              <div className="border-b p-4 flex items-center gap-2">
                <FaCanadianMapleLeaf size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </div>
              <AdminMenuItems setOpen={setOpen} />
            </div>
          </div>
        </div>
      )}

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <FaCanadianMapleLeaf size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <AdminMenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
