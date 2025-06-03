import { Order } from '@/types/order';
import formatDate from '@/utils/format_date';
import formatTime from '@/utils/format_time';
import StatusBadge from './StatusBadge';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function OrderCard({ order }: { order: Order }) {
  const router = useRouter();
  const formattedDate = formatDate(order.createdAt);
  const formattedTime = formatTime(order.createdAt);

  const handleOpenOrder = (id: number) => {
    router.push(`/dashboard/orders/${id}`);
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            Order #{order.id}
            <StatusBadge status={order.status} />
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {formattedDate} at {formattedTime}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
        <p className="text-xl font-semibold text-primary">
          ₹{parseFloat(order.totalAmount).toFixed(2)}
        </p>
        <Button
          variant="outline"
          onClick={() => handleOpenOrder(order.id)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
