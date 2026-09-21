import React, { useState } from 'react';
import { useCartStore } from '../../stores/cartStore.js';
import { useAnimalStore } from '../../stores/animalStore.js';
import { useOrderStore } from '../../stores/orderStore.js';
import { PaymentService } from '../../services/PaymentService.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Receipt,
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';

export default function CheckoutScreen({ onNavigate }) {
  const { selectedAnimalForPurchase, customerInfo, updateCustomerInfo, clearCart } = useCartStore();
  const { updateAnimalAvailability } = useAnimalStore();
  const { createOrder } = useOrderStore();

  const [paymentMode, setPaymentMode] = useState('mock_success'); // 'mock_success' | 'mock_fail' | 'stripe'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!selectedAnimalForPurchase && !completedOrder) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-neutral-400 text-sm">No livestock selected for purchase.</p>
        <button
          onClick={() => onNavigate('marketplace')}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const transportFee = customerInfo.transportOption.includes('Self Pickup') ? 0 : 15000;
  const totalAmount = (selectedAnimalForPurchase?.price || 0) + transportFee;

  const handleProcessCheckout = async () => {
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.deliveryAddress) {
      alert('Please fill out all required contact and delivery fields.');
      return;
    }

    setIsProcessing(true);
    setPaymentResult(null);

    const tempOrderId = `RH-ORD-${Date.now().toString().slice(-4)}`;

    try {
      const result = await PaymentService.executePayment({
        amount: totalAmount,
        orderId: tempOrderId,
        method: paymentMode,
        customerName: customerInfo.fullName
      });

      setPaymentResult(result);

      if (result.success) {
        // Atomic transaction:
        // 1. Mark animal as SOLD
        updateAnimalAvailability(selectedAnimalForPurchase.id, 'Sold');

        // 2. Create Order in OrderStore
        const newOrder = createOrder({
          animalId: selectedAnimalForPurchase.id,
          animalName: selectedAnimalForPurchase.name,
          breed: selectedAnimalForPurchase.breed,
          price: selectedAnimalForPurchase.price,
          transportFee,
          totalAmount,
          customerName: customerInfo.fullName,
          customerPhone: customerInfo.phone,
          customerCnic: customerInfo.cnic,
          deliveryAddress: `${customerInfo.deliveryAddress}, ${customerInfo.city}`,
          paymentMethod: result.paymentGateway,
          paymentStatus: 'Paid',
          orderStatus: 'Confirmed',
          notes: customerInfo.notes
        });

        setCompletedOrder(newOrder);
      }
    } catch (err) {
      setPaymentResult({
        success: false,
        error: err.message || 'Payment processing encountered an error.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Success Receipt Screen
  if (completedOrder) {
    return (
      <div className="space-y-6 pb-20 max-w-lg mx-auto">
        <div className="text-center space-y-2 pt-4">
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/50">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase font-['Outfit']">
            Order Confirmed & Paid!
          </h1>
          <p className="text-xs text-neutral-400">
            Animal has been marked as <strong>SOLD</strong> and scheduled for climate-controlled farm dispatch.
          </p>
        </div>

        {/* Receipt Card */}
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold block">Order Number</span>
              <span className="text-sm font-extrabold text-white">{completedOrder.id}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-xs font-bold">
              {completedOrder.orderStatus}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-400">Animal:</span>
              <span className="text-white font-medium">{completedOrder.animalName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Breed:</span>
              <span className="text-white font-medium">{completedOrder.breed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Customer:</span>
              <span className="text-white font-medium">{completedOrder.customerName} ({completedOrder.customerPhone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Delivery To:</span>
              <span className="text-white font-medium text-right max-w-[200px] truncate">{completedOrder.deliveryAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Payment Gateway:</span>
              <span className="text-emerald-400 font-medium">{completedOrder.paymentMethod}</span>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-3 flex justify-between items-center">
            <span className="text-xs font-bold text-neutral-300">Total Captured:</span>
            <span className="text-lg font-black text-amber-400">Rs. {completedOrder.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => WhatsAppService.openOrderInquiry(completedOrder.id, completedOrder.animalName)}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order Verification to Farm WhatsApp</span>
          </button>

          <button
            onClick={() => {
              clearCart();
              onNavigate('orders');
            }}
            className="w-full py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors"
          >
            View All My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 max-w-xl mx-auto">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('animal_details')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Animal</span>
        </button>

        <span className="text-xs font-bold text-emerald-400">Secure Farm Checkout</span>
      </div>

      {/* Selected Animal Summary Card */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 shrink-0">
          <img
            src={selectedAnimalForPurchase.imageUrl}
            alt={selectedAnimalForPurchase.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{selectedAnimalForPurchase.breed}</span>
          <h2 className="text-sm font-bold text-white truncate">{selectedAnimalForPurchase.name}</h2>
          <p className="text-xs font-black text-amber-400">Rs. {selectedAnimalForPurchase.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Customer Information Form */}
      <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h2 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
          Buyer & Delivery Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Full Name *</label>
            <input
              type="text"
              value={customerInfo.fullName}
              onChange={(e) => updateCustomerInfo({ fullName: e.target.value })}
              placeholder="e.g. Chaudhry Tariq"
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Mobile / WhatsApp Number *</label>
            <input
              type="text"
              value={customerInfo.phone}
              onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
              placeholder="0300 1234567"
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">CNIC Number</label>
            <input
              type="text"
              value={customerInfo.cnic}
              onChange={(e) => updateCustomerInfo({ cnic: e.target.value })}
              placeholder="35201-xxxxxxx-x"
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">City</label>
            <select
              value={customerInfo.city}
              onChange={(e) => updateCustomerInfo({ city: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Jauharabad / Khushab">Jauharabad / Khushab (Farm Home District)</option>
              <option value="Sargodha">Sargodha</option>
              <option value="Mianwali">Mianwali</option>
              <option value="Lahore">Lahore</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Sahiwal">Sahiwal</option>
              <option value="Multan">Multan</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Okara">Okara</option>
              <option value="Pakpattan">Pakpattan</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Karachi">Karachi</option>
            </select>
          </div>

          <div className="col-span-1 sm:col-span-2 space-y-1">
            <label className="text-neutral-400 font-medium">Delivery Address *</label>
            <input
              type="text"
              value={customerInfo.deliveryAddress}
              onChange={(e) => updateCustomerInfo({ deliveryAddress: e.target.value })}
              placeholder="House/Plot #, Dairy Farm Colony, Road..."
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="col-span-1 sm:col-span-2 space-y-1">
            <label className="text-neutral-400 font-medium">Livestock Transport Option</label>
            <select
              value={customerInfo.transportOption}
              onChange={(e) => updateCustomerInfo({ transportOption: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Farm Supervised Climate Truck (Recommended)">Farm Supervised Climate Truck (+ Rs. 15,000)</option>
              <option value="Self Pickup from Farm (No Transport Fee)">Self Pickup from Raja Haqnawaz Farm (+ Rs. 0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Gateway Options */}
      <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
            Payment & Verification Method
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
            Secure Payment
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
            paymentMode === 'mock_success'
              ? 'bg-emerald-950/40 border-emerald-500 text-white'
              : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:border-neutral-700'
          }`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_opt"
                checked={paymentMode === 'mock_success'}
                onChange={() => setPaymentMode('mock_success')}
                className="accent-emerald-500"
              />
              <div>
                <span className="font-bold block">Simulate Successful Payment (Instant Confirmation)</span>
                <span className="text-[10px] text-neutral-400">Verifies transaction, changes animal to SOLD & generates receipt.</span>
              </div>
            </div>
            <span className="text-emerald-400 text-xs font-black">✓ Recommended</span>
          </label>

          <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
            paymentMode === 'mock_fail'
              ? 'bg-rose-950/40 border-rose-500 text-white'
              : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:border-neutral-700'
          }`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_opt"
                checked={paymentMode === 'mock_fail'}
                onChange={() => setPaymentMode('mock_fail')}
                className="accent-rose-500"
              />
              <div>
                <span className="font-bold block">Simulate Failed Payment (Declined Card / Insufficient Funds)</span>
                <span className="text-[10px] text-neutral-400">Tests system error handling without locking the animal.</span>
              </div>
            </div>
            <span className="text-rose-400 text-xs font-bold">Error Test</span>
          </label>

          <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
            paymentMode === 'stripe'
              ? 'bg-blue-950/40 border-blue-500 text-white'
              : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:border-neutral-700'
          }`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_opt"
                checked={paymentMode === 'stripe'}
                onChange={() => setPaymentMode('stripe')}
                className="accent-blue-500"
              />
              <div>
                <span className="font-bold block">Stripe Card Payment Simulation</span>
                <span className="text-[10px] text-neutral-400">Simulates international Visa / Mastercard credit checkout.</span>
              </div>
            </div>
            <span className="text-blue-400 text-xs font-bold">Stripe</span>
          </label>
        </div>

        {/* Failure Feedback Alert */}
        {paymentResult && !paymentResult.success && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-600/50 flex items-start gap-3 text-rose-200 text-xs">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block">Payment Failed: {paymentResult.error || 'Transaction rejected.'}</strong>
              <span>The animal remains available in the marketplace. You can retry with another method.</span>
            </div>
          </div>
        )}
      </div>

      {/* Bill Breakdown */}
      <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
        <h2 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
          Order Total Breakdown
        </h2>

        <div className="space-y-2 text-xs border-b border-neutral-800 pb-3">
          <div className="flex justify-between text-neutral-400">
            <span>Animal Base Price:</span>
            <span className="text-white">Rs. {selectedAnimalForPurchase.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Climate Livestock Transport:</span>
            <span className="text-white">Rs. {transportFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Veterinary Certificate & Disinfection:</span>
            <span className="text-emerald-400 font-bold">FREE (Farm Included)</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-sm font-bold text-white">Grand Total:</span>
          <span className="text-xl font-black text-amber-400">Rs. {totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Confirm & Pay Button */}
      <button
        onClick={handleProcessCheckout}
        disabled={isProcessing}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verifying Transaction & Marking Animal...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 text-amber-300" />
            <span>Confirm & Pay Rs. {totalAmount.toLocaleString()}</span>
          </>
        )}
      </button>
    </div>
  );
}
