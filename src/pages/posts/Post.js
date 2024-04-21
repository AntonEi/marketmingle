import React, { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Import the images
import like1 from "../../assets/like1.png";
import like2 from "../../assets/like2.png";
import like3 from "../../assets/like3.png";
import dislike1 from "../../assets/dislike1.png";
import dislike2 from "../../assets/dislike2.png";
import dislike3 from "../../assets/dislike3.png";
import likeIcon from "../../assets/like.png";
import dislikeIcon from "../../assets/dislike.png";

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
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [likeImage, setLikeImage] = useState(likeIcon);
  const [dislikeImage, setDislikeImage] = useState(dislikeIcon);
  const [liked, setLiked] = useState(like_id ? true : false);
  const [disliked, setDisliked] = useState(dislike_id ? true : false);

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
      setLikeClicked(!likeClicked); // Toggle the likeClicked state
      setTimeout(() => setLikeClicked(false), 1500); // Reset likeClicked after 1.5 seconds
      if (!liked) {
        setLikeImage(like1);
        setTimeout(() => setLikeImage(like2), 500);
        setTimeout(() => setLikeImage(like3), 1000);
        const { data } = await axiosRes.post("/likes/", { post: id });
        setLiked(true);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
              : post;
          }),
        }));
      } else {
        setLikeImage(likeIcon); // Set back to default icon
        await axiosRes.delete(`/likes/${like_id}/`);
        setLiked(false);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, like_id: null }
              : post;
          }),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    try {
      setDislikeClicked(!dislikeClicked); // Toggle the dislikeClicked state
      setTimeout(() => setDislikeClicked(false), 1500); // Reset dislikeClicked after 1.5 seconds
      if (!disliked) {
        setDislikeImage(dislike1);
        setTimeout(() => setDislikeImage(dislike2), 500);
        setTimeout(() => setDislikeImage(dislike3), 1000);
        const { data } = await axiosRes.post("/dislikes/", { post: id });
        setDisliked(true);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, dislikes_count: post.dislikes_count + 1, dislike_id: data.id }
              : post;
          }),
        }));
      } else {
        setDislikeImage(dislikeIcon); // Set back to default icon
        await axiosRes.delete(`/dislikes/${dislike_id}/`);
        setDisliked(false);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, dislikes_count: post.dislikes_count - 1, dislike_id: null }
              : post;
          }),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Set initial like image based on liked state
    if (liked) {
      setLikeImage(like3);
    }
  }, [liked]);

  useEffect(() => {
    // Set initial dislike image based on disliked state
    if (disliked) {
      setDislikeImage(dislike3);
    }
  }, [disliked]);

  const postBorderColor = likes_count > dislikes_count ? styles.greenBorder : dislikes_count > likes_count ? styles.redBorder : '';

  return (
    <Card className={`${styles.Post} ${postBorderColor}`}>
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
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Are you Bullish?!</Tooltip>}
            >
              <img src={likeImage} alt="Like" className={styles.smallpictures} onClick={handleLike} />
            </OverlayTrigger>
            {likes_count}

            {/* Dislike button */}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Are you Bearish?!</Tooltip>}
            >
              <img src={dislikeImage} alt="Dislike" className={styles.smallpictures} onClick={handleDislike} />
            </OverlayTrigger>
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
