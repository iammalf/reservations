import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//TODO: COUNTRIES JSON
import Countries from "../../utils/countries.json";

//TODO: SUPABASE CLIENT
import { supabase } from "../../supabse/client";

//TODO: FIREBASE USER ACTIVE
import { AuthContext } from "../../context/AuthContext";

//TODO: FIREBASE
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

// material
import {
  Button,
  Box,
  Stack,
  Container,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  InputAdornment,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
//TODO: COMPONENTS
import Page from "../../components/Page";

export default function NewReservations() {
  //TODO: ID RESERVATIONS
  const { currentUser } = useContext(AuthContext);
  //TODO:  console.log(currentUser.uid);

  const [user, setUser] = useState({});
  const userName = user.name;
  //console.log(userName);

  const docRef = doc(db, "users", currentUser.uid);
  useEffect(() => {
    const getUser = async () => {
      await getDoc(docRef).then((doc) =>
        setUser({ ...doc.data(), id: doc.id })
      );
    };
    getUser();
  }, []);

  //TODO: FETCH TOURS
  const [tours, setTours] = useState([]);
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

  //TODO: CODIGO REGISTRO DE RESERVACIONES

  const navigate = useNavigate();
  //TODO: CAMPOS DE REGISTRO
  //TODO: PRIMER GRUPO
  const bdate = new Date();
  // const [counter, setCounter] = useState(userName);

  //TODO: SEGUNDO GRUPO
  const [tour, setTour] = useState("");
  const handleTour = (event) => {
    setTour(event.target.value);
  };
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [hotelcusco, setHotelCusco] = useState("");

  //TODO: TERCER GRUPO
  const [bfdatetime, setBfdatetime] = useState(new Date());
  const [picktime, setPicktime] = useState(new Date());

  const [outwordjourney, setOutwordJourney] = useState("");
  const [returnjourney, setReturnjourney] = useState("");
  const [hotelinaacc, setHotelinaacc] = useState("");

  //TODO: CUARTO GRUPO
  const [fullname, setFullname] = useState("");
  const [passport, setPassport] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [nationality, setNationality] = useState("");
  const handleNationality = (event) => {
    setNationality(event.target.value);
  };
  const [gender, setGender] = useState("");
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const [adults, setAdults] = useState("");
  const handleAdults = (event) => {
    setAdults(event.target.value);
  };
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  //TODO: QUINTO GRUPO
  const [entrancetype, setEntrancetype] = useState("");
  const [bus, setBus] = useState("");
  const [btg, setBtg] = useState("");
  const [food, setFood] = useState("");
  const [tourinclusions, setTourinclusions] = useState("");
  const [notes, setNotes] = useState("");

  //TODO: SEXTO GRUPO
  const [solescash, setSolescash] = useState("");
  const [dollarcash, setDollarcash] = useState("");
  const [card, setCard] = useState("");
  const [balancesoles, setBalancesoles] = useState("");
  const [balancedollar, setBalancedollar] = useState("");

  //TODO: CODIGO ADD RESERVATIONS
  const handleReservations = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("reservations").insert([
      {
        bdate,
        counter: userName,
        tour,
        startdate,
        enddate,
        hotelcusco,
        bfdatetime,
        picktime,
        outwordjourney,
        returnjourney,
        hotelinaacc,
        fullname,
        passport,
        birthday,
        nationality,
        gender,
        adults,
        phone,
        email,
        entrancetype,
        bus,
        btg,
        food,
        tourinclusions,
        notes,
        solescash,
        dollarcash,
        card,
        balancesoles,
        balancedollar,
      },
    ]);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      navigate("/dashboard/reservations");
    }
  };

  //TODO: CODIGO DE LA PLANTILLA
  return (
    <Page title="New Reservations">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom>
            Create New Reservations
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <form onSubmit={handleReservations}>
            {/* TODO: SEGUNDO GRUPO */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="tour">Tour</InputLabel>
                  <Select value={tour} onChange={handleTour} label="Tours">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {tours.map((single) => {
                      return (
                        <MenuItem key={single.id} value={single.name}>
                          {single.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DatePicker
                        label="Start date"
                        value={startdate}
                        inputFormat="yyyy-MM-dd"
                        onChange={(newValue1) => {
                          setStartdate(newValue1);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DatePicker
                        label="End date"
                        value={enddate}
                        inputFormat="yyyy-MM-dd"
                        onChange={(newValue2) => {
                          setEnddate(newValue2);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Hotel Cusco"
                    variant="outlined"
                    required
                    type="text"
                    value={hotelcusco}
                    onChange={(e) => setHotelCusco(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* TODO: TERCER GRUPO */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={2} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Brifing DateTime"
                      value={bfdatetime}
                      onChange={(newValue) => {
                        setBfdatetime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Pick Up Time"
                      value={picktime}
                      onChange={(newValue) => {
                        setPicktime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Outword Journey"
                    variant="outlined"
                    required
                    type="text"
                    value={outwordjourney}
                    onChange={(e) => setOutwordJourney(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Return Journey"
                    variant="outlined"
                    required
                    type="text"
                    value={returnjourney}
                    onChange={(e) => setReturnjourney(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Hotel in AA.CC."
                    variant="outlined"
                    required
                    type="text"
                    value={hotelinaacc}
                    onChange={(e) => setHotelinaacc(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* TODO: CUARTO GRUPO */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    required
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Passport"
                    variant="outlined"
                    required
                    type="text"
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DatePicker
                        openTo="year"
                        views={["year", "month", "day"]}
                        label="Birthdate"
                        value={birthday}
                        onChange={(newValue) => {
                          setBirthday(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="nationality">Nationality</InputLabel>
                  <Select
                    value={nationality}
                    label="Nationality"
                    onChange={handleNationality}
                  >
                    {Countries.map((single) => {
                      return (
                        <MenuItem key={single.code} value={single.name}>
                          {single.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select value={gender} label="Gender" onChange={handleGender}>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="sex">Adult/Stundet</InputLabel>
                  <Select
                    value={adults}
                    label="Adult/Stundet"
                    onChange={handleAdults}
                  >
                    <MenuItem value={"Adult"}>Adult</MenuItem>
                    <MenuItem value={"Student"}>Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    required
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    required
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* TODO: QUINTO GRUPO GRUPO */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Entrance Type"
                    variant="outlined"
                    required
                    type="text"
                    value={entrancetype}
                    onChange={(e) => setEntrancetype(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Bus Consettur"
                    variant="outlined"
                    required
                    type="text"
                    value={bus}
                    onChange={(e) => setBus(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="BTG"
                    variant="outlined"
                    required
                    type="text"
                    value={btg}
                    onChange={(e) => setBtg(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Food Restrictions"
                    variant="outlined"
                    required
                    type="text"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Tour Inclusions"
                    variant="outlined"
                    required
                    type="text"
                    value={tourinclusions}
                    onChange={(e) => setTourinclusions(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Notes"
                    variant="outlined"
                    required
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* TODO: SEXTO GRUPO GRUPO */}

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={2} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Soles Cash"
                    variant="outlined"
                    required
                    type="text"
                    value={solescash}
                    onChange={(e) => setSolescash(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">S/.</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Dollars Cash"
                    variant="outlined"
                    required
                    type="text"
                    value={dollarcash}
                    onChange={(e) => setDollarcash(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Card Credit/Debit"
                    variant="outlined"
                    required
                    type="text"
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Balance Soles"
                    variant="outlined"
                    required
                    type="text"
                    value={balancesoles}
                    onChange={(e) => setBalancesoles(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">S/.</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Balance Dollars"
                    variant="outlined"
                    required
                    type="text"
                    value={balancedollar}
                    onChange={(e) => setBalancedollar(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* TODO: GRUPO BOTONES */}
            <Stack direction="row" spacing={2}>
              <Link to="/dashboard/reservations">
                <Button variant="contained" color="error">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" variant="contained" color="primary">
                Add Reservation
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
