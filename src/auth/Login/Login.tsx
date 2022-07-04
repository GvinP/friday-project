import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useFormik} from "formik";
import {LoginParamsType} from "../../api/api";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {loginTC} from "../../app/reducers/auth-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import s from "../../Navigation/Navbar/Navbar.module.css";
import st from "./Login.module.css";
import style from "../../app/App/App.module.css";
import SuperButton from "../../common/SuperButton/SuperButton";
import {InputPassword} from "../../common/InputPassword/InputPassword";


export const Login = () => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const user_ID = useAppSelector(state => state.profile.user._id);

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
    })

    if (user_ID) {
        return <Navigate to={PATH.packs}/>;
    }

    return <div className={style.smallContainer}>
        <h1>Cards</h1>
        <h2>Sign in</h2>
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <div className={style.formContainer}>
                    <form onSubmit={formik.handleSubmit}>
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

                                <InputPassword
                                    placeholder={"Password"}
                                    {...formik.getFieldProps("password")}
                                />

                                {formik.touched.password && formik.errors.password &&
                                    <div style={{color: "red"}}>{formik.errors.password}</div>}


                                <div>
                                    <NavLink to={PATH.passwordRecovery}
                                             className={st.forgot}>Forgot Password?</NavLink>
                                </div>

                                <FormControlLabel
                                    className={st.remember}
                                    label={"Keep Me Signed In"}
                                    control={<Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps("rememberMe")}
                                    />}/>
                                <div className={st.recommend}>For your security, we don't recommend checking this box if
                                    you are using a public device.
                                </div>
                                <SuperButton type={'submit'} disabled={status === 'loading'}>
                                    Login
                                </SuperButton>
                            </FormGroup>
                        </FormControl>
                    </form>
                </div>
            </Grid>
        </Grid>
    </div>
}

