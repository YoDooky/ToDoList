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

const Register = () => {
  const { setIsAuth } = useContext(AuthContext);
  const { setToken } = useContext(AuthContext);
  const { setUserId } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:4444/auth/register", {
          fullName: username,
          password: password,
        })
        .then(function (res) {
          if (res.status === 200) {
            navigate("/login");
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
              <Typography
                component="h1"
                variant="h5"
                style={{
                  color: "black",
                }}
              >
                Sign Up
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
                <Button
                  onClick={handleRegister}
                  type="submit"
                  fullWidth
                  variant="outlined"
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Register;
