import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  LogoutButton,
  Button,
  NavLinks,
  Card,
  Grid,
} from "../../styles/styles";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
`;

const CatCards = () => {
  const currentUser = getLocalStorage("currentUser");
  const [cats, setCats] = useState(() => {
    const users = getLocalStorage("users") || {};
    return users[currentUser]?.cats || [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (cats.length === 0) {
      fetchCats();
    }
  }, []);
  const fetchCats = () => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=6&has_breeds=1")
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
        const users = getLocalStorage("users") || {};
        if (users[currentUser]) {
          users[currentUser].cats = data;
          setLocalStorage("users", users);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCardClick = (id) => {
    navigate(`/cat/${id}`);
  };
  const handleRandomClick = () => {
    fetchCats();
  };
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authenticated");
    window.location.href = "/login";
  };
  return (
    <>
      <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
      <NavLinks>
        <Link to="/tasks">To-Do List</Link>
      </NavLinks>
      <Grid>
        {cats.map((cat) => {
          const breed = cat.breeds && cat.breeds[0];
          return (
            <Card key={cat.id} onClick={() => handleCardClick(cat.id)}>
              <Image src={cat.url} alt={breed?.name || "Cat"} />
            </Card>
          );
        })}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button onClick={handleRandomClick}>Random</Button>
      </div>
    </>
  );
};

export default CatCards;
