import React, { useEffect, useState } from 'react';
import dataService from '../services/dataService';

const Table = () => {
  const [games, setGames] = useState([]);
  const [ascendingPower, setAscendingPower] = useState(true);
  const [ascendingName, setAscendingName] = useState(true);

  const getGameData = () => {
    dataService.getAll().then((gameData) => {
      setGames(gameData);
    });
  };

  const sortByPowerScore = (flip) => {
    console.log('clicked, ascending:', flip);
    if (flip) {
      const reverse = games.sort((a, b) => a.powerscore - b.powerscore);
      console.log(reverse);
      setGames(reverse);
      setAscendingPower(flip);
      return;
    }
    const reverse = games.sort((a, b) => b.powerscore - a.powerscore);
    console.log(reverse);
    setGames(reverse);
    setAscendingPower(flip);
    return;
  };

  const sortByName = (flip) => {
    console.log('clicked, ascending:', flip);
    if (flip) {
      const reverse = games.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      console.log(reverse);
      setGames(reverse);
      setAscendingName(flip);
      return;
    }
    const reverse = games.sort((a, b) =>
      b.name > a.name ? 1 : a.name > b.name ? -1 : 0
    );
    console.log(reverse);
    setGames(reverse);
    setAscendingName(flip);
    return;
  };

  useEffect(getGameData, []);

  return (
    <div className='tableBody'>
      <h2>Top Grossing 5 Games</h2>

      {/* Table */}
      <div className='tableWrapper'>
        <table className='gameTable'>
          <tbody>
            <tr className='gameTableRowHeader'>
              <th
                className='tableItemHeader'
                id='click'
                onClick={() => sortByPowerScore(!ascendingPower)}
              >
                POWERSCORE®
              </th>
              <th
                className='tableItemHeader'
                id='center'
                onClick={() => sortByName(!ascendingName)}
              >
                Game
              </th>
              <th className='tableItemHeader'>App Store Link</th>
            </tr>
            {games?.map((game) => (
              <tr className='gameTableRow' key={game.name}>
                <td className='tableItem'>{game.powerscore}</td>
                <td className='tableItem' id='center' style={{ width: '60%' }}>
                  <div className='centerTableItem'>
                    <img src={game.iconUrl} alt='new' id='gameIcon' />
                    <div className='textContainer'>
                      <div>{game.name}</div>
                      <div>{game.artist}</div>
                    </div>
                  </div>
                </td>
                <td className='tableItem'>
                  <a
                    href={`https://apps.apple.com/us/app/${game.name}/id${game.appId}`}
                  >
                    <img src='arrowLink.png' alt='link' id='arrowLink' />
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
