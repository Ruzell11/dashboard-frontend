import { Delete, Edit } from "@material-ui/icons";
import { IconButton } from "@mui/material";

interface ActionButtonsComponentProps<T> {
  handleDelete: (params: T) => void;
  handleEditing: (params: T) => void;
  params: T;
}

const ActionButtonsComponent = <T extends object>({
  handleDelete,
  handleEditing,
  params,
}: ActionButtonsComponentProps<T>) => {
  return (
    <>
      <IconButton onClick={() => handleEditing(params)}>
        <Edit style={{ color: "black" }} />
      </IconButton>
      <IconButton onClick={() => handleDelete(params)}>
        <Delete style={{ color: "red" }} />
      </IconButton>
    </>
  );
};

export default ActionButtonsComponent;
