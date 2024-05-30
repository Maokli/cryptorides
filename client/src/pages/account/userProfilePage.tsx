
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AccountDetailsForm } from '../../components/account/accountDetailsForm';
import { AccountInfo } from '../../components/account/accountInfo';

export default function ProfilePage(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                    <AccountInfo />
                </Grid>
                <Grid item lg={7} md={6} xs={12}>
                    <AccountDetailsForm />
                </Grid>
            </Grid>
        </Stack>
    );
}