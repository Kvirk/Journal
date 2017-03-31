import {connect} from 'react-redux';
import Journal from './Journal.jsx';
import {addJournal, completeJournal, updateName} from '../actions/journalEntry.actions';

// Takes in the current store, returns a props
const mapStateToProps = ({asyncJournals}) => ({
  journals: asyncJournals.list || [],
  newJournal: asyncJournals.newJournal,
  loading:asyncJournals.loading
});

const mapDispatchToProps = (dispatch) => ({
  onAddJournal(){
    dispatch(addJournal());
  },
  onCompleteJournal(todoId){
    dispatch(completeJournal(todoId));
  },
  onUpdateName(name){
    dispatch(updateName(name));
}
});
export default connect(mapStateToProps, mapDispatchToProps)(Journal);