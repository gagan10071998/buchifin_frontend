import React from 'react';
import {useDropzone} from "react-dropzone";
import {Typography} from "@mui/material";
import DndWrapper from "./DndWrapper";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import code from "../components/demo-code/dz-preview.txt";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const DzPreviews = () => {

    const [files, setFiles] = React.useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }),
                ),
            );
        },
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt=""/>
            </div>
        </div>
    ));

    React.useEffect(
        () => () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files],
    );

    return (
        <JumboDemoCard
            title={"Dropzone with preview"}
            demoCode={code}
            wrapperSx={{pt: 0, backgroundColor: 'background.paper'}}
        >
            <Div sx={{ flex: 1}}>
                <DndWrapper>
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <Typography variant={"body1"}>Drag 'n' drop some files here, or click to select
                            files</Typography>
                    </div>
                </DndWrapper>
                <aside style={thumbsContainer}>{thumbs}</aside>
            </Div>
        </JumboDemoCard>
    );
};

export default DzPreviews;
