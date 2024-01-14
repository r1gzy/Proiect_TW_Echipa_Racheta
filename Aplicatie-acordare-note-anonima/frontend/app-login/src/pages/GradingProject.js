import { StyledTitle, StyledformArea, colors, StyledAddButton, Container, StyledContainerProjects, StyledGrade } from "./../components/Styles";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";


const GradingProjects = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const SERVER1 = 'http://localhost:5050/projects';
  let id = 1;
  let numeProiect;
  let caleProiect;

  const handleFetch = async () => {
    try {
      const response = await fetch(SERVER1, {
        method: 'GET',
      });
      const newData = await response.json();
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetch().then(() => setIsLoading(false));
  }, []);
  id = data.length;
  if (data.length > 0) {
    id = data.length;
    numeProiect = data[id - 1].projectName;
    caleProiect = data[id-1].selectedFile;
  }

  const [grade, setGrade] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const SERVER = "http://localhost:5050/projects/changeFinalGrade/" + `${id}`;
      console.log(SERVER);
      await fetch(SERVER, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ finalGrade: grade }),
      }).then((response) => {
        if (response.status >= 400 && response.status <= 500) {
          response.json().then((res) => setError(res.message));
        }
        if (response.status >= 200 && response.status < 300) {
          setError("");
          navigate("/dashboard");

          response.json().then((res) => {
            localStorage.setItem("jwt", res.token);
          });
        } else {
          navigate("/dashboard");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <StyledformArea bg={colors.aqua}>
            <StyledTitle size={100} color="#3A3845">
              Proiectul ce trebuie jurizat
            </StyledTitle>
            <StyledAddButton style={{width:250}}>
              <a href={`http://localhost:5050/uploads/${numeProiect}`} download>
                Descarcă Proiectul
              </a>
            </StyledAddButton>
            <Container>
              <StyledContainerProjects>{numeProiect}</StyledContainerProjects>
            </Container>
            <br />
            <StyledGrade>Alege o nota: </StyledGrade>
            <select
              id="grd"
              name="grd"
              defaultValue="Selecteaza o valoare"
              style={{ width: "500px", height: "50px" }}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            >
              <option value="0">Selecteaza o valoare</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <br /> <br /> <br />
            <StyledAddButton type="submit" onClick={handleSubmit}>
              Salveaza
            </StyledAddButton>
          </StyledformArea>
        </div>
      )}
    </div>
  );
}


export default GradingProjects;