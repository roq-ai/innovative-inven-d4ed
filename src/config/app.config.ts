interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['End Customer'],
  tenantRoles: ['Business Owner', 'Inventory Manager', 'Financial Analyst', 'ERP Administrator'],
  tenantName: 'Organization',
  applicationName: 'innovative inventory finance and tracking solution',
  addOns: ['file', 'chat', 'notifications'],
};
