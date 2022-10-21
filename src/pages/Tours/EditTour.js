import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//TODO: SUPABASE CLIENT
import { supabase } from "../../supabse/client";

//TODO: MATERIAL COMPONENTS
import {
  Button,
  Box,
  Stack,
  Container,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
//TODO: COMPONENTS
import Page from "../../components/Page";

export default function EditTour() {
  //TODO: DATA
  const navigate = useNavigate();
  const { id } = useParams();

  //TODO: INPUTS
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //TODO: FETCH SINGLE SUPABASE_TOURS
  useEffect(() => {
    const fetchTours = async () => {
      const { data, error } = await supabase
        .from("tours")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/dashboard/tours", { replace: true });
      }
      if (data) {
        setName(data.name);
        setDescription(data.description);
      }
    };
    fetchTours();
  }, [id, navigate]);

  //TODO: SUPABASE UPDATE TOUR
  const updateTour = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("tours")
      .update({ name, description })
      .eq("id", id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      navigate("/dashboard/tours");
    }
  };

  //TODO: CODIGO DE LA PLANTILLA
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
            Edit Tour
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <form onSubmit={updateTour}>
            <div>
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
            </div>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
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
