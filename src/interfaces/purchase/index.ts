import { UserInterface } from 'interfaces/user';
import { InventoryInterface } from 'interfaces/inventory';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  customer_id?: string;
  inventory_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  inventory?: InventoryInterface;
  _count?: {};
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  inventory_id?: string;
}
