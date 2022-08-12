import { Box, Button, Grid, TextField } from '@mui/material';
import { b64Encode } from '../../../domain/shared/utils/b64';
import { Credential } from '../../../domain/auth/credential';
import { useAuth } from '../../../hooks/useAuth';
import { resourceKeys } from '../../../locales';
import { useState } from 'react';
import { t } from 'i18next';

const SignInForm = () => {
  const { authenticate, errorInSession } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onUsernameChange = (e: any) => setUsername(e.target.value);
  const onPasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = () => {
    const credentials = new Credential(username, b64Encode(password));
    authenticate(credentials);

  };

  errorInSession();

  return (
    <Grid item xs={12}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' }
        }}
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-required"
            name="username"
            label={t(resourceKeys.SIGN_IN.FIELD_EMAIL)}
            onChange={onUsernameChange}
            value={username}
            required
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label={t(resourceKeys.SIGN_IN.FIELD_PASSWORD)}
            onChange={onPasswordChange}
            value={password}
            type="password"
            autoComplete="current-password"
            required
          />
          <Button
            sx={{ margin: 1, width: '100%' }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            href = '/dashboards/crypto'
          >
            {t(resourceKeys.SIGN_IN.BUTTON_LOG_IN)}
          </Button>

          <Button
            sx={{ margin: 1, width: '100%' }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            href = 'sign-up'
          >
            {t(resourceKeys.SIGN_IN.SIGN_UP)}
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default SignInForm;
