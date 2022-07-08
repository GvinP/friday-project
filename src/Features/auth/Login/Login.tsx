import React, {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useFormik} from "formik";
import {LoginParamsType} from "../../../api/api";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {loginTC} from "../../../app/reducers/auth-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../Navigation/Routes/RoutesList";
import s from "../../../Navigation/Navbar/Navbar.module.css";
import st from "./Login.module.css";
import Paper from '@mui/material/Paper';
import {Button, CssBaseline, IconButton, InputAdornment, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import style from "../../../app/App/App.module.css";

export const Login = () => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);

    const [passVisibility, setPassVisibility] = useState(false)

    const changeVisibility = useCallback(() => {
        setPassVisibility(!passVisibility)
    }, [passVisibility])

    const formik = useFormik
    ({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
        validate: (values) => {
            const errors: Partial<LoginParamsType> = {};
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
            return errors;
        }
    });


    if (isInitialized) {
        return <Navigate to={PATH.packs}/>;
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
                        Sign in
                    </Typography>
                    <FormControl>
                        <FormLabel>
                            <span>Need registration? </span>
                            <NavLink to={PATH.registration}
                                     className={s.signUp}>Sign Up</NavLink>
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


                            <div>
                                <NavLink to={PATH.passwordRecovery}
                                         className={st.forgot}>Forgot Password?</NavLink>
                            </div>

                            <FormControlLabel
                                label="Keep Me Signed In"
                                control={<Checkbox
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps("rememberMe")}
                                />}/>
                            <Typography mb={3} variant="caption">
                                For your security, we don't recommend checking this box if
                                you are using a public device.
                            </Typography>
                            <Button variant="outlined" type={"submit"} disabled={status}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Paper>
            </form>
        </Grid>
    )
}

