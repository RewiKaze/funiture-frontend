import React, {useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {ORDER_QUERY} from "../../graphql/orderQuery";
import {UPDATE_ORDER_MUTATION} from "../../graphql/updateOrder";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        backgroundColor:"#202C39",
        color:"white"
    },

    avatar: {
        backgroundColor: red[500],
    },
    formControl: {
        minWidth: "100%",
        backgroundColor:"white",

    },
}));

export default function RecipeReviewCard() {
    const history = useHistory();
    const classes = useStyles();
    const { _id } = useParams();
    const [status, setStatus] = useState("");
    const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION);
    const { loading, data, error } = useQuery(ORDER_QUERY, {
        variables: { _id },
        fetchPolicy: "network-only",
    });
    const handleStatusChange = useCallback((e) => {
        setStatus(e.target.value);
    }, []);

    const saveOrder = async (e) => {
        e.preventDefault();
        try {
            console.log(data.orders.find((each) => each._id === _id)._id);
            await updateOrder({
                variables: {
                    id: data.orders.find((each) => each._id === _id)._id ?? 0,
                    record: {
                        updateOrder,
                        status,
                    },
                },
            });
            setStatus("");

            history.push("/admin/orders");
            alert("Update Order Success!!!");
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
            // alert(err);
            alert("Update Order Failed!!!");
        }
    };

    if (loading) {
        return "Loading ...";
    }
    if (error) {
        return "Error !!";
    }
    const filteredData = data.orders.find((each) => each._id === _id);
    return (

        <React.Fragment>
            {data ? (
                <React.Fragment>
        <h2>Order ID: {filteredData._id}</h2>
            <hr/>
        <Grid container spacing={3}>
            <Grid item xs={8}>
        <Card className={classes.root}>
            <CardContent>
                <Typography>
                    <h3>Customer Info</h3>
                    <hr/>
                    <p><b>Name: </b> {filteredData.user.name}</p>
                    <p><b>Address: </b> {filteredData.user.address}</p>
                    <p><b>Email: </b> {filteredData.user.email}</p>
                    <p><b>Tel: </b> {filteredData.user.tel}</p>
                    <br/>
                    <h3>Product Detail</h3>
                    <hr/>
                    <p><b>Name: </b> {filteredData.product.name}</p>
                    <p><b>Type: </b> {filteredData.product.type}</p>
                    <p><b>Price: </b> {parseInt(filteredData.product.price).toLocaleString("th-TH", {
                        style: "currency",
                        currency: "THB",
                    }) ?? ""}</p>
                    <br/>
                    <h3>Order Detail</h3>
                    <hr/>
                    <p><b>Status: </b> {filteredData.status === "INCOMPLETE"?<b style={{color:'lightsalmon'}}>INCOMPLETE</b>
                        : filteredData.status === "CANCEL"? <b style={{color:'red'}}>CANCELED</b>
                            : <b style={{color:'green'}}>COMPLETED</b>}</p>
                    <p><b>Lasted: </b> {filteredData.timestamp}</p>
                    <p style={{textAlign:'right'}}><b>Total: </b> {parseInt(filteredData.total).toLocaleString("th-TH", {
                        style: "currency",
                        currency: "THB",
                    }) ?? ""}</p>
                </Typography>
            </CardContent>

        </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography>
                            <h3>Update Status</h3>
                            <hr/>
                            <p><b>Lasted: </b> {filteredData.status === "INCOMPLETE"?<b style={{color:'lightsalmon'}}>INCOMPLETE</b>
                                : filteredData.status === "CANCEL"? <b style={{color:'red'}}>CANCELED</b>
                                    : <b style={{color:'green'}}>COMPLETED</b>}</p>
                            <form onSubmit={saveOrder}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Edit Status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={status}
                                        onChange={handleStatusChange}
                                        placeholder={filteredData.type}
                                        label="Status"
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"INCOMPLETE"}>INCOMPLETE</MenuItem>
                                        <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                                        <MenuItem value={"CANCEL"}>CANCEL</MenuItem>
                                    </Select>
                                </FormControl>
                                <hr/>
                                <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    value="Submit"
                                >
                                    Update
                                </Button>
                                {"  "}
                                <Link
                                    to={{
                                        pathname: `/admin/orders`,
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="outlined" color="secondary">
                                        Back
                                    </Button>
                                </Link>
                                </div>
                            </form>

                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
                </React.Fragment>
                ) : (
                <React.Fragment></React.Fragment>
                )}
        </React.Fragment>

    );
}
