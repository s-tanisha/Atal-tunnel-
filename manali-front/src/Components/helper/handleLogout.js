import toast from "react-hot-toast";
import { api } from "../Api/api";
import UseApi from "../Hook/UseApi";

export const handleLogout = async (toastMessage) => {
  const { logout } = api;
  await UseApi(logout(), "delete");
  if (toastMessage) {
    toast.remove();
    toast.error(toastMessage);
  }
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
};
