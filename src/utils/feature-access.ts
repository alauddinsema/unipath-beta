// Plan features mapping
type FeatureKey = 
  | 'university_search_basic'
  | 'ai_assistant_basic'
  | 'ai_assistant_premium'
  | 'document_storage_basic'
  | 'document_storage_premium'
  | 'community_forum'
  | 'email_support'
  | 'priority_support'
  | 'download_profiles'
  | 'advanced_pdf_exports'
  | 'application_tracking_basic'
  | 'application_tracking_advanced'
  | 'ai_recommendations'
  | 'deadline_notifications';

interface FeatureAccess {
  free: FeatureKey[];
  basic: FeatureKey[];
  premium: FeatureKey[];
}

// Define which features are available for each plan
export const PLAN_FEATURES: FeatureAccess = {
  free: [
    'university_search_basic',
    'community_forum',
    'email_support'
  ],
  basic: [
    'university_search_basic',
    'ai_assistant_basic',
    'document_storage_basic',
    'community_forum',
    'email_support',
    'download_profiles',
    'application_tracking_basic'
  ],
  premium: [
    'university_search_basic',
    'ai_assistant_premium',
    'document_storage_premium',
    'community_forum',
    'email_support',
    'priority_support',
    'download_profiles',
    'advanced_pdf_exports',
    'application_tracking_advanced',
    'ai_recommendations',
    'deadline_notifications'
  ]
};

/**
 * Check if a feature is available for a given plan
 */
export function hasFeatureAccess(
  planType: 'free' | 'basic' | 'premium',
  feature: FeatureKey
): boolean {
  return PLAN_FEATURES[planType].includes(feature);
}

/**
 * Check if a user has access to AI assistant
 */
export function hasAIAccess(planType: 'free' | 'basic' | 'premium'): boolean {
  return planType === 'basic' || planType === 'premium';
}

/**
 * Check if a user has access to document storage
 */
export function hasDocumentStorageAccess(planType: 'free' | 'basic' | 'premium'): boolean {
  return planType === 'basic' || planType === 'premium';
}

/**
 * Check if a user has access to premium AI features
 */
export function hasPremiumAIAccess(planType: 'free' | 'basic' | 'premium'): boolean {
  return planType === 'premium';
}

/**
 * Get max document storage limit based on plan
 */
export function getDocumentStorageLimit(planType: 'free' | 'basic' | 'premium'): number {
  if (planType === 'premium') return Infinity;
  if (planType === 'basic') return 20;
  return 0;
}

/**
 * Get max favorites limit based on plan
 */
export function getFavoritesLimit(planType: 'free' | 'basic' | 'premium'): number {
  if (planType === 'premium') return Infinity;
  if (planType === 'basic') return 20;
  return 5;
}

/**
 * Get search credits limit based on plan
 */
export function getSearchCreditsLimit(planType: 'free' | 'basic' | 'premium'): number {
  if (planType === 'premium') return Infinity;
  if (planType === 'basic') return 20;
  return 5;
}

/**
 * Get upload credits limit based on plan
 */
export function getUploadCreditsLimit(planType: 'free' | 'basic' | 'premium'): number {
  if (planType === 'premium') return Infinity;
  if (planType === 'basic') return 10;
  return 0;
}

/**
 * Check if a user has access to advanced search features
 */
export function hasAdvancedSearchAccess(planType: 'free' | 'basic' | 'premium'): boolean {
  return hasFeatureAccess(planType, 'university_search_basic');
}

/**
 * Check if a user has access to AI recommendations
 */
export function hasAIRecommendationsAccess(planType: 'free' | 'basic' | 'premium'): boolean {
  return hasFeatureAccess(planType, 'ai_recommendations');
}
