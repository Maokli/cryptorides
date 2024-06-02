import { statusNotification } from "./statusNotification.enum";

export interface NotificationDto {
  id: number;
 
  message: string;
  
  status: statusNotification;
  
  rentalRequestId: number;
}



