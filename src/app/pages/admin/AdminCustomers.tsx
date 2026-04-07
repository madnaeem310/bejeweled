import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { api } from "../../lib/api";

export function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllUsers()
      .then(setCustomers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: "id",
      label: "Customer ID"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "orders",
      label: "Orders"
    },
    {
      key: "spent",
      label: "Total Spent",
      render: (value: number) => `$${value.toLocaleString()}`
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span 
          className="inline-block px-3 py-1 rounded-full text-xs"
          style={{
            backgroundColor: value === "Active" ? '#E0E7FF' : '#F3F4F6',
            color: value === "Active" ? '#4A1942' : '#6B7280'
          }}
        >
          {value}
        </span>
      )
    }
  ];

  const mappedCustomers = customers.map((c) => ({
    id: c._id.slice(-6).toUpperCase(),
    name: `${c.firstName} ${c.lastName}`,
    email: c.email,
    orders: c.orderCount || 0,
    spent: c.totalSpent || 0,
    status: c.isActive ? 'Active' : 'Inactive',
  }));

  return (
    <DataTable
      title="Customers Management"
      columns={columns}
      data={mappedCustomers}
      searchPlaceholder="Search customers..."
    />
  );
}
