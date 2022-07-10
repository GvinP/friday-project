import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import {visuallyHidden} from "@mui/utils";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {NavLink} from "react-router-dom";
import {
    changeCardsPackNameThunk,
    deleteCardsPackThunk,
    setCurrentPageCardPacksAC, setPageCountAC
} from "../../../app/reducers/packs-reducer";
import {IconButton} from "@mui/material";


interface Data {
    name: string;
    pack_id: string;
    user_id: string;
    cards: number;
    created: Date;
    updated: Date;
    actions: number;
}

function createData(
    name: string,
    pack_id: string,
    user_id: string,
    cards: number,
    created: Date,
    updated: Date,
    actions: number,
): Data {
    return {
        name,
        pack_id,
        user_id,
        cards,
        created,
        updated,
        actions,
    };
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string |Date},
    b: { [key in Key]: number | string |Date},
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
    },
    {
        id: "cards",
        numeric: true,
        disablePadding: false,
        label: "Cards count",
    },
    {
        id: "created",
        numeric: true,
        disablePadding: false,
        label: "Created",
    },
    {
        id: "updated",
        numeric: true,
        disablePadding: false,
        label: "Updated",
    },
    {
        id: "actions",
        numeric: true,
        disablePadding: false,
        label: "Actions",
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "center" : "left"}
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
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
    const packs = useAppSelector(state => state.packs.cardPacks);
    const userId = useAppSelector(state => state.auth._id)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const dispatch = useAppDispatch();
    const rows = packs.map(el => createData(el.name, el._id, el.user_id, el.cardsCount, el.created, el.updated, el.actions));
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("cards");

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };


    // const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected: readonly string[] = [];
    //
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //     setSelected(newSelected);
    // };

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setCurrentPageCardPacksAC(newPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const rowsPerPage = 5
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: "100%"}}>
            <Paper sx={{width: "100%", mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 600}}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows.slice().sort(getComparator(order, orderBy))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    const deleteCardsPackHandler = (packId: string) => {
                                        dispatch(deleteCardsPackThunk(packId));
                                    };

                                    const changeCardsPackNameHandler = (packId: string) => {
                                        dispatch(changeCardsPackNameThunk(packId));
                                    };

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.pack_id)}
                                            tabIndex={-1}
                                            key={row.pack_id}
                                        >

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding='normal'
                                                sx={{ overflowWrap: "anywhere"}}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.cards}</TableCell>
                                            <TableCell
                                                align="center">{(new Date(row.created)).toLocaleDateString()}</TableCell>
                                            <TableCell
                                                align="center">{(new Date(row.updated)).toLocaleDateString()}</TableCell>
                                            {userId === row.user_id
                                            ? <TableCell align="center" >
                                                <IconButton aria-label="delete"
                                                            onClick={() => deleteCardsPackHandler(row.pack_id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => changeCardsPackNameHandler(row.pack_id)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <NavLink to={`/cards/${row.pack_id}`}>
                                                    <IconButton>
                                                        <CreditCardIcon/>
                                                    </IconButton>
                                                </NavLink>
                                            </TableCell>
                                            : <TableCell align="center">
                                                    <NavLink to={`/cards/${row.pack_id}`}>
                                                        <IconButton>
                                                            <CreditCardIcon/>
                                                        </IconButton>
                                                    </NavLink>
                                                </TableCell>}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={cardPacksTotalCount}
                    rowsPerPage={pageCount}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}



