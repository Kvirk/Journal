const initialState = {
  list: [],
  newJournal: {name: '', entry: ''},
  loading: false,
  message: undefined
};
const asyncJournalReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ASYNC_FETCH_JOURNALS':{
      return {
        ...state, loading: true
      };
    }
    case 'ASYNC_FETCH_JOURNALS_SUCCESS':{
      return {
        ...state, list: action.list, loading: false, message: undefined
      };
    }
    case 'ASYNC_ADD_JOURNAL':{
      return {...state, loading: true, message: undefined};
    }
    case 'ASYNC_ADD_JOURNAL_SUCCESS':{
      return {
        list: state.list.concat(action.data),
        loading: false,
        message: undefined,
        newJournal: {name: ''}
      };
    }
    case 'ASYNC_DELETE_JOURNAL':{
      return {...state, loading:true};
    }
    case 'ASYNC_DELETE_JOURNAL_SUCCESS':{
      return {...state,
        list: state.list.filter(journal => journal.id !== action.id),
        loading: false,
        message: undefined
      };
    }
    case 'ASYNC_COMPLETE_JOURNAL':{
      return {...state, loading:true};
    }
    case 'ASYNC_COMPLETE_JOURNAL_SUCCESS':{
      return {
        ...state,
        list: state.list.map((journal) => (journal.id === action.id)?
          {...journal, completed: true}:
          journal),
        loading: false,
        message: undefined
      };
    }
    case 'ASYNC_DELETE_JOURNAL_FAILURE':
    case 'ASYNC_FETCH_JOURNALS_FAILURE':
    case 'ASYNC_ADD_JOURNAL_FAILURE':
    case 'ASYNC_COMPLETE_JOURNAL_FAILURE':{
      return {...state, loading: false, message: 'There was a fetch error'};
    }
    case 'ASYNC_UPDATE_NAME':{
      return {
        ...state,
        newJournal:{
          ...state.newJournal,
          name: action.name
        }
      };
    }
    case 'ASYNC_UPDATE_ENTRY':{
      return {
        ...state,
        newJournal:{
          ...state.newJournal,
          entry: action.entry
        }
      };
    }
    default: return state;
  }
}

export default asyncJournalReducer;