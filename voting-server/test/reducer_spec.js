import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['TrainSpotting']
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['TrainSpotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['TrainSpotting', '28 Days Later']
    });
    const action = {
      type: 'NEXT',
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['TrainSpotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['TrainSpotting', '28 Days Later']
      },
      entries: []
    });
    const action = {
      type: 'VOTE',
      entry: 'TrainSpotting'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['TrainSpotting', '28 Days Later'],
        tally: { TrainSpotting: 1 }
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {
      type: 'SET_ENTRIES',
      entries: ['TrainSpotting']
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['TrainSpotting']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {
        type: 'SET_ENTRIES',
        entries: ['TrainSpotting', '28 Days Later']
      },
      {
        type: 'NEXT',
      },
      {
        type: 'VOTE',
        entry: 'TrainSpotting'
      },
      {
        type: 'VOTE',
        entry: '28 Days Later'
      },
      {
        type: 'VOTE',
        entry: 'TrainSpotting'
      },
      {
        type: 'NEXT',
      },
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'TrainSpotting',
    }));
  });

});
