import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '2rem',
        height: '80vh',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Address = () => {
    const classes = useStyles();
    return (
        <Grid item xs={9}>
            <Paper className={classes.paper}>
                <span style={{ fontWeight: '700', color: '#202C39' }}>My Address</span>
                <hr style={{ height: '0.005rem', backgroundColor: '#E5E5E5', borderWidth: '0', margin: '1rem' }}></hr>
                <div id="Addess">
                    <div style={{ display: 'flex', marginTop: '2rem' }} >
                        <Grid item xs={3} style={{ textAlign: 'right', color: '#202C39', fontWeight: 600 }}>
                            <p>Full name :&nbsp;</p>
                            <p>Phone number :&nbsp;</p>
                            <p>Address :&nbsp;</p>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'left', color: '#202C39', fontWeight: 400 }}>
                            <p>Pote Socool</p>
                            <p>085 - 5555555</p>
                            <p>4585 Jerrys Flat Rd, Gold Beach, OR, 97444 </p>
                        </Grid>
                        <Grid item xs={3}>
                            <Button style={{ backgroundColor: '#F29559' }}>Set Default</Button>
                            <br></br><br></br><br></br>
                            <DeleteIcon style={{ color: '#202C39' }}></DeleteIcon>
                        </Grid>
                    </div>
                    <hr style={{ height: '0.005rem', backgroundColor: '#E5E5E5', borderWidth: '0', margin: '2rem' }}></hr>
                </div>
                <Button style={{ color: 'white', backgroundColor: '#202C39' }}>
                    <AddIcon></AddIcon> Add New Address
                    </Button>
            </Paper>
        </Grid>
    );
}
export default Address;