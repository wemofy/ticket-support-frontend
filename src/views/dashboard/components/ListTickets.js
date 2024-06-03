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
  CircularProgress,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { UseAssignUser } from "src/hooks/UseAssignUser";
import { UseUpdatePriority } from "src/hooks/UseUpdatePriority";
import { UseUpdateStatus } from "src/hooks/UseUpdateStatus";

const ListTickets = () => {
  const navigate = useNavigate();
  const [assigned, setAssigned] = useState({});
  const [priority, setPriority] = useState({});
  const [status, setStatus] = useState({});
  const [currentTicketId, setCurrentTicketId] = useState(null);

  const { data: users } = useQuery({ queryKey: ["users"] });
  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    onSuccess: (data) => {
      console.log("tickets date ", data);
    },
  });

  // const url = process.env.REACT_APP_BASE_URL;

  // const {
  //   ticketMessages,
  //   ticketDetails,
  //   fetchTicketDetails,
  //   fetchMessagesForTicketDetails,
  // } = UseTicketContext();

  const handleDetailsClick = (ticketId) => {
    navigate(`/ticket/${ticketId}`, {
      state: {
        ticketId: ticketId,
      },
    });
  };

  const handleGetTicketDetails = async (id) => {
    handleDetailsClick(id);
  };

  const handleChange = (e, ticketId) => {
    const { name, value } = e.target;
    setAssigned((prevAssigned) => ({ ...prevAssigned, [ticketId]: value }));
    setCurrentTicketId(ticketId);
  };

  const { assignUser, isLoading: isAssigning } = UseAssignUser({
    ticket_id: currentTicketId,
    body: { assigned_to: assigned[currentTicketId] },
  });

  const { updatePriority, isLoading: isUpdatingPriority } = UseUpdatePriority({
    ticket_id: currentTicketId,
    body: { priority: priority[currentTicketId] },
  });

  const { updateStatus, isLoading: isUpdatingStatus } = UseUpdateStatus({
    ticket_id: currentTicketId,
    body: { status: status[currentTicketId] },
  });

  useEffect(() => {
    if (currentTicketId && assigned[currentTicketId] !== undefined) {
      assignUser();
    }
  }, [assigned, assignUser]);

  useEffect(() => {
    if (currentTicketId && priority[currentTicketId] !== undefined) {
      updatePriority();
    }
  }, [priority, updatePriority]);

  useEffect(() => {
    if (currentTicketId && status[currentTicketId] !== undefined) {
      updateStatus();
    }
  }, [status, updateStatus]);

  useEffect(() => {
    const savedAssigned = localStorage.getItem("assigned");
    const savedPriority = localStorage.getItem("priority");
    const savedStatus = localStorage.getItem("status");

    if (savedAssigned) {
      setAssigned(JSON.parse(savedAssigned));
    }
    if (savedPriority) {
      setPriority(JSON.parse(savedPriority));
    }
    if (savedStatus) {
      setStatus(JSON.parse(savedStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("assigned", JSON.stringify(assigned));
  }, [assigned]);

  useEffect(() => {
    localStorage.setItem("priority", JSON.stringify(priority));
  }, [priority]);

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
  }, [status]);

  const handlePriorityChange = (e, ticketId) => {
    const { value } = e.target;
    setPriority((prevPriority) => ({ ...prevPriority, [ticketId]: value }));
    setCurrentTicketId(ticketId);
  };

  const handleStatusChange = (e, ticketId) => {
    const { value } = e.target;
    setStatus((prevStatus) => ({ ...prevStatus, [ticketId]: value }));
    setCurrentTicketId(ticketId);
  };

  if (!tickets?.data) {
    return <p>Loading..</p>;
  }

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
                {console.log(assigned)}
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
                        <MenuItem key={index} value={user?.email}>
                          {user?.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {isAssigning && currentTicketId === ticket.id && (
                    <CircularProgress size={24} />
                  )}
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`priority-${ticket.id}-label`}>
                      Priority
                    </InputLabel>
                    <Select
                      labelId={`priority-${ticket.id}-label`}
                      id={`priority-${ticket.id}`}
                      value={priority[ticket.id] || ""}
                      onChange={(e) => handlePriorityChange(e, ticket.id)}
                    >
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                  {isUpdatingPriority && currentTicketId === ticket.id && (
                    <CircularProgress size={24} />
                  )}
                </TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`status-${ticket.id}-label`}>
                      Status
                    </InputLabel>
                    <Select
                      labelId={`status-${ticket.id}-label`}
                      id={`status-${ticket.id}`}
                      value={status[ticket.id] || ""}
                      onChange={(e) => handleStatusChange(e, ticket.id)}
                    >
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="inprogress">In Progress</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                  {isUpdatingStatus && currentTicketId === ticket.id && (
                    <CircularProgress size={24} />
                  )}
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
