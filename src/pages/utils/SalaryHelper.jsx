export const getSalaryColumns = () => [
  {
    name: 'S.No',
    selector: (row, index) => index + 1, 
    sortable: true,
  },
  {
    name: 'Employee ID',
    selector: (row) => row.employeeId || '-',
    sortable: true,
  },
  {
    name: 'Basic Salary (₹)',
    selector: (row) => row.basicSalary ?? 0,
    sortable: true,
  },
  {
    name: 'Allowances (₹)',
    selector: (row) => row.allowances ?? row.allowences ?? 0, 
    sortable: true,
  },
  {
    name: 'Deductions (₹)',
    selector: (row) => row.deduction ?? 0,
    sortable: true,
  },
  {
    name: 'Net Salary (₹)',
    selector: (row) => row.netSalary,
    sortable: true,
  },
  {
    name: 'Pay Date',
    selector: (row) =>
      row.payDate ? new Date(row.payDate).toLocaleDateString() : '-',
    sortable: true,
  },
];
