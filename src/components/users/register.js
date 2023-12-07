import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const { currentUser, errorRegister } = useSelector((state) => state.users);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CRITIC");

  const [firstNameAlert, setFirstNameAlert] = useState(false);
  const [lastNameAlert, setLastNameAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState(false);
  const [errorRegisterAlert, setErrorRegisterAlert] = useState(false);

  const dispatch = useDispatch();
  const handleRegisterBtn = () => {
    setFirstNameAlert(false);
    setLastNameAlert(false);
    setUsernameAlert(false);
    setPasswordAlert(false);

    if (firstname === "") {
      setFirstNameAlert(true);
    } else if (lastname === "") {
      setLastNameAlert(true);
    } else if (username === "") {
      setUsernameAlert(true);
    } else if (password === "") {
      setPasswordAlert(true);
    } else {
      dispatch(
        registerThunk({
          firstName: firstname,
          lastName: lastname,
          username: username,
          email: email,
          password: password,
          role: role,
        })
      );
    }
    if (errorRegister) {
      setErrorRegisterAlert(true);
    }
  };
  const navigate = useNavigate();
  if (currentUser) {
    navigate("/profile");
  }

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4">Register</h2>

          <Alert
            variant="danger"
            onClose={() => setFirstNameAlert(false)}
            className={firstNameAlert ? "d-block" : "d-none"}
            dismissible
          >
            <span>Please enter a first name!</span>
          </Alert>
          <Alert
            variant="danger"
            onClose={() => setLastNameAlert(false)}
            className={lastNameAlert ? "d-block" : "d-none"}
            dismissible
          >
            <span>Please enter a last name!</span>
          </Alert>
          <Alert
            variant="danger"
            onClose={() => setUsernameAlert(false)}
            className={usernameAlert ? "d-block" : "d-none"}
            dismissible
          >
            <span>Please enter a username!</span>
          </Alert>
          <Alert
            variant="danger"
            onClose={() => setPasswordAlert(false)}
            className={passwordAlert ? "d-block" : "d-none"}
            dismissible
          >
            <span>Please enter a password!</span>
          </Alert>
          <Alert
            variant="danger"
            onClose={() => setErrorRegisterAlert(false)}
            className={errorRegister ? "d-block" : "d-none"}
            dismissible
          >
            <Alert.Heading>Username already taken!</Alert.Heading>
            <span>Please enter another username.</span>
          </Alert>

          {currentUser && <h1>Welcome user: {currentUser.username}</h1>}

          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="registerFirstName">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="registerLastName">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="registerUsername">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Form.Text className={"text-muted"}>
                Please enter a unique username. Username cannot be changed later on!
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                placeholder="Enter password"
                value={password}
                type={"password"}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" id="registerRoles">
              <Form.Label>Role</Form.Label>
              <Form.Check
                type={"radio"}
                name={"registerRolesRadio"}
                label={`Blogger`}
                value={"BLOGGER"}
                id={`registerRoleBlogger`}
                checked={role === "BLOGGER"}
                onChange={(event) => setRole(event.target.value)}
              />
              <Form.Check
                type={"radio"}
                name={"registerRolesRadio"}
                label={`Food Critic`}
                value={"CRITIC"}
                id={`registerRoleCritic`}
                checked={role === "CRITIC"}
                onChange={(event) => setRole(event.target.value)}
              />
              <Form.Check
                type={"radio"}
                name={"registerRolesRadio"}
                label={`Admin`}
                value={"ADMIN"}
                id={`registerRoleAdmin`}
                checked={role === "ADMIN"}
                onChange={(event) => setRole(event.target.value)}
              />
            </Form.Group>
            <Form.Text>
              Already have an account? <Link to={"/login"}>Login</Link>.
            </Form.Text>

            <Button
              className={"w-100 mt-3"}
              variant="primary"
              onClick={() => handleRegisterBtn()}
            >
              Create an account
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;

