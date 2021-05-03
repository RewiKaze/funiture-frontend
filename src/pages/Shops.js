// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Grid,
// } from "@material-ui/core";
// import CardItem from "../components/CardItem";
// import PageSelect from "../components/PageSelect";
// // query Item
// import { PRODUCT_QUERY } from "../graphql/productQuery";
// import { useQuery } from "@apollo/client";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     margin: 20,
//   },
//   paper: {
//     padding: theme.spacing(2),
//   },
// }));
//
// const Shops = () => {
//   const classes = useStyles();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8);
//   const { loading, error, data } = useQuery(PRODUCT_QUERY);
//   if (loading) {
//     return "Loading ...";
//   }
//   if (error) {
//     return "Error !!";
//   }
//   const indexOfLastProducts = currentPage * productsPerPage;
//   const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
//   const currentProducts = data.products.slice(
//     indexOfFirstProducts,
//     indexOfLastProducts
//   );
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//
//   return (
//     <React.Fragment>
//       <div className={classes.root}>
//         <Grid container spacing={3} style={{ marginTop: 10 }}>
//           <Grid item xs={12} style={{paddingInline:20}}>
//             <h1 style={{color:'#f29559'}}>All Product</h1>
//             <hr/>
//             <Grid container spacing={3}>
//               {currentProducts.map((each) => {
//                 return <CardItem product={each} />;
//               })}
//             </Grid>
//           </Grid>
//           <Grid container justify="center">
//             <PageSelect
//               productsPerPage={productsPerPage}
//               totalProducts={data.products.length}
//               paginate={paginate}
//             />
//           </Grid>
//         </Grid>
//       </div>
//     </React.Fragment>
//   );
// };
//

// export default Shops;
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel';
import first from './../image/product/1.png';
import third from './../image/product/3.png';
import fourth from './../image/product/4.png';
import h1 from './../image/product/h1.png';
import h2 from './../image/product/h2.png';
import h3 from './../image/product/h3.png';
import h4 from './../image/product/h4.png';
import "./../css/Shop.css";
import {
  Grid,
  TextField,
  Paper,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";
import CardItem from "../components/CardItem";
import PageSelect from "../components/PageSelect";
// query Item
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { useQuery } from "@apollo/client";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const Shops = () => {
  var items = [
    {
      image: first
    },
    {
      image: third
    },
    {
      image: fourth
    },
  ]
  const classes = useStyles();
  // const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = data.products.slice(
      indexOfFirstProducts,
      indexOfLastProducts
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
      <React.Fragment>
        <div className="firstSection-shop">
          <Typography variant="h2">
            <span className="topic-shop">Noble</span><br></br>
            <span className="topic-shop mid">Experience</span><br></br>
            <span className="topic-shop">Your Home</span>
            <p className="content-shop">The best shopping online of furniture, create the world by your hand</p>
            <div className="set-pic">
              <img src={h1} />
              <img src={h2} />
              <img src={h3} />
              <img src={h4} />
            </div>
          </Typography>
          <div>
            <Carousel maxWidth="sm">
              {
                items.map((item, i) => <Item key={i} item={item} />)
              }
            </Carousel>
          </div>
        </div>
        <hr />
        <div className={classes.root}>
          <Grid container spacing={3} style={{ marginTop: 10 }}>
            {/*<Grid item xs={12}>*/}
            {/*  <Grid container spacing={3}>*/}
            {/*    <Grid item xs={8}>*/}
            {/*      <TextField*/}
            {/*        label="Search"*/}
            {/*        variant="outlined"*/}
            {/*        style={{ width: "100%" }}*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={2}>*/}
            {/*      <FormControl variant="outlined" style={{ width: "100%" }}>*/}
            {/*        <InputLabel htmlFor="outlined-age-native-simple">*/}
            {/*          Category*/}
            {/*        </InputLabel>*/}
            {/*        <Select*/}
            {/*          native*/}
            {/*          label="Category"*/}
            {/*          inputProps={{*/}
            {/*            name: "Category",*/}
            {/*            id: "outlined-age-native-simple",*/}
            {/*          }}*/}
            {/*        >*/}
            {/*          <option aria-label="None" />*/}
            {/*        </Select>*/}
            {/*      </FormControl>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={2}>*/}
            {/*      <TextField*/}
            {/*        label="Tags"*/}
            {/*        variant="outlined"*/}
            {/*        style={{ width: "100%" }}*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={3}>*/}
            {/*  <Paper*/}
            {/*    className={classes.paper}*/}
            {/*    style={{ color: "#f29559", fontWeight: "bold" }}*/}
            {/*  >*/}
            {/*    CATEGORY*/}
            {/*    <hr />*/}
            {/*    <p style={{ fontWeight: "lighter" }}>All</p>*/}
            {/*    <p style={{ fontWeight: "lighter" }}>Bedroom</p>*/}
            {/*    <p style={{ fontWeight: "lighter" }}>Bathroom</p>*/}
            {/*    <p style={{ fontWeight: "lighter" }}>Kitchen</p>*/}
            {/*    <p style={{ fontWeight: "lighter" }}>Living room</p>*/}
            {/*    <p style={{ fontWeight: "lighter" }}>Other</p>*/}
            {/*  </Paper>*/}
            {/*</Grid>*/}
            <Grid item xs={12} style={{ paddingInline: 20 }}>
              <Grid container spacing={3}>
                {/* {console.log(data.products)} */}
                {currentProducts.map((each) => {
                  return <CardItem product={each} />;
                })}
              </Grid>
            </Grid>
            <Grid container justify="center">
              <PageSelect
                  productsPerPage={productsPerPage}
                  totalProducts={data.products.length}
                  paginate={paginate}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
  );
};

function Item(props) {
  return (
      <Paper className="carousel-head-shop">
        <img className="image-head-shop" alt={"test"} src={props.item.image} />
      </Paper>
  )
}

export default Shops;
