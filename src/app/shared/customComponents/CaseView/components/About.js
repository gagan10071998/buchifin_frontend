import React, { useEffect, useState } from 'react';
import TabContext from "@mui/lab/TabContext";
import Div from "@jumbo/shared/Div";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { ListItem, ListItemIcon, ListItemText, Typography, TextField, Avatar, Autocomplete, List, ListItemAvatar, Chip, Paper, Grid } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@emotion/styled";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import PolicyIcon from '@mui/icons-material/Policy';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import TruncateText from '../../TruncateTextComponent';
import ClassIcon from '@mui/icons-material/Class';
import GavelIcon from '@mui/icons-material/Gavel';
import EmailIcon from '@mui/icons-material/Email';
import CaseUpdates from '../CaseUpdates';
import useAPI from 'app/hooks/useApi';
import Divider from "@mui/material/Divider";
import { ASSET_AVATARS } from 'app/utils/constants/paths';
import { convertDate } from 'app/utils/appHelpers';

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
const About = ({ record }) => {
    console.log(record)
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    const statusOptions = [
        { label: 'Waiting For Action', value: 'WAITING_FOR_ACTION' },
        { label: 'Consented', value: 'CONSENTED' },
        { label: 'No Consent', value: 'NO_CONSENT' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Process Failed', value: 'PROCESS_FAILED' },
        { label: 'Dispute Resolved', value: 'DISPUTE_RESOLVED' },
        { label: 'Non Starter', value: 'NON_STARTER' },
        { label: 'Withdrawn', value: 'WITHDRAWN' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' }
    ];

    const { POST } = useAPI();

    const [value, setValue] = React.useState('2');
    const [caseUpdates, setCaseUpdates] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchCaseUpdates = async (limit = 10, page = 1, search = '') => {
        try {
            const response = await POST(`/case/updates`, { case: record._id }, false, true);
            if (response.data && response.data.result) {
                setCaseUpdates(response.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        fetchCaseUpdates()
    }, [record._id]);
    return (
        <React.Fragment>
            <Typography variant={'h2'} mb={3}> Info</Typography>
            {true ? (
                <JumboCardQuick
                    title={`ID: ${record._id}`}
                    action={
                        <TabContext value={value}>
                            <Div
                                sx={{
                                    marginTop: -2.25,
                                    marginBottom: -2.5,
                                    '& .MuiTab-root': {
                                        py: 2.5
                                    }
                                }}
                            >
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Overview" value="2" />
                                    {/* <Tab label="Updates" value="2" />
                                    <Tab label="Extra info" value="3" /> */}
                                </TabList>
                            </Div>
                        </TabContext>
                    }
                    headerSx={{
                        borderBottom: 1, borderColor: 'divider'
                    }}
                    sx={{ mb: 3.75 }}

                >

                    <List
                        disablePadding
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: theme => theme.spacing(0, -2),
                        }}
                    >
                        {/* <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <NumbersIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Challan Number</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record.challanNumber || 'N/A'}</Typography>}
                            />
                        </ListItem> */}

                        <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <PersonIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Name</Typography>}
                                secondary={<Typography variant="body1" color="text.primary" textTransform={"uppercase"}>
                                    {record.name || 'N/A'}</Typography>}
                            />
                        </ListItem>


                        {/* <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <CurrencyRupeeIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Fine Amount</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record.totalFineAmount || 'N/A'}</Typography>}
                            />
                        </ListItem> */}


                        {/* <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <DirectionsCarIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Vehicle Number</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record.vehicleNumber || 'N/A'}</Typography>}
                            />
                        </ListItem> */}
                        <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <DateRangeIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Date Of Birth</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {convertDate(record.dob) || 'N/A'}</Typography>}
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <PersonIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Email</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record?.email || 'N/A'}</Typography>}
                            />
                        </ListItem>

                        <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <PhoneIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Phone Number</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record?.phone[0].phone || 'N/A'}</Typography>}
                            />
                        </ListItem>

                        <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <DateRangeIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Updated On</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {(record?.createdAt && formatDate(record.createdAt)) || 'N/A'}
                                </Typography>}
                            />
                        </ListItem>

                        <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <AssuredWorkloadIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Status</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record?.status || 'N/A'}</Typography>}
                            />
                        </ListItem>

                        {/* <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <AssuredWorkloadIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    District</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    {record?.district?.district || 'N/A'}</Typography>}
                            />
                        </ListItem> */}

                        {/* <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <PolicyIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Section Of Offence</Typography>}
                                secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                    {record?.sectionOfOffence || 'N/A'}</TruncateText>}
                            />
                        </ListItem> */}

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
                                    Address</Typography>}
                                secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                    {record?.address[0].address || 'N/A'}</TruncateText>}
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
                                    City</Typography>}
                                secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                    {record?.address[0].city || 'N/A'}</TruncateText>}
                            />
                        </ListItem>   <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <HomeIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    State</Typography>}
                                secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                    {record?.address[0].state || 'N/A'}</TruncateText>}
                            />
                        </ListItem>   <ListItem
                            sx={{
                                width: { xs: '100%', sm: '50%', xl: '33.33%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <HomeIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Country</Typography>}
                                secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                    {record?.address[0].country || 'N/A'}</TruncateText>}
                            />
                        </ListItem>



                    </List>
                </JumboCardQuick>
            ) : (<></>)}

            {record?.filling?.type == "NI_ACT" ? (
                <JumboCardQuick
                    title={`ID: ${record._id}`}
                    action={
                        <TabContext value={value}>
                            <Div
                                sx={{
                                    marginTop: -2.25,
                                    marginBottom: -2.5,
                                    '& .MuiTab-root': {
                                        py: 2.5
                                    }
                                }}
                            >
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Updates" value="2" />
                                    <Tab label="Overview" value="1" />
                                    {/* <Tab label="Extra info" value="3" /> */}
                                </TabList>
                            </Div>
                        </TabContext>
                    }
                    headerSx={{
                        borderBottom: 1, borderColor: 'divider'
                    }}
                    sx={{ mb: 3.75 }}

                >

                    {value === '1' && <>
                        <List
                            disablePadding
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                margin: theme => theme.spacing(0, -2),
                            }}
                        >
                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <NumbersIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Case Number</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.caseNumber || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <GavelIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Court Name</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.courtName || 'N/A'}</Typography>}
                                />
                            </ListItem>


                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <CurrencyRupeeIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Claim Amount</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.claimAmount || 'N/A'}</Typography>}
                                />
                            </ListItem>




                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <AssuredWorkloadIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Government</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.government.state || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <AssuredWorkloadIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        District</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.district.district || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <ClassIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Category Of Dispute</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.categoryOfDispute || 'N/A'}</TruncateText>}
                                />
                            </ListItem>
                            <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PersonIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Petitioner Name</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.petitionerName || 'N/A'}</TruncateText>}
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
                                        Petitioner Address</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.petitionerAddress || 'N/A'}</TruncateText>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PhoneIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Petitioner Phone</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.petitionerPhone || 'N/A'}</Typography>}
                                />
                            </ListItem>
                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <EmailIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Petitioner Email</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.petitionerEmail || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PersonIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Petitioner Advocate Name</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.petitionerAdvocateName || 'N/A'}</TruncateText>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PhoneIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Petitioner Advocate Phone</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.petitionerAdvocatePhone || 'N/A'}</Typography>}
                                />
                            </ListItem>
                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <EmailIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Petitioner Advocate Email</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.petitionerAdvocateEmail || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PersonIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Respondent Name</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.respondentName || 'N/A'}</TruncateText>}
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
                                        Respondent Address</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.respondentAddress || 'N/A'}</TruncateText>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PhoneIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Respondent Phone</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.respondentPhoneNumber || 'N/A'}</Typography>}
                                />
                            </ListItem>
                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <EmailIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Respondent Email</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.respondentEmail || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PersonIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Respondent Advocate Name</Typography>}
                                    secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                                        {record.respondentAdvocateName || 'N/A'}</TruncateText>}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PhoneIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Respondent Advocate Phone</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.respondentAdvocatePhone || 'N/A'}</Typography>}
                                />
                            </ListItem>
                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <EmailIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Respondent Advocate Email</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.respondentAdvocateEmail || 'N/A'}</Typography>}
                                />
                            </ListItem>

                            <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />

                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <PersonIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Filed By</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {record.createdBy.name || 'N/A'}</Typography>}
                                />
                            </ListItem>



                            <ListItem
                                sx={{
                                    width: { xs: '100%', sm: '50%', xl: '33.33%' }
                                }}
                            >
                                <StyledListItemIcon>
                                    <DateRangeIcon fontSize={"inherit"} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                        Filed On</Typography>}
                                    secondary={<Typography variant="body1" color="text.primary">
                                        {(record.createdAt && formatDate(record.createdAt)) || 'N/A'}
                                    </Typography>}
                                />
                            </ListItem>

                        </List>
                        <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />
                        <Grid container spacing={2}>
                            {record.caseManager && <Grid item xs={12} sm={4}>
                                <Paper elevation={1} sx={{ padding: 2 }}>
                                    <Typography variant="h6" mb={2}>
                                        Case Manager
                                    </Typography>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt={record?.caseManager?.user?.name} src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                                            </ListItemAvatar>
                                            <ListItemText primary={record?.caseManager?.user?.name} secondary={<>
                                                <Typography color="text.secondary">
                                                    {record.caseManager.user.email}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {record.caseManager.user.phone}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    Assigned On {formatDate(record.caseManager.assignedAt)}
                                                </Typography>
                                            </>} />
                                        </ListItem>
                                    </List>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography variant="h6" mb={2}>
                                            Assigned By
                                        </Typography>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar alt={record.caseManager.assignedBy.name} src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                                                </ListItemAvatar>
                                                <ListItemText primary={record.caseManager.assignedBy.name} secondary={<>
                                                    <Typography color="text.secondary">
                                                        {record.caseManager.assignedBy.email}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        {record.caseManager.assignedBy.phone}
                                                    </Typography>

                                                </>} />
                                            </ListItem>
                                            <ListItem><Chip label={"Super Admin"} color="error" /></ListItem>
                                        </List>
                                    </Paper>
                                </Paper>
                            </Grid>}


                            {record.neutral && <Grid item xs={12} sm={4}>
                                <Paper elevation={1} sx={{ padding: 2 }}>
                                    <Typography variant="h6" mb={2}>
                                        Neutral
                                    </Typography>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt={record.neutral.user.name} src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                                            </ListItemAvatar>
                                            <ListItemText primary={record.neutral.user.name} secondary={<>
                                                <Typography color="text.secondary">
                                                    {record.neutral.user.email}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {record.neutral.user.phone}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    Assigned On {formatDate(record.neutral.assignedAt)}
                                                </Typography>
                                            </>} />
                                        </ListItem>
                                    </List>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography variant="h6" mb={2}>
                                            Assigned By
                                        </Typography>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar alt={record.neutral.assignedBy.name} src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                                                </ListItemAvatar>
                                                <ListItemText primary={record.caseManager.assignedBy.name} secondary={<>
                                                    <Typography color="text.secondary">
                                                        {record.neutral.assignedBy.email}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        {record.neutral.assignedBy.phone}
                                                    </Typography>
                                                </>} />
                                            </ListItem>
                                            <ListItem><Chip label={"Super Admin"} color="error" /></ListItem>
                                        </List>
                                    </Paper>
                                </Paper>
                            </Grid>}
                        </Grid>
                    </>}

                    {value === '2' && (
                        <>
                            {/* <Autocomplete
                                options={statusOptions}
                                getOptionLabel={(option) => option.label}
                                value={statusOptions.find(option => option.value === record.status)}
                                onChange={(event, newValue) => {
                                    console.log(event, newValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Case Status" />}
                                sx={{ "width": "20%" }}
                            /> */}
                            <CaseUpdates caseId={record._id} updates={caseUpdates} fetchCaseUpdates={fetchCaseUpdates} />
                        </>
                    )}


                </JumboCardQuick>
            ) : (<></>)}
        </React.Fragment>
    );
};

export default About;
