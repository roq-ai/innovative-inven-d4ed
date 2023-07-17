import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
