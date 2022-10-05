import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { supabase } from "../../supabse/client";

//FIREBASE
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  where,
  orderBy,
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
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Delete, Edit, Preview } from "@mui/icons-material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// components
import Page from "../../components/Page";
import Reservationslist from "./Components/ReservationsList";

export default function Reservations() {
  //TODO DATE FILTER

  const [dateFilter, setDateFilter] = useState(moment());
  console.log(dateFilter);

  const dateEqual = moment(dateFilter).format("YYYY-MM-DD");
  console.log(dateEqual);

  // TODO CODIGO OBTENCION DE USUARIOS
  const [reservations, setReservations] = useState([]);
  console.log(reservations);
  // TODO READ USERS FROM FIREBASE
  useEffect(() => {
    const q = query(
      collection(db, "reservations"),
      orderBy("bookingDate", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let reservationsArr = [];
      querySnapshot.forEach((doc) => {
        reservationsArr.push({ ...doc.data(), id: doc.id });
      });
      setReservations(reservationsArr);
    });
    return () => unsubscribe();
  }, []);

  //TODO SUPABASE DATAGRID
  const [supabaseReservations, setSuperReservations] = useState([]);
  console.log(supabaseReservations);
  useEffect(() => {
    const fetchDataSupabase = async () => {
      const { error, data } = await supabase.from("reservations").select();
      if (error) {
        setSuperReservations([]);
      }
      if (data) {
        setSuperReservations(data);
      }
    };
    fetchDataSupabase();
  }, []);

  // TODO DELETE USERS
  const deleteUsers = async (id) => {
    await deleteDoc(doc(db, "reservations", id));
  };

  //TODO CONSULTA QUERY
  const handleQuery = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "reservations"),
      where("bookingDate", "==", new Date(dateEqual))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let queryArray = [];
      querySnapshot.forEach((doc) => {
        queryArray.push({ ...doc.data(), id: doc.id });
      });
      setReservations(queryArray);
    });
    return () => unsubscribe();
  };
  // TODO CODIGO DATAGRID
  const columns = [
    {
      field: "bookingNumber",
      headerName: "Booking Number",
      width: 150,
    },
    {
      field: "bookingDate",
      headerName: "Booking Date",
      editable: true,

      width: 150,
      renderCell: (params) =>
        moment(params.row.bookingDate.toDate().toUTCString()).format(
          "DD/MM/YYYY"
        ),
    },
    {
      field: "counter",
      headerName: "Counter",
      width: 150,
    },

    //TODO SEGUNDO GRUPO 927987674
    {
      field: "tour",
      headerName: "Tour",
      width: 250,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      width: 120,
      valueFormatter: (params) =>
        moment(params.value.toDate()).format("YYYY-MM-DD"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "date",
      width: 120,
      valueFormatter: (params) =>
        moment(params.value.toDate()).format("YYYY-MM-DD"),
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
      type: "date",
      width: 180,
      valueFormatter: (params) =>
        moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "picktime",
      headerName: "Pick Up Time",
      type: "date",
      width: 120,
      valueFormatter: (params) =>
        moment(params.value.toDate()).format("HH:mm:ss"),
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
    /* //TODO ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 200,
      getActions: (reservations) => [
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
        </Box>,
      ],
    }, */
  ];

  const columnas = [
    {
      field: "bookingNumber",
      headerName: "Booking Number",
      width: 150,
    },
    {
      field: "bookingDate",
      headerName: "Booking Number",
      editable: true,
      type: "date",
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
      width: 250,
    },
    {
      field: "created_at",
      headerName: "Created At",
      editable: true,
      type: "date",
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
      width: 250,
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

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Filter"
              value={dateFilter}
              onChange={(newValue) => {
                setDateFilter(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button variant="contained" color="primary" onClick={handleQuery}>
            Filter Reservation
          </Button>
        </Stack>

        <Card>
          <Box sx={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={reservations}
              columns={columns}
              pageSize={10}
              getRowId={(row) => row.id}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Card>

        <Card>
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={supabaseReservations}
              columns={columnas}
              pageSize={10}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Card>

        {/* <Card>
          <Box sx={{ height: 700, width: "100%" }}>
            <Reservationslist />
          </Box>
        </Card> */}
      </Container>
    </Page>
  );
}
