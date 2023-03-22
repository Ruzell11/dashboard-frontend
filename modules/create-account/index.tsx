import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import ContentLayout from "../common/layouts/ContentLayout";
import NotificationComponent from "../common/NotificationComponent";
import { roleIdProps } from "../types";
import { userGetAddMemberRequest } from "./services";

interface userAddMembersProps {
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  password: string | null;
  email: string | null;
  role_id: number | null;
}

const AddMemberForm = ({ role_id }: roleIdProps) => {
  const isAdmin = role_id === "1";
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

  const { mutate, isSuccess, data, isError } = userGetAddMemberRequest();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const params: userAddMembersProps = {
      first_name: null,
      last_name: null,
      username: null,
      password: null,
      email: null,
      role_id: null,
    };

    for (const [key, value] of formData.entries()) {
      params[key as keyof userAddMembersProps] = value as any;
    }

    mutate(params);

    if (isSuccess) {
      e.currentTarget.reset();
    }
    setIsShowNotification(true);
  };

  return (
    <ContentLayout>
      {isShowNotification ? (
        <>
          <NotificationComponent
            message={
              isSuccess
                ? (data?.data.message as string)
                : "Missing fields are required!"
            }
            type={isError ? "error" : "success"}
          />
        </>
      ) : null}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto h-100">
        <h2 className="text-center text-xl font-semibold my-6">
          Create Account
        </h2>
        <div className="mb-6">
          <TextField
            required={true}
            id="firstName"
            name="first_name"
            label="Firstname"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="mb-6">
          <TextField
            required={true}
            id="lastname"
            name="last_name"
            label="Lastname"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="mb-6">
          <TextField
            required={true}
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="mb-6">
          <TextField
            required={true}
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </div>
        <div className="mb-6">
          <TextField
            required={true}
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
          />
        </div>

        <div className="mb-6">
          <FormControl fullWidth>
            <InputLabel>Permission</InputLabel>
            {isAdmin ? (
              <Select name="role_id" label="Permission" required={true}>
                <MenuItem value={1} key={1}>
                  Super Admin Account
                </MenuItem>
                <MenuItem value={2} key={2}>
                  Admin Account
                </MenuItem>
              </Select>
            ) : (
              <>
                <Select name="role_id" label="Permission" required={true}>
                  <MenuItem value={3} key={3}>
                    Team Member
                  </MenuItem>
                </Select>
              </>
            )}
          </FormControl>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            type="submit"
            className="bg-blue-500 w-[75%]"
          >
            Submit
          </Button>
        </div>
      </form>
    </ContentLayout>
  );
};

export default AddMemberForm;
