import React, { useEffect, useState } from 'react';
import RetailerTableItem, {StyledCard} from './RetailerTableItem';
import { Typography, TablePagination, Stack } from "@mui/material";
import useAPI from 'app/hooks/useApi';
import useToast from 'app/hooks/useToast';
import RetailerTableHeader from './RetailerTableHeader';

const RetailerTable = () => {

    const { POST, GET } = useAPI();
    const [showLoader, setShowLoader] = useState(true);
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');

    const fetchHistory = async (limit = 10, page = 0, search = '', path) => {
        try {
            setShowLoader(true);
            const response = await GET(`/retailer`);
            setShowLoader(false);
            if (response && response.records) {
                setHistory(response.records);
                setPage(response.page - 1);
                setTotalCount(response.count);
            }
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchHistory(rowsPerPage, page, searchValue);
    }, [rowsPerPage, searchValue]);

    useEffect(() => {
        setPage(0);
        setSearchValue('');
        setRowsPerPage(10);
        fetchHistory(10, 0, '');
    }, []);

    return (
        <React.Fragment>
            <Typography variant={'h2'} mb={3}>Retailers</Typography>
            <div style={{ marginBottom: '8px' }}>
                <RetailerTableHeader
                    setSearchValue={setSearchValue}
                    resetPage={() => setPage(0)}
                    refreshData={fetchHistory}
                    totalCount={10}
                    page={page}
                    setPage={setPage}
                    fetchHistory={fetchHistory}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    showLoader={showLoader}
                />
            </div>
            {showLoader ? <RetailerTableItem retailer={null} key={0} showLoader={true} /> : <></>}
            {history.length > 0 ? (showLoader ? <></> :
                history.map((retailer, index) => <RetailerTableItem retailer={retailer} key={index} fetchHistory={fetchHistory} />)
            ) : (showLoader ? <></> :
                <StyledCard>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} sx={{ p: theme => theme.spacing(2, 1) }}>
                        <Typography variant={"h1"}>Sorry, no records found</Typography>
                    </Stack>
                </StyledCard>
            )}
        </React.Fragment>
    );
};

export default RetailerTable;
