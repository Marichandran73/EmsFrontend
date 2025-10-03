import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const getDepartmentColumns = (OnDepartmentDelete)=>[
  {
    name: "SNo",
    selector: (row) => row.SNo,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.departmentName,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    
  },
 {
    name: "Actions",
    cell: (row) => (
      <DepartmentButton _id={row._id} OnDepartmentDelete={OnDepartmentDelete} />
    )
  }
];

export const DepartmentButton = ({ _id, OnDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://emsbackend-z0kf.onrender.com/api/department/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        alert('Department deleted successfully!');
        OnDepartmentDelete(_id); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert('Failed to delete department.');
    }
  };

  const handleEdit = () => {
    navigate(`/admin-dashboard/department/${_id}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white w-20 h-7 text-xs px-2 py-1 rounded shadow"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white w-20 h-7 text-xs px-3 py-1 rounded shadow"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
