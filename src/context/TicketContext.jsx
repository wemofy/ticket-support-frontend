import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const TicketContext = createContext();

export const TicketContextProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState([]);
  const [reply, setReply] = useState("");

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://89.116.34.246:8000/ticket/");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://89.116.34.246:8000/users/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const fetchTicketDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://89.116.34.246:8000/ticket/${id}`
      );
      setTicketDetails(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const fetchMessagesForTicketDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://89.116.34.246:8000/messages/${id}`
      );
      setTicketMessages(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const handleAssignTicketForUser = async (id, data) => {
    try {
      const response = await axios.put(
        `http://89.116.34.246:8000/ticket/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleAssignTicketStatus = async (id, data) => {
    try {
      const response = await axios.put(
        `http://89.116.34.246:8000/ticket/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleAssignTicketPriority = async (id, data) => {
    try {
      const response = await axios.put(
        `http://89.116.34.246:8000/ticket/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendMessage = async (data) => {
    try {
      const response = await axios.post(
        `http://89.116.34.246:8000/messages/send`,
        data
      );
      setSendMessage(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("ticketDetails", ticketDetails);
  console.log("ticketMessages", ticketMessages);

  const value = {
    tickets,
    users,
    fetchTicketDetails,
    ticketDetails,
    ticketMessages,
    fetchMessagesForTicketDetails,
    handleSendMessage,
    reply,
    setReply,
    handleAssignTicketForUser,
    handleAssignTicketStatus,
    handleAssignTicketPriority,
  };

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

export const UseTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("Context out of reach");
  }

  return context;
};
