import { Box, Card, Container } from '@mui/material';
import { resourceKeys } from '../../../locales';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import SignUpForm from './SignUpForm';
import { t } from 'i18next';

const SignInWrapper = styled(Box)(
  () => `
overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const SignUpPage = () => {
  return (
    <SignInWrapper>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent={'center'}
          py={5}
          alignItems={'center'}
        >
           <img src="static/images/avatars/logo.jpg" alt="" />
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 5 }}>
          <h1>{t(resourceKeys.SIGN_IN.SIGN_UP)}</h1>

          <br></br>
          <SignUpForm />
        </Card>
      </Container>
    </SignInWrapper>
  );
};

export default SignUpPage;
