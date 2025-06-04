'use client';

import { Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import formatDate from '@/utils/format_date';
import convertStringToLowerCase from '@/utils/convert_lower_case';
import { Order } from '@/types/order';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: '',
  });

  const { toast } = useToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100',
        ...(statusFilter && { status: convertStringToLowerCase(statusFilter) }),
        ...(dateFilter.startDate && { startDate: dateFilter.startDate }),
        ...(dateFilter.endDate && { endDate: dateFilter.endDate }),
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Orders fetched successfully',
      });
      setOrders(data.data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch orders',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateFilter, toast]);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, dateFilter, fetchOrders]);

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    setLoading(true);
    try {
      const status = newStatus.toLowerCase() as Order['status'];
      const response = await fetch(`/api/admin/orders?orderId=${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      toast({
        variant: 'success',
        title: 'Success',
        description: 'Order status updated successfully',
      });
      fetchOrders();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update order status',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders?orderId=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      toast({
        title: 'Success',
        description: 'Order deleted successfully',
      });
      fetchOrders();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete order',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex gap-4">
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PREPARING">Preparing</SelectItem>
                  <SelectItem value="READY">Ready</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="date"
              value={dateFilter.startDate}
              onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
              className="w-40"
            />
            <Input
              type="date"
              value={dateFilter.endDate}
              onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
              className="w-40"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin w-6 h-6 mr-2 text-gray-600" />
              <span>Loading orders...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Restaurant ID</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.restaurantId}</TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDetailsDialogOpen(true);
                          }}
                        >
                          Details
                        </Button>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusUpdate(order.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="PREPARING">Preparing</SelectItem>
                            <SelectItem value="READY">Ready</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(order.id)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <Label>Order ID</Label>
                  <p className="text-sm">{selectedOrder.id}</p>
                </div>
                <div>
                  <Label>User ID</Label>
                  <p className="text-sm">{selectedOrder.userId}</p>
                </div>
                <div>
                  <Label>Restaurant ID</Label>
                  <p className="text-sm">{selectedOrder.restaurantId}</p>
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <p className="text-sm">${selectedOrder?.totalAmount}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="text-sm">{selectedOrder.status}</p>
                </div>
                <div>
                  <Label>Created At</Label>
                  <p className="text-sm">{formatDate(selectedOrder.createdAt)}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
