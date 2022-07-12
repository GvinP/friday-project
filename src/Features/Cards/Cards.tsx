import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useParams} from "react-router-dom";
import {addNewCardTC, deleteCardThunk, getCardsThunk, updateCardThunk} from "../../app/reducers/cards-reducer";
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
import style from "./Cards.module.css";
import {Button} from "@mui/material";
import {EditAddModal} from "../../Modal/EditAddModal/EditAddModal";
import {NewCardDataType} from "../../api/cardsApi";

type Order = "asc" | "desc";
const headCells = ['questions', 'answers', 'last updated', 'grade', 'actions']

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
    headCells: Array<string>
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
                    <TableCell key={headCell}
                               align={"center"}
                               sortDirection={orderBy === headCell ? order : false}>
                        <TableSortLabel active={orderBy === headCell}
                                        direction={orderBy === headCell ? order : "asc"}
                                        onClick={createSortHandler(headCell)}>
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


export const CardsTable = () => {
    const user_id = useAppSelector(state => state.profile.user._id);
    const cards = useAppSelector(state => state.cards.cards);
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
    const {cardsPack_id} = useParams();
    const status = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<string>("questions");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [answer, setAnswer] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [activeModal, setActiveModal] = useState<boolean>(false);

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsThunk(cardsPack_id, rowsPerPage, page + 1));
        }
    }, [rowsPerPage, page]);

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_id as string,
            question: question,
            answer: answer,
        };
        dispatch(addNewCardTC(newCard));

    }, [dispatch, cardsPack_id, question, answer]);

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

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        alert(property + '  ' + isAsc)
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // if (!user_id) {
    //     return <Navigate to={PATH.login}/>;
    // }
    return (
        <div className={style.cardsContainer}>
            <h2 className={style.pageTitle}>Cards Page</h2>
            <Button variant="outlined" type={"submit"} disabled={status} onClick={() => setActiveModal(true)}
                    className={style.addCardsButton}>add card</Button>
            <EditAddModal inputAnswer={answer} setInputAnswer={setAnswer} inputQuestion={question}
                          setInputQuestion={setQuestion} active={activeModal}
                          setActive={setActiveModal} setCard={addCardHandler}/>

            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <TableContainer>
                        <Table sx={{minWidth: 600}} aria-labelledby="tableTitle">
                            <EnhancedTableHead order={order}
                                               orderBy={orderBy}
                                               onRequestSort={handleRequestSort}
                                               headCells={headCells}
                            />
                            <TableBody>
                                {cards.map((row, index) => {
                                    return (
                                        <TableRow hover key={index}>
                                            <TableCell align={"center"}>{row.question}</TableCell>
                                            <TableCell align="center">{row.answer}</TableCell>
                                            <TableCell
                                                align="center">{(new Date(row.updated)).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{row.grade}</TableCell>
                                            <TableCell align="center">
                                                {/*<button onClick={() => deleteCard(row._id)}>delete</button>*/}
                                                <button onClick={() => {
                                                }}>delete
                                                </button>
                                                {/*<button onClick={() => editCard(row._id)}>edit</button>*/}
                                                <button onClick={() => {
                                                }}>edit
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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
