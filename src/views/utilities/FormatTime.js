import moment from "moment";

export const formatTime = (time) => {
  return moment(time, "YYYY-MM-DDTHH:mm:ss").format("MMMM Do YYYY, h:mm:ss a");
};
