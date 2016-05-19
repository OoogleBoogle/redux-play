var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');

var Repository = require('./repository');

var RepositoryList = React.createClass({
  fetchDescription: function() {
    var repositoryName = this.refs.repositoryName.value;
    this.props.dispatch(actions.fetchDescription(repositoryName));
  },

  render: function() {
    console.log('HI THERE');
    var repositories = this.props.repositories.map(function(repository) {
      return <Repository repository={repository} key={repository.name} description={repository.description} />;
    });
    return (
      <div className="repository-list">
        {repositories}
        <input type="text" ref="repositoryName" />
        <button type="button" onClick={this.fetchDescription}>Add Repo</button>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    repositories: state
  };
};

var Container = connect(mapStateToProps)(RepositoryList);

module.exports = Container;
