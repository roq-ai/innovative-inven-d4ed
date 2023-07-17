import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFinancialDetail } from 'apiSdk/financial-details';
import { Error } from 'components/error';
import { financialDetailValidationSchema } from 'validationSchema/financial-details';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { InventoryInterface } from 'interfaces/inventory';
import { getInventories } from 'apiSdk/inventories';
import { FinancialDetailInterface } from 'interfaces/financial-detail';

function FinancialDetailCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinancialDetailInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinancialDetail(values);
      resetForm();
      router.push('/financial-details');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinancialDetailInterface>({
    initialValues: {
      purchase_price: 0,
      inventory_id: (router.query.inventory_id as string) ?? null,
    },
    validationSchema: financialDetailValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Financial Detail
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="purchase_price" mb="4" isInvalid={!!formik.errors?.purchase_price}>
            <FormLabel>Purchase Price</FormLabel>
            <NumberInput
              name="purchase_price"
              value={formik.values?.purchase_price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('purchase_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.purchase_price && <FormErrorMessage>{formik.errors?.purchase_price}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<InventoryInterface>
            formik={formik}
            name={'inventory_id'}
            label={'Select Inventory'}
            placeholder={'Select Inventory'}
            fetcher={getInventories}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'financial_detail',
    operation: AccessOperationEnum.CREATE,
  }),
)(FinancialDetailCreatePage);
