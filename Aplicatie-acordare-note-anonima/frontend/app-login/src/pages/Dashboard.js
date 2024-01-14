import { StyledTitle, Avatar, StyledButton, ButtonGroup, StyledformArea, colors } from "./../components/Styles";

import Logo from "./../assets/login.png";

const Dashboard = () => {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            width: "100%",
            padding: "15px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Avatar image={Logo} />
        </div>
        <StyledformArea bg={colors.dark1}>
          <StyledTitle style={{ color: "yellow" }} size={50}>
            Proiectul a fost notat cu succes.
          </StyledTitle>

          <ButtonGroup>
            <StyledButton
              to="/"
              style={{ backgroundColor: "#0D158D", color: "yellow" }}
            >
              Pagina principală
            </StyledButton>

            <StyledButton
              to="/projectList"
              style={{ backgroundColor: "#0D158D", color: "yellow" }}
            >
              Toate proiectele
            </StyledButton>
          </ButtonGroup>
        </StyledformArea>
      </div>
    );
}

export default Dashboard;