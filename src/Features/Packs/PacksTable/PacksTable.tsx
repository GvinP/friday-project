import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import SchoolIcon from "@mui/icons-material/School";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import {visuallyHidden} from "@mui/utils";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {NavLink, useNavigate} from "react-router-dom";
import {
    changeCardsPackNameThunk,
    deleteCardsPackThunk,
    setCurrentPageCardPacksAC, setPackOrderAC, setPackOrderByAC, setPageCountAC, setSearchResultAC
} from "../../../app/reducers/packs-reducer";
import {IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import {DeleteModal} from "../../../Modal/DeleteModal/DeleteModal";
import {useState} from "react";
import {ChangeNamePackModal} from "../../../Modal/ChangeNamePackModal/ChangeNamePackModal";
import {PATH} from "../../../Navigation/Routes/RoutesList";
import {setLearnPackNameAC} from "../../../app/reducers/learnReducer";

type Order = "asc" | "desc";
const headCells = ["name", "cardsCount", "created", "updated", "actions"];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
    headCells: Array<string>;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort, headCells} = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell}
                        align={"center"}
                        padding="normal"
                        sortDirection={orderBy === headCell ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell}
                            direction={orderBy === headCell ? order : "asc"}
                            onClick={createSortHandler(headCell)}
                        >
                            {headCell}
                            {orderBy === headCell ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function PacksTable() {

    const status = useAppSelector(state => state.app.status);
    const packs = useAppSelector(state => state.packs.cardPacks);
    const userId = useAppSelector(state => state.auth._id);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
    const pageCount = useAppSelector(state => state.packs.pageCount);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [order, setOrder] = React.useState<Order>("asc");
    const orderBy = useAppSelector(state => state.packs.orderBy);
    const [id, setId] = useState<string>("");
    const [activeDeleteModal, setActiveDeleteModal] = useState(false);
    const [activeChangeNamePackModal, setActiveChangeNamePackModal] = useState(false);
    const [name, setName] = useState<string>("");

    const deletePack = () => {
        dispatch(deleteCardsPackThunk(id));
        setActiveDeleteModal(false);
    };

    const learnHandler = (id: string, name: string) => {
        dispatch(setLearnPackNameAC(name));
        navigate(PATH.learn + id);
    };

    const deletePackCardsHandler = (id: string, name: string) => {
        dispatch(setSearchResultAC(""));
        setActiveDeleteModal(true);
        setId(id);
        setName(name);
    };

    const changeCardsPackNameHandler = (packId: string, name: string) => {
        setActiveChangeNamePackModal(true);
        setId(packId);
        setName(name);
    };

    const changeCardsPackName = () => {
        dispatch(changeCardsPackNameThunk(id, name));
        setActiveChangeNamePackModal(false);
    };

    const onFocusHandler = () => {
        name ? setName(name) : setName("Name");
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        dispatch(setPackOrderAC(isAsc ? 0 : 1));
        dispatch(setPackOrderByAC(property));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
        dispatch(setCurrentPageCardPacksAC(newPage + 1));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)));
    };

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));
    return (
        <Box sx={{width: "100%"}}>
            <Paper sx={{width: "100%", mb: 2}}>
                <TableContainer>
                    <Table sx={{minWidth: 600}} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {packs.map((row, index) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        tabIndex={-1}
                                        key={row._id}
                                    >
                                        <TableCell align="center" sx={{overflowWrap: "anywhere"}}>
                                            <NavLink to={`/cards/${row._id}`}>{row.name}</NavLink>
                                        </TableCell>
                                        <TableCell align="center">{row.cardsCount}</TableCell>
                                        <TableCell
                                            align="center">{(new Date(row.created)).toLocaleDateString()}</TableCell>
                                        <TableCell
                                            align="center">{(new Date(row.updated)).toLocaleDateString()}</TableCell>
                                        {userId === row.user_id
                                            ? <TableCell align="center">
                                                <IconButton aria-label="delete" disabled={status}
                                                            onClick={() => deletePackCardsHandler(row._id, row.name)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => changeCardsPackNameHandler(row._id, row.name)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => learnHandler(row._id, row.name)}>
                                                    <SchoolIcon/>
                                                </IconButton>
                                            </TableCell>
                                            : <TableCell align="center">
                                                <IconButton onClick={() => learnHandler(row._id, row.name)}>
                                                    <SchoolIcon/>
                                                </IconButton>
                                            </TableCell>}
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={cardPacksTotalCount}
                    rowsPerPage={pageCount}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <DeleteModal active={activeDeleteModal}
                         setActive={setActiveDeleteModal}
                         name={name}
                         deletePack={deletePack}
            />
            <ChangeNamePackModal active={activeChangeNamePackModal}
                                 setActive={setActiveChangeNamePackModal}
                                 name={name}
                                 inputValue={name}
                                 setInputValue={setName}
                                 inputFocus={onFocusHandler}
                                 savePack={changeCardsPackName}
            />
        </Box>
    );
}



