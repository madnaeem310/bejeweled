import { Search, Plus } from "lucide-react";
import { Link } from "react-router";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  addNewLink?: string;
  addNewLabel?: string;
  searchPlaceholder?: string;
}

export function DataTable({ 
  title, 
  columns, 
  data, 
  addNewLink,
  addNewLabel = "Add New",
  searchPlaceholder = "Search..."
}: DataTableProps) {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl mb-2"
          style={{ 
            fontFamily: 'Georgia, serif',
            color: '#4A1942'
          }}
        >
          {title}
        </h1>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Top Bar */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
              />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-current transition-colors"
                style={{ borderColor: '#E6D5F0' }}
              />
            </div>
          </div>

          {/* Add New Button */}
          {addNewLink && (
            <Link
              to={addNewLink}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#4A1942' }}
            >
              <Plus className="w-5 h-5" />
              <span>{addNewLabel}</span>
            </Link>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: '#5C3A5E' }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr 
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td 
                      key={column.key}
                      className="px-6 py-4"
                      style={{ color: '#4A1942' }}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {data.length} results
          </p>
          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 border rounded-lg text-sm transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E6D5F0', color: '#4A1942' }}
            >
              Previous
            </button>
            <button 
              className="px-4 py-2 border rounded-lg text-sm transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E6D5F0', color: '#4A1942' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
