import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Autocomplete, DialogTitle, TextField, Stack } from "@mui/material";
import useAPI from 'app/hooks/useApi';
import Box from '@mui/material/Box';
import { createFilterOptions } from '@mui/material/Autocomplete';

const CaseManagerAttach = ({ open, caseRecord, onClose, onSuccessfulAdd, onError, caseManagersList }) => {

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => `${option.name} ${option.email} ${option.phone}`,
    });

    const { POST } = useAPI();
    const [selectedCaseManager, setSelectedCaseManager] = useState(null);


    const handleSubscribe = async () => {
        if (selectedCaseManager) {
            const payload = {
                case: caseRecord._id,
                caseManager: selectedCaseManager._id
            };
            try {
                const response = await POST('/case/assign/casemanager', payload);
                if (response.data) {
                    onError(response.data.message);
                } else {
                    onSuccessfulAdd(selectedCaseManager.name);
                }
            } catch (error) {
                onError();
            }
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Assign Case Manager</DialogTitle>
            <DialogContent>
                <Stack spacing={4}>
                    <DialogContentText>
                        Select a Case Manager from the list below to assign.
                    </DialogContentText>
                    <Autocomplete
                        options={caseManagersList}
                        getOptionLabel={(option) => option.name}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => setSelectedCaseManager(newValue)}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <Box sx={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 'bold' }}>{option.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'gray' }}>{option.email}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'gray' }}>{option.phone}</div>
                                </Box>
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Select Case Manager" fullWidth />}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubscribe} disabled={!selectedCaseManager}>Assign</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CaseManagerAttach;
