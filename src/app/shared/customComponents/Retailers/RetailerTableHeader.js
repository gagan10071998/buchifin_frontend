import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, Checkbox, TablePagination } from "@mui/material";
import styled from "@emotion/styled";
import JumboSearch from "@jumbo/components/JumboSearch";
import Stack from "@mui/material/Stack";
import AddIcon from '@mui/icons-material/Add';
import RetailerAdd from './RetailerAdd';
import useToast from 'app/hooks/useToast';


const Item = styled.div(({ theme }) => ({
    padding: theme.spacing(0, 1),
}));

const RetailerTableHeader = ({
    setSearchValue,
    resetPage,
    totalCount,
    page,
    setPage,
    fetchHistory,
    rowsPerPage,
    setRowsPerPage,
    showLoader,
    caseType }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [addNewRetailerDialog, setAddNewRetailerDialog] = useState(false);
    const showToast = useToast();


    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearchChange = useCallback(debounce((value) => {
        if (value) {
            resetPage();
        }
        setSearchValue(value);
    }, 500), []);

    const handleSuccessfulAdd = () => {
        setAddNewRetailerDialog(false)
        setTimeout(() => {
            showToast(`Successfully added the Retailer`, 'success');
            fetchHistory();
        }, 500);

    }

    const handleAddError = (message) => {
        setAddNewRetailerDialog(false);
        setTimeout(() => {
            showToast(message, 'error');
        }, 500);
    }

    useEffect(() => {
        setPage(0);
        setSearchValue('');
        setRowsPerPage(10);
        setSearchTerm('');
    }, [caseType]);

    return (
        <>
            <Card >
                <Stack direction={"row"} alignItems={"center"} sx={{ p: theme => theme.spacing(2, 1) }}>
                    {/* <Checkbox indeterminate={true} /> */}
                    <Item
                        sx={{
                            flex: { xs: 1, md: '0 1 45%', lg: '0 1 35%' }
                        }}
                    >
                        <JumboSearch
                            onChange={(e) => {
                                if (e) {
                                    setSearchTerm(e);
                                    handleSearchChange(e);
                                }
                            }}
                            sx={{
                                display: { xs: 'none', md: 'block' }
                            }}
                        />
                    </Item>
                    <TablePagination
                        labelRowsPerPage={"Rows per page:"}
                        showFirstButton={true}
                        showLastButton={true}
                        disabled={true}
                        component="div"
                        count={totalCount}
                        page={page}
                        onPageChange={(event, newPage) => {
                            setPage(newPage)
                            fetchHistory(rowsPerPage, newPage, searchTerm, caseType);
                        }}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        {...(showLoader ? {
                            SelectProps: {
                                disabled: showLoader
                            },
                            backIconButtonProps: {
                                disabled: showLoader
                            },
                            nextIconButtonProps: {
                                disabled: showLoader
                            }
                        } : {})}
                    />
                    <div style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "1%"
                    }}>

                        <Button variant="contained" className='ml-10' endIcon={<AddIcon />} onClick={() => setAddNewRetailerDialog(true)} >
                            ADD
                        </Button>
                    </div>
                </Stack>
            <RetailerAdd open={addNewRetailerDialog} onClose={() => setAddNewRetailerDialog(false)} onSuccessfulAdd={handleSuccessfulAdd} onError={handleAddError} />
            </Card>
        </>
    );
};

export default RetailerTableHeader;
