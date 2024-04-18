import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";

import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  

  const handleChange = (event) => {
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

  const handleRemoveImage = () => {
    setPostData({
      ...postData,
      image: "",
    });
  };

  return (
    <Form>
      <Container>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <div className="text-center">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    value={content}
                    onChange={handleChange}
                  />
                </Form.Group>
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
                />
              </Form.Group>
              <div className="mt-3">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  onClick={() => {}}
                >
                  cancel
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  type="submit"
                >
                  create
                </Button>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PostCreateForm;
