import { createContext, useContext, useEffect, useState } from "react";
import notificationApi from "../services/msNotifications";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const getNotificationStatus = async () => {
    try {
      const { data: response } = await notificationApi.get(
        "/api/notification/customer/central/count-notifications?read=false",
        {
          headers: {
            "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
            Accept: "application/json",
            Type: "customer",
          },
        }
      );
      setUnreadNotifications(response.total);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getNotificationStatus();
  }, []);
  return (
    <NotificationContext.Provider
      value={{ getNotificationStatus, unreadNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
