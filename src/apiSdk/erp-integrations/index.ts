import axios from 'axios';
import queryString from 'query-string';
import { ErpIntegrationInterface, ErpIntegrationGetQueryInterface } from 'interfaces/erp-integration';
import { GetQueryInterface } from '../../interfaces';

export const getErpIntegrations = async (query?: ErpIntegrationGetQueryInterface) => {
  const response = await axios.get(`/api/erp-integrations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createErpIntegration = async (erpIntegration: ErpIntegrationInterface) => {
  const response = await axios.post('/api/erp-integrations', erpIntegration);
  return response.data;
};

export const updateErpIntegrationById = async (id: string, erpIntegration: ErpIntegrationInterface) => {
  const response = await axios.put(`/api/erp-integrations/${id}`, erpIntegration);
  return response.data;
};

export const getErpIntegrationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/erp-integrations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteErpIntegrationById = async (id: string) => {
  const response = await axios.delete(`/api/erp-integrations/${id}`);
  return response.data;
};
