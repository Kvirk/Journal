import React from 'react';
import {connect} from 'react-redux';
import {addJournal, completeJournal, updateName, updateEntry, updateRating, seeJournals} from '../actions/journalEntry.actions';

const Journal = ({type, journals, newJournal, loading, onAddJournal, onCompleteJournal, onUpdateName, onUpdateEntry, onUpdateRating, onSeeJournals}) => {
  const listSection = (loading)?
    (<p><i className="fa fa-spinner fa-spin"></i></p>):
    (<div>
      <form onSubmit={(e) => {e.preventDefault(); onAddJournal();}}>
      <div class="form-group">
        <label htmlFor='name'>Name:</label>
        <input type='text' className="form-control" name='name' value={newJournal.name}
          onChange={(e) => onUpdateName(e.target.value)}/>
      </div>
      <div class="form-group">
        <label htmlFor='entry'>Entry:</label>
        <textarea  className="form-control" type='text' name='entry' value={newJournal.entry}
          onChange={(e) => onUpdateEntry(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor='Rating'>Rating:</label>
        <select className="form-control" name='rating' value={newJournal.rating} onChange={(e) => onUpdateRating(e.target.value)} className="form-control" id="sel1">
          {Array.from(new Array(21), (x,i) => i - 10).map((element) => {
            return <option>{element}</option>
          })}
        </select>
      </div>
        <button className="btn btn-primary" type='submit'>Create</button>
        <button className="btn btn-primary" onClick={onSeeJournals}>See Journal Entries</button>
      </form>
    </div>);
  return <div>
      {type === 'home' ? <div className="container home">{listSection}</div> : null }
    </div>;
};

Journal.propTypes = {
  type: React.PropTypes.string,
  newJournal: React.PropTypes.shape({
    name: React.PropTypes.string,
    entry: React.PropTypes.string,
    rating: React.PropTypes.string
  }),
  loading: React.PropTypes.bool,
  onAddJournal: React.PropTypes.func,
  onUpdateName: React.PropTypes.func,
  onUpdateEntry: React.PropTypes.func,
  onUpdateRating: React.PropTypes.func,
  onSeeJournals: React.PropTypes.func
};

const mapStateToProps = ({asyncJournals}) => ({
  type: asyncJournals.type,
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
  },
  onSeeJournals(rating){
    dispatch(seeJournals(rating));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Journal);