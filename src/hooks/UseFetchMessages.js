import { useMutation } from "@tanstack/react-query";
import { UseTicketContext } from "src/context/TicketContext";

export const UseFetchTicketDetails = (data) => {
  const { setTicketMessages } = UseTicketContext();
  const url = process.env.REACT_APP_BASE_URL;

  const { mutate: fetchMessages } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${url}/messages/${data.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      setTicketMessages(result);
      console.log(result);
      return result;
    },
    onError: (error) => {
      console.error("Error fetching ticket messages:", error);
      toast.error("Failed to fetch ticket messages");
    },
  });
  return {
    fetchMessages,
  };
};
