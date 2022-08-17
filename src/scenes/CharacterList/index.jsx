import React, { useState, useEffect } from 'react';
import { useCharacters } from '../../hooks/';
import CharacterModal from './CharacterModalContent';
import Modal from '@mui/material/Modal';
import { gql, useLazyQuery } from '@apollo/client';

const GET_CHARACTER_LOCATIONS = gql`
  query GetCharacterInfo($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        id
        image
        gender
        location {
          name
        }
      }
    }
  }
`;

function CharacterList() {
  const { error, loading, data } = useCharacters();
  const [open, setOpen] = React.useState(false);
  const [characterListData, setCharacterListData] = useState([]);
  const [characterID, setCharacterID] = useState(null);
  const [name, setName] = useState('');

  const [getLocations, results] = useLazyQuery(GET_CHARACTER_LOCATIONS, {
    variables: {
      name,
    },
  });

  useEffect(() => {
    if (data) setCharacterListData(data.characters.results);
    console.log(data);
  }, [data]);

  const handleOpen = (id) => {
    setCharacterID(id);
    setOpen(true);
  };

  const handleSearch = () => {
    getLocations(name).then(({ loading, data }) => {
      if (!loading) {
        setCharacterListData(data.characters.results);
        setName('');
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCharacterID(null);
  };

  if (error) return <p>something went wrong</p>;
  if (loading) return <p>loading...</p>;

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <>
          <CharacterModal id={characterID} />
        </>
      </Modal>
      <input
        placeholder="search for character"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={handleSearch}>search</button>

      <div
        className="CharacterList"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        {characterListData.map(({ name, image, gender, id, location }, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '1rem',
              padding: '0 auto',
              width: '60vw',
              border: '1px solid black',
            }}
            onClick={() => handleOpen(id)}
          >
            <div style={{ marginLeft: '1rem' }}>
              <h2>{name}</h2>
              <p> {gender}</p>
              <p>{location.name}</p>
            </div>
            <img style={{ width: '100px', marginLeft: '1rem' }} src={image} />
            <span
              style={{
                width: 10,
                flexGrow: 1,
                backgroundColor: gender === 'Male' ? 'blue' : 'pink',
              }}
            ></span>
          </div>
        ))}
      </div>
    </>
  );
}

export default CharacterList;
