import {StyledformArea, StyledFormButton, StyledTitle, colors, Avatar, ButtonGroup, ExtraText, TextLink } from "./../components/Styles"; 
import Logo from "./../assets/login.png";
import { Formik, Form, useFormik } from "formik";
import { TextInput } from "./../components/FormLib";
import {FiMail, FiLock, FiUser} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { handleChange, values } = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: ""
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const SERVER = 'http://localhost:5050/users/register';
            console.log(values.email + " " + values.password + " "+values.name)
            await fetch(SERVER, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({email: values.email, password: values.password, name:values.name})

            })
            .then(response => {
                if (response.status >= 400 && response.status <= 500) {
                    response.json().then(res => setError(res.message));
                }
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(res => localStorage.setItem('jwt', res.token));
                    setError('');
                    navigate('/login');  
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
                <StyledTitle color={colors.theme} size={34}>Sign up Section</StyledTitle>
                <Formik
                
                    initialValues={{
                        email: "",
                        password: "",
                        name: ""
                    }}

                    onSubmit={(values, {setSubmitting}) => {
                        setEmail("values.emaild");

                        console.log(values.email);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <TextInput
                                name="name"
                                type="text"
                                label="Full Name"
                                placeholder="Enter your full name"
                                onChange={handleChange}
                                value={values.name}
                                icon={<FiUser/>}
                                
                            />

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
                                <StyledFormButton type="submit">Sign up</StyledFormButton>
                               
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Already have an account? <TextLink to="/login">Login</TextLink>
                </ExtraText>
            </StyledformArea>
        </div>

    );
}

export default Signup;