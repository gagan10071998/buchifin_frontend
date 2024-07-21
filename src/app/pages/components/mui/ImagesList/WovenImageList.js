import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {wovenImageDataItem} from "./data";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import code from "../ImagesList/demo-code/woven-image-list.txt";

const WovenImageList = () => {
    return (
        <JumboDemoCard title={"Woven Image List"} demoCode={code}
                       wrapperSx={{backgroundColor: 'background.paper', pt: 0}}>
            <ImageList sx={{width: 500, height: 450}} variant="woven" cols={3} gap={8}>
                {wovenImageDataItem.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=161&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </JumboDemoCard>
    );
};

export default WovenImageList;
