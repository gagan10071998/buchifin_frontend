import React, { useRef, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Avatar,
  Autocomplete,
  List,
  ListItemAvatar,
  Chip,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Dialog, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";

const AgroDocs = ({ formValues, setFormValues }) => {
  const [formErrors, setFormErrors] = useState({});
  const aadharFrontRef = useRef(null);
  const aadharBackRef = useRef(null);
  const qualificationDocRef = useRef(null);
  const canceledChequeFront = useRef(null);
  const canceledChequeBack = useRef(null);
  const cinDocRef = useRef(null);
  const panRef = useRef(null);
  const govtIdRef = useRef(null);

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

  const validateField = (name, value) => {
    let errors = {};

    switch (name) {
      case "aadharFileFront":
      case "aadharFileBack":
      case "PANfile":
        errors[name] = !value ? "This is a required field" : "";
      case "aadhar":
        if (!value) {
          errors[name] = "This is a required field";
        } else if (!/^\d{12}$/.test(value)) {
          errors[name] = "Aadhar number must be a 12-digit number";
        } else {
          errors[name] = "";
        }
        break;

      case "pan":
        if (!value) {
          errors[name] = "This is a required field";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
          errors[name] =
            "PAN number must be a 10-character alphanumeric identifier";
        } else {
          errors[name] = "";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  return (
    <div>
      <Stack spacing={2}>
        <>
          <input
            ref={aadharFrontRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setFormValues((prev) => ({
                  ...prev,
                  aadharFileFrontName: file.name,
                  aadharFileFront: file,
                }));
              }
            }}
          />
          <TextField
            required
            id="outlined-password"
            label="Aadhar Front"
            value={formValues.aadharFileFrontName}
            autoComplete="current-password"
            onClick={() => aadharFrontRef.current.click()}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    <FileOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={true}
          />

          <input
            ref={aadharBackRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setFormValues((prev) => ({
                  ...prev,
                  aadharFileBackName: file.name,
                  aadharFileBack: file,
                }));
              }
            }}
          />
          <TextField
            required
            id="outlined-password"
            label="Aadhar Back"
            value={formValues.aadharFileBackName}
            autoComplete="current-password"
            onClick={() => aadharBackRef.current.click()}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    <FileOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={true}
          />

          <input
            ref={panRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setFormValues((prev) => ({
                  ...prev,
                  PANFileName: file.name,
                  PANFile: file,
                }));
              }
            }}
          />
          <TextField
            required
            id="outlined-aadhar"
            label="Aadhar Number"
            placeholder="Aadhar Number"
            onChange={handleInputChange}
            error={Boolean(formErrors.aadhar)}
            helperText={formErrors.aadhar}
            value={formValues.aadhar}
            v
          />
          <TextField
            required
            id="outlined-password"
            label="PAN"
            value={formValues.PANFileName}
            autoComplete="current-password"
            onClick={() => panRef.current.click()}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    <FileOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={true}
          />
          <TextField
            required
            id="outlined-pan"
            label="PAN Number"
            placeholder="PAN Number"
            onChange={handleInputChange}
            error={Boolean(formErrors.pan)}
            helperText={formErrors.pan}
            value={formValues.pan}
          />
          <input
            ref={qualificationDocRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setFormValues((prev) => ({
                  ...prev,
                  qualificationDoc: file,
                  qualificationFilename: file.name,
                }));
              }
            }}
          />
          <TextField
            required
            id="outlined-password"
            label="Qualification Documents"
            value={formValues.qualificationFilename}
            autoComplete=""
            onClick={() => qualificationDocRef.current.click()}
            error={Boolean(formErrors.qualificationDoc)}
            helperText={formErrors.qualificationDoc}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    <FileOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={true}
          />
          <TextField
            required
            id="outlined-qualificationDocName"
            label="Document Name"
            placeholder="Document Name"
            onChange={handleInputChange}
            error={Boolean(formErrors.qualificationDocName)}
            helperText={formErrors.qualificationDocName}
            value={formValues.qualificationDocName}
          />
          <input
            ref={canceledChequeFront}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setFormValues((prev) => ({
                  ...prev,
                  canceledChequeFileFront: file,
                  canceledChequeFileFrontName: file.name,
                }));
              }
            }}
          />
          <TextField
            required
            id="outlined-password"
            label="Canceled Cheque Front"
            value={formValues.canceledChequeFileFrontName}
            autoComplete=""
            onClick={() => canceledChequeFront.current.click()}
            error={Boolean(formErrors.canceledChequeFileFrontName)}
            helperText={formErrors.canceledChequeFileFrontName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    <FileOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={true}
          />
          <input
            ref={canceledChequeBack}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setFormValues((prev) => ({
                  ...prev,
                  canceledChequeFileBack: file,
                  canceledChequeFileBackName: file.name,
                }));
              }
            }}
          />
          <TextField
            required
            id="outlined-password"
            label="Canceled Cheque Back"
            value={formValues.qualificationFilename}
            autoComplete=""
            onClick={() => canceledChequeBack.current.click()}
            error={Boolean(formErrors.qualificationFilename)}
            helperText={formErrors.qualificationFilename}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    <FileOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={true}
          />

          {formValues.employeeType === "Company" && (
            <>
              <input
                ref={cinDocRef}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setFormValues((prev) => ({
                      ...prev,
                      cinDoc: file,
                      cinDocName: file.name,
                    }));
                  }
                }}
              />
              <TextField
                required
                id="outlined-password"
                label="CIN Documents"
                value={formValues.cinDocName}
                autoComplete=""
                onClick={() => cinDocRef.current.click()}
                error={Boolean(formErrors.cinDocName)}
                helperText={formErrors.cinDocName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {}}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        <FileOpenIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={true}
              />
            </>
          )}
          {formValues.employeeType === "Govt Employees" && (
            <>
              <input
                ref={govtIdRef}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setFormValues((prev) => ({
                      ...prev,
                      govtId: file,
                      govtIdName: file.name,
                    }));
                  }
                }}
              />
              <TextField
                required
                id="outlined-password"
                label="Govt. ID"
                value={formValues.govtIdName}
                autoComplete=""
                onClick={() => govtIdRef.current.click()}
                error={Boolean(formErrors.govtIdName)}
                helperText={formErrors.govtIdName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {}}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        <FileOpenIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={true}
              />
            </>
          )}
        </>
      </Stack>
    </div>
  );
};

export default AgroDocs;
