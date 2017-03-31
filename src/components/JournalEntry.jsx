import React from 'react';
import {connect} from 'react-redux';
import {addJournal, completeJournal, updateName, updateEntry, updateRating} from '../actions/journalEntry.actions';

// Takes in the current store, returns a props

const Journal = ({type, journals, newJournal, loading, onAddJournal, onCompleteJournal, onUpdateName, onUpdateEntry, onUpdateRating}) => {
  const journalItems = journals.map((journal) => {
    const completeSection = (journal.completed)?
      <span style={{color: 'green'}}>&nbsp;Done!!</span>:
      <button onClick={() => onCompleteJournal(journal.id)}>Complete</button>
    return <li key={journal.id}>
      {journal.name}
      {journal.entry}
      {journal.rating}
      {completeSection}
    </li>
  });
  const listSection = (loading)?
    (<p><i className="fa fa-spinner fa-spin"></i></p>):
    (<div>
      { type === 'nothing' ? <ul>{journalItems}</ul> : null }
      <form onSubmit={(e) => {e.preventDefault(); onAddJournal();}}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={newJournal.name}
          onChange={(e) => onUpdateName(e.target.value)}/>
        <input type='text' name='entry' value={newJournal.entry}
          onChange={(e) => onUpdateEntry(e.target.value)}/>
        <select  name='rating' value={newJournal.rating} onChange={(e) => onUpdateRating(e.target.value)} className="form-control" id="sel1">
          {Array.from(new Array(21), (x,i) => i - 10).map((element) => {
            return <option>{element}</option>
          })}
        </select>
        <button type='submit'>Create</button>
      </form>
    </div>);
  return <div>
      {listSection}
    </div>;
};

Journal.propTypes = {
  type: React.PropTypes.string,
  journals: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    completed: React.PropTypes.bool,
    id: React.PropTypes.number
  })),
  newJournal: React.PropTypes.shape({
    name: React.PropTypes.string,
    entry: React.PropTypes.string,
    rating: React.PropTypes.string
  }),
  loading: React.PropTypes.bool,
  onCompleteJournal: React.PropTypes.func,
  onAddJournal: React.PropTypes.func,
  onUpdateName: React.PropTypes.func,
  onUpdateEntry: React.PropTypes.func,
  onUpdateRating: React.PropTypes.func
};

const mapStateToProps = ({asyncJournals}) => ({
  type: asyncJournals.type,
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
  },
  onUpdateEntry(entry){
    dispatch(updateEntry(entry));
  },
  onUpdateRating(rating){
    dispatch(updateRating(rating));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Journal);