
export function calculateSubscriptionDates(planType: string) {
  const startDate = new Date();
  const endDate = new Date();
  
  if (planType === 'premium') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    endDate.setDate(endDate.getDate() + 30);
  }
  
  return { startDate, endDate };
}
