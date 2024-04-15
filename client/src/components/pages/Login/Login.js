import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/userRedux.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null); // loading, success, clientError, serverError

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    };
    setStatus("loading");
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
          dispatch(logIn({ login }));
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };
  return (
    <Form className="col-12 col-sm-4 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4 text-center">Log in</h1>

      {status === "loading" && (
        <Spinner
          className="d-block mx-auto my-3"
          animation="border"
          role="status"
        >
          <span className="visually-hidden mx-auto">Loading...</span>
        </Spinner>
      )}

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Succes!</Alert.Heading>
          <p>You have been succesfully logged in</p>
        </Alert>
      )}

      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...!</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}
      {status === "loginError" && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Login or password are incorrect</p>
        </Alert>
      )}

      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="formLogin"
      >
        <Form.Label className="my-0" style={{ flex: "1 0 0" }}>
          Login
        </Form.Label>
        <Form.Control
          type="text"
          style={{ flex: "3 0 0" }}
          className="ms-2 shadow-none"
          placeholder="Enter login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="formPassword"
      >
        <Form.Label className="my-0" style={{ flex: "1 0 0" }}>
          Password
        </Form.Label>
        <Form.Control
          type="password"
          style={{ flex: "3 0 0" }}
          className="ms-2 shadow-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button className="my-2 w-100" variant="success" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
