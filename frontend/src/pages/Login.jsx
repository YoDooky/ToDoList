import { useState, useContext } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const { setToken } = useContext(AuthContext);
  const { setUserId } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:4444/auth/login", {
          fullName: username,
          password: password,
        })
        .then(function (res) {
          if (res.status === 200) {
            setIsAuth(true);
            localStorage.setItem("auth", "true");
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setUserId(res.data._id);
            localStorage.setItem("userId", res.data._id);
            navigate("/");
          } else {
            res.data.forEach((resData) => alert(resData.msg));
          }
        })
        .catch((err) => {
          err.response.data.forEach((err) => alert(err.msg));
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://cdn.pixabay.com/photo/2022/10/04/23/02/copper-leaves-7499230_960_720.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
              <Typography
                component="h1"
                variant="h5"
                style={{
                  color: "black",
                }}
              >
                Sign In
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  value={username}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  value={password}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  onClick={handleLogin}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={handleRegister}
                  type="submit"
                  fullWidth
                  variant="outlined"
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Login;
