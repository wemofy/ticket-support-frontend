import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export const TicketContext = createContext();

export const TicketContextProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState();
  const [reply, setReply] = useState("");

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://89.116.34.246:8000/ticket/");

      setTickets(response.data);

      return response.data;
      console.log(response.data);
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

  const value = {
    tickets,
    fetchTicketDetails,
    fetchMessagesForTicketDetails,
    ticketMessages,
    ticketDetails,
    setTicketDetails,
    reply,
    setReply,
  };

  useEffect(() => {
    fetchTickets();
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
