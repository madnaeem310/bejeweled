import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { api } from "../../lib/api";

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: "id",
      label: "Order ID"
    },
    {
      key: "customer",
      label: "Customer"
    },
    {
      key: "date",
      label: "Date"
    },
    {
      key: "total",
      label: "Total",
      render: (value: number) => `$${value.toLocaleString()}`
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span 
          className="inline-block px-3 py-1 rounded-full text-xs"
          style={{
            backgroundColor: 
              value === "Completed" ? '#E0E7FF' :
              value === "Processing" ? '#FEF3C7' :
              value === "Pending" ? '#FEE2E2' :
              '#F3F4F6',
            color: 
              value === "Completed" ? '#4A1942' :
              value === "Processing" ? '#92400E' :
              value === "Pending" ? '#DC2626' :
              '#6B7280'
          }}
        >
          {value}
        </span>
      )
    }
  ];

  const mappedOrders = orders.map((o) => ({
    id: `#${o._id.slice(-6).toUpperCase()}`,
    customer: `${o.user?.firstName || ''} ${o.user?.lastName || ''}`,
    date: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    total: o.total,
    status: o.status,
  }));

  return (
    <DataTable
      title="Orders Management"
      columns={columns}
      data={mappedOrders}
      searchPlaceholder="Search orders..."
    />
  );
}
