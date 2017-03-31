import React from 'react';

const Journal = ({journals, newJournal, loading, onAddJournal, onCompleteJournal, onUpdateName, onUpdateEntry}) => {
  const journalItems = journals.map((journal) => {
    const completeSection = (journal.completed)?
      <span style={{color: 'green'}}>&nbsp;Done!!</span>:
      <button onClick={() => onCompleteJournal(journal.id)}>Complete</button>
    return <li key={journal.id}>
      {journal.name}
      {journal.entry}
      {completeSection}
    </li>
  });
  const listSection = (loading)?
    (<p><i className="fa fa-spinner fa-spin"></i></p>):
    (<div>
      <ul>{journalItems}</ul>
      <form onSubmit={(e) => {e.preventDefault(); onAddJournal();}}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={newJournal.name}
          onChange={(e) => onUpdateName(e.target.value)}/>
        <input type='text' name='entry' value={newJournal.entry}
          onChange={(e) => onUpdateEntry(e.target.value)}/>
        <button type='submit'>Create</button>
      </form>
    </div>);
  return <div>
      {listSection}
    </div>;
};

Journal.propTypes = {
  journals: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    completed: React.PropTypes.bool,
    id: React.PropTypes.number
  })),
  newJournal: React.PropTypes.shape({
    name: React.PropTypes.string,
    entry: React.PropTypes.string
  }),
  loading: React.PropTypes.bool,
  onCompleteJournal: React.PropTypes.func,
  onAddJournal: React.PropTypes.func,
  onUpdateName: React.PropTypes.func,
  onUpdateEntry: React.PropTypes.func
};

export default Journal;