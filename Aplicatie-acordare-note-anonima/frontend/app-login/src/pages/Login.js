import {StyledformArea, StyledFormButton, StyledTitle, colors, Avatar, ButtonGroup, ExtraText, TextLink } from "./../components/Styles"; 
import Logo from "./../assets/login.png";
import { Formik, Form, useFormik } from "formik";
import { TextInput } from "./../components/FormLib";
import {FiMail, FiLock} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const Login = ({setUserJWT}) => {
    const [error, setError] = useState('');
    const { handleChange, values } = useFormik({
        initialValues: {
            email: "",
            password: ""
        }
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const SERVER = 'http://localhost:5050/users/login';
            await fetch(SERVER, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({email: values.email, password: values.password})
            })
            .then(response => {
                if (response.status >= 400 && response.status <= 500) {
                    response.json().then(res => setError(res.message));
                }
                if (response.status >= 200 && response.status < 300) {
                    setError('');
                    response.json().then(res => { 
                        localStorage.setItem('jwt', res.token); 
                        setUserJWT(res.token);
                        navigate('/uploadProject'); 
                    });
                }
            });            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <StyledformArea>
                <Avatar image={Logo}/>
                <StyledTitle color={colors.theme} size={34}>Login Section</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="example@gmail.com"
                                onChange={handleChange}
                                value={values.email}
                                icon={<FiMail/>}
                            />

                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="********"
                                onChange = {handleChange}
                                value = {values.password}
                                icon={<FiLock/>}
                            />

                            <ButtonGroup>
                                <StyledFormButton type="submit">Login</StyledFormButton> 
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Dont't have an account? <TextLink to="/signup">Sign up now</TextLink>
                </ExtraText>
            </StyledformArea>
        </div>

    );
}

export default Login;