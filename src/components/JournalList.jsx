import React from 'react';
import {connect} from 'react-redux';
import {backToMain} from '../actions/journalList.actions';


const JournalList = ({type, journals, onBackToMain}) => {
  const journalItems = journals.map((journal) => {
    return <div key={journal.id}>
      <p>
        {journal.name}
      </p>
      <p>
        {journal.entry}
      </p>
      <p>
        {journal.rating}
      </p>
    </div>
  });
  return <div>
    { type === 'nothing' ? <ul>{journalItems}<button onClick={onBackToMain}>Back</button></ul> : null }
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
  })),
  onBackToMain: React.PropTypes.func
};

const mapStateToProps = ({asyncJournals}) => ({
  type: asyncJournals.type,
  journals: asyncJournals.list || []
});

const mapDispatchToProps = (dispatch) => ({
  onBackToMain(){
    dispatch(backToMain());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(JournalList);