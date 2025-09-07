import * as Yup from 'yup';

export const checkoutSchema = Yup.object().shape({
  contact_number: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  payment_method: Yup.string().required('Payment method is required'),
  account_name: Yup.string().when('payment_method', (payment_method, schema) => {
    return payment_method ? schema.required('Account name is required') : schema;
  }),
  reference_number: Yup.string().when('payment_method', (payment_method, schema) => {
    return payment_method ? schema.required('Reference number is required') : schema;
  }),
});
