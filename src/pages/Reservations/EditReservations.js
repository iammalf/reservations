import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//FIREBASE
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

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
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// components
import Page from "../../components/Page";

export default function EditReservations() {
  //DATOS
  const navigate = useNavigate();
  const { id } = useParams();

  const [bnumber, setBnumber] = useState("");
  const [bdate, setBdate] = useState(new Date());
  console.log(bdate);
  const [counter, setCounter] = useState("");

  //SEGUNDO GRUPO
  const [tour, setTour] = useState("");
  const handleTour = (event) => {
    setTour(event.target.value);
  };
  const [startdate, setStartdate] = useState(new Date());
  console.log(startdate);
  const [enddate, setEnddate] = useState(new Date());
  console.log(enddate);
  const [hotelcusco, setHotelCusco] = useState("");

  //TERCER GRUPO
  const [bfdatetime, setBfdatetime] = useState(new Date());
  console.log("Date Time", bfdatetime);
  const [picktime, setPicktime] = useState(null);
  console.log("Pick Time", picktime);
  const [outwordjourney, setOutwordJourney] = useState("");
  const [returnjourney, setReturnjourney] = useState("");
  const [hotelinaacc, setHotelinaacc] = useState("");

  //CUARTO GRUPO
  const [fullname, setFullname] = useState("");
  const [passport, setPassport] = useState("");
  const [birthday, setBirthday] = useState("");
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

  //QUINTO GRUPO
  const [entrancetype, setEntrancetype] = useState("");
  const [bus, setBus] = useState("");
  const [btg, setBtg] = useState("");
  const [food, setFood] = useState("");
  const [tourinclusions, setTourinclusions] = useState("");
  const [notes, setNotes] = useState("");

  //SEXTO GRUPO
  const [solescash, setSolescash] = useState("");
  const [dollarcash, setDollarcash] = useState("");
  const [card, setCard] = useState("");
  const [balancesoles, setBalancesoles] = useState("");
  const [balancedollar, setBalancedollar] = useState("");

  //CODIGO USER UPDATE
  const updateReservations = async (e) => {
    e.preventDefault();
    try {
      //UPDATE RESERVATIONS
      const reservation = doc(db, "reservations", id);
      const data = {
        //TODO PRIMER GRUPO
        bookingNumber: bnumber,
        bookingDate: bdate,
        counter: counter,
        //TODO SEGUNDO GRUPO
        tour: tour,
        startDate: startdate,
        endDate: enddate,
        hotelCusco: hotelcusco,
        //TODO TERCER GRUPO
        bfdatetime: bfdatetime,
        picktime: picktime,
        outwordjourney: outwordjourney,
        returnjourney: returnjourney,
        hotelinaacc: hotelinaacc,
        //TODO CUARTO GRUPO
        fullname: fullname,
        passport: passport,
        birthday: birthday,
        nationality: nationality,
        gender: gender,
        adults: adults,
        phone: phone,
        email: email,
        //TODO QUINTO GRUPO
        entrancetype: entrancetype,
        bus: bus,
        btg: btg,
        food: food,
        tourinclusions: tourinclusions,
        notes: notes,
        //TODO SEXTO GRUPO
        solescash: solescash,
        dollarcash: dollarcash,
        card: card,
        balancesoles: balancesoles,
        balancedollar: balancedollar,
      };
      await updateDoc(reservation, data);
      navigate("/dashboard/reservations");
    } catch (error) {
      //console.log(error);
    }
  };

  const getReservationById = async (id) => {
    const reservation = await getDoc(doc(db, "reservations", id));
    if (reservation.exists()) {
      //TODO PRIMER GRUPO
      setBnumber(reservation.data().bookingNumber);
      setBdate(reservation.data().bookingDate);
      setCounter(reservation.data().counter);
      //TODO SEGUNDO GRUPO
      setTour(reservation.data().tour);
      setStartdate(reservation.data().startDate);
      setEnddate(reservation.data().endDate);
      setHotelCusco(reservation.data().hotelCusco);
      //TODO TERCER GRUPO
      setBfdatetime(reservation.data().bfdatetime);
      setPicktime(reservation.data().picktime);
      setOutwordJourney(reservation.data().outwordjourney);
      setReturnjourney(reservation.data().returnjourney);
      setHotelinaacc(reservation.data().hotelinaacc);
      //TODO CUARTO GRUPO
      setFullname(reservation.data().fullname);
      setPassport(reservation.data().passport);
      setBirthday(reservation.data().birthday);
      setNationality(reservation.data().nationality);
      setGender(reservation.data().gender);
      setAdults(reservation.data().adults);
      setPhone(reservation.data().phone);
      setEmail(reservation.data().email);
      //TODO QUINTO GRUPO
      setEntrancetype(reservation.data().entrancetype);
      setBus(reservation.data().bus);
      setBtg(reservation.data().btg);
      setFood(reservation.data().food);
      setTourinclusions(reservation.data().tourinclusions);
      setNotes(reservation.data().notes);
      //TODO SEXTO GRUPO
      setSolescash(reservation.data().solescash);
      setDollarcash(reservation.data().dollarcash);
      setCard(reservation.data().card);
      setBalancesoles(reservation.data().balancesoles);
      setBalancedollar(reservation.data().balancedollar);
      console.log(reservation.data());
    } else {
      alert("Tour Not Exists");
    }
  };

  useEffect(() => {
    getReservationById(id);
  }, []);

  return (
    <Page title="Update Reservations">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom>
            Update Reservation
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <form onSubmit={updateReservations}>
            {/* TODO: PRIMER GRUPO */}
            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Booking Number"
                variant="outlined"
                required
                type="text"
                value={bnumber}
                onChange={(e) => setBnumber(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Booking date"
                    value={bdate}
                    onChange={(newValue) => {
                      setBdate(newValue);
                    }}
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Counter"
                variant="outlined"
                required
                type="text"
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
              />
            </FormControl>

            {/* TODO: SEGUNDO GRUPO */}
            <FormControl sx={{ m: 1, width: "25ch" }}>
              <InputLabel id="tour">Tour</InputLabel>
              <Select value={tour} label="Tour" onChange={handleTour}>
                <MenuItem value={"Tour 1"}>Tour 1</MenuItem>
                <MenuItem value={"Tour 2"}>Tour 2</MenuItem>
                <MenuItem value={"Tour 3"}>Tour 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "22ch" }}>
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
            <FormControl sx={{ m: 1, width: "22ch" }}>
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
            <FormControl sx={{ m: 1, width: "28ch" }}>
              <TextField
                label="Hotel Cusco"
                variant="outlined"
                required
                type="text"
                value={hotelcusco}
                onChange={(e) => setHotelCusco(e.target.value)}
              />
            </FormControl>

            {/* TODO: TERCER GRUPO */}
            <FormControl sx={{ m: 1, width: "50ch" }}>
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

            <FormControl sx={{ m: 1, width: "50ch" }}>
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

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Outword Journey"
                variant="outlined"
                required
                type="text"
                value={outwordjourney}
                onChange={(e) => setOutwordJourney(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Return Journey"
                variant="outlined"
                required
                type="text"
                value={returnjourney}
                onChange={(e) => setReturnjourney(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Hotel in AA.CC."
                variant="outlined"
                required
                type="text"
                value={hotelinaacc}
                onChange={(e) => setHotelinaacc(e.target.value)}
              />
            </FormControl>

            {/* TODO: CUARTO GRUPO */}
            <FormControl sx={{ m: 1, width: "55ch" }}>
              <TextField
                label="Full Name"
                variant="outlined"
                required
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "55ch" }}>
              <TextField
                label="Passport"
                variant="outlined"
                required
                type="text"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Birthdate"
                variant="outlined"
                required
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <InputLabel id="nationality">Nationality</InputLabel>
              <Select
                value={nationality}
                label="Nationality"
                onChange={handleNationality}
              >
                <MenuItem value={"Peru"}>Peru</MenuItem>
                <MenuItem value={"Argentina"}>Argentina</MenuItem>
                <MenuItem value={"Chile"}>Chile</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <InputLabel id="gender">Gender</InputLabel>
              <Select value={gender} label="Gender" onChange={handleGender}>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
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

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                required
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Email"
                variant="outlined"
                required
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* TODO: QUINTO GRUPO GRUPO */}
            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Entrance Type"
                variant="outlined"
                required
                type="text"
                value={entrancetype}
                onChange={(e) => setEntrancetype(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Bus Consettur"
                variant="outlined"
                required
                type="text"
                value={bus}
                onChange={(e) => setBus(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="BTG"
                variant="outlined"
                required
                type="text"
                value={btg}
                onChange={(e) => setBtg(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Food Restrictions"
                variant="outlined"
                required
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Tour Inclusions"
                variant="outlined"
                required
                type="text"
                value={tourinclusions}
                onChange={(e) => setTourinclusions(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "33ch" }}>
              <TextField
                label="Notes"
                variant="outlined"
                required
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormControl>

            {/* TODO: SEXTO GRUPO GRUPO */}

            <FormControl sx={{ m: 1, width: "20ch" }}>
              <TextField
                label="Soles Cash"
                variant="outlined"
                required
                type="text"
                value={solescash}
                onChange={(e) => setSolescash(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "20ch" }}>
              <TextField
                label="Dollars Cash"
                variant="outlined"
                required
                type="text"
                value={dollarcash}
                onChange={(e) => setDollarcash(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "20ch" }}>
              <TextField
                label="Card Credit/Debit"
                variant="outlined"
                required
                type="text"
                value={card}
                onChange={(e) => setCard(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "20ch" }}>
              <TextField
                label="Balance Soles"
                variant="outlined"
                required
                type="text"
                value={balancesoles}
                onChange={(e) => setBalancesoles(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "20ch" }}>
              <TextField
                label="Balance Dollars"
                variant="outlined"
                required
                type="text"
                value={balancedollar}
                onChange={(e) => setBalancedollar(e.target.value)}
              />
            </FormControl>

            {/* TODO: GRUPO BOTONES */}
            <Stack direction="row" spacing={2}>
              <Link to="/dashboard/reservations">
                <Button variant="contained" color="error">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" variant="contained" color="primary">
                Add Reservations
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
