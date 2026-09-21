import { create } from 'zustand';

export const INITIAL_ORDERS = [
  {
    id: 'RH-ORD-9021',
    animalId: 'RH-AN-108',
    animalName: 'Jersey Cross Beauty (Bella)',
    breed: 'Jersey',
    price: 360000,
    transportFee: 15000,
    totalAmount: 375000,
    customerName: 'Haji Aslam Cheema',
    customerPhone: '0300 7861122',
    deliveryAddress: 'Chak 45-RB, Samundri Road, Faisalabad',
    paymentMethod: 'Bank Transfer / Online Verification',
    paymentStatus: 'Paid', // 'Pending' | 'Processing' | 'Paid' | 'Failed' | 'Refunded'
    orderStatus: 'Completed', // 'Pending' | 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled'
    createdAt: '2026-09-12T14:30:00Z',
    updatedAt: '2026-09-13T10:00:00Z',
    notes: 'Delivered in pristine condition with veterinary health certificate.'
  },
  {
    id: 'RH-ORD-9022',
    animalId: 'RH-AN-124',
    animalName: 'Sahiwal Red Gem (Gulabo)',
    breed: 'Sahiwal',
    price: 370000,
    transportFee: 12000,
    totalAmount: 382000,
    customerName: 'Malik Zafar Iqbal',
    customerPhone: '0321 4455667',
    deliveryAddress: 'Dairy Commercial Zone, Sahiwal Bypass, Sahiwal',
    paymentMethod: 'Stripe Card / Online',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    createdAt: '2026-09-13T16:20:00Z',
    updatedAt: '2026-09-14T09:15:00Z',
    notes: 'Transport scheduled for Wednesday morning.'
  },
  {
    id: 'RH-ORD-9023',
    animalId: 'RH-AN-105',
    animalName: 'Sultan (Champion Sahiwal Bull)',
    breed: 'Sahiwal',
    price: 650000,
    transportFee: 25000,
    totalAmount: 675000,
    customerName: 'Sardar Usman Khan',
    customerPhone: '0333 9988771',
    deliveryAddress: 'Khan Cattle Farm, Depalpur, Okara',
    paymentMethod: 'Direct Farm Deposit',
    paymentStatus: 'Paid',
    orderStatus: 'Confirmed',
    createdAt: '2026-09-14T11:00:00Z',
    updatedAt: '2026-09-14T12:00:00Z',
    notes: 'Customer visited farm, verified breeding pedigree in person.'
  }
];

export const useOrderStore = create((set, get) => {
  const initialOrders = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('rh_orders_db') || 'null') || INITIAL_ORDERS
    : INITIAL_ORDERS;

  return {
    orders: initialOrders,
    selectedOrder: null,

    selectOrder: (order) => set({ selectedOrder: order }),

    // Create a new order (simulating Firestore transaction)
    createOrder: (orderData) => {
      const current = get().orders;
      const id = `RH-ORD-${Date.now().toString().slice(-4)}`;
      const newOrder = {
        ...orderData,
        id,
        paymentStatus: orderData.paymentStatus || 'Paid',
        orderStatus: orderData.orderStatus || 'Confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updated = [newOrder, ...current];
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_orders_db', JSON.stringify(updated));
      }
      set({ orders: updated, selectedOrder: newOrder });
      return newOrder;
    },

    updateOrderStatus: (orderId, newStatus) => {
      const current = get().orders;
      const updated = current.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_orders_db', JSON.stringify(updated));
      }
      set({ orders: updated });
    },

    updatePaymentStatus: (orderId, newPaymentStatus) => {
      const current = get().orders;
      const updated = current.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentStatus: newPaymentStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_orders_db', JSON.stringify(updated));
      }
      set({ orders: updated });
    }
  };
});
