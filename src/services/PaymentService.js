import { MockPaymentService } from './MockPaymentService.js';
import { StripePaymentService } from './StripePaymentService.js';

export const PaymentService = {
  PAYMENT_STATES: {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    PAID: 'Paid',
    FAILED: 'Failed',
    REFUNDED: 'Refunded'
  },

  async executePayment({ amount, orderId, method = 'mock_success', customerName }) {
    if (method === 'mock_fail') {
      return await MockPaymentService.processPayment({
        amount,
        orderId,
        shouldSucceed: false,
        customerName
      });
    }

    if (method === 'stripe') {
      const intent = await StripePaymentService.createPaymentIntent({ amount, orderId });
      const confirmation = await StripePaymentService.confirmCardPayment(intent.clientSecret, { amount });
      return {
        success: true,
        transactionId: confirmation.paymentIntent.id,
        status: this.PAYMENT_STATES.PAID,
        amount,
        orderId,
        customerName,
        paymentGateway: 'Stripe Secured Card Processing'
      };
    }

    // Default: Mock Successful Payment
    return await MockPaymentService.processPayment({
      amount,
      orderId,
      shouldSucceed: true,
      customerName
    });
  }
};
