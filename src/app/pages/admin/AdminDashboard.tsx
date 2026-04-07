import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users as UsersIcon, Package } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../../lib/api";

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    {
      title: "Total Sales",
      value: stats ? `$${stats.totalSales?.toLocaleString() || 0}` : '...',
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "#4A1942"
    },
    {
      title: "Orders",
      value: stats ? `${stats.totalOrders?.toLocaleString() || 0}` : '...',
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "#4A1942"
    },
    {
      title: "Customers",
      value: stats ? `${stats.totalUsers?.toLocaleString() || 0}` : '...',
      change: "+23.1%",
      trend: "up",
      icon: UsersIcon,
      color: "#4A1942"
    },
    {
      title: "Products",
      value: stats ? `${stats.totalProducts || 0}` : '...',
      change: "+5",
      trend: "up",
      icon: Package,
      color: "#4A1942"
    }
  ];

  const chartData = stats?.monthlySales?.map((m: any) => ({
    month: m._id,
    sales: m.sales,
  })) || [];

  const recentOrders = stats?.recentOrders?.map((order: any) => ({
    id: `#${order._id.slice(-6).toUpperCase()}`,
    customer: `${order.user?.firstName || ''} ${order.user?.lastName || ''}`,
    product: order.items?.[0]?.name || 'N/A',
    amount: `$${order.total?.toLocaleString()}`,
    status: order.status,
  })) || [];

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
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(74, 25, 66, 0.1)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <div 
                  className="flex items-center gap-1 text-sm"
                  style={{ 
                    color: metric.trend === "up" ? '#10B981' : '#EF4444'
                  }}
                >
                  <TrendIcon className="w-4 h-4" />
                  <span>{metric.change}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{metric.title}</p>
              <p 
                className="text-2xl"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#4A1942'
                }}
              >
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 
            className="text-xl mb-6"
            style={{ 
              fontFamily: 'Georgia, serif',
              color: '#4A1942'
            }}
          >
            Sales Overview
          </h2>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6D5F0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#5C3A5E"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#5C3A5E"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #E6D5F0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#4A1942" 
                  strokeWidth={2}
                  dot={{ fill: '#4A1942', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 
            className="text-xl mb-6"
            style={{ 
              fontFamily: 'Georgia, serif',
              color: '#4A1942'
            }}
          >
            Recent Orders
          </h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-1">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: '#4A1942' }}
                  >
                    {order.id}
                  </p>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: 
                        order.status === "Completed" ? 'rgba(16, 185, 129, 0.1)' :
                        order.status === "Processing" ? 'rgba(59, 130, 246, 0.1)' :
                        'rgba(245, 158, 11, 0.1)',
                      color:
                        order.status === "Completed" ? '#10B981' :
                        order.status === "Processing" ? '#3B82F6' :
                        '#F59E0B'
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{order.customer}</p>
                <p className="text-xs text-gray-500 mb-1">{order.product}</p>
                <p 
                  className="text-sm"
                  style={{ color: '#4A1942' }}
                >
                  {order.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}