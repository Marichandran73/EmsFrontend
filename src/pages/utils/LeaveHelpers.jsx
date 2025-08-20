import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

export const leaveColumns = () => [
  {
    name: "SNo",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Leave Type",
    selector: row => row.leaveType || "-",
    sortable: true,
  },
  {
    name: "Reason",
    selector: row => row.reason || "-",
    wrap: true, 
  },
  {
    name: "From Date",
    selector: row =>
      row.startDate ? format(new Date(row.startDate), "MMM dd, yyyy") : "-",
    sortable: true,
  },
  {
    name: "To Date",
    selector: row =>
      row.endDate ? format(new Date(row.endDate), "MMM dd, yyyy") : "-",
    sortable: true,
  },
  {
    name: "Status",
    selector: row => row.status || "Pending",
    sortable: true,
  },
];


export const LeaveButton = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (_id) => {
    navigate(`/admin-dashboard/ViewLeaves/${_id}`);
    console.log("id:", _id);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
      onClick={() => handleView(Id)}  
    >
      View
    </button>
  );
};


export const AdminLeaveCol=()=>[
  {
    name:"S.no",
    selector : row=> row.SNo,
    sortable: true,
    width:'100ps'
  },
  {
    name:"Emp.Id",
    selector : row=> row.employeeId,
    sortable: true,
    width:'140px',

  },
  {
    name:"Name",
    selector : row=> row.name,
    width:'150px',
  },
  {
    name:"LeaveType",
    selector : row=> row.leaveType,
    width:'200px',
  },
  {
    name:"Department",
    selector : row=> row.departmentName,
    width:'170px',
  },
  {
    name:"Days ",
    selector : row=> row.day,
    width:'80px',

  },
  {
    name:"Status",
    selector : row=> row.status,
    width:"100px"
  },
  {
    name:"Action",
    selector : row=> row.action,
  }
]