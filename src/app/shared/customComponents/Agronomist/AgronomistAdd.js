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
  InputAdornment,
  ListItemText,
  Typography,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import BankAcc from "./BankAcc";
import AgroDocs from "./AgroDocs";
// import "./styles.css";

const AgronomistAdd = ({ open, onClose, onSuccessfulAdd, onError }) => {
  const pincodes = require("indian-pincodes");
  const { POST } = useAPI();
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = ["Agronomist Details", "Bank Details", "Documents"];
  const [firmType, setFirmType] = useState("");
  const [gender, setGender] = useState("");
//   const [employeeType, setEmployeeType] = useState("");

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
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const [genders, setGenders] = useState(["Male", "Female", "Other"]);
  const [employeeTypes, setEmployeeTypes] = useState([
    "Company",
    "Retailer",
    "Self",
    "Govt Employees",
  ]);

  const gendersMapping = {
    Male: "MALE",
    Female: "FEMALE",
    Other: "OTHER",
  };
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
    name: "",
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
    bankName: "",
    bankAccount: "",
    bankAccountName: "",
    bankIFSC: "",
    canceledChequeFileBack: "",
    canceledChequeFileFront: "",
    aadharFileFrontName: "",
    aadharFileBackName: "",
    aadharFileFront: "",
    aadharFileBack: "",
    aadhar: "",
    PANFileName: "",
    pan: "",
    PANFile: "",
    qualificationDoc: "",
    qualificationDocName:"",
    govtIdName: "",
    govtId: "",
    cinDoc: "",
    cinDocName: "",
    employeeType: ""

  });

  console.log(formValues.pin);

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
    const payload = new FormData();
    payload.append("dob", dob);
    payload.append("name", formValues.name);
    payload.append("email", formValues.email);
    payload.append("phone[0][phone]", formValues.phone);
    payload.append("phone[0][phoneType]", formValues.phoneType || "Home");
    payload.append("gender", formValues.gender.toLocaleUpperCase());
    payload.append("address", formValues.address);
    payload.append("password", formValues.password);
    payload.append("address[0][zip]", formValues.pin);
    payload.append("address[0][city]", formValues.city);
    payload.append("address[0][state]", formValues.state);
    payload.append("address[0][address]", formValues.pin);
    payload.append("address[0][country]", formValues.country);
    payload.append("address[0][addressType]", formValues.pin);
    payload.append("address[0][district]", formValues.district);
    payload.append("bankDetails[bankName]", formValues.bankName);
    payload.append("bankDetails[accountName]", formValues.bankAccountName);
    payload.append("bankDetails[ifscCode]", formValues.bankIFSC);
    payload.append("bankDetails[accountNumber]", formValues.accountNumber);
    payload.append("bankDetails[cancelCheque][front]", formValues.canceledChequeFileFront);
    payload.append("bankDetails[cancelCheque][back]", formValues.canceledChequeFileBack);
    payload.append("pan[number]", formValues.pan);
    payload.append("pan[doc][front]", formValues.PANFile);
    payload.append("aadhaar[number]", formValues.aadhar);
    payload.append("aadhaar[doc][front]", formValues.aadharFileFront);
    payload.append("aadhaar[doc][back]", formValues.aadharFileBack);
    payload.append("qualificationDocs[0][name]", formValues.qualificationDocName);
    payload.append("qualificationDocs[0][doc]", formValues.qualificationDoc);
    console.log('MY PAYLOAD', payload);
    console.log('MY PAYLOAD JSON', JSON.stringify(payload));


    try {
      const response = await POST("/agronomist", payload, true, true);
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
      case "name":
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
      case "gender":
      case "dob":
        errors[name] = !value ? "This is a required field" : "";
        break;
      case "address":
      case "password":
        errors[name] = !value
          ? "This is a required field"
          : value.length < 8
          ? "Minimum 8 characters required"
          : "";
        break;

      case "pin":
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
    // const allFieldsFilled = Object.values(formValues).every(
    //   (value) => value !== ""
    // );
    const noErrors = Object.values(formErrors).every((error) => error === "");

    return noErrors;
  };

  console.log(formErrors, isFormValid());
  console.log(formValues);


  useEffect(() => {
    if (formValues.pin.length === 6) {
      const details = pincodes.getPincodeDetails(parseInt(formValues.pin));

      if (details) {
        setFormValues((prev) => ({
          ...prev,
          country: details.country,
          city: details.division,
          district: details.district,
          state: details.state,
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          country: "",
          city: "",
          district: "",
          state: "",
        }));
      }
    }
  }, [formValues.pin]);

  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            width: "750px",
            maxWidth: 'none'
          },
        }}
      >
        <DialogTitle> Add New Agronomist</DialogTitle>
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
          <Stack spacing={4}>
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
                  Enter the details of the new agronomist .
                </DialogContentText>
                <TextField
                  required
                  id="outlined-name"
                  label="Name"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                  error={Boolean(formErrors.name)}
                  helperText={formErrors.name}
                  value={formValues.name}
                  inputProps={{
                    maxLength: 140,
                  }}
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
                    setGender(newValue);
                    handleInputChange({
                      target: {
                        id: "outlined-gender",
                        value: newValue || "",
                      },
                    });
                  }}
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
                    maxLength: 6,
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
                <Autocomplete
                  id="outlined-employeeUnder"
                  options={employeeTypes}
                  getOptionLabel={(option) => option}
                  value={formValues.employeeType}
                  onChange={(event, newValue) => {
                    setFormValues((prevState) => ({
                        ...prevState,
                        employeeType: newValue,
                      }));
                    handleInputChange({
                      target: {
                        id: "outlined-employeeUnder",
                        value: newValue || "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employee Type"
                      error={Boolean(formErrors.employeeUnder)}
                      helperText={formErrors.employeeUnder}
                    />
                  )}
                />
              </>
            )}
            {activeStep === 1 && (
              <BankAcc formValues={formValues} setFormValues={setFormValues} />
            )}
            {activeStep === 2 && (
              <AgroDocs formValues={formValues} setFormValues={setFormValues} />
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
                  {activeStep === steps?.length - 1 ? (
                    <Button
                      disabled={!isFormValid()}
                      onClick={handleSubscribe}
                      sx={{ mr: 1 }}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                  )}
                </Div>
              </React.Fragment>
            }
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AgronomistAdd;
// Name
// Profile Pic
// Address
// Phone Number
// Email-ID