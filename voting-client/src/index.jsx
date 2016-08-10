import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['TrainSpotting', '28 Days Later'];

ReactDOM.render(
  <Voting
    pair={pair}
    winner="TrainSpotting" 
  />,
  document.getElementById('app')
);
