import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import ImageList from "@mui/material/ImageList";
import {customImageDataItem} from "./data";
import ImageListItem from "@mui/material/ImageListItem";
import {ImageListItemBar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import code from "../ImagesList/demo-code/custom-image-lists.txt";

const srcset = (image, width, height, rows = 1, cols = 1) => {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
            height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
};

const CustomImageList = () => {
    return (
        <JumboDemoCard title={"Custom Image List"} demoCode={code}
                       wrapperSx={{backgroundColor: 'background.paper', pt: 0}}>
            <ImageList
                sx={{
                    width: 500,
                    height: 450,
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                }}
                rowHeight={200}
                gap={1}
            >
                {customImageDataItem.map((item) => {
                    const cols = item.featured ? 2 : 1;
                    const rows = item.featured ? 2 : 1;

                    return (
                        <ImageListItem key={item.img} cols={cols} rows={rows}>
                            <img
                                {...srcset(item.img, 250, 200, rows, cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={item.title}
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{color: 'white'}}
                                        aria-label={`star ${item.title}`}
                                    >
                                        <StarBorderIcon/>
                                    </IconButton>
                                }
                                actionPosition="left"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </JumboDemoCard>
    );
};

export default CustomImageList;
