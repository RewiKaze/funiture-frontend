import React, {  useState, useCallback } from "react";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { PRODUCT_QUERY } from "../../graphql/productQuery";
import { UPDATE_PRODUCT_MUTATION } from "../../graphql/updateProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AdminUpdateProduct = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { _id } = useParams();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { loading, data, error } = useQuery(PRODUCT_QUERY, {
    variables: { _id },
    fetchPolicy: "network-only",
  });
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const handleSlugChange = useCallback((e) => {
    setSlug(e.target.value);
  }, []);
  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);
  const handlePriceChange = useCallback((e) => {
    setPrice(e.target.value);
  }, []);
  const handleTypeChange = useCallback((e) => {
    setType(e.target.value);
  }, []);
  const handleQuantityChange = useCallback((e) => {
    setQuantity(e.target.value);
  }, []);
  const handleImageUrlChange = useCallback((e) => {
    setImageUrl(e.target.value);
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      console.log(data.products.find((each) => each._id === _id)._id);
      await updateProduct({
        variables: {
          id: data.products.find((each) => each._id === _id)._id ?? 0,
          record: {
            updateProduct,
            name,
            description,
            price,
            type,
            quantity,
            imageUrl,
            slug,
          },
        },
      });
      setName("");
      setSlug("");
      setDescription("");
      setPrice("");
      setType("");
      setQuantity("");
      setImageUrl("");
      history.push("/admin/products");
      alert("Update Product Success!!!");
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      // alert(err);
      alert("Update Product Failed!!!");
    }
  };


  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }
  const filteredData = data.products.find((each) => each._id === _id);

  return (
    <React.Fragment>
      {data ? (
        <div>
          <h1 style={{ color: "#202C39" }}>
            EDIT PRODUCT (ID:{filteredData._id} )
          </h1>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <form onSubmit={saveProduct}>
                <Grid container spacing={3}>
                  <Grid item xs={7}>
                    <TextField
                      label="Product Name"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder={filteredData.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={type}
                        onChange={handleTypeChange}
                        placeholder={filteredData.type}
                        label="Type"
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"BEDROOM"}>Bedroom</MenuItem>
                        <MenuItem value={"BATHROOM"}>Bathroom</MenuItem>
                        <MenuItem value={"KITCHEN"}>Kitchen</MenuItem>
                        <MenuItem value={"LIVINGROOM"}>Living Room</MenuItem>
                        <MenuItem value={"OTHER"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Slug"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="text"
                      value={slug}
                      onChange={handleSlugChange}
                      placeholder={filteredData.slug}
                      required
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder={filteredData.description}
                      required
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      label="Price (THB)"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="number"
                      value={price}
                      onChange={handlePriceChange}
                      required
                      placeholder={filteredData.price}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Quantity"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      placeholder={filteredData.quantity}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="imageUrl"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="text"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      placeholder={filteredData.imageUrl}
                      required
                    />
                  </Grid>
                </Grid>
                <br />
                <hr />
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
                    pathname: `/admin/products`,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined" color="secondary">
                    Back
                  </Button>
                </Link>
              </form>
            </Grid>
            <Grid item xs={4}>
              <h3>Product Details</h3>
              <hr />
              <p>Product Name: {filteredData.name}</p>
              <p>Type: {filteredData.type}</p>
              <p>Slug: {filteredData.slug}</p>
              <p>Description: {filteredData.description}</p>
              <p>
                Price:{" "}
                {parseInt(filteredData.price).toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                }) ?? ""}
              </p>
              <p>Quantity: {filteredData.quantity}</p>
              <p>imageUrl: {filteredData.imageUrl}</p>
            </Grid>
          </Grid>
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AdminUpdateProduct;
