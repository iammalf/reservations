import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  TextField,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../../components/hook-form";
import { AuthContext } from "../../../context/AuthContext";

// ----------------------------------------------------------------------

export default function LoginForm() {
  //CODIGO LOGIN FIREBASE
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard/app", { replace: true });
        // ...
      })
      .catch((error) => {
        setError(true);
      });
  };

  //CODIGO DE PLANTILLA

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    handleLogin();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
          name="email"
          type="email"
          required
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              Wrong email or password. Please try again.
            </Alert>
          </Stack>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
