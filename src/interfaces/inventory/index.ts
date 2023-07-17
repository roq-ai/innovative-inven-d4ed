import { FinancialDetailInterface } from 'interfaces/financial-detail';
import { PurchaseInterface } from 'interfaces/purchase';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  name: string;
  quantity: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  financial_detail?: FinancialDetailInterface[];
  purchase?: PurchaseInterface[];
  organization?: OrganizationInterface;
  _count?: {
    financial_detail?: number;
    purchase?: number;
  };
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
