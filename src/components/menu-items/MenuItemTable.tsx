'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { Restaurant } from '@/app/admin/restaurants/page';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: number;
}

interface MenuItemTableProps {
  items: MenuItem[];
  restaurants: Restaurant[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

export function MenuItemTable({ items, restaurants, onEdit, onDelete }: MenuItemTableProps) {
  const getRestaurantName = (restaurantId: number) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    return restaurant ? restaurant.name : `Restaurant ID: ${restaurantId}`;
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No menu items found. Try a different search term or add a new item.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {item.description || '-'}
              </TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{getRestaurantName(item.restaurantId)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
