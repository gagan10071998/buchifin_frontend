import React, { useEffect, useState } from 'react';
import Div from "@jumbo/shared/Div";
import { ListItem, ListItemIcon, ListItemText, Typography, TextField, Avatar, Autocomplete, List, ListItemAvatar, Chip, Paper, Grid } from "@mui/material";
import styled from "@emotion/styled";
import HomeIcon from '@mui/icons-material/Home';
import TruncateText from '../../../TruncateTextComponent';
import Divider from "@mui/material/Divider";
import { convertDate } from 'app/utils/appHelpers';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
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


const BankAcc = ({ record }) => {
    console.log(record)
    const { POST, GET } = useAPI();
    const [editBankModal, setEditBankModal] = useState(false);
    const [ifscDetails, setIFSCDetails] = useState("");
    const showToast = useToast();
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }


    const [firm, setFirm] = useState(null);

    const [formValues, setFormValues] = useState({
        bankName: "",
        bankAccount: "",
        bankAccountName: "",
        bankIFSC: "",
    });

   
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

    const [formErrors, setFormErrors] = useState({});
    const [isFormDirty, setIsFormDirty] = useState(false);

    const handleInPOSTChange = (e) => {

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

    const handleSubscribe = async () => {
        console.log(firm)
        const formdata = new FormData();
        formdata.append("id", firm._id);
        formdata.append("bankDetails[accountName]", formValues.bankAccountName);
        formdata.append("bankDetails[bankName]", formValues.bankName);
        formdata.append("bankDetails[ifscCode]", formValues.bankIFSC);
        formdata.append("bankDetails[accountNumber]", formValues.bankAccount);
        
console.log({...formdata})
        try {
            const response = await POST(`/company/update/id`, formdata, true, true);
            if (response.status === 200) {
                setTimeout(() => {
                    showToast(`Bank Account updated sucessfully`, 'success');
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

    const handleClose = () => {
        setEditBankModal(false)
    };

    const isFormValid = () => {
        // const allFieldsFilled = Object.values(formValues).every(
        //     (value) => value !== ""
        // );
        const noErrors = Object.values(formErrors).every(
            (error) => error === ""
        );

        return noErrors && isFormDirty;
    };


    const fetchRetailerFirm = async (limit = 10, page = 1, search = '') => {
        try {
            const response = await GET(`/retailer/firm/${record._id}`);
            console.log(response)
            if (response) {
                console.log(response)
                setFirm(response)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const getIFSCDetails = () => {
        const url = `https://ifsc.razorpay.com/${formValues.bankIFSC}`;

        // Use the fetch API to make the GET request
        fetch(url)
            .then(response => {
                // Check if the response status is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Parse the response body as JSON
                return response.json();
            })
            .then(data => {
                // Log the data to the console
                setIFSCDetails(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {
        fetchRetailerFirm()
    }, []);

    useEffect(() => {
        if (firm) {
            setFormValues((prev) => ({
                ...prev,
                bankName: firm?.bankDetails?.bankName,
                bankAccount: firm?.bankDetails.accountNumber,
                bankAccountName: firm?.bankDetails.accountName,
                bankIFSC: firm?.bankDetails.ifscCode,
            }))
        }
    }, [firm])

    console.log("firmdetails",firm)



    useEffect(() => {
        if (formValues?.bankIFSC?.length === 11) {
            getIFSCDetails();
        }
    }, [formValues.bankIFSC])


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
                            Bank Name</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.bankDetails.bankName || 'N/A'}</TruncateText>}
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
                            Account Name</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.bankDetails.accountName || 'N/A'}</TruncateText>}
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
                            Account Number</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.bankDetails.accountNumber || 'N/A'}</TruncateText>}
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
                            IFSC Code</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.bankDetails.ifscCode || 'N/A'}</TruncateText>}
                    />
                </ListItem>


                <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />
            </List>

            <Dialog open={editBankModal} PaperProps={{
                style: {
                    width: '600px'
                },
            }} fullWidth={false}>
                <DialogTitle>Bank Account </DialogTitle>
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
                                id="outlined-bankName"
                                label="Bank Name"
                                placeholder="Bank Name"
                                onChange={handleInputChange}
                                error={Boolean(formErrors.bankName)}
                                helperText={formErrors.bankName}
                                value={formValues.bankName}
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
                            {/* <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            > */}
                                <ListItemText
                                    secondary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        {ifscDetails ? ifscDetails.BANK + ", " + ifscDetails.BRANCH + ", " + ifscDetails.CITY : null}
                                    </Typography>}

                                />
                            {/* </ListItem> */}
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

        </React.Fragment>
    );
};

export default BankAcc;
