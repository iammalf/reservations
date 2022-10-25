import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Grid, Box } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";

//TODO: SUPABASE CLIENT
import { supabase } from "../../supabse/client";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  backgroundColor: "#015933",
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(3, 3, 3, 7),
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  //TODO: SUPABASE GET RESERVATION
  const { uid } = useParams();
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("uid", uid)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setReservation(data);
      }
    };
    fetchReservations();
  }, []);

  return (
    <Page title="Reservation Detail">
      <RootStyle>
        <HeaderStyle>
          <img
            src="/static/images/logo.png"
            alt="Machupicchu"
            height="70"
            width="70"
          />
        </HeaderStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
              >
                <Grid item xs={12} sm={12} md={12} sx={{ mt: 10 }}>
                  <img
                    src="/static/images/logo.png"
                    alt="Machupicchu"
                    height="100"
                    width="100"
                    aling="center"
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography variant="h3" sx={{ mt: 5, mb: 3 }}>
              Hi, {reservation.fullname}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Thank you for using the services of Machu Picchu Reservations.
              Below you will find a brief summary of your recent booking.
            </Typography>
            <Typography variant="h4" gutterBottom>
              Reservation Details
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <Typography sx={{ color: "text.secondary", mb: 1 }}>
                    BOOKING NUMBER:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {"MR-00" + reservation.id}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Typography sx={{ color: "text.secondary", mb: 1 }}>
                    TOUR:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {reservation.tour}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Typography sx={{ color: "text.secondary", mb: 1 }}>
                    START DATE:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {moment(reservation.startdate).format("DD/MM/YYYY")}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Typography sx={{ color: "text.secondary", mb: 1 }}>
                    END DATE:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {moment(reservation.enddate).format("DD/MM/YYYY")}
                </Grid>
              </Grid>
            </Box>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
