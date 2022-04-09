import React from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import useStyles from './styles'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
const Auth = () => {
    const isSignup = false;
    const classes = useStyles()
    const handleSubmit = () => {

    }
    const handleChange = () => {

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
                                <Grid xs={6} md={12}>

                                    <TextField name='firstName' label='first name' handleChange={handleChange} autoFocus xs={6}></TextField>
                                </Grid>
                                <Grid xs={6} md={12}>

                                    <TextField name='firstName' label='first name' handleChange={handleChange} autoFocus xs={6}></TextField>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;