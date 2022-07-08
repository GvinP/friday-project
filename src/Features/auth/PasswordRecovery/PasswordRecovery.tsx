import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useFormik} from "formik";
import {RegisterParamType} from "../../../api/api";
import style from "../../../app/App/App.module.css";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {sendForgotPasswordTC} from "../../../app/reducers/passwordRecovery-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../Navigation/Routes/RoutesList";
import s from "../../../Navigation/Navbar/Navbar.module.css";
import st from "./PasswordRecovery.module.css";
import FormLabel from "@mui/material/FormLabel";


export const PasswordRecovery = () => {
    const dispatch = useAppDispatch();
    const email = useAppSelector(state => state.registrationManage.passwordRecovery.email);
    const status = useAppSelector(state => state.app.status);
    const formik = useFormik
    ({
        initialValues: {
            email: "",
        },
        onSubmit: values => {
            dispatch(sendForgotPasswordTC(values.email));
            formik.resetForm();
        },
        validate: (values) => {
            const errors: Partial<RegisterParamType> = {};
            if (!values.email) {
                errors.email = "email required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
    });

    if (email) {
        return <Navigate to={PATH.checkEmail}/>;
    }

    return <div className={style.smallContainer}>
        <h1>Cards</h1>
        <h2>Forgot your password</h2>
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <div className={style.formContainer}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <span>Did you remember your password? </span>
                                <NavLink to={PATH.login}
                                         className={s.signUp}>Sign In</NavLink>
                            </FormLabel>
                            <FormGroup>
                                <TextField label="Email"
                                           margin="normal"
                                           {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email &&
                                    <div style={{color: "red"}}>{formik.errors.email}</div>}
                                <div className={st.text}>
                                    <p>Enter your email address and we will send you further instructions</p>
                                </div>
                                <SuperButton disabled={status} type={"submit"}>
                                    Send instructions
                                </SuperButton>
                            </FormGroup>
                        </FormControl>
                    </form>
                </div>
            </Grid>
        </Grid>
    </div>;
};