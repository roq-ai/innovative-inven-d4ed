import { InventoryInterface } from 'interfaces/inventory';
import { GetQueryInterface } from 'interfaces';

export interface FinancialDetailInterface {
  id?: string;
  purchase_price: number;
  inventory_id?: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  _count?: {};
}

export interface FinancialDetailGetQueryInterface extends GetQueryInterface {
  id?: string;
  inventory_id?: string;
}
