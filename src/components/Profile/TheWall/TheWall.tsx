import s from "./TheWall.module.css";
import Post from "./Post/Post";
import { PostType } from "../../../types/types";

import { AddPostForm } from "./AddPostForm";
import { useSelector, useDispatch } from "react-redux";
import { AppStateType } from "../../../Redux/redux-store";
import { addPostThunk, deletePostThunk } from "../../../Redux/profileReducer";

const TheWall: React.FC = () => {
    const posts: PostType[] = useSelector((state: AppStateType) => state.profilePage.posts)
    const dispatch = useDispatch()

    let TheWallElement = [...posts].reverse().map(p => (
        <Post deletePost={(id) => dispatch(deletePostThunk(id))} userID={p.userID} key={p.id} id={p.id} message={p.message} like={p.like} />));

    const onSubmit = (values: any) => {
        dispatch(addPostThunk(values.newPostText))
    }
    return (
        <div>
            <div className={s.lineName}>The WALL</div>
            <AddPostForm onSubmit={onSubmit} />
            {TheWallElement}
        </div>
    )
}

export default TheWall;
