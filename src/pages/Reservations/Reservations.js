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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
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
      renderCell: (params) => "MR-000" + params.value,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "bdate",
      headerName: "Booking Date",
      editable: true,
      type: "date",
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "counter",
      headerName: "Counter",
      width: 150,
      headerClassName: "super-app-theme--header",
    },

    //TODO SEGUNDO GRUPO 927987674
    {
      field: "tour",
      headerName: "Tour",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "startdate",
      headerName: "Start Date",
      type: "date",
      width: 120,
      editable: true,
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "enddate",
      headerName: "End Date",
      type: "date",
      width: 120,
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "hotelcusco",
      headerName: "Hotel Cusco",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    //TODO TERCER GRUPO
    {
      field: "bfdatetime",
      headerName: "Briefing DateTime",
      type: "date",
      width: 180,
      renderCell: (params) =>
        moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "picktime",
      headerName: "Pick Up Time",
      width: 150,
      renderCell: (params) => moment(params.value).format("HH:mm:ss"),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "outwordjourney",
      headerName: "Outword Journey",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "returnjourney",
      headerName: "Return Journey",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "hotelinaacc",
      headerName: "Hotel In AACC",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    //TODO CUARTO GRUPO
    {
      field: "fullname",
      headerName: "Full Name",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "passport",
      headerName: "Passport",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nationality",
      headerName: "Nationality",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "adults",
      headerName: "Adults",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    //TODO QUINTO GRUPO
    {
      field: "entrancetype",
      headerName: "Entrance Type",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "bus",
      headerName: "Bus Consettur",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "btg",
      headerName: "BTG",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "food",
      headerName: "Food Restrictions",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tourinclusions",
      headerName: "Tour Inclusions",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    //TODO SEXTO GRUPO
    {
      field: "solescash",
      headerName: "Soles Cash",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dollarcash",
      headerName: "Dollars Cash",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "card",
      headerName: "Card Credit/Debit",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "balancesoles",
      headerName: "Balance Soles",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "balancedollar",
      headerName: "Balance Dollars",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    //TODO: ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      sortable: false,
      width: 200,
      headerClassName: "super-app-theme--header",
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

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
            <Box
              sx={{
                height: 650,
                width: "100%",
                "& .super-app-theme--header": {
                  backgroundColor: "#015933",
                  color: "#ffffff",
                },
              }}
            >
              <DataGrid
                rows={reservations}
                columns={columnas}
                pageSize={10}
                components={{ Toolbar: GridToolbar }}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                sx={{
                  "& .css-13fmiiq-MuiButtonBase-root-MuiIconButton-root": {
                    color: "#ffffff",
                  },
                  "& .css-lqwb09-MuiButtonBase-root-MuiButton-root": {
                    color: "#015933",
                  },
                }}
              />
            </Box>
          </Card>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">
              {"Details of the Reserve  "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Card>
                  <CardContent>
                    <div ref={componentRef}>
                      <Box sx={{ flexGrow: 1, mt: 10 }}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 450 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={8}
                                    sx={{ mt: 1 }}
                                  >
                                    <img
                                      src="/static/images/logo.png"
                                      alt="Machupicchu"
                                      height="80"
                                      width="80"
                                      aling="center"
                                    />
                                  </Grid>
                                </TableCell>
                                <TableCell align="left">
                                  <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    md={4}
                                    sx={{ mt: 1 }}
                                  >
                                    <Typography variant="subtitle2">
                                      Machu Picchu Reservations
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      Address: Portal nuevo 270 plaza regocijo
                                      Cusco – Peru
                                    </Typography>
                                    <Typography variant="subtitlsubtitle2e1">
                                      Email: machupicchureservations@gmail.com
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      Phone: +51 84 286257
                                    </Typography>
                                  </Grid>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ border: 1, borderRadius: 20 }}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    md={4}
                                    sx={{ mt: 1 }}
                                  >
                                    <Typography variant="subtitle2">
                                      BOOKING NUMBER
                                    </Typography>
                                    <Typography variant="subtitle1">
                                      {"MR-000" + detail.id}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      BOOKING DATE
                                    </Typography>
                                    <Typography variant="subtitle1">
                                      {moment(detail.bdate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Typography>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>

                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 450 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Grid item xs={12} sm={8} md={8}>
                                    <Typography variant="subtitle2">
                                      Client: {detail.fullname}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      Email: {detail.email}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      Phone: {detail.phone}
                                    </Typography>
                                  </Grid>
                                </TableCell>
                                <TableCell align="left">
                                  <Grid item xs={12} sm={4} md={4}>
                                    <Typography variant="subtitle2">
                                      Date of issue:{" "}
                                      {moment(detail.bdate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      Expiration date:{" "}
                                      {moment(detail.bdate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Typography>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>

                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 450 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Tour</StyledTableCell>
                                <StyledTableCell align="left">
                                  Start Date
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  End Date
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  {detail.tour}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  {moment(detail.startdate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  {moment(detail.enddate).format("DD/MM/YYYY")}
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
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
