import { Outlet } from "react-router-dom";
import Aside from "../Component/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className='md:ml-[300px] ml-4'> <Outlet/></div>
    </div>
  );
};

export default DashboardLayout;
