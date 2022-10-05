import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//FIREBASE
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
  setDoc,
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
import Reservationslist from "../Reservations/Components/ReservationsList";
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
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 200,
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

  //Refencia a la BD Firestore
  // const usersCollection = collection(db, "users");
  //Funcion para mostrar todos los usuarios
  /* const getUsers = async () => {
    const data = await getDocs(usersCollection);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(users);
  };
  //usamos useEffect
  useEffect(() => {
    getUsers();
  }, []); */

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
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={users}
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

        <Card>
          <Box sx={{ height: 400, width: "100%" }}>
            <Reservationslist />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
