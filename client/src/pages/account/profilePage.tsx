
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AccountDetailsForm } from '../../components/account/account-details-form';
import { AccountInfo } from '../../components/account/account-info';

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                    <AccountInfo />
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                    <AccountDetailsForm />
                </Grid>
            </Grid>
        </Stack>
    );
}
