import React from 'react'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useFormik} from "formik";
import {registerTC} from "../../bll/reducers/registration-reducer";
import {RegisterParamType} from "../../api/api";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesList";
import style from "../../App.module.css";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import SuperButton from "../../common/SuperButton/SuperButton";

const NewPassword = () => {

    return <div>
        New password
    </div>
}
export default NewPassword