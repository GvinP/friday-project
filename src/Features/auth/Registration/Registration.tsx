import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useFormik} from "formik";
import style from "../../../app/App/App.module.css";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import React, {useCallback, useState} from "react";
import {registerTC} from "../../../app/reducers/registration-reducer";
import {RegisterParamType} from "../../../api/api";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../Navigation/Routes/RoutesList";
import s from "../../../Navigation/Navbar/Navbar.module.css";
import FormLabel from "@mui/material/FormLabel";
import {Button, CssBaseline, IconButton, InputAdornment, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export const Registration = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const isRegister = useAppSelector(state => state.registrationManage.registration.isRegister);
    const [passVisibility, setPassVisibility] = useState(false)

    const changeVisibility = useCallback(() => {
        setPassVisibility(!passVisibility)
    }, [passVisibility])

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
            } else if (values.password.trim().length < 8) {
                errors.password = "Password should be more than 7 symbols ";
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

    return (
        <Grid item justifyContent={"center"}>

            <form onSubmit={formik.handleSubmit}>
                <Paper elevation={6} className={style.smallContainer}>
                    <CssBaseline/>
                    <Typography m={1} variant="h4">
                        Cards
                    </Typography>
                    <Typography m={3} variant="h6">
                        Sign up
                    </Typography>
                    <FormControl>
                        <FormLabel>
                            <span>Have an account? </span>
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
                            <TextField label="Password"
                                       margin="normal"
                                       type={passVisibility ? 'text' : 'password'}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={changeVisibility}
                                                   edge="end">
                                                   {passVisibility ? <Visibility/> : <VisibilityOff/>}
                                               </IconButton>
                                           </InputAdornment>,
                                       }}
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                            <TextField label="Confirm Password"
                                       margin="normal"
                                       type={passVisibility ? 'text' : 'password'}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={changeVisibility}
                                                   edge="end">
                                                   {passVisibility ? <Visibility/> : <VisibilityOff/>}
                                               </IconButton>
                                           </InputAdornment>,
                                       }}
                                       {...formik.getFieldProps("confirmPassword")}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}
                            <Button variant="outlined" type={"submit"} disabled={status}>
                                Register
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Paper>
            </form>

        </Grid>

    )
};