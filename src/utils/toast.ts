import toast from "react-hot-toast";

const handleToast = (code: Number, msg: string) => {
  switch (code) {
    case 1:
      toast.success(msg);
      break;
    default:
      toast.error(msg);
      break;
  }
};

export default handleToast;
