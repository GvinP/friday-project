import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import {addCardThunk, deleteCardThunk, getCardsThunk, updateCardThunk} from "../../app/reducers/cards-reducer";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from "@mui/utils";
import {cardsApi} from "../../api/cardsApi";
import style from "./Cards.module.css"

interface Data {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    updated: string;
}

function createData(
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    updated: string
): Data {
    return {
        _id,
        cardsPack_id,
        user_id,
        question,
        answer,
        grade,
        updated
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
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
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
        id: "question",
        numeric: false,
        disablePadding: true,
        label: "questions",
    },
    {
        id: "answer",
        numeric: false,
        disablePadding: false,
        label: "answers",
    },
    {
        id: "updated",
        numeric: true,
        disablePadding: false,
        label: "lastUpdated",
    },
    {
        id: "grade",
        numeric: true,
        disablePadding: false,
        label: "grades",
    },
    {
        id: '_id',
        numeric: true,
        disablePadding: false,
        label: 'actions',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
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
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
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


export const Cards = () => {
    const user_id = useAppSelector(state => state.profile.user._id);
    const cards = useAppSelector(state => state.cards.cards);
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
    const {cardsPack_id} = useParams();
    const dispatch = useAppDispatch();
    const rows = cards.map(el => createData(el._id, el.cardsPack_id, el.user_id, el.answer, el.question, el.grade, el.updated));
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Data>("updated");
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsThunk(cardsPack_id, rowsPerPage, page + 1));
        }
    }, [rowsPerPage, page]);

    const addCard = () => {
        if (cardsPack_id) {
            dispatch(addCardThunk(cardsPack_id, 'question5', 'answer5'))
            dispatch(getCardsThunk(cardsPack_id, rowsPerPage, page + 1))
        }

    }
    const deleteCard = (cardId: string) => {
        if (cardsPack_id) {
            dispatch(deleteCardThunk(cardId))
            dispatch(getCardsThunk(cardsPack_id, rowsPerPage, page + 1))
        }
    }
    const editCard = (cardId: string) => {
        if (cardsPack_id) {
            dispatch(updateCardThunk(cardId, 'newQuestion', 'newAnswer'))
            dispatch(getCardsThunk(cardsPack_id, rowsPerPage, page + 1))
        }
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.question);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    if (!user_id) {
        return <Navigate to={PATH.login}/>;
    }

    return (
        <div className={style.cardsContainer}>
            <h2 className={style.pageTitle}>Cards Page</h2>
            <button onClick={addCard} className={style.addCardsButton}>add card</button>
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 600}}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {rows.slice().sort(getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.question)}
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row._id}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.question}
                                                </TableCell>
                                                <TableCell align="left">{row.answer}</TableCell>
                                                <TableCell
                                                    align="right">{(new Date(row.updated)).toLocaleDateString()}</TableCell>
                                                <TableCell align="right">{row.grade}</TableCell>
                                                <TableCell align="right">
                                                    <button onClick={() => deleteCard(row._id)}>delete</button>
                                                    <button onClick={() => editCard(row._id)}>edit</button>
                                                </TableCell>
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
                        count={cardsTotalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
};
