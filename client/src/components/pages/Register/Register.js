import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("login", login);
    fd.append("password", password);
    fd.append("phoneNumber", phoneNumber);
    fd.append("avatar", avatar);

    const options = {
      method: "POST",
      body: fd,
    };

    setStatus("loading");
    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setStatus("success");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else setStatus("serverError");
      })
      .catch((err) => {
        setStatus("serverError");
      });
    console.log("RegData: ");
    console.log({ login, password, avatar, phoneNumber });
  };
  return (
    <Form
      className="col-12 col-xl-4 col-md-6 col-sm-6 mx-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="my-4 text-center">Register</h1>

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
          <p>
            You have been succesfully registered! <br /> You can now log in...
          </p>
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
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login.</p>
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

      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="formPhoneNumber"
      >
        <Form.Label className="my-0" style={{ flex: "1 0 0" }}>
          Phone number
        </Form.Label>
        <Form.Control
          type="text"
          style={{ flex: "3 0 0" }}
          className="ms-2 shadow-none"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="formFile"
      >
        <Form.Label className="my-0" style={{ flex: "1 0 0" }}>
          Avatar
        </Form.Label>
        <Form.Control
          type="file"
          style={{ flex: "3 0 0" }}
          className="ms-2 shadow-none"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </Form.Group>

      <Button className="w-100" variant="success" type="submit">
        Sign up
      </Button>
    </Form>
  );
};

export default Register;
