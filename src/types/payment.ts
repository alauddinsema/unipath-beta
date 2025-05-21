
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  description?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  disabled?: boolean;
  productId?: string;
}

export interface PurchaseResult {
  success: boolean;
  message: string;
  transactionId?: string;
}

export interface CreateCheckoutSessionParams {
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  successUrl?: string;
  cancelUrl?: string;
  isSubscription?: boolean;
  productId?: string;
}

export interface DirectPaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  isComplete: boolean;
}

export interface SubscriptionPackage {
  id: number;
  name: string;
  price: number;
  description: string;
  subscription_price: number;
}
