import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { TextField, Alert, Container, Card,Link, Typography, Box, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// hooks
import Page from '../components/Page';
import useIsMountedRef from './../utils/useIsMountedRef';
import firebase from './../firebase'
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });


    const resetPassword = async (email) => {
      await firebase.auth().sendPasswordResetEmail(email).then((asd)=>{
        alert(`Reset link sent to ${email}`)
      });
    };
 
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.email);
        if (isMountedRef.current) {
        
        //  onGetEmail(formik.values.email);
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  

  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(6, 0)
  }));

  
  return (
    <RootStyle title="Register">
       <Container>
        {/* <ContentStyle> */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="h4" gutterBottom>
             Forgot Password.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
                Reset link may be found in the spam folder.
            </Typography>
          </Box>

    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Email address"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Reset Password
          </LoadingButton>
          <Link component={RouterLink} variant="subtitle2" to="/login" underline="hover">
            Admin Login
          </Link>
        </Stack>
      </Form>
    </FormikProvider>
    {/* </ContentStyle> */}
    </Container>
    </RootStyle>
  );
}
