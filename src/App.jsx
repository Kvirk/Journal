import React from 'react';
import JournalEntry from './components/JournalEntry.jsx';
import {connect} from 'react-redux';
import {fetchJournals} from './actions/journalEntry.actions'
class App extends React.Component{
  componentDidMount(){
    this.props.onFetchJournals();
  }
  render(){
    return <div>
      <h2>Journals</h2>
      <JournalEntry/>
    </div>;
  }
}
App.propTypes = {
  onFetchJournals: React.PropTypes.func
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  onFetchJournals(){
    dispatch(fetchJournals());
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
