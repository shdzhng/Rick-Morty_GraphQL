import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCharacter } from '../../hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CharacterModalContent({ id }) {
  const {
    error,
    loading,
    data: { character: { name, image, episode } = {} } = {},
  } = useCharacter(id);

  if (loading || error)
    return (
      <Box sx={style}>
        <Typography>loading</Typography>
      </Box>
    );

  return (
    <div>
      <Box sx={style}>
        <img src={image}></img>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {name}
        </Typography>
        {loading ? null : (
          <ul>
            {episode.map(({ episode, name }) => (
              <li key={episode}>{`${episode}: ${name}`}</li>
            ))}
          </ul>
        )}
      </Box>
    </div>
  );
}
