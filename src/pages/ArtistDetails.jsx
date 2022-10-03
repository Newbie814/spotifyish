/* eslint-disable operator-linebreak */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  if (isFetchingSongDetails || isFetchinRelatedSongs)
    // eslint-disable-next-line curly
    return <Loader title='Searching song details' />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId='' songData={songData} />

      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>

        <div className='mt-5'>
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1]?.text.map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className='text-gray-400 text-base my-1'
              >
                {line}
              </p>
            ))
          ) : (
            <p className='text-gray-400 text-base my-1'>
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        // artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
