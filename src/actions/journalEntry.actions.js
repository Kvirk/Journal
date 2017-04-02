import axios from 'axios';


export const addJournal = () => (dispatch, getState) => {
  let name = getState().asyncJournals.newJournal.name;
  let entry = getState().asyncJournals.newJournal.entry;

  if(!name || !entry) {
    dispatch({type: 'NAME_ENTRY_MANDATORY'});
  } else {
    dispatch({type: 'ASYNC_ADD_JOURNAL'});
    axios.post('/journals', {name: name,
                          entry: entry,
                          rating: Number(getState().asyncJournals.newJournal.rating)})
      .then((response) => {
        axios.get('/journals')
        .then((response2) => {
          dispatch({type: 'ASYNC_ADD_JOURNAL_SUCCESS', list: response2.data});
        })
      }, () => {
        dispatch({type: 'ASYNC_ADD_JOURNAL_FAILURE'});
      });
  }
};

export const fetchJournals = () => (dispatch) => {
  dispatch({type: 'ASYNC_FETCH_JOURNALS'});
  axios.get('/journals')
    .then((response) => {
      dispatch({type: 'ASYNC_FETCH_JOURNALS_SUCCESS', list: response.data});
    }, () => {
      dispatch({type: 'ASYNC_FETCH_JOURNALS_FAILURE'});
    });
}

export const seeJournals = () => (dispatch) => {
  dispatch({type: 'ASYNC_SEE_JOURNALS'});
}

export const updateName = (name) => ({type: 'ASYNC_UPDATE_NAME', name});

export const updateEntry = (entry) => ({type: 'ASYNC_UPDATE_ENTRY', entry});

export const updateRating = (rating) => ({type: 'ASYNC_UPDATE_RATING', rating});