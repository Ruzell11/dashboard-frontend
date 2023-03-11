import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import ContentLayout from "../common/layouts/ContentLayout";
import { userGetAddMemberRequest } from "./services";

const AddMemberForm = ({ role_id }) => {
  const isAdmin = role_id === "1";
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("2");
  const { mutate } = userGetAddMemberRequest();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      email,
      role_id: 3,
    };
    mutate(params);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRoleId(event.target.value as string);
  };

  return (
    <ContentLayout>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto h-100">
        <h2 className="text-center text-xl font-semibold my-6">Create Account</h2>
        <div className="mb-6">
          <TextField
            id="firstName"
            label="Firstname"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <TextField
            id="lastname"
            label="Lastname"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <FormControl fullWidth>
            <InputLabel>Permission</InputLabel>
            <Select value={roleId} onChange={handleChange} label="Permission">
              {isAdmin ? (
                <MenuItem value={2}>Admin Account</MenuItem>
              ) : (
                <>
                  <MenuItem value={2}>Admin Account</MenuItem>
                  <MenuItem value={3}>Team Member</MenuItem>
                </>
              )}
            </Select>
          </FormControl>
        </div>
        <div className="flex justify-center">
          <Button variant="contained" type="submit" className="bg-blue-500 w-[75%]">
            Submit
          </Button>
        </div>
      </form>
    </ContentLayout>
  );
};

export default AddMemberForm;
