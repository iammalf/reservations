import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
// sections
import { LoginForm } from "../../sections/auth/login";

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

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
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

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

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
            <Typography variant="h3" sx={{ mt: 10, mb: 3 }}>
              Hi, {reservation.fullname.toUpperCase()}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Reservation Details
            </Typography>{" "}
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              BOOKING NUMBER: {"MR-00" + reservation.id}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              TOUR: {reservation.tour}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              START DATE: {moment(reservation.startdate).format("DD/MM/YYYY")}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              END DATE: {moment(reservation.enddate).format("DD/MM/YYYY")}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              DOLLAR CASH: {"USD. " + reservation.dollarcash + ".00"}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              SOLES CASH: {"S/. " + reservation.solescash + ".00"}
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
