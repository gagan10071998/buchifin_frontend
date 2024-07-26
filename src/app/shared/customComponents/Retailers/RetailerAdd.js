import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Autocomplete,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autorenew from "@mui/icons-material/Autorenew";
import useAPI from "app/hooks/useApi";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Div from "@jumbo/shared/Div";
import Close from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import "./styles.css";



const RetailerAdd = ({
  open,
  onClose,
  onSuccessfulAdd,
  onError,
}) => {
  const pincodes = require('indian-pincodes');
  const { POST } = useAPI();
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = ["Retailer Details", "Firm Details"];
  const [firmType, setFirmType] = useState("");
  const [gender, setGender] = useState("");


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const [genders, setGenders] = useState(["Male", "Female", "Other"]);
  const gendersMapping = {
    "Male": "MALE",
    "Female": "FEMALE",
    "Other": "OTHER"
  }
  const [firmTypes, setFirmTypes] = useState([
    "Proprietorship",
    "Partnership",
    "Private Limited",
  ]);

  const generatePassword = () => {
    const length = 12;
    const numbers = "0123456789";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*";

    const allChars = numbers + lowercaseChars + uppercaseChars + specialChars;

    const guaranteedChars = [
      numbers.charAt(Math.floor(Math.random() * numbers.length)),
      lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length)),
      uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length)),
      specialChars.charAt(Math.floor(Math.random() * specialChars.length)),
    ];

    let password = guaranteedChars.join("");

    for (let i = 0; i < length - guaranteedChars.length; ++i) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  };

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    country: "",
    state: "",
    district: "",
    city: "",
    pin: "",
    address: "",
    firmType: "",
    firmName: "",
    firmCountry: "",
    firmState: "",
    firmDistrict: "",
    firmCity: "",
    firmAddress: "",
    firmPin: ""
  });

  console.log(formValues.pin)

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    let { id } = e.target;
    const fieldName = id.split("-")[1];
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

  const handleSubscribe = async () => {

    let payload = {
      retailer: {
        name: formValues.firstName + " " + formValues.lastName,
        email: formValues.email,
        gender: gendersMapping[formValues.gender],
        dob: "12-12-1985",
        phone: [
          {
            phoneType: "HOME",
            phone: formValues.phone,
          },
        ],
        address: [
          {
            addressType: "HOME",
            address: formValues.address,
            city: formValues.city,
            state: formValues.state,
            district: formValues.district,
            country: formValues.country,
            zip: formValues.pin,
          },
        ],
        password: formValues.password,
      },
      firm: {
        name: formValues.firmName,
        address: [
          {
            addressType: "HOME",
            address: formValues.firmAddress,
            city: formValues.firmCity,
            state: formValues.firmState,
            district: formValues.firmDistrict,
            country: formValues.firmCountry,
            zip: formValues.firmPin,
          },
        ],
        companyType: formValues.firmType,
      },
    };

    try {
      const response = await POST("/retailer", payload, false, true);
      if (response.status === 200) {
        onSuccessfulAdd();
      } else {
        onError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      onError("Error Occured");
    }
  };

  const validateField = (name, value) => {
    let errors = {};

    switch (name) {
      case "firstName":
      case "lastName":
        errors[name] = !value
          ? "This is a required field"
          : value.length < 2 || value.length > 25
            ? "Minimum Length is 2 and Maximum Length is 25"
            : "";
        break;
      case "email":
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errors[name] = !value
          ? "This is a required field"
          : !emailValid
            ? "Invalid email address"
            : "";
        break;
      case "phone":
        const phoneValid = /^\d+$/.test(value);
        errors[name] = !value
          ? "This is a required field"
          : !phoneValid
            ? "Phone number must contain only digits"
            : value.length < 10 || value.length > 15
              ? "Minimum 10 digits required and Maximum 15 digits allowed"
              : "";
        break;
      case "country":
      case "state":
      case "city":
      case "district":
      case "firmType":
      case "firmCountry":
      case "firmState":
      case "firmDistrict":
      case "firmCity":
      case "gender":
      case "dob":
        errors[name] = !value ? "This is a required field" : "";
        break;
      case "address":
      case "firmAddress":
        errors[name] = !value
          ? "This is a required field"
          : value.length < 2 || value.length > 40
            ? "Minimum Length is 2 and Maximum Length is 40"
            : "";
        break;
      case "password":
        errors[name] = !value
          ? "This is a required field"
          : value.length < 8
            ? "Minimum 8 characters required"
            : "";
        break;
      case "firmName":
        errors[name] = !value
          ? "This is a required field"
          : value.length < 2 || value.length > 40
            ? "Minimum Length is 2 and Maximum Length is 40"
            : "";
        break;
      case "pin":
      case "firmPin":
        const pinValid = /^\d+$/.test(value) && value.length === 6;
        errors[name] = !value
          ? "This is a required field"
          : !pinValid
            ? `${name === "pin" ? "PIN" : "Firm PIN"} must contain only 6 digits`
            : "";
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formValues).every(
      (value) => value !== ""
    );
    const noErrors = Object.values(formErrors).every(
      (error) => error === ""
    );

    return allFieldsFilled && noErrors;
  };

  useEffect(() => {
    if (formValues.pin.length === 6) {
      const details = pincodes.getPincodeDetails(parseInt(formValues.pin));

      if (details) {
        setFormValues((prev) => ({
          ...prev,
          country: details.country,
          city: details.division,
          district: details.district,
          state: details.state
        }))
      }
      else {
        setFormValues((prev) => ({
          ...prev,
          country: "",
          city: "",
          district: "",
          state: ""
        }))
      }
    }
  }, [formValues.pin])

  useEffect(() => {
    if (formValues.firmPin.length === 6) {
      const details = pincodes.getPincodeDetails(parseInt(formValues.firmPin));

      if (details) {
        setFormValues((prev) => ({
          ...prev,
          firmCountry: details.country,
          firmCity: details.division,
          firmDistrict: details.district,
          firmState: details.state
        }))
      }
      else {
        setFormValues((prev) => ({
          ...prev,
          country: "",
          city: "",
          district: "",
          state: ""
        }))
      }
    }
  }, [formValues.firmPin])


  return (
    <React.Fragment>
      <div>
        <Dialog open={open} PaperProps={{
          style: {
            width: '600px'
          },
        }} fullWidth={false}>
          <DialogTitle>Add New Retailer</DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 50,
              top: 10,
            }}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <Stack spacing={2}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>

              {/* Fields for retailer details */}
              {activeStep === 0 && (
                <>
                  <DialogContentText>
                    Enter the details of the new retailer .
                  </DialogContentText>
                  <TextField
                    required
                    id="outlined-firstName"
                    label="First Name"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firstName)}
                    helperText={formErrors.firstName}
                    value={formValues.firstName}
                    inputProps={{
                      maxLength: 140,
                    }}
                  />
                  <TextField
                    required
                    id="outlined-lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.lastName)}
                    helperText={formErrors.lastName}
                    value={formValues.lastName}
                  />
                  <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.email)}
                    helperText={formErrors.email}
                    value={formValues.email}
                  />
                  <TextField
                    required
                    id="outlined-phone"
                    label="Phone Number"
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.phone)}
                    helperText={formErrors.phone}
                    value={formValues.phone}
                  />
                  {/* Dropdown for Gender */}
                  <Autocomplete
                    id="outlined-gender"
                    options={genders}
                    getOptionLabel={(option) => option}
                    value={gender}
                    onChange={(event, newValue) => {
                      setGender(newValue)
                      handleInputChange({
                        target: {
                          id: "outlined-gender",
                          value: newValue || "",
                        },
                      })
                    }
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Gender"
                        error={Boolean(formErrors.gender)}
                        helperText={formErrors.gender}
                      />
                    )}
                  />

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      value={dob}
                      onChange={(newValue) => {
                        setDob(newValue);
                        handleInputChange({
                          target: {
                            id: "outlined-dob",
                            value: newValue,
                          },
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          id="outlined-dob"
                          error={Boolean(formErrors.dob)}
                          helperText={formErrors.dob}
                        />
                      )}
                    />
                  </LocalizationProvider>

                  <TextField
                    required
                    id="outlined-address"
                    label="Address"
                    placeholder="Address"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.address)}
                    helperText={formErrors.address}
                    value={formValues.address}
                  />
                  <TextField
                    required
                    id="outlined-pin"
                    label="PIN"
                    placeholder="PIN"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.pin)}
                    helperText={formErrors.pin}
                    value={formValues.pin}
                    type="number"
                    inputProps={{
                      maxLength: 6
                    }}
                  />
                  <TextField
                    required
                    id="outlined-country"
                    label="Country"
                    placeholder="country"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.country)}
                    helperText={formErrors.country}
                    value={formValues.country}
                  />
                  <TextField
                    required
                    id="outlined-state"
                    label="State"
                    placeholder="state"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.state)}
                    helperText={formErrors.state}
                    value={formValues.state}
                  />
                  <TextField
                    required
                    id="outlined-district"
                    label="District"
                    placeholder="district"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.district)}
                    helperText={formErrors.district}
                    value={formValues.district}
                  />
                  <TextField
                    required
                    id="outlined-city"
                    label="City"
                    placeholder="city"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.city)}
                    helperText={formErrors.city}
                    value={formValues.city}
                  />

                  <TextField
                    required
                    id="outlined-password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formValues.password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormValues((prevState) => ({
                        ...prevState,
                        password: value,
                      }));
                      validateField("password", value);
                    }}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password}
                    onKeyPress={(e) => e.charCode === 32 && e.preventDefault()}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              const newPassword = generatePassword();
                              setFormValues((prevState) => ({
                                ...prevState,
                                password: newPassword,
                              }));
                              validateField("password", newPassword);
                            }}
                            edge="end"
                          >
                            <Autorenew />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <DialogContentText>Enter Firm Details .</DialogContentText>
                  <Autocomplete
                    id="outlined-firmtype"
                    options={firmTypes}
                    getOptionLabel={(option) => option}
                    value={firmType}
                    onChange={(event, newValue) => {
                      setFirmType(newValue);
                      handleInputChange({
                        target: {
                          id: "outlined-firmType",
                          value: newValue || "",
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Firm Type"
                        error={Boolean(formErrors.gender)}
                        helperText={formErrors.gender}
                      />
                    )}
                  />
                  <TextField
                    required
                    id="outlined-firmName"
                    label="Firm Name"
                    placeholder="Firm Name"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmName)}
                    helperText={formErrors.firmName}
                    value={formValues.firmName}
                  />
                  <TextField
                    required
                    id="outlined-firmAddress"
                    label="Firm Address"
                    placeholder="Firm Address"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmAddress)}
                    helperText={formErrors.firmAddress}
                    value={formValues.firmAddress}
                  />
                   <TextField
                    required
                    id="outlined-firmPin"
                    label="Firm PIN"
                    placeholder="Firm PIN"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmPin)}
                    helperText={formErrors.firmPin}
                    value={formValues.firmPin}
                  />
                  <TextField
                    required
                    id="outlined-firmCountry"
                    label="Firm Country"
                    placeholder="Firm Country"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmCountry)}
                    helperText={formErrors.firmCountry}
                    value={formValues.firmCountry}
                  />
                  <TextField
                    required
                    id="outlined-firmState"
                    label="Firm State"
                    placeholder="Firm State"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmState)}
                    helperText={formErrors.firmState}
                    value={formValues.firmState}
                  />
                  <TextField
                    required
                    id="outlined-firmDistrict"
                    label="Firm District"
                    placeholder="Firm District"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmDistrict)}
                    helperText={formErrors.firmDistrict}
                    value={formValues.firmDistrict}
                  />
                  <TextField
                    required
                    id="outlined-firmCity"
                    label="Firm City"
                    placeholder="Firm City"
                    onChange={handleInputChange}
                    error={Boolean(formErrors.firmCity)}
                    helperText={formErrors.firmCity}
                    value={formValues.firmCity}
                  />
                 
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <div>
              {
                <React.Fragment>
                  <Div sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color={"primary"}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Div sx={{ flex: "1 1 auto" }} />
                    {activeStep === 0 ? (
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                    ) : (
                      <Button disabled={!isFormValid()} onClick={handleSubscribe} sx={{ mr: 1 }}>
                        Add
                      </Button>
                    )}
                  </Div>
                </React.Fragment>
              }
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default RetailerAdd;
