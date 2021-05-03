import React, {useCallback, useState} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router"
import {useMutation} from "@apollo/client";
import {CREATE_USER_MUTATION} from "../../graphql/createUserMutation";
import {ME_QUERY} from "../../graphql/meQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        minWidth: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AdminCreateUser = () =>{
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
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
    const handleTypeChange = useCallback((e) => {
        setType(e.target.value);
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


    const handleAddUser = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const variables = {
                    record:{createUser, name, username, password, address, type, email, tel}
                };
                await createUser({ variables,
                    refetchQueries: [{ query: ME_QUERY }]});
                setName("");
                setUsername("");
                setPassword("");
                setType("");
                setAddress("");
                setEmail("");
                setTel("");

                history.push("/admin");
                alert("Add User Success!!!");
            } catch (err) {
                console.log(err);
                alert("Add User Failed!!!");
            }
        },
        [createUser, history, name, username, password, address, type, email, tel]
    );
    return(
        <React.Fragment>
        <h1>ADMIN CREATE USER</h1>
        <hr/>
            <form
                onSubmit={handleAddUser}
            >
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            style={{ width: "100%"}}
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={type}
                                onChange={handleTypeChange}
                                label="Type"
                                required
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'ADMIN'}>Admin</MenuItem>
                                <MenuItem value={'CUSTOMER'}>Customer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            style={{ width: "100%"}}
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            style={{ width: "100%"}}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Address (Optional)"
                            variant="outlined"
                            style={{ width: "100%"}}
                            type="text"
                            value={address}
                            onChange={handleAddressChange}

                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label="Email (Optional)"
                            variant="outlined"
                            style={{ width: "100%"}}
                            type="text"
                            value={email}
                            onChange={handleEmailChange}

                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Tel (Optional)"
                            variant="outlined"
                            style={{ width: "100%"}}
                            type="text"
                            value={tel}
                            onChange={handleTelChange}

                        />
                    </Grid>
                </Grid>
                <br/>
                <hr/>
                <Button variant="contained" color="primary" type="submit" value="Submit">
                    Create
                </Button>
                {'  '}
                <Link to={{
                    pathname: `/admin`,
                }} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="secondary">
                        Back
                    </Button>
                </Link>
            </form>
        </React.Fragment>
    )
}
export default AdminCreateUser;