import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import useStyles from './styles'
import { GoogleLogin } from 'react-google-login';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import { signin, signup } from '../../actions/auth'
import { useDispatch } from "react-redux";
import Input from "./Input";
import Icon from "./Icon";
import { useHistory } from 'react-router-dom'
const inicialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
    // const isSignup = true;
    const [showPassword, setShowPassword] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const [isSignup, setIsSignup] = useState(false)
    const classes = useStyles()
    const [formData, setFormData] = useState(inicialState)
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/home')
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure = () => {
        console.log('Google Sign In Was unsuccessful. Try Again Later')
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />

                </Avatar>
                <Typography variant='h5'>{isSignup ? "Sign Up" : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='first name' handleChange={handleChange} autoFocus half></Input>
                                <Input name='lastName' label='Last name' handleChange={handleChange} half></Input>
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}
                            type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId='602325921033-vsmgakujss2anr72mr9pdkr3sv085abo.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : 'Don´t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;