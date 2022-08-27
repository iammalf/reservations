import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

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

export default function Reservations() {
  //CODIGO OBTENCION DE USUARIOS
  const [reservations, setReservations] = useState([]);
  console.log(reservations);
  //READ USERS FROM FIREBASE
  useEffect(() => {
    const q = query(collection(db, "reservations"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let reservationsArr = [];
      querySnapshot.forEach((doc) => {
        reservationsArr.push({ ...doc.data(), id: doc.id });
      });
      setReservations(reservationsArr);
    });
    return () => unsubscribe();
  }, []);

  //DELETE USERS

  const deleteUsers = async (id) => {
    await deleteDoc(doc(db, "reservations", id));
  };

  //CODIGO DATAGRID
  const columns = [
    //TODO PRIMER GRUPO
    {
      field: "bookingNumber",
      headerName: "Booking Number",
      width: 100,
    },
    {
      field: "bookingDate",
      headerName: "Booking Date",
      width: 150,
      valueFormatter: (reservations) =>
        moment(reservations.startDate).format("DD/MM/YYYY"),
    },
    {
      field: "counter",
      headerName: "Counter",
      width: 150,
    },
    //TODO SEGUNDO GRUPO
    {
      field: "tour",
      headerName: "Tour",
      width: 250,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      valueFormatter: (reservations) =>
        moment(reservations.startDate).format("DD/MM/YYYY"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      valueFormatter: (reservations) =>
        moment(reservations.endDate).format("DD/MM/YYYY"),
    },
    {
      field: "hotelCusco",
      headerName: "Hotel Cusco",
      width: 150,
    },
    //TODO TERCER GRUPO
    {
      field: "bfdatetime",
      headerName: "Briefing DateTime",
      width: 150,
    },
    {
      field: "picktime",
      headerName: "Pick Up Time",
      width: 150,
    },
    {
      field: "outwordjourney",
      headerName: "Outword Journey",
      width: 150,
    },
    {
      field: "returnjourney",
      headerName: "Return Journey",
      width: 150,
    },
    {
      field: "hotelinaacc",
      headerName: "Hotel In AACC",
      width: 150,
    },
    //TODO CUARTO GRUPO
    {
      field: "fullname",
      headerName: "Full Name",
      width: 200,
    },
    {
      field: "passport",
      headerName: "Passport",
      width: 150,
    },
    {
      field: "nationality",
      headerName: "Nationality",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
    {
      field: "adults",
      headerName: "Adults",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    //TODO QUINTO GRUPO
    {
      field: "entrancetype",
      headerName: "Entrance Type",
      width: 150,
    },
    {
      field: "bus",
      headerName: "Bus Consettur",
      width: 150,
    },
    {
      field: "btg",
      headerName: "BTG",
      width: 150,
    },
    {
      field: "food",
      headerName: "Food Restrictions",
      width: 150,
    },
    {
      field: "tourinclusions",
      headerName: "Tour Inclusions",
      width: 150,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 150,
    },
    //TODO SEXTO GRUPO
    {
      field: "solescash",
      headerName: "Soles Cash",
      width: 150,
    },
    {
      field: "dollarcash",
      headerName: "Dollars Cash",
      width: 150,
    },
    {
      field: "card",
      headerName: "Card Credit/Debit",
      width: 150,
    },
    {
      field: "balancesoles",
      headerName: "Balance Soles",
      width: 150,
    },
    {
      field: "balancedollar",
      headerName: "Balance Dollars",
      width: 150,
    },
    //TODO ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 200,
      renderCell: (reservations) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton color="success">
              <Preview />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit This User">
            <Link to={`/dashboard/editreservations/${reservations.id}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete this User">
            <IconButton
              color="error"
              onClick={() => {
                deleteUsers(reservations.id);
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
    <Page title="Reservations List">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Reservations List
          </Typography>
          <Link to="/dashboard/newreservations">
            <Button variant="contained" color="primary">
              New Reservation
            </Button>
          </Link>
        </Stack>

        <Card>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reservations}
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
