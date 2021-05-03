// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {Grid} from '@material-ui/core';
// import PromotionItem from "../components/PromotionItem";
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     margin:20,
//   },
//   paper: {
//     padding: theme.spacing(2),
//   },
// }));
//
// const Promotion = () => {
//   const classes = useStyles();
//   return (
//       <React.Fragment>
//         <div className={classes.root}>
//           <Grid container spacing={3} style={{marginTop:10}}>
//
//             <Grid item xs={12} style={{paddingInline:20}}>
//               <h1 style={{color:'#f29559'}}>Hot Deal!!!!</h1>
//               <hr/>
//               <Grid container spacing={3}>
//                 <PromotionItem/>
//               </Grid>
//             </Grid>
//
//           </Grid>
//         </div>
//       </React.Fragment>
//
//   );
// };
//
// export default Promotion;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Grid, TextField,Typography} from '@material-ui/core';
import PromotionItem from "../components/PromotionItem";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:20,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const Promotion = () => {
  const classes = useStyles();
  return (
      <React.Fragment>
        <Grid item xs={12} sm={12} style={{backgroundColor:"#202C39"}}>
          <Typography variant="h2" style={{ color: "#FFFFFF", fontWeight: "Bold",paddingLeft:"2vw",paddingTop:"1vw",paddingBottom:"1vw"}}>Promotion</Typography>
          <Typography variant="h4" style={{ color: "#FFFFFF",paddingBottom:"1vw",paddingLeft:"2vw"}}>Special Gift From Us</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper style={{backgroundColor:"#F2D492", textAlign:"center",paddingTop:"2vw"}}><div className="Box-text2" style={{backgroundColor:"#202C39",width:"20vw",margin:"auto"}} >
            <Typography variant="h4" style={{ color: "#FFFFFF", fontWeight: "Bold",textAlign:"center"}}>
              4 Step to use</Typography></div>
            <Grid container spacing={3} style={{marginTop:10,paddingLeft:"8vw",paddingRight:"5vw",paddingBottom:"2vw",paddingTop:"1vw"}}>
              <Grid item xs={3} sm={3}>
                <div className="Box-text3" style={{display:"flex"}}>
                  <AddShoppingCartIcon className="Toolsize" style={{ color: "#202C39",fontSize:"5vw"}} />
                  <div className="Box-text3" style={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="h4" style={{ color: "#202C39", fontWeight: "Bold",paddingLeft:"2vw"}}>
                      Step : 1</Typography>
                    <Typography variant="h6" style={{ color: "#202C39", fontWeight: "Bold"}}>Shopping </Typography>
                  </div>
                </div>
              </Grid>

              <Grid item xs={3} sm={3}>
                <div className="Box-text3" style={{display:"flex"}}>
                  <CheckCircleOutlineIcon className="Toolsize" style={{ color: "#202C39",fontSize:"5vw"}} />
                  <div className="Box-text3" style={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="h4" style={{ color: "#202C39", fontWeight: "Bold",paddingLeft:"2vw"}}>
                      Step : 2</Typography>
                    <Typography variant="h6" style={{ color: "#202C39", fontWeight: "Bold"}}>Check out </Typography>
                  </div>
                </div>
              </Grid>

              <Grid item xs={3} sm={3}>
                <div className="Box-text3" style={{display:"flex"}}>
                  <AccountBalanceWalletIcon className="Toolsize" style={{ color: "#202C39",fontSize:"5vw"}} />
                  <div className="Box-text3" style={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="h4" style={{ color: "#202C39", fontWeight: "Bold",paddingLeft:"2vw"}}>
                      Step : 3</Typography>
                    <Typography variant="h6" style={{ color: "#202C39", fontWeight: "Bold"}}>Payment </Typography>
                  </div>
                </div>
              </Grid>

              <Grid item xs={3} sm={3}>
                <div className="Box-text3" style={{display:"flex"}}>
                  <VerifiedUserIcon className="Toolsize" style={{ color: "#202C39",fontSize:"5vw"}} />
                  <div className="Box-text3" style={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="h4" style={{ color: "#202C39", fontWeight: "Bold",paddingLeft:"2vw"}}>
                      Step : 4</Typography>
                    <Typography variant="h6" style={{ color: "#202C39", fontWeight: "Bold"}}>Success </Typography>
                  </div>
                </div>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={3} style={{marginTop:10}}>
            {/*<Grid item xs={3}>*/}
            {/*  <Paper className={classes.paper} style={{ color: "#f29559", fontWeight:'bold'}}>FILTER<hr/>*/}
            {/*    <TextField*/}
            {/*        label="Search"*/}
            {/*        variant="outlined"*/}
            {/*        style={{ width: "100%", marginBottom:10}}*/}
            {/*    />*/}
            {/*  </Paper>*/}
            {/*</Grid>*/}
            <Grid item xs={12} style={{paddingInline:20}}>
              {/*<h1 style={{color:'#f29559'}}>Hot Deal!!!!</h1>*/}
              {/*<hr/>*/}
              <Grid container spacing={3}>
                <PromotionItem/>
              </Grid>
            </Grid>

          </Grid>
        </div>
      </React.Fragment>

  );
};

export default Promotion;

