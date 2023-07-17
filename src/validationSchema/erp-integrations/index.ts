import * as yup from 'yup';

export const erpIntegrationValidationSchema = yup.object().shape({
  erp_system_name: yup.string().required(),
  organization_id: yup.string().nullable(),
});
