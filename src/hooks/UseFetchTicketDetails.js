import { useMutation } from "@tanstack/react-query";
import { UseTicketContext } from "src/context/TicketContext";
import toast from "react-hot-toast";

export const UseFetchTicketDetails = (data) => {
  const { setTicketDetails, setTicketMessages } = UseTicketContext();
  const url = process.env.REACT_APP_BASE_URL;

  const { mutate: fetchTicketDetails } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${url}/ticket/${data.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      setTicketDetails(result);
      console.log(result);
      return result;
    },
    onError: (error) => {
      console.error("Error fetching ticket details:", error);
      toast.error("Failed to fetch ticket details");
    },
  });
  return {
    fetchTicketDetails,
  };
};
