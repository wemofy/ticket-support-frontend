import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { UseTicketContext } from "src/context/TicketContext";
import toast from "react-hot-toast";

const ListTickets = () => {
  const navigate = useNavigate();
  const [assigned, setAssigned] = useState({});
  const [priority, setPriority] = useState({});
  const [status, setStatus] = useState({});
  const [currentTicketId, setCurrentTicketId] = useState(null);

  const {
    tickets,
    users,
    fetchTicketDetails,
    fetchMessagesForTicketDetails,
    handleAssignTicketForUser,
    handleAssignTicketStatus,
    handleAssignTicketPriority,
  } = UseTicketContext();

  const handleDetailsClick = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };

  const handleGetTicketDetails = (id) => {
    fetchTicketDetails(id);
    fetchMessagesForTicketDetails(id);
    handleDetailsClick(id);
  };

  const handleChange = (e, ticketId) => {
    const { name, value } = e.target;
    setAssigned((prevAssigned) => ({ ...prevAssigned, [ticketId]: value }));
    setCurrentTicketId(ticketId);
  };

  useEffect(() => {
    if (currentTicketId !== null) {
      if (assigned[currentTicketId] !== undefined) {
        const body = { assigned: assigned[currentTicketId] };
        handleAssignTicketForUser(currentTicketId, body);
        toast.success("User Assigned Successfully");
      }

      if (status[currentTicketId] !== undefined) {
        const body = { status: status[currentTicketId] };
        handleAssignTicketStatus(currentTicketId, body);
        toast.success("Status Updated Successfully");
      }

      if (priority[currentTicketId] !== undefined) {
        const body = { priority: priority[currentTicketId] };
        handleAssignTicketPriority(currentTicketId, body);
        toast.success("Priority Updated Successfully");
      }
    }
  }, [assigned, priority, status, currentTicketId]);

  const sendUpdateRequest = (ticketId, userId) => {
    axios
      .put(`/api/update-ticket/${ticketId}`, { userId })
      .then((response) => {
        console.log("Update request sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending update request:", error);
      });
  };

  const handlePriorityChange = (e, ticketId) => {
    const { value } = e.target;
    setPriority((prevPriority) => ({ ...prevPriority, [ticketId]: value }));
    sendPriorityUpdateRequest(ticketId, value);
  };

  const handleStatusChange = (e, ticketId) => {
    const { value } = e.target;
    setStatus((prevStatus) => ({ ...prevStatus, [ticketId]: value }));
  };

  const sendPriorityUpdateRequest = (ticketId, priority) => {
    axios
      .put(`/api/update-ticket-priority/${ticketId}`, { priority })
      .then((response) => {
        console.log(
          "Priority update request sent successfully:",
          response.data
        );
      })
      .catch((error) => {
        console.error("Error sending priority update request:", error);
      });
  };

  return (
    <DashboardCard title="Open Tickets">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
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
            {tickets?.data?.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {ticket.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {ticket.subject}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ fontSize: "13px" }}
                      >
                        {ticket.lastmessage}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`assigned-to-${ticket.id}-label`}>
                      Assigned to
                    </InputLabel>
                    <Select
                      labelId={`assigned-to-${ticket.id}-label`}
                      id={`assigned-to-${ticket.id}`}
                      name="assigned"
                      value={assigned[ticket.id] || ""}
                      onChange={(e) => handleChange(e, ticket.id)}
                    >
                      {users?.data?.map((user, index) => (
                        <MenuItem key={index} value={user?.full_name}>
                          {user?.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`priority-${ticket.id}-label`}>
                      Priority
                    </InputLabel>
                    <Select
                      labelId={`priority-${ticket.id}-label`}
                      id={`priority-${ticket.id}`}
                      value={priority[ticket.id] || "low"}
                      onChange={(e) => handlePriorityChange(e, ticket.id)}
                    >
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`status-${ticket.id}-label`}>
                      Status
                    </InputLabel>
                    <Select
                      labelId={`status-${ticket.id}-label`}
                      id={`status-${ticket.id}`}
                      value={status[ticket.id] || "open"}
                      onChange={(e) => handleStatusChange(e, ticket.id)}
                    >
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="inprogress">In Progress</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    <Button
                      variant="contained"
                      onClick={() => handleGetTicketDetails(ticket?.id)}
                    >
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
