import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./users-thunk";
import { Navigate, useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const { currentUser, errorLogin } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameAlert, setUsernameAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [loginErrorAlert, setLoginErrorAlert] = useState(false);

  const dispatch = useDispatch();

  if (currentUser) {
    return <Navigate to={"/profile"} />;
  }

  const handleLoginBtn = () => {
    setUsernameAlert(false);
    setPasswordAlert(false);
    setLoginErrorAlert(false);

    if (username === "") {
      setUsernameAlert(true);
    } else if (password === "") {
      setPasswordAlert(true);
    } else {
      try {
        dispatch(loginThunk({ username, password }));
      } catch (e) {
        alert("Something went wrong. Please try again.");
      }
      if (errorLogin) {
        setLoginErrorAlert(true);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>

          <Alert
            variant="danger"
            onClose={() => setUsernameAlert(false)}
            show={usernameAlert}
            dismissible
          >
            <span>Please enter a username!</span>
          </Alert>
          <Alert
            variant="danger"
            onClose={() => setPasswordAlert(false)}
            show={passwordAlert}
            dismissible
          >
            <span>Please enter a password!</span>
          </Alert>
          <Alert
            variant="danger"
            onClose={() => setLoginErrorAlert(false)}
            show={loginErrorAlert}
            dismissible
          >
            <Alert.Heading>Unable to Login</Alert.Heading>
            <span>Username/Password incorrect!</span>
          </Alert>

          <Form>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                placeholder="Enter password"
                type={"password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Text>
              Don't have an account? <Link to={"/register"}>Register</Link>.
            </Form.Text>

            <Button
              variant="primary"
              className={"w-100 mt-3"}
              onClick={() => handleLoginBtn()}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

