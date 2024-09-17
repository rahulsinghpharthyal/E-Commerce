import React from 'react';
import { RiMenu3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { IoMdLogOut } from "react-icons/io";
import { logoutAction } from '../../store/actions/authAction';
import { toast } from 'react-toastify';

const AdminHeader = ({setOpen}) => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try{
      const {payload} = await dispatch(logoutAction());
      console.log('this is from logout payload', payload);
      if(payload?.success){
        toast.success(payload?.message)
      }
    }catch(err){
      console.log(err);
    }

  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <button onClick={() => setOpen(true)} className="lg:hidden sm:block">
      <RiMenu3Line/>
      <span className="sr-only">Toggle Menu</span>
    </button>
    <div className="flex flex-1 justify-end">
      <button
        onClick={handleLogout}
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow text-white bg-slate-900  hover:bg-slate-950"
      >
        <IoMdLogOut/>
        Logout
      </button>
    </div>
  </header>
  )
}

export default AdminHeader;