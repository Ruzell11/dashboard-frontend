import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Alert, AlertTitle } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import ContentLayout from "../common/layouts/ContentLayout";
import NotificationComponent from "../common/NotificationComponent";
import { userGetAddMemberRequest } from "./services";

const AddMemberForm = ({ role_id }) => {
  const isAdmin = role_id === "1";
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleId, setRoleId] = useState<string | null>(null);
  const { mutate, isSuccess , data , isError } = userGetAddMemberRequest();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      email,
      role_id: roleId,
    };
    mutate(params);
  };



  const handleChange = (event: SelectChangeEvent) => {
    setRoleId(event.target.value as string);
    console.log(roleId)
  };

  return (
    <ContentLayout>
      {isSuccess ? (
        <>
          <NotificationComponent message={data?.data.message as string} type={isError ? "error" : "success"}/>
        </>
      ) : null}
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
              {isAdmin ? (
                 <Select value={roleId} onChange={handleChange} label="Permission">
                   <MenuItem value={2} key={2}>Admin Account</MenuItem>
                   </Select>
              
              ): (
                <>
                <Select value={roleId} onChange={handleChange} label="Permission">
                <MenuItem value={3}>Team Member</MenuItem>
               </Select>
             </>
              )}
          
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
