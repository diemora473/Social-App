import mongoose from "mongoose";
import PostMesagge from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMesagge.find()

        // console.log(postMessage)

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const getPostsBySearch = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMesagge({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    // if (Date.now() >= exp * 1000) {
    //     return false;
    // }
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMesagge.findByIdAndUpdate(id, { ...post, id }, { new: true })
    res.json(updatedPost)
}
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMesagge.findByIdAndRemove(id);
    res.json({ message: 'Post deleted success' })
}
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Like a the post')
    const post = await PostMesagge.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes?.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMesagge.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost)
}