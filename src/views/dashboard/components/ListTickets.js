import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router';

const tickets = [
  {
    id: '1',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: ' test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    Time: '22:04 , Friday',
  },
  {
    id: '2',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: ' test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    Time: '22:04 , Friday',
  },
  {
    id: '3',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: ' test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    Time: '22:04 , Friday',
  },
  {
    id: '4',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: ' test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    Time: '22:04 , Friday',
  },
  {
    id: '5',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: ' test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    Time: '22:04 , Friday',
  },
];

const users = [
  {
    id: '1',
    name: 'Nitin Shash',
  },
  {
    id: '2',
    name: 'Parijat Dalal',
  },
  {
    id: '3',
    name: 'John Shah',
  },
  {
    id: '4',
    name: 'Bhuppp Menn',
  },
];

const ListTickets = () => {
  const [age, setAge] = React.useState({});
  const navigate = useNavigate();
  const [assigned, setAssigned] = React.useState({});
  const [priority, setPriority] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleChange = (e, ticketId) => {
    setAssigned({ ...assigned, [ticketId]: e.target.value });
    sendUpdateRequest(ticketId, e.target.value);
    setPriority(tickets?.priority || 'Low');

    console.log(e.target.value);
  };

  const sendUpdateRequest = (ticketId, userId) => {
    axios
      .put(`/api/update-ticket/${ticketId}`, { userId })
      .then((response) => {
        console.log('Update request sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending update request:', error);
      });
  };

  const handleDetailsClick = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };
  // const handleChange = (e) => {
  //   setAge(e.target.value);
  // };
  const handlePriorityChange = (e, ticketId) => {
    setPriority(e.target.value);
    sendPriorityUpdateRequest(ticketId, e.target.value);
  };

  const handleStatusChange = (e, ticketId) => {
    setStatus(e.target.value);
  };

  const sendPriorityUpdateRequest = (ticketId, priority) => {
    axios
      .put(`/api/update-ticket-priority/${ticketId}`, { priority })
      .then((response) => {
        console.log('Priority update request sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending priority update request:', error);
      });
  };

  return (
    <DashboardCard title="Open Tickets">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Subject
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Assigned
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Priority
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Check Details
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {ticket.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {ticket.subject}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: '13px',
                        }}
                      >
                        {ticket.lastmessage}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`assigned-to-${ticket.id}-label`}>Assigned to</InputLabel>
                    <Select
                      labelId={`assigned-to-${ticket.id}-label`}
                      id={`assigned-to-${ticket.id}`}
                      value={assigned[ticket.id] || ''}
                      onChange={(e) => handleChange(e, ticket.id)}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`priority-${ticket.id}-label`}>Priority</InputLabel>
                    <Select
                      labelId={`priority-${ticket.id}-label`}
                      id={`priority-${ticket.id}`}
                      value={priority}
                      onChange={handlePriorityChange}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`status-${ticket.id}-label`}>Status</InputLabel>
                    <Select
                      labelId={`status-${ticket.id}-label`}
                      id={`status-${ticket.id}`}
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="High">Open</MenuItem>
                      <MenuItem value="Medium">Progress</MenuItem>
                      <MenuItem value="Low">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="h6">
                    <Button variant="contained" onClick={() => handleDetailsClick(ticket.id)}>
                      Ticket Details
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ListTickets;
