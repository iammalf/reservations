import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//FIREBASE
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

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

export default function EditTour() {
  //DATOS
  const navigate = useNavigate();
  const { id } = useParams();

  //CODIGO REGISTRO DE USUARIO
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //CODIGO USER UPDATE
  const updateTour = async (e) => {
    e.preventDefault();
    try {
      //UPDATE USER
      const tour = doc(db, "tours", id);
      const data = { name: name, description: description };
      await updateDoc(tour, data);
      navigate("/dashboard/tours");
    } catch (error) {
      console.log(error);
    }
  };

  const getTourById = async (id) => {
    const tour = await getDoc(doc(db, "tours", id));
    if (tour.exists()) {
      setName(tour.data().name);
      setDescription(tour.data().description);
      console.log(tour.data());
    } else {
      alert("Tour Not Exists");
    }
  };

  useEffect(() => {
    getTourById(id);
  }, []);
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
          <form onSubmit={updateTour}>
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
                Update Tour
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
