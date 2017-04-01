import React from 'react';
import {connect} from 'react-redux';
import {backToMain} from '../actions/journalList.actions';


const JournalList = ({type, journals, onBackToMain}) => {
  const journalItems = journals.map((journal) => {
    return <div key={journal.id} className="jumbotron">
      <h1 className="display-3">{journal.name}</h1>
      <p className="lead">{journal.entry}</p>
      <p>Sentiment: {journal.sentiment}</p>
      <p>Rating: {journal.rating}</p>
    </div>
  });
  return <div>
    { type === 'nothing' ? <div className="container entry"><button className="btn btn-primary" onClick={onBackToMain}>Back</button>{journalItems}</div> : null }
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