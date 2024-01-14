import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup } from "./../components/Styles";

import Logo from "./../assets/login.png";

const Home = () => {
    return (
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "100%",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}>
                <Avatar image={Logo}/>
            </div>
            <StyledTitle size={65} style={{ color: 'white'}}>
                Aplicație web pentru acordarea anonimă de note
            </StyledTitle>
            <StyledSubTitle size={35} style={{margin:150}}>
                Alegeți o acțiune de început
            </StyledSubTitle>

            <ButtonGroup>
                <StyledButton to="/login" style={{width:260}}>Login</StyledButton>
                <StyledButton to="/signup" style={{width:260}}>Sign up</StyledButton>
            </ButtonGroup>
            

        </div>
    );
}

export default Home;