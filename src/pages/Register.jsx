import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/client";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (email, password, username, firstName, lastName) => {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (!error && user) {
      const profileData = {
        id: user.id,
        username,
        email,
        first_name: firstName,
        last_name: lastName,
      };
      await supabase.from("profiles").insert(profileData);
      console.log(error);
    }
    return { user, error };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value ||
      !usernameRef.current?.value ||
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      );
      console.log(data);
      console.log(error);
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group if="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
            </Form.Group>
            <Form.Group if="first-name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group if="last-name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible
              >
                {errorMsg}
              </Alert>
            )}
            {msg && (
              <Alert variant="success" onClose={() => setMsg("")} dismissible>
                {msg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-50">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already a User? <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
};

export default Register;
