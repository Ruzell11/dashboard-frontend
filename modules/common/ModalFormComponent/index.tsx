import NotificationComponent from "@/modules/common/NotificationComponent";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { userGetEditRequest } from "../../team-list/services/updateUser";

interface UserData {
  _id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  password: string | null;
  role_id: number | null;
  username: string | null;
}

interface ModalProps {
  isOpen: boolean;
  isShowPermission: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userData?: {
    created_by: string | null;
    _id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    password: string | null;
    role_id: number | null;
    username: string | null;
    __v?: number;
  };
}

const ModalFormComponent = ({
  isOpen,
  setIsOpen,
  userData,
  isShowPermission: isShowPermission,
}: ModalProps) => {
  const { mutate, isSuccess, data, isError } = userGetEditRequest();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    //use formdata to get form defaultValue
    const formData = new FormData(e.currentTarget);

    const params: UserData = {
      _id: userData?._id || null,
      email: null,
      first_name: null,
      last_name: null,
      password: null,
      role_id: null,
      username: null,
    };

    //looping form data setting a object
    for (const [key, defaultValue] of formData.entries()) {
      params[key as keyof UserData] = defaultValue as any;
    }

    // Semd this to server
    mutate(params);

    if (isSuccess) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <Box p={3}>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <DialogTitle>Edit User</DialogTitle>

          {isSuccess ? (
            <NotificationComponent
              message={data?.data.message}
              type={isError ? "error" : "success"}
            />
          ) : null}
          <DialogContent>
            <TextField
              defaultValue={userData?.username}
              name="username"
              label="Username"
              fullWidth
              margin="normal"
            />
            <TextField
              defaultValue={userData?.email}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
            />
            <TextField
              defaultValue={userData?.first_name}
              name="first_name"
              label="First name"
              fullWidth
              margin="normal"
            />
            <TextField
              defaultValue={userData?.last_name}
              name="last_name"
              label="Last name"
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              fullWidth
              margin="normal"
            />
            {isShowPermission ? (
              <FormControl fullWidth>
                <InputLabel>Permission</InputLabel>

                <>
                  <Select
                    name="role_id"
                    label="Permission"
                    required={true}
                    defaultValue={userData?.role_id}
                  >
                    <MenuItem value={1} key={1}>
                      Super Admin Account
                    </MenuItem>
                    <MenuItem value={2} key={2}>
                      Admin Account
                    </MenuItem>
                    <MenuItem value={3} key={2}>
                      Team Member
                    </MenuItem>
                  </Select>
                </>
              </FormControl>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default ModalFormComponent;
