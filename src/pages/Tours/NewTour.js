import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// TODO SUPABASE CLIENT
import { supabase } from "../../supabse/client";

// TODO MATERIAL COMPONENTS
import {
  Button,
  Box,
  Stack,
  Container,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
// TODO COMPONENTS
import Page from "../../components/Page";

export default function NewTour() {
  //TODO CODIGO INPUTS TOURS
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //TODO ADD TOUR
  const handleAdd = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("tours")
      .insert([{ name, description }]);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      navigate("/dashboard/tours");
    }
  };

  // TODO CODIGO DE LA PLANTILLA
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
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Name"
                variant="outlined"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
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
