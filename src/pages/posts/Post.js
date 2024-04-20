import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    dislikes_count,
    like_id,
    dislike_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    try {
      const { data } = await axiosRes.post("/dislikes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, dislikes_count: post.dislikes_count + 1, dislike_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUndislike = async () => {
    try {
      await axiosRes.delete(`/dislikes/${dislike_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, dislikes_count: post.dislikes_count - 1, dislike_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <div className={styles.avatarContainer}>
        {currentUser?.username === owner && postPage && (
          <MoreDropdown
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
        <Link to={`/profiles/${profile_id}`} className={styles.avatarLink}>
          <Avatar src={profile_image} height={30} />
          <div>
            <span style={{ fontSize: '15px' }}>{owner}</span>
            <span style={{ fontSize: '15px' }}>{updated_at}</span>
          </div>
        </Link>
      </div>
      <div className={styles.imageAndContent}>
        <div className={styles.textContent}>
          {title && <Card.Title className={styles.title}>{title}</Card.Title>}
          {content && <Card.Text className={styles.contentText}>{content}</Card.Text>}
          <div className={styles.PostBar}>
            {/* Like button */}
            {like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fas fa-thumbs-up ${styles.Heart} ${styles.smallIcon}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`fas fa-thumbs-up ${styles.HeartOutline} ${styles.smallIcon}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className={`fas fa-thumbs-up ${styles.smallIcon}`} />
              </OverlayTrigger>
            )}
            {likes_count}

            {/* Dislike button */}
            {dislike_id ? (
              <span onClick={handleUndislike}>
                <i className={`fas fa-thumbs-down ${styles.Heart} ${styles.smallIcon}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleDislike}>
                <i className={`fas fa-thumbs-down ${styles.HeartOutline} ${styles.smallIcon}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to dislike posts!</Tooltip>}
              >
                <i className={`fas fa-thumbs-down ${styles.smallIcon}`} />
              </OverlayTrigger>
            )}
            {dislikes_count}

            {/* Comments */}
            <Link to={`/posts/${id}`} className={styles.customMargin}>
              <i className={`far fa-comments ${styles.smallIcon}`} />
            </Link>
            {comments_count} comments
          </div>
        </div>
        <Link to={`/posts/${id}`} className={styles.imageLink}>
          <Card.Img src={image} alt={title} className={styles.image} />
        </Link>
      </div>
    </Card>
  );
};

export default Post;
