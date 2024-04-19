import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    dislike_id,
    dislikes_count,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const maxRows = 1; // Maximum number of rows to display initially
  const [expanded, setExpanded] = useState(false);

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

  const handleRemoveDislike = async () => {
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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderContent = () => {
    const contentRows = content.split('\n');
    if (contentRows.length > maxRows && !expanded) {
      return (
        <>
          {contentRows.slice(0, maxRows).join('\n')}
          <Link to="#" onClick={toggleExpand}>Read More</Link>
        </>
      );
    } else {
      return content;
    }
  };

  return (
    <Card className={styles.Post}>
      <div className={styles.avatarContainer}>
        <Link to={`/profiles/${profile_id}`} className={styles.avatarLink}>
          <Avatar src={profile_image} height={35} />
          <div>
            <span>{owner}</span>
            <span>{updated_at}</span>
          </div>
        </Link>
      </div>
      <div className={styles.imageAndContent}>
        <div className={styles.textContent}>
          {title && <Card.Title className={styles.title}>{title}</Card.Title>}
          {content && <Card.Text className={styles.contentText}>{renderContent()}</Card.Text>}
          <div className={styles.PostBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <i className="fas fa-thumbs-up" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fas fa-thumbs-up ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`fas fa-thumbs-up ${styles.HeartOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="fas fa-thumbs-up" />
              </OverlayTrigger>
            )}
            {likes_count}
            {/* Dislike button */}
            {dislike_id ? (
              <span onClick={handleRemoveDislike}>
                <i className={`fas fa-thumbs-down ${styles.Dislike}`} />
              </span>
            ) : (
              <span onClick={handleDislike}>
                <i className={`far fa-thumbs-down ${styles.DislikeOutline}`} />
              </span>
            )}
            {/* Dislikes count */}

            <Link to={`/posts/${id}`}>
              <i className="far fa-comments" />
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
