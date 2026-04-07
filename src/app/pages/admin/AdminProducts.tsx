import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { api } from "../../lib/api";

export function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllProductsAdmin()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: "_id",
      label: "ID",
      render: (value: string) => value.slice(-6).toUpperCase()
    },
    {
      key: "image",
      label: "Image",
      render: (_value: string, row: any) => (
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
          <ImageWithFallback
            src={row.images?.[0] || ''}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "category",
      label: "Category"
    },
    {
      key: "price",
      label: "Price",
      render: (value: number) => `$${value.toLocaleString()}`
    },
    {
      key: "status",
      label: "Status",
      render: (_value: string, row: any) => {
        const status = row.isActive ? "Active" : "Inactive";
        return (
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs"
            style={{
              backgroundColor: status === "Active" ? '#E0E7FF' : '#FEE2E2',
              color: status === "Active" ? '#4A1942' : '#DC2626'
            }}
          >
            {status}
          </span>
        );
      }
    }
  ];

  const mappedProducts = products.map((p) => ({
    ...p,
    image: p.images?.[0] || '',
    status: p.isActive ? 'Active' : 'Inactive',
  }));

  return (
    <DataTable
      title="Products Management"
      columns={columns}
      data={mappedProducts}
      addNewLink="/admin/products/add"
      addNewLabel="Add Product"
      searchPlaceholder="Search products..."
    />
  );
}
