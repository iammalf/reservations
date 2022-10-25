import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

//TODO: SUPABASE CLIENT
import { supabase } from "../../supabse/client";

//TODO: MATERIAL COMPONENTS
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Box,
  Stack,
  Button,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";

import { Icon } from "@iconify/react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

//TODO: COMPONENTS
import Page from "../../components/Page";

export default function Reservations() {
  //TODO: FETCH RESERVATIONS
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchDataSupabase = async () => {
      const { error, data } = await supabase
        .from("reservations")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        setReservations([]);
      }

      if (data) {
        setReservations(data);
      }
    };
    fetchDataSupabase();
  }, []);

  //TODO: DELETE RESERVATIONS
  const deleteReservation = async (id) => {
    const { data, error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
    setReservations(
      reservations.filter((reservation) => reservation.id !== id)
    );
  };

  //TODO: MODAL
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  console.log(detail);

  const handleClickOpen = async (id) => {
    setOpen(true);
    const detailReservation = async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setDetail(data);
      }
    };
    detailReservation();
  };

  const handleClose = () => {
    setOpen(false);
  };

  //TODO: COLUMNAS DATAGRID SUPABASE
  const columnas = [
    {
      field: "id",
      headerName: "Booking Number",
      width: 150,
      renderCell: (params) => "MR-00" + params.value,
    },
    {
      field: "bdate",
      headerName: "Booking Date",
      editable: true,
      type: "date",
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
      width: 150,
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
      field: "startdate",
      headerName: "Start Date",
      type: "date",
      width: 120,
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "enddate",
      headerName: "End Date",
      type: "date",
      width: 120,
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "hotelcusco",
      headerName: "Hotel Cusco",
      width: 150,
    },
    //TODO TERCER GRUPO
    {
      field: "bfdatetime",
      headerName: "Briefing DateTime",
      type: "date",
      width: 180,
      renderCell: (params) =>
        moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "picktime",
      headerName: "Pick Up Time",
      width: 150,
      renderCell: (params) => moment(params.value).format("HH:mm:ss"),
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
    //TODO: ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 200,
      getActions: (reservations) => [
        <Box>
          <Tooltip title="View Details">
            <IconButton
              color="success"
              onClick={() => {
                handleClickOpen(reservations.id);
              }}
            >
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
                deleteReservation(reservations.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>,
      ],
    },
  ];

  //TODO: PRINT
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Machu Picchu Reservation",
    pageStyle: "print",
  });

  //TODO: CODIGO DE LA PLANTILLA

  return (
    <>
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
            <Box sx={{ height: 450, width: "100%" }}>
              <DataGrid
                rows={reservations}
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

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
          >
            <DialogTitle id="alert-dialog-title">
              {"Details of the Reserve  "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Card>
                  <CardContent>
                    <div ref={componentRef}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 2, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12} sm={6} md={6} sx={{ mt: 5 }}>
                            <img
                              src="/static/images/logo.png"
                              alt="Machupicchu"
                              height="100"
                              width="100"
                              aling="center"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} sx={{ mt: 5 }}>
                            <Typography variant="subtitle1" aling="center">
                              BOOKING NUMBER
                            </Typography>
                            <Typography variant="h6" aling="center">
                              {"MR-000" + detail.id}
                            </Typography>
                            <Typography variant="subtitle1" aling="center">
                              BOOKING DATE
                            </Typography>
                            <Typography variant="h6" aling="center">
                              {moment(detail.bdate).format("DD/MM/YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
                        Name: {detail.fullname}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Reservation Details
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 2, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography sx={{ color: "text.secondary" }}>
                              TOUR:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="subtitle1">
                              {detail.tour}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6}>
                            <Typography sx={{ color: "text.secondary" }}>
                              START DATE:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="subtitle1">
                              {moment(detail.startdate).format("DD/MM/YYYY")}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6}>
                            <Typography sx={{ color: "text.secondary" }}>
                              END DATE:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="subtitle1">
                              {moment(detail.enddate).format("DD/MM/YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </CardContent>
                  <CardActions>
                    <a
                      href={
                        "https://wa.me/51" +
                        detail.phone +
                        "?text=Hello!%20Your%20reservation%20has%20been%20generated,%20check%20the%20details%20in%20the%20following%20link:%20https://reservations-three.vercel.app/reservation/" +
                        detail.uid +
                        ""
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outlined"
                        startIcon={<Icon icon="akar-icons:whatsapp-fill" />}
                      >
                        WhatsApp
                      </Button>
                    </a>
                    <Button
                      variant="outlined"
                      onClick={handlePrint}
                      startIcon={<Icon icon="bytesize:print" />}
                    >
                      Print
                    </Button>
                  </CardActions>
                </Card>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Page>
    </>
  );
}
