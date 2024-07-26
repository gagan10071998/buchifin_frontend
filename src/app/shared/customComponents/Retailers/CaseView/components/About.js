import React from 'react';
import TabContext from "@mui/lab/TabContext";
import Div from "@jumbo/shared/Div";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { ListItem, Button, ListItemIcon, ListItemText, Typography, List } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@emotion/styled";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import TruncateText from '../../../TruncateTextComponent';
import useAPI from 'app/hooks/useApi';
import Divider from "@mui/material/Divider";
import { convertDate } from 'app/utils/appHelpers';
import FirmDetails from './firm';
import OverviewEditModal from './OverviewEditModal';
import FirmEditModal from './FirmEditModal';
import BankAcc from './BankAcc';
import RetailerDoc from './Documents';

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


const About = ({ record, setRecord, fetchRetailer }) => {

    const [value, setValue] = React.useState('1');
    const [overviewEditModalOpen, setOverviewEditModalOpen] = React.useState(false);
    const [firmEditModalOpen, setFirmEditModalOpen]= React.useState(false);

    const openEditModal = () => {
        if (value === '1') {
            setOverviewEditModalOpen(true)
        }
        else{
            setFirmEditModalOpen(true)
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    const { POST, PUT } = useAPI();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Typography variant={'h2'} mb={3}>Retailer Info</Typography>
            <JumboCardQuick
                title={`ID: ${record._id}`}
                action={
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <TabContext value={value}>
                            <Div
                                sx={{
                                    '& .MuiTab-root': {
                                        py: 2.5
                                    }
                                }}
                            >
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Overview" value="1" />
                                    <Tab label="Firm Details" value="2" />
                                    <Tab label="Bank Account" value="3" />
                                    <Tab label="Documents" value="4" />
                                </TabList>
                            </Div>
                        </TabContext>
                        <Button variant="contained" style={{ marginRight: 8, marginLeft: 10 }} onClick={openEditModal}>EDIT</Button>
                    </div>
                }
                headerSx={{
                    borderBottom: 1, borderColor: 'divider'
                }}
                sx={{ mb: 3.75 }}
            >

                {(value === "1" ? <List
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
                                {record.name || 'N/A'}</Typography>}
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
                                {record?.address[0].district || 'N/A'}</TruncateText>}
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
                                {record?.address[0].state || 'N/A'}</TruncateText>}
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
                                {record?.address[0].zip || 'N/A'}</TruncateText>}
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
                                {record?.address[0].country || 'N/A'}</TruncateText>}
                        />
                    </ListItem>
                </List> : <></>)}


                {(value === "2" ? <FirmDetails record={record} /> : <></>)}
                {(value === "3" ? <BankAcc record={record} /> : <></>)}
                {(value === "4" ? <RetailerDoc record={record} /> : <></>)}

                




                {overviewEditModalOpen && <OverviewEditModal record={record} setOverviewEditModalOpen={setOverviewEditModalOpen} fetchRetailer={fetchRetailer}/>}
                {firmEditModalOpen && <FirmEditModal record={record} setFirmEditModalOpen={setFirmEditModalOpen} fetchRetailer={fetchRetailer}/>}
                

            </JumboCardQuick>

        </React.Fragment>
    );
};

export default About;
