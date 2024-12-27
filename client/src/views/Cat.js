import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchCatsFromAPI,
  saveCatsToServer,
  loadCatsFromServer,
} from "../api/catsAPI";
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

const CatCards = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      setCats([]);
      await saveCatsToServer([]);

      const data = await fetchCatsFromAPI();
      await saveCatsToServer(data);
      const updatedCats = await loadCatsFromServer();
      setCats(updatedCats);
    } catch (error) {
      setError("Error fetching cats. Please try again.");
      console.error("Error fetching cats:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadCatsFromServer();
        if (data.length === 0) {
          await fetchCats();
        } else {
          setCats(data);
        }
      } catch (error) {
        setError("Error loading cats. Please try again.");
        console.error("Error loading cats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCats();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/cat/${id}`);
  };

  const handleRandomClick = async () => {
    setCats([]); 
    await fetchCats(); 
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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
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
          </>
        )}
      </Content>
    </PageContainer>
  );
};

export default CatCards;
