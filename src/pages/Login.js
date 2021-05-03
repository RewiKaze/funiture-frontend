import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Lottie from "lottie-react";
import waveAnimation from "../animation/wave.json";
import { useHistory } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useState, useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  loginPage: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "calc(100vh - 4em)",
    flexDirection: "column",
    backgroundColor: "#F29559",
  },
  loginBox: {
    width: "70vw",
    height: "60vh",
    backgroundColor: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 2,
  },
  input: {
    backgroundColor: "white",
    borderRadius: "3px",
    width: "80%",
    marginBottom: "2.5%",
  },
  titleLogin: {
    width: "80%",
    marginBottom: "2.5%",
  },
  form: {
    display: "contents",
  },
  anim: {
    width: "100%",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
  },
}));

const Login = (props) => {
  const history = useHistory();
  const { login } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await login(username, password);
        history.push("/");
      } catch (err) {
        console.log(err);
        alert("Username or Password is not correct!!!");
      }
    },
    [login, password, username]
  );

  const classes = useStyles();
  return (
    <div className={classes.loginPage}>
      <div>
        <Typography variant="h3">Welcome to Furnishop</Typography>
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>
          something amazing
        </Typography>
      </div>
      <div className={classes.loginBox}>
        <div className={classes.titleLogin}>
          <Typography variant="h5">Login</Typography>
          <Typography variant="subtitle1">
            Create new?{" "}
            <Link component={RouterLink} to="/Register">
              Click
            </Link>
          </Typography>
        </div>
        <form onSubmit={handleLogin} className={classes.form}>
          <TextField
            className={classes.input}
            label="Username"
            variant="filled"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required={true}
          />
          <TextField
            className={classes.input}
            label="Password"
            variant="filled"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required={true}
            l
          />
          <div style={{ width: "80%" }}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
      <Lottie
        animationData={waveAnimation}
        loop
        className={classes.anim}
      ></Lottie>
    </div>
  );
};

export default Login;
