import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
  return (
    <>
    <h1 className='text-center d-flex justify-content-center align-items-center mt-10'>Department List Page</h1>

    <div>
        <input type="text" className='form-control' placeholder='Search...' />
        <Link to="/admin-dashboard/Add-department">Add new Department</Link>
    </div>
    </>
  )
}

export default DepartmentList