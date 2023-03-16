import NotificationComponent from "@/modules/common/NotificationComponent";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Buffer } from "buffer";
import { FormEvent, useState } from "react";
import { userAddProductRequest } from "../services";

interface AddProductModalForm {
  isAddingProduct: boolean;
  setIsAddingProduct: (isTrue: boolean) => void;
}

interface ProductProps {
  image: any;
  product_name: string | null;
  product_description: string | null;
  product_price: string | null;
}

const AddProductModalForm = ({
  isAddingProduct,
  setIsAddingProduct,
}: AddProductModalForm) => {
  const { mutate, isSuccess, data, isError } = userAddProductRequest();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const imageFile = e.currentTarget.image.files[0];

    const reader = new FileReader();
    reader.readAsArrayBuffer(imageFile);

    reader.addEventListener("load", () => {
      const imageBuffer = Buffer.from(reader.result);
      const params = new FormData();

      for (const [key, value] of formData.entries()) {
        params.append(key, value as any);
      }
      mutate(params);
    });
  };

  return (
    <Dialog open={isAddingProduct}>
      <Box p={3}>
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <DialogTitle>Add Product</DialogTitle>

          {isSuccess ? (
            <NotificationComponent
              message={data?.data.message}
              type={isError ? "error" : "success"}
            />
          ) : null}
          <DialogContent>
            <TextField
              name="product_name"
              label="Product Name"
              fullWidth
              margin="normal"
            />
            <TextField
              name="product_description"
              label="Product Description"
              fullWidth
              margin="normal"
            />
            <TextField
              name="product_price"
              label="Product Price"
              fullWidth
              margin="normal"
            />{" "}
            <div className="space-y-2">
              <h5 className="mt-2">Product Image </h5>
              <FormControl fullWidth>
                <Input
                  type="file"
                  name="image"
                  inputProps={{ accept: "image/*" }}
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddingProduct(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddProductModalForm;
