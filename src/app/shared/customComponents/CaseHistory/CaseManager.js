import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Autocomplete, DialogTitle, TextField, Stack } from "@mui/material";
import useAPI from 'app/hooks/useApi';

const NmsAttach = ({ open, onClose, onSuccessfulAdd, onError, fillingId, noticeList }) => {
    const { POST } = useAPI();
    const [notices, setNotices] = useState(noticeList);
    const [selectedNotice, setSelectedNotice] = useState(null);


    const handleSubscribe = async () => {
        if (selectedNotice) {
            const payload = {
                noticeId: selectedNotice._id,
                fillingId: fillingId
            };
            try {
                const response = await POST('/nms/attach', payload);
                if (response) {
                    onSuccessfulAdd(selectedNotice.label);
                } else {
                    onError();
                }
            } catch (error) {
                onError();
            }
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Attach Notice</DialogTitle>
            <DialogContent>
                <Stack spacing={4}>
                    <DialogContentText>
                        Select a notice from the list below to attach.
                    </DialogContentText>
                    <Autocomplete
                        options={notices}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => setSelectedNotice(newValue)}
                        renderInput={(params) => <TextField {...params} label="Select Notice" fullWidth />}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubscribe} disabled={!selectedNotice}>Attach</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NmsAttach;
