import { useDispatch, useSelector } from "react-redux";
import { createProperty, getPosts } from "app/store/propertySlice";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { deleteProperty } from "../../store/propertySlice";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ExamplePage(props) {
  const { t } = useTranslation("examplePage");
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.property);
  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const handleClickOpen = (propertyId) => {
    setOpen(true);
    setSelectedPropertyId(propertyId);
  };
  const handleClickOpencreate = () => {
    setAddDialog(true);
  };
  const handleClose = () => {
    setAddDialog(false);
    // setEditData(null);
  };
  const onDelete = () => {
    handleDelete(selectedPropertyId);
    setOpen(false);
  };

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk";
    dispatch(getPosts(token));
  }, []);

  const handleDelete = (propertyId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk"; // Replace with your actual token
    dispatch(deleteProperty({ token, propertyId })).then((res) => {
      res.payload.success && dispatch(getPosts(token));
    });
  };

  const handleCreate = async (propertyData) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk"; // Replace with your actual token
    // console.log("Request Payload:", propertyData)
    try {
      await dispatch(createProperty({ token, propertyData }));
      // After successful creation, refresh the property list
      dispatch(getPosts(token));
      setAddDialog(false);
    } catch (error) {
      // Handle error if needed
      console.error("Error creating property:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    property_name: Yup.string()
      .min(3, "*Property Name must be at least 3 characters")
      .required("*Property Name is required"),
    total_rooms: Yup.number()
      .integer("*Total Rooms must be an integer")
      .required("*Total Rooms is required"),
    price: Yup.number()
      .positive("*Price must be a positive number")
      .required("*Price is required"),
    property_capacity: Yup.number()
      .integer("*Property Capacity must be an integer")
      .required("*Property Capacity is required"),
    address1: Yup.string().required("*Address1 is required"),
    address2: Yup.string(),
    city: Yup.string().required("*City is required"),
    postcode: Yup.string(),
    description: Yup.string(),
    state: Yup.string(),
  });
  
  return (
    <Root
      header={
        <div
          className="p-24"
          style={{
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              marginLeft: "25px",
              fontWeight: "900",
              textAlign: "left",
              flex: 1,
            }}
          >
            <h4>{t("TITLE")}</h4>
            {/* Properties */}
          </h1>
          <Button
            variant="contained"
            style={{ backgroundColor: "#51AB30", marginRight: "30px" }}
            onClick={() => handleClickOpencreate()}
          >
            Create Property
          </Button>
        </div>
      }
      content={
        <>
          <Container maxWidth="xl" style={{ paddingtop: "10px" }}>
            <TableContainer
              style={{ paddingBottom: "10px", borderRadius: "8px" }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: "#51AB30" }}>
                  <TableRow>
                    <TableCell align="left">Property ID</TableCell>
                    <TableCell align="left">Property Name</TableCell>
                    <TableCell align="left">Total Rooms</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Property Capacity</TableCell>
                    <TableCell align="left">Address1</TableCell>
                    <TableCell align="left">Address2</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(posts).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.propertyUniqueName}</TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {item.propertyname}
                      </TableCell>
                      <TableCell>{item.totalroom}</TableCell>
                      <TableCell align="left">{item.price || ""}</TableCell>
                      <TableCell align="center">
                        {item.propertycapacity}
                      </TableCell>
                      <TableCell align="left">{item.address1}</TableCell>
                      <TableCell align="left">{item.address2}</TableCell>
                      <TableCell align="left">{item.city}</TableCell>
                      <TableCell style={{ display: "flex" }} align="center">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#51AB30",
                            marginRight: "8px",
                          }}
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#51AB30" }}
                          // onClick={() => handleDelete(item._id)}
                          onClick={() => handleClickOpen(item._id)}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Delete Property</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Do you really want to delete this property?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={onDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={addDialog} onClose={handleClose}>
              <Formik
                initialValues={{
                  property_id: "",
                  property_name: "",
                  total_rooms: "",
                  price: "",
                  property_capacity: "",
                  address1: "",
                  address2: "",
                  city: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // You can modify the structure of values if needed before sending

                  const propertyData = {
                    propertyname: values.property_name,
                    totalroom: values.total_rooms,
                    price: values.price,
                    propertycapacity: values.property_capacity,
                    address1: values.address1,
                    address2: values.address2,
                    city: values.city,
                    postcode: values.postcode,
                    description: values.description,
                    state: values.state,
                  };
                  handleCreate(propertyData);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <DialogTitle>
                      create property
                      {/* { {editData ? "Update User" : "Create User"} /} /} */}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {/* To {editData ? "update" : "create"} user, please enter
                  name and email address here. */}
                      </DialogContentText>
                      {/* <Field
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                name="property_id"
                                                label="Property Id"
                                                type="text"
                                                fullWidth
                                                as={TextField}
                                            /> */}
                      {/* <ErrorMessage name="name" /> */}
                      <Field
                    //   autoFocus
                        margin="dense"
                        id="name"
                        name="property_name"
                        label="Property Name"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                       <ErrorMessage name="property_name" />
                      <Field
                        // autoFocus
                        margin="dense"
                        id="name"
                        name="total_rooms"
                        label="Total Rooms"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="total_rooms" />
                      <Field
                    //   autoFocus
                        margin="dense"
                        id="price"
                        name="price"
                        label="Price"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="price" />
                      <Field
                        // autoFocus
                        margin="dense"
                        id="property capacity"
                        name="property_capacity"
                        label="Property Capacity"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="property_capacity" />
                      <Field
                    //   autoFocus
                        margin="dense"
                        id="address1"
                        name="address1"
                        label="Address1"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="address1" />
                      <Field
                        autoFocus
                        margin="dense"
                        id="address2"
                        name="address2"
                        label="Address2"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="address2" />
                      <Field
                        margin="dense"
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="city" />
                      <Field
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="postcode" />
                      <Field
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="description" />
                      <Field
                        margin="dense"
                        id="state"
                        name="state"
                        label="State"
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="state" />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {/* {/ {/ {editData ? "Update" : "Create"} /} create /} */}
                        create
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Dialog>
          </Container>
        </>
      }
    />
  );
}

export default ExamplePage;
