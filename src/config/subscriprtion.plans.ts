

export const subscriptionPlans = {
  monthly: {
    days: 30,
    price: 9.99,
  },

  six_months: {
    days: 180,
    price: 40,
  },

  yearly: {
    days: 365,
    price: 60,
  },
};

export type SubscriptionPlan =
  keyof typeof subscriptionPlans;