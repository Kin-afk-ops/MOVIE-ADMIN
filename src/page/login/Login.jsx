import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./login.scss";
import { login } from "../../redux/apiCall";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, isSuccess } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = { username, password };

    login(dispatch, newForm);
  };

  return (
    <div className="loginWrapper">
      <div className="login">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isFetching}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
