import React, { useEffect, useState } from "react";
import { ListItemText, Typography, TextField } from "@mui/material";
import { DialogContent, DialogTitle } from "@mui/material";
import Stack from "@mui/material/Stack";

const BankAcc = ({ formValues, setFormValues }) => {
  const [ifscDetails, setIFSCDetails] = useState("");
  const handleInputChange = (e) => {
    let { id } = e.target;
    const fieldName = id.split("-")[1];
    console.log(id, fieldName);
    if (e.target.files) {
      setFormValues((prevState) => ({
        ...prevState,
        [fieldName]: e.target.files[0],
      }));
    } else {
      let { value } = e.target;
      value = ["stateName", "adminName", "adminEmail"].includes(fieldName)
        ? value.trimStart()
        : value;
      setFormValues((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
      validateField(fieldName, value);
    }
  };

  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    let errors = {};

    switch (name) {
      case "bankName":
      case "bankAccount":
      case "bankAccountName":
      case "bankIFSC":
        errors[name] = !value ? "This is a required field" : "";
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const getIFSCDetails = () => {
    const url = `https://ifsc.razorpay.com/${formValues.bankIFSC}`;

    // Use the fetch API to make the GET request
    fetch(url)
      .then((response) => {
        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // Parse the response body as JSON
        return response.json();
      })
      .then((data) => {
        // Log the data to the console
        setIFSCDetails(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    if (formValues?.bankIFSC?.length === 11) {
      getIFSCDetails();
    }
  }, [formValues.bankIFSC]);

  return (
    <>
      <DialogTitle>Bank Account </DialogTitle>
      <DialogContent>
        <Stack spacing={2} marginTop={4}>
          <>
            <TextField
              required
              id="outlined-bankName"
              label="Bank Name"
              placeholder="Bank Name"
              onChange={handleInputChange}
              error={Boolean(formErrors?.bankName)}
              helperText={formErrors?.bankName}
              value={formValues?.bankName}
              name={"bankAccountName"}
            />

            <TextField
              required
              id="outlined-bankAccountName"
              label="Account Name"
              placeholder="Account Name"
              onChange={handleInputChange}
              error={Boolean(formErrors.bankAccountName)}
              helperText={formErrors.bankAccountName}
              value={formValues.bankAccountName}
              v
            />
            <TextField
              required
              id="outlined-bankAccount"
              label="Account Number"
              placeholder="Account Number"
              onChange={handleInputChange}
              error={Boolean(formErrors.bankAccount)}
              helperText={formErrors.bankAccount}
              value={formValues.bankAccount}
            />
            <TextField
              required
              id="outlined-bankIFSC"
              label="ISFC"
              placeholder="IFSC"
              onChange={handleInputChange}
              error={Boolean(formErrors.bankIFSC)}
              helperText={formErrors.bankIFSC}
              value={formValues.bankIFSC}
            />
            <ListItemText
              secondary={
                <Typography
                  fontSize={"12px"}
                  variant="h6"
                  color="text.secondary"
                  mb={0.5}
                >
                  {ifscDetails
                    ? ifscDetails.BANK +
                      ", " +
                      ifscDetails.BRANCH +
                      ", " +
                      ifscDetails.CITY
                    : null}
                </Typography>
              }
            />
          </>
        </Stack>
      </DialogContent>
    </>
  );
};

export default BankAcc;
