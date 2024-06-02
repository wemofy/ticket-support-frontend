import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ListTickets from '../dashboard/components/ListTickets';
import { Grid, Box } from '@mui/material';
import MessageTickets from './components/MessageTickets';

const TicketDetails = () => {
  return (
    <>
      <PageContainer title="Dashboard" description="this is ticket detail">
        {' '}
        <Box>
          <Grid item xs={12} lg={12}>
            <MessageTickets />
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default TicketDetails;
