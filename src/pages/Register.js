import { makeStyles } from "@material-ui/core/styles";
import {TextField, Typography, Button} from "@material-ui/core";
import Lottie from "lottie-react";
import waveAnimation from "../animation/wave.json";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import React, {useCallback, useState} from "react";
import {useHistory} from "react-router"
import {useMutation} from "@apollo/client";
import {CREATE_USER_MUTATION} from "../graphql/createUserMutation";
import {ME_QUERY} from "../graphql/meQuery";

const useStyles = makeStyles((s) => ({
  loginPage: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "calc(100vh - 4em)",
    flexDirection: "column",
    backgroundColor: "#F2D492",
  },
  loginBox: {
    width: "70vw",
    height: "80vh",
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
const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("")
  const [createUser] = useMutation(CREATE_USER_MUTATION);
    const handleNameChange = useCallback((e) => {
        setName(e.target.value);
    }, []);
    const handleUsernameChange = useCallback((e) => {
      setUsername(e.target.value);
    }, []);
    const handlePasswordChange = useCallback((e) => {
      setPassword(e.target.value);
    }, []);
  const handleAddressChange = useCallback((e) => {
    setAddress(e.target.value);
  }, []);
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handleTelChange = useCallback((e) => {
    setTel(e.target.value);
  }, []);
  const handleRegister = useCallback(
      async (e) => {
        e.preventDefault();
        try {
          const variables = {
            record:{createUser, name, username, password, address, email, tel}
          };
          await createUser({ variables,
            refetchQueries: [{ query: ME_QUERY }]});
          setName("");
          setUsername("");
          setPassword("");
          setAddress("");
          setEmail("");
          setTel("");
          history.push("/login");
          alert("Register Success!!!");
        } catch (err) {
          console.log(err);
          alert("Register Failed!!!");
        }
      },
      [createUser, history, name, username, password,address, email, tel]
  );
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
          <Typography variant="h5">Register</Typography>
          <Typography variant="subtitle1">
            Already have one?{" "}
            <Link component={RouterLink} to="/Login">
              Here
            </Link>
          </Typography>
        </div>
        <form className={classes.form} onSubmit={handleRegister}>
          <TextField
            className={classes.input}
            label="Name"
            variant="filled"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            className={classes.input}
            label="Username"
            variant="filled"
            type="text"
            required
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            className={classes.input}
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
              className={classes.input}
              label="Address"
              variant="filled"
              type="text"
              value={address}
              onChange={handleAddressChange}
              required
          />
          <TextField
              className={classes.input}
              label="Email"
              variant="filled"
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
          />
          <TextField
              className={classes.input}
              label="Tel"
              variant="filled"
              type="text"
              value={tel}
              onChange={handleTelChange}
              required
          />
          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
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

export default Register;
