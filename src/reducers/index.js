import {combineReducers} from 'redux';

import asyncJournalReducer from './journalEntry.reducer';
const combined = combineReducers({
  asyncJournals: asyncJournalReducer
});

export default combined;
