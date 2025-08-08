export const getSalaryColumns = () => [
  {
    name: 'S.No',
    selector: (row) => row.SNo,
    sortable: true,
  },
  {
    name: 'Employee ID',
    selector: (row) => row.employeeId,
    sortable: true,
  },
  {
    name: 'Basic Salary (₹)',
    selector: (row) => row.Salary,
    sortable: true,
  },
  {
    name: 'Allowances (₹)',
    selector: (row) => row.Allowances,
    sortable: true,
  },
  {
    name: 'Deductions (₹)',
    selector: (row) => row.Deductions,
    sortable: true,
  },
  {
    name: 'Net Salary (₹)',
    selector: (row) => row.Total,
    sortable: true,
  },
  {
    name: 'Pay Date',
    selector: (row) => new Date(row.PayDate).toLocaleDateString(),
    sortable: true,
  },
];
