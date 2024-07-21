import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import { authUser } from "./fake-db";
import { ListItemIcon, ListItemText, ThemeProvider, Typography, Collapse, List } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData, selectToken, resetAuthState, setToken, selectUserTypes, setUserType } from "../../../redux";
import TruncateText from "../../customComponents/TruncateTextComponent";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const AuthUserDropdown = () => {
    const [openSwitchUser, setOpenSwitchUser] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const availableUserTypes = useSelector(selectUserTypes)
    const { theme } = useJumboTheme();
    const userData = useSelector(selectUserData);
    if (!token) {
        navigate('/user/login');
        return null;
    }
    const onLogout = () => {
        dispatch(resetAuthState());
        navigate("/user/login");
    };
    const handleListItemClick = (event, index) => {
        if (index === 1) {
            navigate("/user/profile");
        }
    }
    const handleSwitchUserClick = () => {
        setOpenSwitchUser(!openSwitchUser);
    };


    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <Avatar
                        src={authUser?.profile_pic}
                        sizes={"small"}
                        sx={{ boxShadow: 25, cursor: 'pointer' }}
                    />
                }
            >
                <Div sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: theme => theme.spacing(2.5),
                }}>
                    <Avatar src={authUser?.profile_pic} alt={authUser?.name} sx={{ width: 60, height: 60, mb: 2 }} />
                    <TruncateText variant="h5">
                        {'Hi,' + userData?.name}
                    </TruncateText>
                    <TruncateText variant="body1" width={"200px"}>
                        {userData?.email}
                    </TruncateText>

                </Div>
                <Divider />
                <nav>
                    <List disablePadding sx={{ pb: 1 }}>
                        <ListItemButton
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <PersonOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" sx={{ my: 0 }} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <EditOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" sx={{ my: 0 }} />
                        </ListItemButton>
                        <ListItemButton onClick={handleSwitchUserClick}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <RepeatOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Switch User" sx={{ my: 0 }} />
                            {openSwitchUser ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openSwitchUser} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {availableUserTypes.map((userType, index) => (
                                    <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => {
                                        dispatch(setUserType(userType))
                                        handleSwitchUserClick()
                                    }}>
                                        <ListItemText primary={userType} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                        <ListItemButton onClick={onLogout}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ my: 0 }} />
                        </ListItemButton>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export default AuthUserDropdown;
