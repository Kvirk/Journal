const initialState = {
  type: 'home',
  list: [],
  newJournal: {name: '', entry: '', rating: '0'},
  loading: false,
  message: undefined
};
const asyncJournalReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ASYNC_FETCH_JOURNALS':{
      return {
        ...state,
        loading: true
      };
    }

    case 'ASYNC_FETCH_JOURNALS_SUCCESS':{
      return {
        ...state,
        list: action.list,
        loading: false,
        message: undefined
      };
    }

    case 'ASYNC_ADD_JOURNAL':{
      return {...state,
        loading: true,
        message: undefined};
    }

    case 'NAME_ENTRY_MANDATORY':{
      return {...state,
        message: 'Name and Entry Mandatory'};
    }

    case 'NAME_MANDATORY':{
      return {...state,
        message: 'We need your name to see your entries!'};
    }

    case 'ASYNC_ADD_JOURNAL_SUCCESS':{
      return {
        type: 'nothing',
        list: action.list,
        loading: false,
        message: undefined,
        newJournal: {name: '', entry: '', rating: '0'}
      };
    }

    case 'ASYNC_SEE_JOURNALS':{
      return {...state,
        type: 'nothing'}
    }

    case 'BACK_TO_MAIN':{
      return {...state,
        type: 'home',
        message: undefined
      }
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

    case 'ASYNC_UPDATE_RATING':{
      return {
        ...state,
        newJournal:{
          ...state.newJournal,
          rating: action.rating
        }
      };
    }

    default: return state;
  }
}

export default asyncJournalReducer;