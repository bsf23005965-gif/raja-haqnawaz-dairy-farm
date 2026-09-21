import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  selectedAnimalForPurchase: null,
  customerInfo: {
    fullName: 'Chaudhry Tariq',
    phone: '0301 5558899',
    cnic: '35201-1234567-1',
    deliveryAddress: 'Model Town, Farm Colony',
    city: 'Lahore',
    province: 'Punjab',
    transportOption: 'Farm Supervised Climate Truck (Recommended)',
    notes: 'Please ensure animal is provided fresh silage before transport.'
  },

  setPurchaseAnimal: (animal) => set({ selectedAnimalForPurchase: animal }),
  updateCustomerInfo: (updates) => set({
    customerInfo: { ...get().customerInfo, ...updates }
  }),
  clearCart: () => set({ selectedAnimalForPurchase: null })
}));
