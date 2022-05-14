import { Box, Card, Container } from '@mui/material';
import { resourceKeys } from '../../../locales';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import SignInForm from './SignInForm';
import { t } from 'i18next';

const SignInWrapper = styled(Box)(
  () => `
overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const SignInPage = () => {
  return (
    <SignInWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent={'center'}
          py={5}
          alignItems={'center'}
        >
          Logo
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 5 }}>
          <h1>{t(resourceKeys.SIGN_IN.TITLE)}</h1>
          <br></br>
          <SignInForm />
        </Card>
      </Container>
    </SignInWrapper>
  );
};

export default SignInPage;
