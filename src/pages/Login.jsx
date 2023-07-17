import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        return;
      }
      const {
        data: { user, session },
        error,
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to view your acccount." />
        <link rel="canonical" href="/login" />
      </Helmet>
      <div className="login-container">
        <SvgBackground />
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
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
              <div className="text-center mt-2">
                <Button disabled={loading} type="submit" className="w-50">
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            New User? <Link to={"/register"}>Register</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Forgot Password? <Link to={"/passwordreset"}>Click Here</Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;

const SvgBackground = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100%"
      height="100%"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="bg">
          <stop
            offset="0%"
            style={{ stopColor: "rgba(130, 158, 249, 0.06)" }}
          ></stop>
          <stop
            offset="50%"
            style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}
          ></stop>
          <stop
            offset="100%"
            style={{ stopColor: "rgba(115, 209, 72, 0.2)" }}
          ></stop>
        </linearGradient>
        <path
          id="wave"
          fill="url(#bg)"
          d="M-363.852,502.589c0,0,236.988-41.997,505.475,0 s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
        />
      </defs>
      <g>
        <use xlinkHref="#wave" opacity=".3">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="10s"
            calcMode="spline"
            values="270 230; -334 180; 270 230"
            keyTimes="0; .5; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        <use xlinkHref="#wave" opacity=".6">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="8s"
            calcMode="spline"
            values="-270 230;243 220;-270 230"
            keyTimes="0; .6; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        <use xlinkHref="#wave" opacity=".9">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="6s"
            calcMode="spline"
            values="0 230;-140 200;0 230"
            keyTimes="0; .4; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
      </g>
    </svg>
  );
};
