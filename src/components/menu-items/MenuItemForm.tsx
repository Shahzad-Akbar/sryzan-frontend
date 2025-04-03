'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { Restaurant } from '@/app/admin/restaurants/page';

interface MenuItemFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  submitButtonText: string;
  initialData: {
    name: string;
    description: string;
    price: string;
    category: string;
    restaurantId: string;
  };
  restaurants: Restaurant[];
}

export function MenuItemForm({
  onSubmit,
  submitButtonText,
  initialData,
  restaurants,
}: MenuItemFormProps) {
  const [localFormData, setLocalFormData] = useState(initialData);

  const handleInputChange = useCallback(
    (field: string, value: string | boolean) => {
      const newData = { ...localFormData, [field]: value };
      setLocalFormData(newData);
      // Update parent component's form data
      Object.assign(initialData, newData);
    },
    [localFormData, initialData],
  );

  useEffect(() => {
    setLocalFormData(initialData);
  }, [initialData]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={localFormData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            placeholder="Enter item name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={localFormData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            required
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={localFormData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter item description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={localFormData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            required
            placeholder="Enter category"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="restaurantId">Restaurant</Label>
        <Select
          value={localFormData.restaurantId}
          onValueChange={(value) => handleInputChange('restaurantId', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a restaurant" />
          </SelectTrigger>
          <SelectContent>
            {restaurants.map((restaurant) => (
              <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                {restaurant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="submit">{submitButtonText}</Button>
      </DialogFooter>
    </form>
  );
}
