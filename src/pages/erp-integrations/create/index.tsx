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
import { createErpIntegration } from 'apiSdk/erp-integrations';
import { Error } from 'components/error';
import { erpIntegrationValidationSchema } from 'validationSchema/erp-integrations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { ErpIntegrationInterface } from 'interfaces/erp-integration';

function ErpIntegrationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ErpIntegrationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createErpIntegration(values);
      resetForm();
      router.push('/erp-integrations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ErpIntegrationInterface>({
    initialValues: {
      erp_system_name: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: erpIntegrationValidationSchema,
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
            Create Erp Integration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="erp_system_name" mb="4" isInvalid={!!formik.errors?.erp_system_name}>
            <FormLabel>Erp System Name</FormLabel>
            <Input
              type="text"
              name="erp_system_name"
              value={formik.values?.erp_system_name}
              onChange={formik.handleChange}
            />
            {formik.errors.erp_system_name && <FormErrorMessage>{formik.errors?.erp_system_name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
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
    entity: 'erp_integration',
    operation: AccessOperationEnum.CREATE,
  }),
)(ErpIntegrationCreatePage);
