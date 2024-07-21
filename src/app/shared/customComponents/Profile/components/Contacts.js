import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "@mui/material/Link";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
const Contacts = ({ profile }) => {
    return (
        <JumboCardQuick title={"Contact"} noWrapper>
            <List disablePadding sx={{ mb: 2 }}>
                <ListItem alignItems="flex-start" sx={{ p: theme => theme.spacing(.5, 3) }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        <EmailOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body1" color="text.secondary">Email</Typography>}
                        secondary={<Link variant="body1" href="#" underline="none">{profile.email}</Link>}
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ p: theme => theme.spacing(.5, 3) }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        <LocalPhoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body1" color="text.secondary">Phone</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{profile.phone}</Typography>}
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ p: theme => theme.spacing(.5, 3) }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        <CottageOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body1" color="text.secondary">Address</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{profile.address || 'N/A'}</Typography>}
                    />
                </ListItem>
            </List>
        </JumboCardQuick>
    );
};

export default Contacts;
