import React from "react";
import { IoIosCloudDone } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className={`flex items-center p-5 rounded-2xl shadow-md ${color} text-white`}>
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{text}</p>
        <h2 className="text-2xl font-bold">{number}</h2>
      </div>
    </div>
  );
};

const AdminSetting = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          icon={<IoIosCloudDone />}
          text="Leave Approved"
          number={12}
          color="bg-green-500"
        />
        <SummaryCard
          icon={<MdOutlineCancel />}
          text="Leave Rejected"
          number={5}
          color="bg-red-500"
        />
        <SummaryCard
          icon={<MdPendingActions />}
          text="Leave Pending"
          number={7}
          color="bg-yellow-500"
        />
      </div>

      {/* Employee Leave Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4">Employee Name</th>
              <th className="py-3 px-4">Leave Type</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">End Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-t">
              <td className="py-3 px-4">Mohan</td>
              <td className="py-3 px-4">Sick Leave</td>
              <td className="py-3 px-4">12-08-2025</td>
              <td className="py-3 px-4">16-08-2025</td>
              <td className="py-3 px-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Approved
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">Arun</td>
              <td className="py-3 px-4">Casual Leave</td>
              <td className="py-3 px-4">20-08-2025</td>
              <td className="py-3 px-4">21-08-2025</td>
              <td className="py-3 px-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSetting;
