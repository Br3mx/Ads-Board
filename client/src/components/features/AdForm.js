import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLoggedUser } from "../../redux/userRedux";
import { addAd, fetchAds } from "../../redux/adsRedux";

const AdForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);

  const user = useSelector(getLoggedUser);
  console.log(user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("image", image);
    fd.append("user", user._id);
    fd.append("publishDate", publishDate);

    const option = {
      method: "POST",

      body: fd,
    };

    setStatus("loading");

    fetch(`${API_URL}/api/ads`, option)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
          navigate("/");
          dispatch(fetchAds());
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 401) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("serverError");
      });
    dispatch(addAd);
  };
  return (
    <div style={{ width: "70%" }} className="m-auto">
      <Form onSubmit={handleSubmit}>
        {status === "success" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been added the advert</p>
          </Alert>
        )}

        {status === "serverError" && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong!</Alert.Heading>
            <p>Unexpected error please try again</p>
          </Alert>
        )}

        {status === "clientError" && (
          <Alert variant="danger">
            <Alert.Heading>Not enough data</Alert.Heading>
            <p>You have to fill all the fields</p>
          </Alert>
        )}

        {status === "loginError" && (
          <Alert variant="warning">
            <Alert.Heading>You must be logged</Alert.Heading>
            <p>You have to login first</p>
          </Alert>
        )}

        {status === "loading" && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <Form.Group className="mb-4">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Content of the ad</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Published date</Form.Label>
          <DatePicker
            selected={publishDate}
            onChange={(date) => setPublishDate(date)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AdForm;
