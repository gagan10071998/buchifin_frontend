import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Autocomplete,
    DialogTitle,
    TextField,
    IconButton,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import useAPI from "app/hooks/useApi";
import Div from "@jumbo/shared/Div";
import Close from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const FirmEditModal = ({
    record,
    fetchRetailer,
    setFirmEditModalOpen
}) => {
    const { PUT } = useAPI();

    const [formValues, setFormValues] = useState({
        name: record.name,
        country: record.country,
        state: record.state,
        district: record.district,
        city: record.city,
        zip: record.zip,
        address: record.address[0].address,
    });

    const [formErrors, setFormErrors] = useState({});
    const [isFormDirty, setIsFormDirty] = useState(false);

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
            setIsFormDirty(true);
        }
    };

    const handleSubscribe = async () => {
        let payload = {
            name: formValues.name,
            address: [
                {
                    addressType: "HOME",
                    address: formValues.address,
                    city: formValues.city,
                    state: formValues.state,
                    district: formValues.district,
                    country: formValues.country,
                    zip: formValues.zip,
                },
            ],
        };

        try {
            const response = await PUT(`/retailer/${record._id}`, payload, false, true);
            if (response.status === 200) {
                fetchRetailer();
                setFirmEditModalOpen(false);
            } else {
                console.log("ERROR")
            }
        } catch (error) {
            console.log(error);
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
            case "country":
            case "state":
            case "city":
            case "district":
                errors[name] = !value ? "This is a required field" : "";
                break;
            case "address":
                errors[name] = !value
                    ? "This is a required field"
                    : value.length < 2 || value.length > 40
                        ? "Minimum Length is 2 and Maximum Length is 40"
                        : "";
                break;
            case "zip":
                const pinValid = /^\d+$/.test(value) && value.length === 6;
                errors[name] = !value
                    ? "This is a required field"
                    : !pinValid
                        ? `${name === "zip" ? "zip" : "Firm zip"} must contain only 6 digits`
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
        setFirmEditModalOpen(false)
    };

    const isFormValid = () => {
        const allFieldsFilled = Object.values(formValues).every(
            (value) => value !== ""
        );
        const noErrors = Object.values(formErrors).every(
            (error) => error === ""
        );

        return allFieldsFilled && noErrors && isFormDirty;
    };

    useEffect(() => {
        setFormValues({
            ...record,
            ...record.address[0]
        })
    }, [record])

    return (
        <React.Fragment>
            <div>
                <Dialog open={true} PaperProps={{
                    style: {
                        width: '600px'
                    },
                }} fullWidth={false}>
                    <DialogTitle>Edit Retailer</DialogTitle>
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
                            <>
                                <TextField
                                    required
                                    id="outlined-name"
                                    label="Name"
                                    placeholder="Name"
                                    onChange={handleInputChange}
                                    error={Boolean(formErrors.name)}
                                    helperText={formErrors.name}
                                    value={formValues.name}
                                // inputProps={{
                                //     maxLength: 140,
                                // }}
                                />

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
                                    id="outlined-zip"
                                    label="zip"
                                    placeholder="zip"
                                    onChange={handleInputChange}
                                    error={Boolean(formErrors.zip)}
                                    helperText={formErrors.zip}
                                    value={formValues.zip}
                                />
                            </>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            {
                                <React.Fragment>
                                    <Div sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                        <Button onClick={handleClose} sx={{ mr: 1 }}>
                                            Cancel
                                        </Button>
                                        <Button disabled={!isFormValid()} onClick={handleSubscribe} sx={{ mr: 1 }}>
                                            Save
                                        </Button>
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

export default FirmEditModal;
