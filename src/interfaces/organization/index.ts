import { ErpIntegrationInterface } from 'interfaces/erp-integration';
import { InventoryInterface } from 'interfaces/inventory';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  erp_integration?: ErpIntegrationInterface[];
  inventory?: InventoryInterface[];
  user?: UserInterface;
  _count?: {
    erp_integration?: number;
    inventory?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
