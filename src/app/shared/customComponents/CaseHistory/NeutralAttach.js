import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Autocomplete, DialogTitle, TextField, Stack } from "@mui/material";
import useAPI from 'app/hooks/useApi';
import Box from '@mui/material/Box';
import { createFilterOptions } from '@mui/material/Autocomplete';

const NeutralAttach = ({ open, caseRecord, onClose, onSuccessfulAdd, onError, neutrals }) => {

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => `${option.name} ${option.email} ${option.phone}`,
    });

    const { POST } = useAPI();
    const [selectedNeutral, setSelectedNeutral] = useState(null);


    const handleSubscribe = async () => {
        if (selectedNeutral) {
            const payload = {
                case: caseRecord._id,
                neutral: selectedNeutral._id
            };
            try {
                const response = await POST('/case/assign/neutral', payload);
                if (response.data) {
                    onError(response.data.message);
                } else {
                    onSuccessfulAdd(selectedNeutral.name);
                }
            } catch (error) {
                onError();
            }
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Assign Neutral</DialogTitle>
            <DialogContent>
                <Stack spacing={4}>
                    <DialogContentText>
                        Select a Neutral from the list below to assign.
                    </DialogContentText>
                    <Autocomplete
                        options={neutrals}
                        getOptionLabel={(option) => option.name}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => setSelectedNeutral(newValue)}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <Box sx={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 'bold' }}>{option.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'gray' }}>{option.email}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'gray' }}>{option.phone}</div>
                                </Box>
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Select Neutral" fullWidth />}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubscribe} disabled={!selectedNeutral}>Assign</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NeutralAttach;
