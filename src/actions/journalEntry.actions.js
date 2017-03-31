import axios from 'axios';


export const addJournal = () => (dispatch, getState) => {
  dispatch({type: 'ASYNC_ADD_JOURNAL'});
  console.log('ADD_JOURNAL', getState());
  axios.post('/journals', {name: getState().asyncJournals.newJournal.name})
    .then((response) => {
      dispatch({type:'ASYNC_ADD_JOURNAL_SUCCESS', data: response.data});
    }, () => {
      dispatch({type: 'ASYNC_ADD_JOURNAL_FAILURE'});
    });
};
export const completeJournal = (id) => (dispatch) => {
  dispatch({type: 'ASYNC_COMPLETE_JOURNAL'});
  axios.put(`/journals/${id}`, {})
    .then(() => {
      dispatch({type: 'ASYNC_COMPLETE_JOURNAL_SUCCESS', id});
    }, () => {
      dispatch({type: 'ASYNC_COMPLETE_JOURNAL_FAILURE'});
    })
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

export const updateName = (name) => ({type: 'ASYNC_UPDATE_NAME', name});