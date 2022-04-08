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
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMesagge(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.staus(404).send('No post with that id');

    const updatedPost = await PostMesagge.findByIdAndUpdate(_id, post, { new: true })
    res.json(updatedPost)
}