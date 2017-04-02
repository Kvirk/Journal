import React from 'react';
import JournalEntry from './components/JournalEntry.jsx';
import JournalList from './components/JournalList.jsx';
import {connect} from 'react-redux';
import {fetchJournals} from './actions/journalEntry.actions'
class App extends React.Component{
  render(){
    return <div>

    <nav className="navbar navbar-toggleable-md bg-faded">
      <a className="navbar-brand" href="#">
        Journals
      </a>
    </nav>
      <JournalEntry/>
      <JournalList/>
    </div>;
  }
}
App.propTypes = {
  onFetchJournals: React.PropTypes.func
};
const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({})
export default connect(mapStateToProps, mapDispatchToProps)(App);
