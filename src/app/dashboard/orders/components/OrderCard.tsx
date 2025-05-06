import { Order } from '@/types/order';
import formatDate from '@/utils/format_date';
import formatTime from '@/utils/format_time';
import { useState } from 'react';
import StatusBadge from './StatusBadge';

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = formatDate(order.createdAt);
  const formattedTime = formatTime(order.createdAt);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-medium">Order #{order.id}</h3>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-neutral/70">
            {formattedDate} at {formattedTime}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium">
              ₹{parseFloat(order.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;