import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Image, Alert } from "react-bootstrap";

import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import FormTagsField from "../../components/FormTagsField";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    tags: [],
  });
  const { title, content, image, tags } = postData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const [initialTags, setInitialTags] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosReq.get(`/posts/${id}`);
        const data = response.data;
        const { title, content, tags_data, image, is_owner } =
          data;

        is_owner ? setPostData({ title, content, image }) : history.push("/");

        if (tags_data.length > 0) {
          const fetchedTags = [];
          for (let tag of tags_data) {
            fetchedTags.push(tag.name);
          }
          setInitialTags(fetchedTags);
        }

        setPostData((prevData) => ({
          ...prevData,
          title,
          content,
          image,
        }));

        setHasLoaded(true);
      } catch (error) {}
    };

    setHasLoaded(false);

    fetchPost();
  }, [id, history]);

  const handleTagsChange = (newTags) => {
    setPostData((prevPostData) => ({
      ...prevPostData,
      tags: newTags,
    }));
  };


  const handleChangeField = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const createTags = async (tags) => {
    const userAddedTags = [];

    for (let tag of tags) {
      try {
        const response = await axiosReq.get(`/tags/?search=${tag}`);

        if (response.data.results && response.data.results.length > 0) {
          const exactMatch = response.data.results.find(
            (foundTag) => foundTag.name === tag
          );

          if (exactMatch) {
            userAddedTags.push(exactMatch);
          } else {
            const response = await axiosReq.post("/tags/", { name: tag });
            userAddedTags.push(response.data);
          }
        } else {
          const response = await axiosReq.post("/tags/", { name: tag });
          userAddedTags.push(response.data);
        }
      } catch (error) {}
    }

    return userAddedTags;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
  
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
  }
  
    try {
      if (tags) {
        const tagsResponse = await createTags(tags);
        tagsResponse.forEach((tag) => {
          if (tag.id) {
            formData.append("tags", tag.id);
          }
        });
      }
  
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const handleRemoveImage = () => {
    setPostData({
      ...postData,
      image: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {hasLoaded ? (
          <>
      <Container>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <div className="text-center">
              <Form.Group controlId="title">
                <Form.Label className="d-none">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={title}
                  onChange={handleChangeField}
                  aria-label="Title"
                />
              </Form.Group>
              {!title &&
                errors.title?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <Form.Group controlId="content">
                  <Form.Label className="d-none">Text</Form.Label>
                  <Form.Control
                    aria-label="Text"
                    as="textarea"
                    placeholder="Text (Optional)"
                    name="content"
                    value={content}
                    rows={5}
                    onChange={handleChangeField}
                  />
                </Form.Group>
                {errors.content?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <FormTagsField 
                initialTags={initialTags}
                handleTagsChange={handleTagsChange} />
                {errors.tags?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </div>
            </Container>
          </Col>
          <Col md={5} lg={4} className="py-2 p-0 p-md-2">
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center align-items-center`}
            >
              <Form.Group className="text-center">
                {image && (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div className="mt-3">
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </Form.Label>
                    </div>
                  </>
                )}
                {!image && (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload an image"
                    />
                  </Form.Label>
                )}
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div className="mt-3">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      </>
      ) : (
        <Asset spinner />
      )}
    </Form>
  );
};

export default PostEditForm;
