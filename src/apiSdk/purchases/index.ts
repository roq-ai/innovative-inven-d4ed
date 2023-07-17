import axios from 'axios';
import queryString from 'query-string';
import { PurchaseInterface, PurchaseGetQueryInterface } from 'interfaces/purchase';
import { GetQueryInterface } from '../../interfaces';

export const getPurchases = async (query?: PurchaseGetQueryInterface) => {
  const response = await axios.get(`/api/purchases${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPurchase = async (purchase: PurchaseInterface) => {
  const response = await axios.post('/api/purchases', purchase);
  return response.data;
};

export const updatePurchaseById = async (id: string, purchase: PurchaseInterface) => {
  const response = await axios.put(`/api/purchases/${id}`, purchase);
  return response.data;
};

export const getPurchaseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/purchases/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePurchaseById = async (id: string) => {
  const response = await axios.delete(`/api/purchases/${id}`);
  return response.data;
};
