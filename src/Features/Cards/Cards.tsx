import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate, useParams} from "react-router-dom";
import {
    addNewCardTC,
    deleteCardThunk,
    getCardsThunk, setCurrentPageAC, setOrderAC, setOrderByAC,
    setPackIdAC, setPageCountAC,
    updateCardThunk
} from "../../app/reducers/cards-reducer";
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
import {Button, ButtonProps, IconButton, styled} from "@mui/material";
import {EditAddModal} from "../../Modal/EditAddModal/EditAddModal";
import {NewCardDataType} from "../../api/cardsApi";
import {PATH} from "../../Navigation/Routes/RoutesList";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {lightBlue} from "@mui/material/colors";
import {DeleteModal} from "../../Modal/DeleteModal/DeleteModal";
import {DeleteCardModal} from "../../Modal/DeleteCardModal/DeleteCardModal";

type Order = "asc" | "desc";
const headCells = ['question', 'answer', 'updated', 'grade', 'actions']

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


export const Cards = () => {
    const user_id = useAppSelector(state => state.profile.user._id);
    const cards = useAppSelector(state => state.cards.cards);
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
    const {cardsPack_id} = useParams();
    const status = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const [order, setOrder] = useState<Order>("asc");
    const [cardId, setCardId] = useState<string>("");
    const orderBy = useAppSelector(state => state.cards.orderBy);
    const [currentPage, setCurrentPage] = useState(0);
    const page = useAppSelector(state => state.cards.page);
    const rowsPerPage = useAppSelector(state => state.cards.pageCount);
    const [answer, setAnswer] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeEditModal, setActiveEditModal] = useState<boolean>(false);
    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(setPackIdAC(cardsPack_id))
        }
        dispatch(getCardsThunk());
    }, [page, rowsPerPage, currentPage, order, orderBy]);

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_id as string,
            question: question,
            answer: answer,
        };
        dispatch(addNewCardTC(newCard));

    }, [dispatch, cardsPack_id, question, answer]);

    const deleteCard = () => {
        dispatch(deleteCardThunk(cardId))
        setActiveDeleteModal(false)
    }
    const deleteCardHandler = (cardId: string, question: string) => {
        setActiveDeleteModal(true)
        setQuestion(question)
        setCardId(cardId)
    }
    const editCardNameHandler = (cardId: string, question: string, answer: string) => {
        setActiveEditModal(true)
        setQuestion(question)
        setAnswer(answer)
        setCardId(cardId)
    }
    const editCardName = () => {
        dispatch(updateCardThunk(cardId, question, answer))
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        dispatch(setOrderAC(isAsc ? 0 : 1))
        dispatch(setOrderByAC(property))
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage)
        dispatch(setCurrentPageAC(newPage + 1))
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
        dispatch(setCurrentPageAC(0))
    };

    const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
        color: theme.palette.getContrastText(lightBlue[50]),
        backgroundColor: lightBlue[50],
        '&:hover': {
            backgroundColor: lightBlue[200],
        },
    }));


    if (!user_id) {
        return <Navigate to={PATH.login}/>;
    }
    return (
        <div className={style.cardsContainer}>
            <h2 className={style.pageTitle}>Cards Page</h2>
            <div className={style.addCardsBtn}>
                <ColorButton variant="contained" type={"submit"} disabled={status} onClick={() => setActiveModal(true)}
                             className={style.addCardsButton}>Add card</ColorButton>
            </div>
            <EditAddModal inputAnswer={answer} setInputAnswer={setAnswer} inputQuestion={question}
                          setInputQuestion={setQuestion} active={activeModal}
                          setActive={setActiveModal} setCard={addCardHandler}/>
            <EditAddModal inputAnswer={answer} setInputAnswer={setAnswer} inputQuestion={question}
                          setInputQuestion={setQuestion} active={activeEditModal}
                          setActive={setActiveEditModal} setCard={editCardName}/>
            <DeleteCardModal deleteCard={deleteCard} name={question} active={activeDeleteModal} setActive={setActiveDeleteModal}/>
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
                                                <IconButton aria-label="delete" disabled={status}
                                                            onClick={() => deleteCardHandler(row._id, row.question)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => editCardNameHandler(row._id, row.question, row.answer)}>
                                                    <EditIcon/>
                                                </IconButton>
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
                        page={currentPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
};
