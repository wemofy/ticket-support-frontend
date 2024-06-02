import React, { useState, useEffect } from 'react';
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
  TextField,
  Paper,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import DashboardCard from '../../../components/shared/DashboardCard';
import axios from 'axios';

const users = [
  { id: '1', name: 'Nitin Shash' },
  { id: '2', name: 'Parijat Dalal' },
  { id: '3', name: 'John Shah' },
  { id: '4', name: 'Bhuppp Menn' },
];

const tickets = [
  {
    id: '1',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: 'test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    time: '22:04 , Friday',
  },
  {
    id: '2',
    subject: 'akshay@wemofy.in',
    lastmessage: 'support@wemofy.in',
    assigned: 'test 1 - from the email',
    priority: 'Low',
    status: 'Open',
    time: '22:04 , Friday',
  },
  // other tickets
];

const messagesData = {
  1: [
    {
      id: '1',
      sender: 'akshay@wemofy.in',
      receiver: 'support@wemofy.in',
      content: 'Hello, I need help with my account.',
      timestamp: '22:04, Friday',
    },
    {
      id: '2',
      sender: 'support@wemofy.in',
      receiver: 'akshay@wemofy.in',
      content: 'Sure, I can help you with that. What exactly is the issue?',
      timestamp: '22:15, Friday',
    },
  ],
  2: [
    {
      id: '1',
      sender: 'nitin@amazon.in',
      receiver: 'support@wemofy.in',
      content: 'Hello, I need help with my account. test 2',
      timestamp: '22:04, Friday',
    },
    {
      id: '2',
      sender: 'support@wemofy.in',
      receiver: 'nitin@amazon.in',
      content: 'Sure, I can help you with that. What exactly is the issue? test 3',
      timestamp: '22:15, Friday',
    },
  ],
  // other messages for other tickets
};

const MessageTickets = () => {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [assigned, setAssigned] = useState({});
  const [reply, setReply] = useState('');

  useEffect(() => {
    const ticket = tickets.find((t) => t.id === ticketId);
    const messagesForTicket = messagesData[ticketId] || [];

    setTicketDetails(ticket);
    setTicketMessages(messagesForTicket);
  }, [ticketId]);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSendReply = () => {
    console.log('Reply:', reply);
    // Add your reply sending logic here
    setReply('');
  };

  const handleChange = (e, ticketId) => {
    setAssigned({ ...assigned, [ticketId]: e.target.value });
    sendUpdateRequest(ticketId, e.target.value);
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

  return (
    <DashboardCard title={`Ticket Details for ${ticketDetails?.id}`}>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        {ticketDetails && (
          <Box mt={2}>
            <Typography variant="h6">Ticket Details</Typography>
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={ticketDetails.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                      {ticketDetails.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {ticketDetails.subject}
                        </Typography>
                        <Typography color="textSecondary" sx={{ fontSize: '13px' }}>
                          {ticketDetails.lastmessage}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id={`assigned-to-${ticketDetails.id}-label`}>
                        Assigned to
                      </InputLabel>
                      <Select
                        labelId={`assigned-to-${ticketDetails.id}-label`}
                        id={`assigned-to-${ticketDetails.id}`}
                        value={assigned[ticketDetails.id] || ''}
                        onChange={(e) => handleChange(e, ticketDetails.id)}
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
                    <Chip
                      sx={{
                        px: '4px',
                        backgroundColor: 'primary.main',
                        color: '#fff',
                      }}
                      size="small"
                      label={ticketDetails.priority}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: '4px',
                        backgroundColor: 'primary.main',
                        color: '#fff',
                      }}
                      size="small"
                      label={ticketDetails.status}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
        {ticketMessages.length > 0 && (
          <Paper elevation={8} sx={{ p: 3, maxWidth: '100%', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
              Email Messages for {ticketDetails.id}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3 }}>
              {ticketMessages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor:
                      message.sender === 'akshay@wemofy.in' ? 'primary.main' : 'secondary.light',
                    color:
                      message.sender === 'akshay@wemofy.in'
                        ? 'primary.contrastText'
                        : 'secondary.contrastText',
                    alignSelf: message.sender === 'akshay@wemofy.in' ? 'flex-start' : 'flex-end',
                  }}
                >
                  <Typography variant="body2">
                    <strong>{message.sender}</strong>
                  </Typography>
                  <Typography variant="body1">{message.content}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                    {message.timestamp}
                  </Typography>
                </Box>
              ))}
            </Box>
            <TextField
              label="Reply"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={reply}
              onChange={handleReplyChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSendReply}>
              Send Reply
            </Button>
          </Paper>
        )}
      </Box>
    </DashboardCard>
  );
};

export default MessageTickets;
