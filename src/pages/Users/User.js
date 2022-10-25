import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//FIREBASE
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
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
// ----------------------------------------------------------------------

export default function User() {
  //TODO CODIGO OBTENCION DE USUARIOS
  const [users, setUsers] = useState([]);

  //TODO READ USERS FROM FIREBASE
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArr);
    });
    return () => unsubscribe();
  }, []);

  //TODO DELETE USERS

  const deleteUsers = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  //TODO CODIGO DATAGRID
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 220,
      headerClassName: "super-app-theme--header",
      renderCell: (users) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton color="success">
              <Preview />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit This User">
            <Link to={`/dashboard/edituser/${users.id}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete this User">
            <IconButton
              color="error"
              onClick={() => {
                deleteUsers(users.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  //CODIGO DE LA PLANTILLA

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>

          <Link to="/dashboard/newuser">
            <Button variant="contained" color="primary">
              New User
            </Button>
          </Link>
        </Stack>

        <Card>
          <Box
            sx={{
              height: 400,
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#015933",
                color: "#ffffff",
              },
              "& .css-13fmiiq-MuiButtonBase-root-MuiIconButton-root": {
                color: "#ffffff",
              },
              "& .css-lqwb09-MuiButtonBase-root-MuiButton-root": {
                color: "#015933",
              },
            }}
          >
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
