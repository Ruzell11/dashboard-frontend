import { Alert, AlertColor, AlertTitle } from "@mui/material";

interface NotificationProps {
  message: string;
  type: AlertColor;
}

const NotificationComponent = ({ message, type }: NotificationProps) => {
  return (
    <Alert severity={type}>
      <AlertTitle>Notification</AlertTitle>
      <strong>{message}</strong>
    </Alert>
  );
};

export default NotificationComponent;
