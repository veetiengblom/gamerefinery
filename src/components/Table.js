import React, { useEffect, useState } from 'react';
import getAll from '../services/dataService';

const Table = () => {
  const [games, setGames] = useState([]);
  const [ascendingPower, setAscendingPower] = useState(false);
  const [ascendingName, setAscendingName] = useState(false);
  const [triangleOnGame, setTriangleOnGame] = useState(false);
  const [showTriangle, setShowTriangle] = useState(false);

  const getGameData = () => {
    getAll()
      .then((gameData) => {
        setGames(gameData);
      })
      .catch((error) => {
        console.error('Error fetching game data:', error);
      });
  };

  useEffect(getGameData, []);

  const sortByPowerScore = (flip) => {
    setShowTriangle(true);
    const reverse = flip
      ? games.sort((a, b) => a.powerscore - b.powerscore)
      : games.sort((a, b) => b.powerscore - a.powerscore);

    setGames(reverse);
    setAscendingPower(flip);
    setTriangleOnGame(false);
    return;
  };

  const sortByName = (flip) => {
    setShowTriangle(true);
    const reverse = flip
      ? games.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      : games.sort((a, b) => (b.name > a.name ? 1 : a.name > b.name ? -1 : 0));

    setGames(reverse);
    setAscendingName(flip);
    setTriangleOnGame(true);
    return;
  };

  return (
    <div className='tableBody'>
      <h2>Top Grossing 5 Games</h2>
      <div className='tableWrapper'>
        <table className='gameTable'>
          <tbody>
            <tr className='gameTableRowHeader'>
              <th
                className='tableItemHeader'
                id='powerscoreHeader'
                onClick={() => sortByPowerScore(!ascendingPower)}
              >
                <div className='textContainerHeaderPowerscore'>
                  <div>POWERSCORE®</div>
                  {showTriangle ? (
                    triangleOnGame ? null : ascendingPower ? (
                      <div className='triangleUp'></div>
                    ) : (
                      <div className='triangleDown'></div>
                    )
                  ) : null}
                </div>
              </th>
              <th
                className='tableItemHeader'
                id='center'
                onClick={() => sortByName(!ascendingName)}
              >
                <div className='textContainerHeaderGame'>
                  <div>Game</div>
                  {showTriangle ? (
                    triangleOnGame ? (
                      ascendingName ? (
                        <div className='triangleUp'></div>
                      ) : (
                        <div className='triangleDown'></div>
                      )
                    ) : null
                  ) : null}
                </div>
              </th>
              <th className='tableItemHeader'>App Store Link</th>
            </tr>
            {games?.map((game) => (
              <tr className='gameTableRow' key={game.name}>
                <td className='tableItem' id='powerscore'>
                  {game.powerscore}
                </td>
                <td className='tableItem' id='center' style={{ width: '60%' }}>
                  <div className='centerTableItem'>
                    <img src={game.iconUrl} alt='new' id='gameIcon' />
                    <div className='textContainer'>
                      <div className='gameName'>{game.name}</div>
                      <div className='gameArtist'>{game.artist}</div>
                    </div>
                  </div>
                </td>
                <td className='tableItem'>
                  <a
                    href={`https://apps.apple.com/us/app/${game.name}/id${game.appId}`}
                  >
                    <img src='arrow.png' alt='link' id='arrowLink' />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
