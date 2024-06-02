import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import DashboardCard from "../../../components/shared/DashboardCard";
import axios from "axios";
import { UseTicketContext } from "src/context/TicketContext";
import { formatTime } from "src/views/utilities/FormatTime";

const MessageTickets = () => {
  const { ticketId } = useParams();
  const [assigned, setAssigned] = useState({});

  const {
    ticketDetails,
    ticketMessages,
    users,
    handleSendMessage,
    reply,
    setReply,
    fetchMessagesForTicketDetails,
    fetchTicketDetails,
  } = UseTicketContext();

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSendReply = () => {
    const data = {
      body: reply,
      ticket_id: ticketId,
    };

    // Send the reply
    handleSendMessage(data);
    setReply("");
  };

  const handleChange = (e, ticketId) => {
    setAssigned({ ...assigned, [ticketId]: e.target.value });
    sendUpdateRequest(ticketId, e.target.value);
  };

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

  useEffect(() => {
    fetchTicketDetails(ticketId);
    fetchMessagesForTicketDetails(ticketId);
  }, [reply]);

  return (
    <DashboardCard title={`Ticket Details for ${ticketDetails?.data?.id}`}>
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        {ticketDetails?.data && (
          <Box mt={2}>
            <Typography variant="h6">Ticket Details</Typography>
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={ticketDetails?.data?.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {ticketDetails?.data?.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {ticketMessages?.data?.subject}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{ fontSize: "13px" }}
                        >
                          {ticketMessages?.data?.lastmessage}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel
                        id={`assigned-to-${ticketDetails?.data?.id}-label`}
                      >
                        Assigned to
                      </InputLabel>
                      <Select
                        labelId={`assigned-to-${ticketDetails?.data?.id}-label`}
                        id={`assigned-to-${ticketDetails?.data?.id}`}
                        name="assigned"
                        value={assigned[ticketDetails?.data?.id] || ""}
                        onChange={(e) =>
                          handleChange(e, ticketDetails?.data?.id)
                        }
                      >
                        {users?.data?.map((user) => (
                          <MenuItem key={user.id} value={user.full_name}>
                            {user?.full_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "primary.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={ticketDetails?.data?.priority}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "primary.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={ticketDetails?.data?.status}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
        {ticketMessages?.data ? (
          <Paper elevation={8} sx={{ p: 3, maxWidth: "100%", margin: "auto" }}>
            <Typography variant="h4" gutterBottom>
              Email Messages for {ticketDetails?.data?.id}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ maxHeight: "400px", overflowY: "auto", mb: 3 }}>
              {ticketMessages?.data?.from_messages?.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    alignSelf: "flex-start",
                  }}
                >
                  <Typography variant="body2">
                    <strong>{ticketMessages?.data?.from_email}</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1 }}
                  >
                    {formatTime(ticketMessages?.data?.created_at)}
                  </Typography>
                </Box>
              ))}
              {ticketMessages?.data?.to_messages?.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: "secondary.light",
                    color: "secondary.contrastText",
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography variant="body2">
                    <strong>Me</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1 }}
                  >
                    {ticketMessages?.data?.created_at}
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendReply}
            >
              Send Reply
            </Button>
          </Paper>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </DashboardCard>
  );
};

export default MessageTickets;
