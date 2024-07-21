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
import TruncateText from '../../../TruncateTextComponent';
import ClassIcon from '@mui/icons-material/Class';
import GavelIcon from '@mui/icons-material/Gavel';
import EmailIcon from '@mui/icons-material/Email';
import CaseUpdates from '../CaseUpdates';
import useAPI from 'app/hooks/useApi';
import Divider from "@mui/material/Divider";
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


const FirmDetails = ({ record }) => {

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    const { GET } = useAPI();

    const [firm, setFirm] = useState(null);


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
                            {firm?.name || 'N/A'}</Typography>}
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
                            Firm Type</Typography>}
                        secondary={<Typography variant="body1" color="text.primary" textTransform={"uppercase"}>
                            {firm?.companyType || 'N/A'}</Typography>}
                    />
                </ListItem>


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
                            {firm?.address[0].address || 'N/A'}</TruncateText>}
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
                            {firm?.address[0].city || 'N/A'}</TruncateText>}
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
                            District</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.address[0].district || 'N/A'}</TruncateText>}
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
                            State</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.address[0].state || 'N/A'}</TruncateText>}
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
                            Pin Code</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.address[0].zip || 'N/A'}</TruncateText>}
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
                            Country</Typography>}
                        secondary={<TruncateText width={'250px'} variant="body1" color="text.primary">
                            {firm?.address[0].country || 'N/A'}</TruncateText>}
                    />
                </ListItem>


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
                            {firm?.bank?.name || 'N/A'}</TruncateText>}
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
                            {firm?.bank?.accountName || 'N/A'}</TruncateText>}
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
                            {firm?.bank?.accountNumber || 'N/A'}</TruncateText>}
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
                            {firm?.bank?.ifsc || 'N/A'}</TruncateText>}
                    />
                </ListItem>

                <Divider sx={{ width: "100%", marginTop: "2%", marginBottom: "2%", borderBottomWidth: '2px' }} />

                {(firm?.companyType === "Partnership" ? (
                    <Grid container spacing={2}>
                        {firm.partners?.length > 0 && (<>
                            {firm.partners.map((partner, index) => (
                                <Grid item xs={12} sm={4}>
                                    <Paper elevation={1} sx={{ padding: 2 }}>
                                        <Typography variant="h6" mb={2}>
                                            Partner {index + 1}
                                        </Typography>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={partner?.name}
                                                        src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={partner?.name}
                                                    secondary={
                                                        <>
                                                            <Typography color="text.secondary">
                                                                {partner?.email}
                                                            </Typography>
                                                            <Typography color="text.secondary">
                                                                {partner?.phone[0].phone}
                                                            </Typography>
                                                            <Typography color="text.secondary">
                                                                {partner?.designtion}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>

                                        </List>
                                    </Paper>
                                </Grid>
                            ))}
                        </>
                        )}

                    </Grid>

                ) : <></>)}


            </List>

        </React.Fragment>
    );
};

export default FirmDetails;
