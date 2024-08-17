import React, { useEffect, useState } from 'react';
// import RetailerTableItem, {StyledCard} from './RetailerTableItem';
import { Typography, TablePagination, Stack } from "@mui/material";
import useAPI from 'app/hooks/useApi';
import useToast from 'app/hooks/useToast';
import AgronomistTableHeader from './AgronomistTableHeader';
import AgronomistList from './AgronomistList';
import { StyledCard } from '../Retailers/RetailerTableItem';

const AgronomistTable = () => {

    const { POST, GET } = useAPI();
    const [page, setPage] = useState(0);
    const [history, setHistory] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');

    const fetchHistory = async(limit = 10, page = 0, search = '', path) => {
        try{
            setShowLoader(true);
            const response = await GET('/agronomist');
            setShowLoader(false);
            if(response && response.records) {
                setUsers(response.records);
                setPage(response.page - 1);
                setTotalCount(response.count);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchHistory(rowsPerPage, page, searchValue);
    }, [searchValue]);

    useEffect(() => {
        setPage(0);
        setSearchValue('');
        setRowsPerPage(10);
        fetchHistory(10, 0, '');
    }, []);

    return (
        <React.Fragment>
            <Typography variant={'h2'} mb={3}>Agronomist</Typography>
            <div style={{ marginBottom: '8px' }}>
                <AgronomistTableHeader
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
            {showLoader ? <AgronomistList users={null} key={0} showLoader={true} /> : <></>}
            {users.length > 0 ? (showLoader ? <></> :
               <AgronomistList users={users}/>
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

export default AgronomistTable;
