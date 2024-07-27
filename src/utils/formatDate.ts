import moment from "moment/moment";

const formatDate = (date: string) => {
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;
