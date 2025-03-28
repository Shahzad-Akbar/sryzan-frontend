'use client';

import { useState, useEffect } from 'react';
import { Store, Edit2, Search, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const { toast } = useToast();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/restaurants?page=${page}&search=${search}&limit=10`
      );
      const data = await response.json();
      if (data.success) {
        setRestaurants(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch restaurants',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [page, search]);

  const handleUpdateRestaurant = async (restaurantId: number, updates: Partial<Restaurant>) => {
    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Restaurant updated successfully',
        });
        fetchRestaurants();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update restaurant',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Restaurants Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setEditingRestaurant({} as Restaurant)}
          >
            <Plus className="h-4 w-4" />
            Add Restaurant
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : restaurants.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No restaurants found
                </td>
              </tr>
            ) : (
              restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Store className="h-10 w-10 rounded-full bg-gray-100 p-2" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {restaurant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {restaurant.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {restaurant.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="text-yellow-500">
                        {'★'.repeat(Math.floor(restaurant.rating))}
                        {'☆'.repeat(5 - Math.floor(restaurant.rating))}
                      </span>
                      <span className="ml-2">{restaurant.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${restaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {restaurant.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setEditingRestaurant(restaurant)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${pageNum === page ? 'bg-blue-50 border-blue-500 text-blue-600 z-10' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
            >
              {pageNum}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}