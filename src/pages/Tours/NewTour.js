import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//FIREBASE
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// material
import {
  Button,
  Box,
  Stack,
  Container,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
// components
import Page from "../../components/Page";

export default function NewTour() {
  //CODIGO REGISTRO DE USUARIO
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //CODIGO ADD USER
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      //REGISTRO DE USUARIO EN LA COLECCION
      await addDoc(collection(db, "tours"), {
        name: name,
        description: description,
        timeStamp: serverTimestamp(),
      });
      navigate("/dashboard/tours");
    } catch (error) {
      console.log(error);
    }
  };

  //CODIGO DE LA PLANTILLA

  return (
    <Page title="New Tour">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom>
            Create New Tour
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <form onSubmit={handleAdd}>
            <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
              <TextField
                label="Name"
                variant="outlined"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
              <TextField
                label="Description"
                variant="outlined"
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <Stack direction="row" spacing={2}>
              <Link to="/dashboard/tours">
                <Button variant="contained" color="error">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" variant="contained" color="primary">
                Add Tour
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
