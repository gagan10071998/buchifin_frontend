import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {Avatar, Tooltip} from "@mui/material";
import code from "../Tooltips/demo-code/avatar-tooltips.txt";
import {ASSET_AVATARS} from "../../../../utils/constants/paths";
import {getAssetPath} from "../../../../utils/appHelpers";

const AvatarTooltip = () => {
    return (
        <JumboDemoCard title={"Avatar Tooltip"} demoCode={code}
                       wrapperSx={{backgroundColor: 'background.paper', pt: 0}}>
            <Tooltip title={"Jimmy Jo"}>
                <Avatar
                    alt={"jimmy-jo"}
                    src={getAssetPath(`${ASSET_AVATARS}/jimmy-jo.jpg`)}
                    sx={{height: '52px', width: '52px'}}
                />
            </Tooltip>
        </JumboDemoCard>
    );
};

export default AvatarTooltip;
