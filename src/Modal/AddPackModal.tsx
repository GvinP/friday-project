import {ModalMUI} from "./ModalMUI";
import {Button} from "@mui/material";

export const AddPackModal = () => {
    return (
        <ModalMUI children={

            <div>
                <h1>AddPack</h1>
                <h1>modal...</h1>
                <Button variant={'outlined'}>add</Button>
            </div>}/>
    )
}