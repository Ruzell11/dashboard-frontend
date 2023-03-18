import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { userGetDeleteRequest } from "../../team-list/services/deleteUser";
import NotificationComponent from "@/modules/common/NotificationComponent";
import { handleLogoutParent } from "../function/handleLogout";


interface ConfirmationModalProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
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

const ConfirmationModal = ({ open, setOpen, userData }: ConfirmationModalProps) => {
    const { mutate, isSuccess, isError, data } = userGetDeleteRequest();
    const {handleLogout} = handleLogoutParent();

    console.log(userData)
    const handleConfirmDelete = () => {
        if (userData === undefined) {
          return (
            <NotificationComponent
              message={"Something went wrong:("}
              type="error"
            />
          );
        }
        const params = {
          user_id: userData._id,
          created_by_id: userData?.created_by,
        };
        mutate(params, {
          onSuccess: () => {
            setOpen(false);
            handleLogout();
          },
        });
      };
      
    return (
        <>
            {isSuccess ? (
                <NotificationComponent
                    message={data?.data.message}
                    type={isError ? "error" : "success"}
                />
            ) : null}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to delete your ${userData?.username} account ?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmationModal;