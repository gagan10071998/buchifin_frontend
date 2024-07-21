import React from 'react';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Card, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import CircularProgress from '@mui/material/CircularProgress';
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
const Item = styled(Span)(({ theme }) => ({
    padding: theme.spacing(0, 1),
}));

const RetailerTableItem = ({ retailer, showLoader, fetchHistory }) => {

    const navigate = useNavigate()

    const handleSideMenus = (action) => {
       if(action.action === "viewRetailer"){
        navigate(`/users/retailer/${retailer._id}`)
       }
    };

    if (showLoader) {
        return (
            <Card sx={{ mb: 1 }}>
                <Stack direction={"row"} alignItems="center" spacing={2}></Stack>
                <Stack direction={"row"} justifyContent="space-evenly" alignItems={"center"} sx={{ alignItems: 'center', p: theme => theme.spacing(2, 1) }}>
                    <Item> <CircularProgress /></Item>
                </Stack>
            </Card>
        );
    }


    return (
        <Card sx={{ mb: 1 }}>
            <Stack direction={"row"} alignItems={"center"} sx={{ p: theme => theme.spacing(2, 1) }}>

                <Item
                    sx={{
                        flex: { xs: 1, md: '0 1 45%', lg: '0 1 35%' }
                    }}
                >
                    <Stack direction={'row'} alignItems={'center'}>

                        <Item>

                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56
                                }}
                                alt={retailer.name}
                                src={retailer.profilePic}
                            />

                        </Item>
                        <Item>
                            <Typography variant={"h6"} mb={.5}>{retailer.name}</Typography>
                            <Typography variant={"body1"} color="text.secondary">{`${retailer.phone[0].phone || 'N/A'}`}</Typography>
                            <Typography variant={"body1"} color="text.secondary">{`${retailer?.email || 'N/A'}`}</Typography>
                        </Item>
                    </Stack>
                </Item>
                <Item
                    sx={{
                        alignSelf: 'flex-start',
                        flexBasis: { md: '28%', lg: '18%' },
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Typography variant={"body1"} color="text.secondary">Name</Typography>
                    <Typography variant={"h6"} mt={1} lineHeight={1.25}>{retailer?.name || 'N/A'}</Typography>
                </Item>
                <Item
                    sx={{
                        alignSelf: 'flex-start',
                        flexBasis: { md: '28%', lg: '18%' },
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Typography variant={"body1"} color="text.secondary">Gender</Typography>
                    <Typography variant={"h6"} mt={1} lineHeight={1.25}>{retailer?.gender || 'N/A'}</Typography>
                </Item>
                <Item
                    sx={{
                        alignSelf: 'flex-start',
                        flexBasis: { md: '28%', lg: '18%' },
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Typography variant={"body1"} color="text.secondary">Status</Typography>
                    <Typography variant={"h6"} mt={1} lineHeight={1.25}>{retailer?.status || 'N/A'}</Typography>
                </Item>
               
                <Item sx={{ ml: { xs: 'auto', sm: 0 } }}>
                    <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={[
                            { icon: <Visibility />, title: "View", action: "viewRetailer" },
                        ]}
                        onClickCallback={handleSideMenus}
                    />
                </Item>
            </Stack>
        </Card>
    );
};

export const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));


export default RetailerTableItem;
