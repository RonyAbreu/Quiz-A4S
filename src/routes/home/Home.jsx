import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/theme");
  }

  return (
    <div className="container-home">
      <div className="home">
        <h1 className="home-title">Aprenda se divertindo</h1>
        <p className="home-description">
          Clique no botão abaixo e inicie um Quiz agora!
        </p>
        <button className="home-button" type="button" onClick={handleNavigate}>
          Jogar
        </button>
      </div>
    </div>
  );
};

export default Home;
