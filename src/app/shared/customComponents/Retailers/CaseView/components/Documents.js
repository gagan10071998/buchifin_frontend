
import React, { useEffect, useRef, useState } from 'react';
import Div from "@jumbo/shared/Div";
import { ListItem, ListItemIcon, ListItemText, Typography, TextField, Avatar, Autocomplete, List, ListItemAvatar, Chip, Paper, Grid, InputAdornment, InputLabel, MenuItem } from "@mui/material";
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
import Select from 'react-select';
import zIndex from '@mui/material/styles/zIndex';

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
    const seed = useRef(null);
    const insecticide = useRef(null);
    const fertlizer = useRef(null);

    const showToast = useToast();
    const [firm, setFirm] = useState(null);
    const [currentLicense, setCurrentLicense] = useState([]);
    const [formValues, setFormValues] = useState({
        aadharFileFrontName: "",
        aadharFileBackName: "",
        aadharFileFront: "",
        aadharFileBack: "",
        aadhar: "",
        PANFileName: "",
        pan: "",
        PANFile: "",
        seedFileName: "",
        seedFile: "",
        insecticideFileName: "",
        insecticideFile: "",
        fertilizerFileName: "",
        fertlizerFile: "",
        seed: "",
        insecticide: "",
        fertilizer: ""
    });


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



    const handleSubscribe = async () => {

        const formdata = new FormData();
        formdata.append("id", firm._id);
        formdata.append("aadhaar[number]", formValues.aadhar);
        formdata.append("pan[number]", formValues.pan);
        formdata.append("aadhaar[doc][front]", formValues.aadharFileFront);
        formdata.append("aadhaar[doc][back]", formValues.aadharFileBack);
        formdata.append("pan[doc][front]", formValues.PANFile);


        currentLicense.forEach((value, index) => {
            if (value.value === "seed") {
                formdata.append(`documents[${index}][number]`, formValues.seed);
                formdata.append(`documents[${index}][note]`, formValues.seedFileName);
                formdata.append(`documents[${index}][doc][front]`, formValues.seedFile);
                formdata.append(`documents[${index}][label]`, `seed`);
            }

            if (value.value === "insecticide") {
                formdata.append(`documents[${index}][number]`, formValues.insecticide);
                formdata.append(`documents[${index}][note]`, formValues.insecticideFileName);
                formdata.append(`documents[${index}][doc][front]`, formValues.insecticideFile);
                formdata.append(`documents[${index}][label]`, 'insecticide');
            }

            if (value.value === "fertilizer") {
                formdata.append(`documents[${index}][number]`, formValues.fertilizer);
                formdata.append(`documents[${index}][note]`, formValues.fertilizerFileName);
                formdata.append(`documents[${index}][doc][front]`, formValues.fertlizerFile);
                formdata.append(`documents[${index}][label]`, 'fertilizer');
            }
        });


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
        // const allFieldsFilled = Object.values(formValues).every(
        //     (value) => value !== ""
        // );
        // const noErrors = Object.values(formErrors).every(
        //     (error) => error === ""
        // );

        return true;
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

    const licenses = [{ label: "Seed", value: "seed" }, { label: "Fertilizer", value: "fertilizer" }, { label: "Insecticide", value: "insecticide" }];


    const handleChange = (event) => {

        console.log(event.target.value)
        setCurrentLicense((prev) => [...prev, event.target.value[0]])
    };
    const customStyles = {
        container: (provided) => ({
            ...provided,
            //   width: 300,
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#000' : '#ccc',
            boxShadow: state.isFocused ? '0 0 0 1px #000' : 'none',
            '&:hover': {
                borderColor: '#000',
            },
        }),
        menu: (provided) => ({
            ...provided,
            // height: "200px",
            zIndex: "9999"

            //   width: 300,
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
            zIndex: "9999"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#ddd' : '#fff',
            color: state.isSelected ? '#000' : '#333',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#f0f0f0',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#333',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#aaa',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 6px',
            height: "50px"

        }),
    };

    const checkCurrentLicense = (license) => {
        if ((currentLicense.filter((value) => value.value === license).length)) {
            return true
        }
        return false;
    }

    useEffect(() => {
        console.log(firm)
        if (firm?._id && firm?.aadhaar?.doc && firm?.pan?.doc) {
            setFormValues(() => ({
                aadharFileFrontName: firm.aadhaar.doc.front ?? "",
                aadharFileBackName: firm.aadhaar.doc.back ?? "",
                aadharFileFront: "",
                aadharFileBack: "",
                aadhar: firm.aadhaar.number,
                PANFileName: firm.pan.doc.front ?? "",
                pan: firm.pan.number ?? "",
                PANFile: "",
            }))

            console.log(firm.documents.filter((value)=>licenses.some((val)=> value.label === val.value)))
        }


    }, [firm])



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
                {firm?.documents ? firm.documents?.map((value) =>
                    <ListItem
                        sx={{
                            width: { xs: '100%', sm: '50%', xl: '33.33%' }
                        }}
                    >
                        <StyledListItemIcon>
                            <HomeIcon fontSize={"inherit"} />
                        </StyledListItemIcon>
                        <ListItemText
                            primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5} textTransform={"uppercase"}>
                                {value.label}</Typography>}
                            secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                {value.number ? value.number : 'N/A'}</TruncateText>}
                        />
                    </ListItem>) : null}
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
                            <InputLabel id="demo-multiple-name-label">License Type</InputLabel>

                            <Select
                                options={licenses}
                                isMulti
                                styles={customStyles}
                                onChange={(e) => setCurrentLicense(e)}

                            />
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

                            {
                                licenses?.length > 0 && checkCurrentLicense("seed") ?
                                    <>

                                        <TextField
                                            required
                                            id="outlined-seed"
                                            label="Seed License"
                                            placeholder="License Number"
                                            onChange={handleInputChange}
                                            error={Boolean(formErrors.seed)}
                                            helperText={formErrors.seed}
                                            value={formValues.seed}

                                        />
                                        <input
                                            ref={seed}
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                let file = e.target.files[0];
                                                if (file) {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        seedFileName: file.name,
                                                        seedFile: file
                                                    }))
                                                }
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-seed"
                                            label={"Seed License File"}
                                            value={formValues.seedFileName}
                                            autoComplete="current-password"
                                            onClick={() => seed.current.click()}
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
                                    </> : null

                            }
                            {
                                licenses?.length > 0 && checkCurrentLicense("insecticide") ?
                                    <>
                                        <TextField
                                            required
                                            id="outlined-insecticide"
                                            label="insecticide License"
                                            placeholder="License Number"
                                            onChange={handleInputChange}
                                            error={Boolean(formErrors.insecticide)}
                                            helperText={formErrors.insecticide}
                                            value={formValues.insecticide}

                                        />
                                        <input
                                            ref={insecticide}
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                let file = e.target.files[0];
                                                if (file) {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        insecticideFileName: file.name,
                                                        insecticideFile: file
                                                    }))
                                                }
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-password"
                                            label={"Insecticide License File"}
                                            value={formValues.insecticideFileName}
                                            autoComplete="current-password"
                                            onClick={() => insecticide.current.click()}
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
                                    </> : null

                            } {
                                licenses?.length > 0 && checkCurrentLicense("fertilizer") ?
                                    <>
                                        <TextField
                                            required
                                            id="outlined-fertilizer"
                                            label="Fertilizer License"
                                            placeholder="License Number"
                                            onChange={handleInputChange}
                                            error={Boolean(formErrors.fertlizer)}
                                            helperText={formErrors.fertlizer}
                                            value={formValues.fertlizer}

                                        />
                                        <input
                                            ref={fertlizer}
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                let file = e.target.files[0];
                                                if (file) {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        fertilizerFileName: file.name,
                                                        fertlizerFile: file
                                                    }))
                                                }
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-password"
                                            label={"Fertlizer License File"}
                                            value={formValues.fertilizerFileName}
                                            autoComplete="current-password"
                                            onClick={() => fertlizer.current.click()}
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
                                    </> : null

                            }
                        </>
                    </Stack>
                </DialogContent>}
                {firm?.companyType === "Partnership" && <DialogContent>
                    <Stack spacing={2}>
                        <>
                            <Select
                                options={licenses}
                                isMulti
                                styles={customStyles}
                                onChange={(e) => setCurrentLicense(e)}

                            />
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

                            {
                                licenses?.length > 0 && checkCurrentLicense("seed") ?
                                    <>

                                        <TextField
                                            required
                                            id="outlined-seed"
                                            label="Seed License"
                                            placeholder="License Number"
                                            onChange={handleInputChange}
                                            error={Boolean(formErrors.seed)}
                                            helperText={formErrors.seed}
                                            value={formValues.seed}

                                        />
                                        <input
                                            ref={seed}
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                let file = e.target.files[0];
                                                if (file) {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        seedFileName: file.name,
                                                        seedFile: file
                                                    }))
                                                }
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-seed"
                                            label={"Seed License File"}
                                            value={formValues.seedFileName}
                                            autoComplete="current-password"
                                            onClick={() => seed.current.click()}
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
                                    </> : null

                            }
                            {
                                licenses?.length > 0 && checkCurrentLicense("insecticide") ?
                                    <>
                                        <TextField
                                            required
                                            id="outlined-insecticide"
                                            label="insecticide License"
                                            placeholder="License Number"
                                            onChange={handleInputChange}
                                            error={Boolean(formErrors.insecticide)}
                                            helperText={formErrors.insecticide}
                                            value={formValues.insecticide}

                                        />
                                        <input
                                            ref={insecticide}
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                let file = e.target.files[0];
                                                if (file) {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        insecticideFileName: file.name,
                                                        insecticideFile: file
                                                    }))
                                                }
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-password"
                                            label={"Insecticide License File"}
                                            value={formValues.insecticideFileName}
                                            autoComplete="current-password"
                                            onClick={() => insecticide.current.click()}
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
                                    </> : null

                            } {
                                licenses?.length > 0 && checkCurrentLicense("fertilizer") ?
                                    <>
                                        <TextField
                                            required
                                            id="outlined-fertilizer"
                                            label="Fertilizer License"
                                            placeholder="License Number"
                                            onChange={handleInputChange}
                                            error={Boolean(formErrors.fertlizer)}
                                            helperText={formErrors.fertlizer}
                                            value={formValues.fertlizer}

                                        />
                                        <input
                                            ref={fertlizer}
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                let file = e.target.files[0];
                                                if (file) {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        fertilizerFileName: file.name,
                                                        fertlizerFile: file
                                                    }))
                                                }
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-password"
                                            label={"Fertlizer License File"}
                                            value={formValues.fertilizerFileName}
                                            autoComplete="current-password"
                                            onClick={() => fertlizer.current.click()}
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
                                    </> : null

                            }
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
