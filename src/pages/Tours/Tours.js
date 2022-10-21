import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// TODO SUPABASE CLIENT
import { supabase } from "../../supabse/client";

// material
import {
  Card,
  Box,
  Stack,
  Button,
  Container,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// components
import Page from "../../components/Page";

export default function Tours() {
  //TODO: FETCH TOURS
  const [tours, setTours] = useState([]);
  console.log(tours);

  useEffect(() => {
    const fetchDataSupabase = async () => {
      const { error, data } = await supabase
        .from("tours")
        .select()
        .order("created_at", { ascending: false });
      if (error) {
        setTours([]);
      }
      if (data) {
        setTours(data);
      }
    };
    fetchDataSupabase();
  }, []);

  //TODO: DELETE TOURS

  const deleteUsers = async (id) => {
    const { data, error } = await supabase.from("tours").delete().eq("id", id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
    setTours(tours.filter((tour) => tour.id !== id));
  };

  //TODO: CODIGO DATAGRID
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 200,
      renderCell: (tours) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton color="success">
              <Preview />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit This User">
            <Link to={`/dashboard/edittour/${tours.id}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete this User">
            <IconButton
              color="error"
              onClick={() => {
                deleteUsers(tours.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  //TODO: CODIGO DE LA PLANTILLA
  return (
    <Page title="Tours List">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Tours
          </Typography>
          <Link to="/dashboard/newtour">
            <Button variant="contained" color="primary">
              New Tour
            </Button>
          </Link>
        </Stack>

        <Card>
          <Box sx={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={tours}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
