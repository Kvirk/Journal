import React from 'react';
import {connect} from 'react-redux';
import {addJournal, completeJournal, updateName, updateEntry, updateRating} from '../actions/journalEntry.actions';


const JournalList = ({type, journals}) => {
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
  return <div>
    { type === 'nothing' ? <ul>{journalItems}</ul> : null }
    </div>;
};

JournalList.propTypes = {
  type: React.PropTypes.string,
  journals: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    entry: React.PropTypes.string,
    rating: React.PropTypes.number,
    completed: React.PropTypes.bool,
    id: React.PropTypes.number
  }))
};

const mapStateToProps = ({asyncJournals}) => ({
  type: asyncJournals.type,
  journals: asyncJournals.list || []
});

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(JournalList);