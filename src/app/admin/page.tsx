'use client';

import { useState, useEffect } from 'react';
import { Users, Coffee, ShoppingBag, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Users', icon: Users, value: '0', bgColor: 'bg-blue-500' },
  { name: 'Restaurants', icon: Coffee, value: '0', bgColor: 'bg-green-500' },
  { name: 'Total Orders', icon: ShoppingBag, value: '0', bgColor: 'bg-purple-500' },
  { name: 'Revenue', icon: TrendingUp, value: '$0', bgColor: 'bg-yellow-500' },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard stats
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
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
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                {loading ? (
                  <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                )}
              </dd>
            </div>
          );
        })}
      </div>

      {/* TODO: Add charts and recent activity */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Orders
            </h3>
            {/* Add orders table/list here */}
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Popular Restaurants
            </h3>
            {/* Add restaurants stats here */}
          </div>
        </div>
      </div>
    </div>
  );
}
