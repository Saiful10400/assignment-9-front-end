import { Outlet } from "react-router";
import DashboardAside from "../Component/adminDashboard/DashboardAside";
import DashboardHeader from "../Component/adminDashboard/DashboardHeader";
import { useState } from "react";

const AdminDashboard = () => {
    //aside bar handle.
    const[showAsideBar,setShowAsideBar]=useState(false)
  return (
    <div className="flex flex-col bg-[#f1f5f9] lg:flex-row items-start gap-10">
      <div className="lg:w-[15%]   fixed lg:sticky top-0">
        <DashboardAside setterFn={setShowAsideBar} setterState={showAsideBar}/>
      </div>
      <div className="lg:w-[80%]    px-3 w-full  min-h-screen flex flex-col gap-7 lg:px-10">
        <DashboardHeader setterFn={setShowAsideBar}  />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
