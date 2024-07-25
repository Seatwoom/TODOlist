import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  LogoutButton,
  Button,
  NavLinks,
  Card,
  Grid,
  Header,
  PageContainer,
  Content,
} from "../styles/styles";
import { CAT_API_URL, API_BASE_URL } from "../config";

const CatCards = () => {
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const fetchCats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${CAT_API_URL}/images/search?limit=6&has_breeds=1`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cats from external API");
      }
      const data = await response.json();
      setCats(data);
      const saveResponse = await fetch(`${API_BASE_URL}/cats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ cats: data }),
      });
      if (!saveResponse.ok) {
        throw new Error("Failed to save cats on the server");
      }
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadCats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cats`, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.length === 0) {
          fetchCats();
        } else {
          setCats(data);
        }
      } catch (error) {
        console.error("Error loading cats:", error);
      }
    };

    loadCats();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/cat/${id}`);
  };

  const handleRandomClick = () => {
    fetchCats();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <PageContainer>
      <Header>
        <NavLinks>
          <Link to="/tasks">To-Do List</Link>
        </NavLinks>
        <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
      </Header>
      <Content>
        <Grid>
          {cats.map((cat) => {
            const breed = cat.breeds && cat.breeds[0];
            return (
              <Card key={cat.id} onClick={() => handleCardClick(cat.id)}>
                <img
                  src={cat.url}
                  alt={breed?.name || "Cat"}
                  style={{ width: "100%", height: "auto" }}
                />
              </Card>
            );
          })}
        </Grid>
        <Button onClick={handleRandomClick}>Random</Button>
      </Content>
    </PageContainer>
  );
};

export default CatCards;
