import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import ImageList from "@mui/material/ImageList";
import {titleBarBelowMasonryImageDataItem} from "./data";
import ImageListItem from "@mui/material/ImageListItem";
import {ImageListItemBar} from "@mui/material";
import code from "../ImagesList/demo-code/titlebar-masonry-image-list.txt";

const TitlebarBelowMasonryImageList = () => {
    return (
        <JumboDemoCard title={"Title bar below image (masonry)"} demoCode={code}
                       wrapperSx={{backgroundColor: 'background.paper', pt: 0}}>
            <Div sx={{width: 500, height: 450, overflowY: 'scroll'}}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {titleBarBelowMasonryImageDataItem.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar position="below" title={item.author}/>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Div>
        </JumboDemoCard>
    );
};

export default TitlebarBelowMasonryImageList;
