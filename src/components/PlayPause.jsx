/* eslint-disable no-confusing-arrow */
/* eslint-disable jsx-quotes */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className='text-gray-300' onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className='text-gray-300' onClick={handlePlay} />
  );

export default PlayPause;
