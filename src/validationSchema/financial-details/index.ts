import * as yup from 'yup';

export const financialDetailValidationSchema = yup.object().shape({
  purchase_price: yup.number().integer().required(),
  inventory_id: yup.string().nullable(),
});
