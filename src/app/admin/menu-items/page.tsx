'use client';

import { useState, useEffect, useCallback } from 'react';
import { Restaurant } from '../restaurants/page';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MenuItemForm } from '@/components/menu-items/MenuItemForm';
import { MenuItemTable } from '@/components/menu-items/MenuItemTable';
import { SearchBar } from '@/components/menu-items/SearchBar';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: number;
}

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    restaurantId: '',
  });

  const { toast } = useToast();

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/menu-items?page=1&limit=100');
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMenuItems(data.data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch menu items',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchRestaurants = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/restaurants');
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setRestaurants(data.data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch restaurants',
      });
      console.error(error);
    }
  }, [toast]);

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurants();
  }, [fetchMenuItems, fetchRestaurants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.name || !formData.price || !formData.category || !formData.restaurantId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill in all required fields',
      });
      return;
    }
    try {
      const response = await fetch('/api/admin/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          restaurantId: parseInt(formData.restaurantId),
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      toast({
        title: 'Success',
        description: 'Menu item created successfully',
      });
      setIsAddDialogOpen(false);
      fetchMenuItems();
      resetForm();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create menu item',
      });
      console.error(error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenuItem) return;

    try {
      const response = await fetch(`/api/admin/menu-items?menuItemId=${selectedMenuItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          restaurantId: parseInt(formData.restaurantId),
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      toast({
        title: 'Success',
        description: 'Menu item updated successfully',
      });
      setIsEditDialogOpen(false);
      fetchMenuItems();
      resetForm();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update menu item',
      });
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const response = await fetch(`/api/admin/menu-items?menuItemId=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      toast({
        title: 'Success',
        description: 'Menu item deleted successfully',
      });
      fetchMenuItems();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete menu item',
      });
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      restaurantId: '',
    });
    setSelectedMenuItem(null);
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      restaurantId: item.restaurantId.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurants
        .find((r) => r.id === item.restaurantId)
        ?.name.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="container mx-auto py-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-2xl font-bold">Menu Items</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
              </DialogHeader>
              <MenuItemForm
                onSubmit={handleSubmit}
                submitButtonText="Add Menu Item"
                initialData={formData}
                restaurants={restaurants}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, category or restaurant..."
          />
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <MenuItemTable
            items={filteredMenuItems}
            restaurants={restaurants}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <MenuItemForm
            onSubmit={handleEdit}
            submitButtonText="Update Menu Item"
            initialData={formData}
            restaurants={restaurants}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
