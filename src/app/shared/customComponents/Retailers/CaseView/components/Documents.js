
import React, { useEffect, useRef, useState } from 'react';
import Div from "@jumbo/shared/Div";
import { ListItem, ListItemIcon, ListItemText, Typography, TextField, Avatar, Autocomplete, List, ListItemAvatar, Chip, Paper, Grid, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";
import HomeIcon from '@mui/icons-material/Home';
import TruncateText from '../../../TruncateTextComponent';
import Divider from "@mui/material/Divider";
import { convertDate, maskAadhar, maskPAN } from 'app/utils/appHelpers';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Input
} from "@mui/material";
import Stack from "@mui/material/Stack";
import useAPI from "app/hooks/useApi";
import Close from "@mui/icons-material/Close";
import useToast from 'app/hooks/useToast';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
    height: 48,
    width: 48,
    borderRadius: '50%',
    minWidth: 42,
    marginRight: 16,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.divider}`
}));



const RetailerDoc = ({ record }) => {

    const { PUT, GET, POST } = useAPI();
    const [editBankModal, setEditBankModal] = useState(false);
    const aadharFrontRef = useRef(null);
    const aadharBackRef = useRef(null);
    const panRef = useRef(null);
    const showToast = useToast();
    const [firm, setFirm] = useState(null);
    const [formValues, setFormValues] = useState({
        aadharFileFrontName: "",
        aadharFileBackName: "",
        aadharFileFront: "",
        aadharFileBack: "",
        aadhar: "",
        PANFileName: "",
        pan: "",
        PANFile: ""
    });

    console.log(formValues)

    const [formErrors, setFormErrors] = useState({});
    const [isFormDirty, setIsFormDirty] = useState(false);

    const handleInputChange = (e) => {

        let { id } = e.target;
        const fieldName = id.split("-")[1];
        console.log(id, fieldName)
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

    console.log(formValues)

    const handleSubscribe = async () => {

        const formdata = new FormData();
        formdata.append("id", firm._id);
        formdata.append("aadhaar[number]", formValues.aadhar);
        formdata.append("pan[number]", formValues.pan);
        formdata.append("aadhaar[doc][front]", formValues.aadharFileFront);
        formdata.append("aadhaar[doc][back]", formValues.aadharFileBack);
        formdata.append("pan[doc][front]", formValues.PANFile);
        console.log(...formdata)

        const requestOptions = {
            body: formdata,
            redirect: "follow"
        };


        try {
            const response = await POST(`/company/update/id`, formdata, true, true);
            console.log(response)
            if (response.status === 200) {
                setTimeout(() => {
                    showToast(`Documents updated sucessfully`, 'success');
                }, 500);
                fetchRetailerFirm();
                setFirm(response)
                handleClose();

            } else {
                setTimeout(() => {
                    showToast(`Error`, 'error');
                }, 500);
            }
        } catch (error) {
            console.log(error);
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
                    errors[name] = "PAN number must be a 10-character alphanumeric identifier";
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

    const handleClose = () => {
        setEditBankModal(false)
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


    const fetchRetailerFirm = async (limit = 10, page = 1, search = '') => {
        try {
            const response = await GET(`/retailer/firm/${record._id}`);
            console.log(response)
            if (response) {
                setFirm(response)
            }
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchRetailerFirm()
    }, []);





    return (
        <React.Fragment>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                }}
            >
                <div onClick={() => setEditBankModal(true)} style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer"

                }}>
                    <EditIcon />
                </div>

                <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />

                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <HomeIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Aadhar</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.aadhaar?.number ? maskAadhar(firm?.aadhaar?.number) : 'N/A'}</TruncateText>}
                    />
                </ListItem>

                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <HomeIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            PAN</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.pan?.number ? maskPAN(firm?.pan?.number) : 'N/A'}</TruncateText>}
                    />
                </ListItem>
                <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />
            </List>

            <Dialog open={editBankModal} PaperProps={{
                style: {
                    width: '600px'
                },
            }} fullWidth={false}>
                <DialogTitle>{firm?.companyType ?? ""} Documents</DialogTitle>
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
                {firm?.companyType === "Proprietorship" && <DialogContent>
                    <Stack spacing={2}>
                        <>
                            <input
                                ref={aadharFrontRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (file) {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            aadharFileFrontName: file.name,
                                            aadharFileFront: file
                                        }))
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
                                                onClick={() => { }}
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
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (file) {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            aadharFileBackName: file.name,
                                            aadharFileBack: file
                                        }))
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
                                                onClick={() => { }}
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
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (file) {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            PANFileName: file.name,
                                            PANFile: file
                                        }))
                                    }
                                }}
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
                                                onClick={() => { }}
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
                                id="outlined-pan"
                                label="PAN Number"
                                placeholder="PAN Number"
                                onChange={handleInputChange}
                                error={Boolean(formErrors.pan)}
                                helperText={formErrors.pan}
                                value={formValues.pan}
                            />
                        </>
                    </Stack>
                </DialogContent>}
                {firm?.companyType === "Partnership" && <DialogContent>
                    <Stack spacing={2}>
                        <>
                            <input
                                ref={aadharFrontRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (file) {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            aadharFileFrontName: file.name,
                                            aadharFileFront: file
                                        }))
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
                                                onClick={() => { }}
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
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (file) {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            aadharFileBackName: file.name,
                                            aadharFileBack: file
                                        }))
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
                                                onClick={() => { }}
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
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (file) {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            PANFileName: file.name,
                                            PANFile: file
                                        }))
                                    }
                                }}
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
                                                onClick={() => { }}
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
                                id="outlined-pan"
                                label="PAN Number"
                                placeholder="PAN Number"
                                onChange={handleInputChange}
                                error={Boolean(formErrors.pan)}
                                helperText={formErrors.pan}
                                value={formValues.pan}
                            />
                        </>
                    </Stack>
                </DialogContent>}
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

        </React.Fragment>
    );
};

export default RetailerDoc;
