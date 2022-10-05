import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//FIREBASE
import { db, auth } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// material
import {
  Button,
  Box,
  Stack,
  Container,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
} from "@mui/material";

// components
import Page from "../../components/Page";

// ----------------------------------------------------------------------

export default function NewUser() {
  //CODIGO REGISTRO DE USUARIO
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //CODIGO SELECT
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  //CODIGO ADD USER
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      //REGISTRO DE EMAIL Y PASSWORD PARA LOGIN
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //REGISTRO DE USUARIO EN LA COLECCION
      await setDoc(doc(db, "users", res.user.uid), {
        name: name,
        email: email,
        password: password,
        role: role,
        timeStamp: serverTimestamp(),
      });
      navigate("/dashboard/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="New User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom>
            Create New User
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <form onSubmit={handleAdd}>
            <div>
              <TextField
                sx={{ m: 1, width: "35ch" }}
                label="Names"
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="role"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={"Counter"}>Counter</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <Link to="/dashboard/user">
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                </Link>
              </FormControl>

              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <Button type="submit" variant="contained" color="primary">
                  Add User
                </Button>
              </FormControl>
            </div>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
