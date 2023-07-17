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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getErpIntegrationById, updateErpIntegrationById } from 'apiSdk/erp-integrations';
import { Error } from 'components/error';
import { erpIntegrationValidationSchema } from 'validationSchema/erp-integrations';
import { ErpIntegrationInterface } from 'interfaces/erp-integration';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function ErpIntegrationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ErpIntegrationInterface>(
    () => (id ? `/erp-integrations/${id}` : null),
    () => getErpIntegrationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ErpIntegrationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateErpIntegrationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/erp-integrations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ErpIntegrationInterface>({
    initialValues: data,
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
            Edit Erp Integration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(ErpIntegrationEditPage);
