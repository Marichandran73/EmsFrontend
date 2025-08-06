import React from "react";
import SummaryCard from "./SummaryCard";
import { FaUserSecret } from "react-icons/fa";
import { FaUsers, FaBuilding, FaTachometerAlt } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";

const AdminSummary = () => {
  return (
    <div className="flex">
      <div className="w-64 hidden md:block" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 space-y-12">
        {/* Dashboard Overview */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-left mb-8 mt-4">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              icon={<FaUsers />}
              text="Active Employees"
              number={25}
            />
            <SummaryCard
              icon={<FaBuilding />}
              text="Total Departments"
              number={5}
            />
            <SummaryCard
              icon={<CiMoneyCheck1 />}
              text="Salary"
              number="$20,0000"
            />
          </div>
        </div>

        {/* Leave Section */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-left mb-8">
            Leave
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SummaryCard
                icon={<IoNewspaperOutline />}
                text="Leave Applied"
                number={3}
              />
              <SummaryCard
                icon={<IoIosCloudDone />}
                text="Leave Approved"
                number={4}
              />
              <SummaryCard
                icon={<MdPendingActions />}
                text="Leave Pending"
                number={5}
              />
              <SummaryCard
                icon={<MdCancel />}
                text="Leave Rejected"
                number={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
