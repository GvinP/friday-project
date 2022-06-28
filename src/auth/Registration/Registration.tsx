import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useFormik} from "formik";
import style from "../../App.module.css";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import SuperButton from "../../common/SuperButton/SuperButton";
import React from "react";
import {registerTC} from "../../bll/reducers/registration-reducer";
import {RegisterParamType} from "../../api/api";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../routes/RoutesList";
import s from "../../Navbar/Navbar.module.css";
import FormLabel from "@mui/material/FormLabel";
import {InputPassword} from "../../common/InputPassword/InputPassword";


export const Registration = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const isRegister = useAppSelector(state => state.registrationManage.registration.isRegister);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: values => {
            dispatch(registerTC(values));
            formik.resetForm();
        },
        validate: (values) => {
            const errors: Partial<RegisterParamType> = {};
            if (!values.email) {
                errors.email = "email required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "password required";
            } else if (values.password.trim().length < 4) {
                errors.password = "Password should be more than 3 symbols ";
            }
            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords do not match";
            }
            return errors;
        },
    });

    if (isRegister) {
        return <Navigate to={PATH.login}/>;
    }


    return <div className={style.smallContainer}>
        <h1>Cards</h1>
        <h2>Sign up</h2>
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <div className={style.formContainer}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <span>already have an account? </span>
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
                                <InputPassword
                                    placeholder={"Password"}
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.touched.password && formik.errors.password &&
                                    <div style={{color: "red"}}>{formik.errors.password}</div>}
                                <InputPassword
                                    placeholder={"Confirm password"}
                                    {...formik.getFieldProps("confirmPassword")}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                    <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}
                                <SuperButton disabled={status === 'loading'} type={"submit"}>
                                    Register
                                </SuperButton>
                            </FormGroup>
                        </FormControl>
                    </form>
                </div>
            </Grid>
        </Grid>
    </div>;
};