const mapping: Record<string, string> = {
  'erp-integrations': 'erp_integration',
  'financial-details': 'financial_detail',
  inventories: 'inventory',
  organizations: 'organization',
  purchases: 'purchase',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
