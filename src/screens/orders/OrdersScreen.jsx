import React, { useState } from 'react';
import { useOrderStore } from '../../stores/orderStore.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { 
  ClipboardList, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  ChevronRight,
  Receipt
} from 'lucide-react';

export default function OrdersScreen({ onNavigate }) {
  const { orders, selectOrder } = useOrderStore();
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const statuses = ['All', 'Confirmed', 'Processing', 'Completed', 'Cancelled'];

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(o => o.orderStatus.toLowerCase() === filterStatus.toLowerCase());

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-950 text-emerald-400 border-emerald-800/50';
      case 'processing':
        return 'bg-blue-950 text-blue-400 border-blue-800/50';
      case 'confirmed':
        return 'bg-amber-950 text-amber-400 border-amber-800/50';
      case 'cancelled':
        return 'bg-rose-950 text-rose-400 border-rose-800/50';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
            Dairy Orders & Dispatches
          </h1>
          <p className="text-xs text-neutral-400">
            {orders.length} livestock transactions logged in system
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {statuses.map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === st
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto text-xl">
            📦
          </div>
          <h2 className="text-sm font-bold text-white">No Orders Found</h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            You currently have no orders under '{filterStatus}'. When you purchase an animal from the marketplace, it appears here instantly.
          </p>
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Browse Available Cattle
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800/90 hover:border-neutral-750 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white">{order.id}</span>
                  <span className="text-[10px] text-neutral-500">• {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm text-white">{order.animalName}</h3>
                  <p className="text-neutral-400">Breed: {order.breed} | Customer: {order.customerName}</p>
                  <p className="text-[11px] text-neutral-500 truncate max-w-xs">{order.deliveryAddress}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-neutral-500 uppercase block">Total</span>
                  <span className="text-sm font-black text-amber-400">
                    Rs. {order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Payment: {order.paymentStatus}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => WhatsAppService.openOrderInquiry(order.id, order.animalName)}
                    className="p-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 border border-emerald-800/50"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Farm</span>
                  </button>

                  <button
                    onClick={() => setSelectedOrderDetails(order)}
                    className="p-1.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Order Summary</span>
                <h2 className="text-base font-black text-white">{selectedOrderDetails.id}</h2>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-neutral-850 space-y-1">
                <span className="text-neutral-400 font-bold block">Animal Details</span>
                <p className="text-white font-semibold text-sm">{selectedOrderDetails.animalName}</p>
                <p className="text-neutral-300">Breed: {selectedOrderDetails.breed} • Animal ID: {selectedOrderDetails.animalId}</p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-850 space-y-1">
                <span className="text-neutral-400 font-bold block">Customer & Delivery</span>
                <p className="text-white font-medium">{selectedOrderDetails.customerName} ({selectedOrderDetails.customerPhone})</p>
                <p className="text-neutral-300">{selectedOrderDetails.deliveryAddress}</p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-850 space-y-1">
                <span className="text-neutral-400 font-bold block">Payment & Gateways</span>
                <p className="text-white font-medium">{selectedOrderDetails.paymentMethod}</p>
                <p className="text-emerald-400">Payment Status: {selectedOrderDetails.paymentStatus}</p>
              </div>

              {selectedOrderDetails.notes && (
                <div className="p-3 rounded-2xl bg-neutral-850 space-y-1">
                  <span className="text-neutral-400 font-bold block">Special Instructions</span>
                  <p className="text-neutral-300 italic">{selectedOrderDetails.notes}</p>
                </div>
              )}

              <div className="border-t border-neutral-800 pt-2 flex justify-between items-center text-sm font-bold">
                <span className="text-neutral-300">Amount Paid:</span>
                <span className="text-amber-400 font-black text-base">Rs. {selectedOrderDetails.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => WhatsAppService.openOrderInquiry(selectedOrderDetails.id, selectedOrderDetails.animalName)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
