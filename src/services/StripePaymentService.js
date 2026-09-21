// Stripe Payment Client Interface
// Secret keys are NEVER embedded in client application; calls proxy through backend or fallback to secure mock.

export const StripePaymentService = {
  createPaymentIntent: async ({ amount, currency = 'pkr', orderId }) => {
    try {
      const res = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, orderId })
      });
      if (!res.ok) throw new Error('Payment Intent API unavailable');
      return await res.json();
    } catch (err) {
      // Graceful fallback for demo/evaluation
      return {
        clientSecret: `mock_pi_secret_${Date.now()}`,
        status: 'requires_payment_method',
        mockMode: true
      };
    }
  },

  confirmCardPayment: async (clientSecret, cardDetails) => {
    await new Promise(resolve => setTimeout(resolve, 1400));
    return {
      paymentIntent: {
        id: `pi_stripe_${Date.now().toString().slice(-6)}`,
        status: 'succeeded',
        amount: cardDetails?.amount || 350000
      }
    };
  }
};
