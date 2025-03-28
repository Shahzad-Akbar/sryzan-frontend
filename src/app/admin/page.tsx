'use client';

import { useState, useEffect } from 'react';
import { Users, Coffee, ShoppingBag, TrendingUp } from 'lucide-react';
import { LineChart } from './components/LineChart';
import { BarChart } from './components/BarChart';

const stats = [
  { name: 'Total Users', icon: Users, value: '0', bgColor: 'bg-blue-500' },
  { name: 'Restaurants', icon: Coffee, value: '0', bgColor: 'bg-green-500' },
  {
    name: 'Total Orders',
    icon: ShoppingBag,
    value: '0',
    bgColor: 'bg-purple-500',
  },
  { name: 'Revenue', icon: TrendingUp, value: '$0', bgColor: 'bg-yellow-500' },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    dailyRevenue: [
      { date: '2024-01-01', revenue: 1200 },
      { date: '2024-01-02', revenue: 1800 },
      { date: '2024-01-03', revenue: 2400 },
      { date: '2024-01-04', revenue: 2100 },
      { date: '2024-01-05', revenue: 2800 },
      { date: '2024-01-06', revenue: 3200 },
      { date: '2024-01-07', revenue: 3600 },
    ],
    ordersByStatus: [
      { name: 'Pending', value: 15 },
      { name: 'Processing', value: 25 },
      { name: 'Completed', value: 45 },
      { name: 'Cancelled', value: 5 },
    ],
    recentOrders: [
      {
        id: 1,
        customer: 'John Doe',
        restaurant: 'Pizza Palace',
        status: 'Completed',
        amount: 45.99,
      },
      {
        id: 2,
        customer: 'Jane Smith',
        restaurant: 'Burger Hub',
        status: 'Processing',
        amount: 32.5,
      },
      {
        id: 3,
        customer: 'Mike Johnson',
        restaurant: 'Sushi Express',
        status: 'Pending',
        amount: 78.25,
      },
      {
        id: 4,
        customer: 'Sarah Wilson',
        restaurant: 'Taco Time',
        status: 'Completed',
        amount: 25.99,
      },
      {
        id: 5,
        customer: 'Tom Brown',
        restaurant: 'Pasta Place',
        status: 'Processing',
        amount: 56.75,
      },
    ],
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/admin/stats');
        const data = await res.json();

        if (data.status === 500) {
          setLoading(false);
          return;
        }

        const statData = data.data;

        setDashboardData({
          dailyRevenue: statData.dailyRevenue,
          ordersByStatus: statData.ordersByStatus,
          recentOrders: statData.recentOrders,
        });

        stats[0].value = statData.totalUsers;
        stats[1].value = statData.totalRestaurants;
        stats[2].value = statData.totalOrders;
        stats[3].value = statData.totalRevenue;
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          An overview of your restaurant management system
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                {loading ? (
                  <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                )}
              </dd>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Revenue Trend</h3>
            <LineChart data={dashboardData.dailyRevenue} />
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <BarChart data={dashboardData.ordersByStatus} title="Order Status Distribution" />
          </div>
        </div>

        <div className="col-span-2 rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.recentOrders?.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.restaurant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
