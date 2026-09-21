// Payment Service for Raja Haqnawaz Dairy Farm
// Supports verified payment confirmation and simulated gateway transactions.

export const MockPaymentService = {
  processPayment: async ({ amount, orderId, shouldSucceed = true, customerName }) => {
    // 1. Initial pending state
    let state = 'Processing';
    
    // Simulate gateway verification latency
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (shouldSucceed) {
      state = 'Paid';
      return {
        success: true,
        transactionId: `TXN-RH-${Date.now().toString().slice(-6)}`,
        status: state,
        amount,
        orderId,
        customerName,
        paymentGateway: 'Mock Dairy Pay Gateway (Verified)',
        message: 'Payment verified and captured successfully via simulated banking gateway.',
        timestamp: new Date().toISOString()
      };
    } else {
      state = 'Failed';
      return {
        success: false,
        transactionId: `TXN-FAIL-${Date.now().toString().slice(-6)}`,
        status: state,
        amount,
        orderId,
        customerName,
        paymentGateway: 'Mock Dairy Pay Gateway',
        error: 'Card declined or insufficient bank balance for livestock transaction.',
        timestamp: new Date().toISOString()
      };
    }
  },

  processRefund: async ({ transactionId, amount, reason }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      refundId: `REF-${Date.now().toString().slice(-6)}`,
      transactionId,
      status: 'Refunded',
      amount,
      reason: reason || 'Customer requested return prior to animal dispatch',
      timestamp: new Date().toISOString()
    };
  }
};
