import { Alert, Badge, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import axios from "../helpers/axios.helpers";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { NotificationDto } from "../models/notification.model";
import { statusNotification } from "../models/statusNotification.enum";
import { getUserToken } from "../helpers/auth.helpers";
import { getUserIdFromToken } from "../services/account.service";
import { toast } from "react-toastify";

interface NotificationButtonProps {
  
}
const iconButtonStyle = {
  backgroundColor: 'white',
  borderRadius: '50%',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: 1,
  margin: 0.5,
};

 
const NotificationButton: FunctionComponent<NotificationButtonProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newNotifications, setNewNotifications] = useState<NotificationDto[]>([])
  const [notifications, setNotifications] = useState<NotificationDto[]>([])
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Create a new EventSource instance
    eventSourceRef.current = new EventSource('http://localhost:3001/sse/notifications');

    eventSourceRef.current.onmessage = function (event: any) {
      const loggedInUserId = parseInt(getUserIdFromToken() ?? "");
      const eventBody = JSON.parse(event.data);
      console.log(event);
      if(eventBody.userId === loggedInUserId)
        handleSSE(eventBody.notification);
    };
    
    eventSourceRef.current.onerror = function (error: any) {
      console.error('EventSource error:', error);
    };

    // Cleanup function to close EventSource connection
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  });

  // Function to handle incoming SSE data
  function handleSSE(data: NotificationDto) {
      toast.info("You have a new notification!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Process the data
      const newNotifs = [data, ...notifications];

      const uniqueArray = newNotifs.filter((item, index, self) => 
        index === self.findIndex((t) => t.id === item.id)
      );
      setNotifications(uniqueArray);
      console.log(data);
  }

  const getNotifications = async () => {
    const query = `
      query notification
      {
        notification {
          id,
          message,
          status,
          rentalRequestId,
        }
      }
    `;

    try {

      const token = getUserToken();
      const response = await axios.instance.post("",
        {
          query
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response);
      const uniqueArray = (response.data.data.notification as unknown as NotificationDto[]).filter((item, index, self) => 
        index === self.findIndex((t) => t.id === item.id)
      );
      setNotifications(uniqueArray);
    } catch {
      console.log("error");
    }
  }

  const tagNotificationsAsSeen = async (ids: number[]) => {
    const query = `
      mutation updateNotification($updateNotificationInput: UpdateNotificationInput!)
      {
        updateNotification(updateNotificationInput: $updateNotificationInput)
      }
    `;

    try {

      const token = getUserToken();
      const variables = {
        updateNotificationInput: { ids: ids }
      };
      const response = await axios.instance.post("",
        {
          query,
          variables
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setNotifications(notifications.map(n => ({...n, status: statusNotification.SEEN})))
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    const unreadNotifications = notifications.filter(n => n.status === statusNotification.NEW);
    setNewNotifications(unreadNotifications);
  }, [notifications])
  

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    tagNotificationsAsSeen(newNotifications.map(n => n.id));
    setNewNotifications([]);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getNotifications();
    }, 500);
  }, [])
  
  return ( 
    <>
      <IconButton onClick={handleMenuOpen} sx={iconButtonStyle} color="inherit">
        <Badge badgeContent={newNotifications.length} color="primary">
          <IoIosNotifications />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        { notifications && 
          notifications.map(notification => {
            return (
              <>
                <MenuItem key={notification.id} onClick={handleMenuClose} 
                          component={NavLink} to={`/agreement/${notification.rentalRequestId}`}>
                  <Alert 
                    sx={{backgroundColor: notification.status == statusNotification.NEW ? "" : "white"}} severity="info">
                    <Typography variant="h6">
                      {notification.message}
                    </Typography>
                  </Alert>
                </MenuItem>  
                <Divider />
              </>
            )
          })
        }
      </Menu>
    </>
   );
}
 
export default NotificationButton;