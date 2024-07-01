import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const CatDetailed = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/images/${id}`)
      .then((response) => response.json())
      .then((data) => setCat(data))
      .catch((error) => console.error(error));
  }, [id]);
  if (!cat) return <h3> Loading</h3>;
  const breed = cat.breeds && cat.breeds[0];

  return (
    <Container>
      <Image src={cat.url} alt={breed?.name || "Cat"} />
      <h3>{breed?.name || "Unknown Breed"}</h3>
      {breed ? (
        <>
          <p>{breed.description}</p>
          <p>
            <strong>Temperament:</strong> {breed.temperament}
          </p>
          <p>
            <strong>Origin:</strong> {breed.origin}
          </p>
          <p>
            <strong>Life Span:</strong> {breed.life_span} years
          </p>
        </>
      ) : (
        <p>No breed information available.</p>
      )}
    </Container>
  );
};

export default CatDetailed;
