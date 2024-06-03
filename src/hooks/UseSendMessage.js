import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseTicketContext } from "src/context/TicketContext";

export const UseSendMessage = ({ body }) => {
  const url = process.env.REACT_APP_BASE_URL;
  console.log(body);

  const { setReply } = UseTicketContext();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${url}/messages/send`, {
          method: "POST",
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

        if (res.status === 200) {
          setReply("");
        }

        console.log(result);
        console.log(res);

        return res;
      } catch (error) {
        throw new error();
      }
    },
    onSuccess: () => {
      toast.success("Message Sent successfully");
    },

    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });
  return {
    sendMessage,
    isPending,
  };
};
