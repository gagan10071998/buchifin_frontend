import * as React from 'react';
import { useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import { Chip } from "@mui/material";
import { Autocomplete, Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack, Divider, TextField, TextareaAutosize } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import useAPI from 'app/hooks/useApi';
import LinearProgress from '@mui/material/LinearProgress';
import DOMPurify from 'dompurify';

const CaseUpdates = ({ caseId, updates, fetchCaseUpdates }) => {

    const Tags = [
        { name: 'EMAIL_REPLY', value: 'Email Reply', color: 'grey' },
        { name: 'PHONE_REPLY', value: 'Phone Reply', color: 'grey' },
        { name: 'SMS_REPLY', value: 'Sms Reply', color: 'grey' },
        { name: 'EMAIL', value: 'Email', color: 'grey' },
        { name: 'PHONE', value: 'Phone', color: 'grey' },
        { name: 'SMS', value: 'Sms', color: 'grey' },
        { name: 'SYSTEM', value: 'System', color: '#fb0c26' },
        { name: 'NEUTRAL', value: 'Neutral', color: '#004cf9' },
        { name: 'CASE_MANAGER', value: 'Case Manager', color: '#5c85e3' },
        { name: 'PROPOSAL', value: 'Proposal', color: '#32d54e' },
        { name: 'QUERY', value: 'Query', color: '#c822f1' },
        { name: 'RESPONDENT', value: 'Respondent', color: 'grey' }
    ];

    const TagsMapping = {
        'EMAIL_REPLY': { "value": "Email Reply", "color": "grey" },
        "PHONE_REPLY": { "value": "Phone Reply", "color": "grey" },
        "SMS_REPLY": { "value": "Sms Reply", "color": "grey" },
        "EMAIL": { "value": "Email", "color": "grey" },
        "PHONE": { "value": "Phone", "color": "grey" },
        "SMS": { "value": "Sms", "color": "grey" },
        'SYSTEM': { "value": "System", "color": "#fb0c26" },
        "NEUTRAL": { "value": "Neutral", "color": "#004cf9" },
        "CASE_MANAGER": { "value": "Case Manager", "color": "#5c85e3" },
        "PROPOSAL": { "value": "Proposal", "color": "#32d54e" },
        "QUERY": { "value": "Query", "color": "#c822f1" },
        "RESPONDENT": { "value": "Respondent", "color": "grey" },
    }


    function isValidComment(input) {
        const inputWithoutSpaces = input.replace(/\s/g, '');
        return inputWithoutSpaces.length >= 3;
    }
    const { POST } = useAPI();

    const createUpdate = async (data) => {
        try {
            setCreateApiLoading(true)
            const response = await POST(`/case/update/create`, data, true, true);
            if (response.data && response.data.result) {
                fetchCaseUpdates();
                handleClear();
            }
            setCreateApiLoading(false)
        } catch (error) {
            console.log(error)
        }
    };

    const [attachments, setAttachments] = useState([]);
    const [comment, setComment] = useState("");
    const [createApiLoading, setCreateApiLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const autocompleteOptions = Tags.filter(tag => !selectedTags.some(selectedTag => selectedTag.name === tag.name));

    const handleFileChange = (event) => {
        setAttachments([...attachments, ...event.target.files]);
    };

    const handleFileRemove = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleClear = () => {
        setAttachments([]);
        setComment("");
        setSelectedTags([]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('case', caseId);
        formData.append('comment', comment);
        attachments.forEach(file => {
            formData.append('docs', file);
        });
        selectedTags.forEach(tag => {
            formData.append('tags', tag.name);
        });
        createUpdate(formData);
    };
    const handleTagChange = (event, value) => {
        setSelectedTags(value);
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    const handleViewFile = async (documentId, caseUpdateId) => {
        try {
            let data = {
                doc: documentId,
                caseUpdate: caseUpdateId,
                case: caseId
            }
            const response = await POST(`/case/document/view`, data, false, true);
            if (response.data && response.data.result?.url) {
                window.open(response.data.result.url, '_blank')
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Timeline
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                <TimelineItem sx={{ marginBottom: "30px" }}>
                    <TimelineSeparator>
                        <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                        <TimelineDot color="secondary">
                            <AddCircleIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Paper elevation={2} sx={{ marginLeft: "10px", width: "100%" }} >
                        <TimelineContent sx={{ py: '12px', px: 2, width: "100%" }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    disabled={createApiLoading}
                                    fullWidth
                                    id="filled-multiline-static"
                                    label="Comment"
                                    multiline
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    variant="filled"
                                    InputProps={{
                                        inputComponent: TextareaAutosize,
                                        inputProps: {
                                            minRows: 4,
                                            style: { width: '100%', resize: 'none' },
                                        },
                                    }}
                                />
                                <IconButton
                                    disabled={createApiLoading}
                                    component="span"
                                    style={{ position: 'absolute', bottom: 8, right: 8 }}
                                    onClick={() => document.getElementById('raised-button-file').click()}
                                >
                                    <AttachFileIcon />
                                </IconButton>
                                <input
                                    disabled={createApiLoading}
                                    accept="*/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <Autocomplete
                                onChange={handleTagChange}
                                disabled={createApiLoading}
                                multiple
                                id="tags"
                                options={autocompleteOptions}
                                getOptionLabel={(option) => option.value}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tags" />
                                )}
                                value={selectedTags}
                                sx={{ width: '30%', marginTop: '2%' }}
                            />
                            <Typography sx={{ mt: 2, mb: 1 }}>Files</Typography>
                            <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {attachments.map((file, index) => (
                                    <ListItem selected key={index} sx={{ width: 'auto', mr: 1, mb: 2, display: 'flex', alignItems: 'center' }}>
                                        {file.name} - {file.size} bytes
                                        <IconButton disabled={createApiLoading} onClick={() => handleFileRemove(index)} size="small" sx={{ ml: 1 }}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            {createApiLoading && <LinearProgress />}
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isValidComment(comment) || createApiLoading} >
                                    Submit
                                </Button>
                                <Button variant="outlined" color="secondary" disabled={createApiLoading} onClick={handleClear}>
                                    Clear
                                </Button>
                            </Stack>
                        </TimelineContent>
                    </Paper>
                </TimelineItem>
                {
                    updates.map((record, index) => (
                        <TimelineItem sx={{ marginBottom: "50px" }} key={index}>
                            <TimelineSeparator>
                                {record.createdByType === 'SUPER_ADMIN' ? (
                                    <>
                                        <TimelineConnector sx={{ mt: '-141%', bgcolor: 'secondary.main' }} />
                                        <TimelineDot color="secondary">
                                            <SettingsIcon />
                                        </TimelineDot>
                                        <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                    </>
                                ) : record.createdByType === 'CASE_MANAGER' ? (
                                    <>
                                        <TimelineConnector sx={{ mt: '-141%', bgcolor: 'primary.main' }} />
                                        <TimelineDot color="primary">
                                            <PersonIcon />
                                        </TimelineDot>
                                        <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                                    </>
                                ) : (
                                    <>
                                        <TimelineConnector />
                                        <TimelineDot>
                                            <SettingsIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </>
                                )}
                            </TimelineSeparator>
                            <Paper elevation={5} sx={{ marginLeft: "10px", width: "97%" }} >
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Paper variant="outlined" sx={{ backgroundColor: "#47525912" }} > <Typography sx={{ py: '12px', px: 2, wordWrap: "break-word" }}>{record.comment}</Typography></Paper><br />
                                    {record.communication?.body?.html && <> <Paper variant="outlined" sx={{ backgroundColor: "#47525912" }} >
                                        <Typography sx={{ py: '12px', px: 2, wordWrap: "break-word" }}
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(record.communication?.body?.html || '')
                                            }}
                                        />
                                    </Paper><br /> </>}
                                    <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {
                                            record.docs.map((file, index) => (
                                                file.originalname ? (
                                                    <ListItem
                                                        onClick={() => handleViewFile(file._id, record._id)}
                                                        selected
                                                        key={file._id}
                                                        sx={{ cursor: 'pointer', width: 'auto', mr: 1, mb: 2, display: 'flex', alignItems: 'center' }}
                                                    >
                                                        {file.originalname}
                                                    </ListItem>
                                                ) : null
                                            ))
                                        }
                                    </List>
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 500,
                                            bgcolor: 'background.paper'
                                        }}
                                    >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt={record.createdBy?.name || "System"} src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                                            </ListItemAvatar>
                                            <ListItemText primary={record.createdBy?.name || "System"} secondary={formatDate(record.createdAt)} />
                                        </ListItem>
                                    </List>
                                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                                        {record.tags && record.tags.map(tag => (
                                            <Chip label={TagsMapping[tag].value} sx={{ color: "white", backgroundColor: TagsMapping[tag].color }} />
                                        ))}
                                    </Stack>
                                </TimelineContent>
                            </Paper>
                        </TimelineItem>
                    ))

                }
            </Timeline>
        </>
    );
};
export default CaseUpdates;
