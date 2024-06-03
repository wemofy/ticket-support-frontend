import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const UseUpdateStatus = ({ ticket_id, body }) => {
  const url = process.env.REACT_APP_BASE_URL;

  const { mutate: updateStatus } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${url}/ticket/${ticket_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(body),
        });
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Something went wrong");
        }

        return result;
      } catch (error) {
        throw new error();
      }
    },
    onSuccess: () => {
      toast.success("Status Updated successfully");
    },

    onError: (error) => {
      toast.error("An error occurred");
    },
  });
  return {
    updateStatus,
  };
};
