// import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import '../../App.css';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import memories from '../../images/memories.png'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts.js'
import Navbar from '../Navbar/Navbar';
const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])
    return (
        <Container maxidth="lg">
            <Navbar />
            <Grow in>
                <Container>
                    <Grid container justyf='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default Home;
