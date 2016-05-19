var initialRepositoryState = [];
var actions = require('./actions');

var repositoryReducer = function(state, action) {
  console.log('reducer running');
  state = state || initialRepositoryState;
  console.log('state', state);
  if (action.type === actions.ADD_REPOSITORY) {
    console.log('actionrep', action.repository);
    return state.concat({name: action.repository.full_name, description: action.repository.description, rating: null});
  }

  else if (action.type === actions.RATE_REPOSITORY) {
    var index = -1;
    for (var i = 0; i < state.length; i++) {
      var repository = state[i];
      if (repository.name === action.repository) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      throw new Error('Could not find repository');
    }
    var before = state.slice(0, i);
    var after = state.slice(i + 1);
    var newRepository = Object.assign({}, repository, {rating: action.rating});
    return before.concat(newRepository, after);
  }

  else if (action.type === actions.FETCH_DESCRIPTION_SUCCESS) {
    var index = -1;
    console.log(state);
    for (var i=0; i<state.length; i++) {
        var repository = state[i];
        // console.log('reponame', repository.name);
        // console.log('actionrepo', action.repository);
        if (repository.name === action.repository) {
            index = i;
            break;
        }
    }

    console.log('SUCCESS!!');

    if (index === -1) {
        throw new Error('Could not find repository');
    }

    var before = state.slice(0, i);
    var after = state.slice(i + 1);
    var newRepository = Object.assign({}, repository, {
        description: action.description
    });
    return before.concat(newRepository, after);
  }
  else if (action.type === actions.FETCH_DESCRIPTION_ERROR) {
      var index = -1;
      for (var i=0; i<state.length; i++) {
          var repository = state[i];
          if (repository.name === action.repository) {
              index = i;
              break;
          }
      }

      console.log('hello');

      if (index === -1) {
          throw new Error('Could not find repository');
      }

      var before = state.slice(0, i);
      var after = state.slice(i + 1);
      var newRepository = Object.assign({}, repository, {
          description: 'N/A'
      });
      return before.concat(newRepository, after);
  }

  return state;
  };

exports.repositoryReducer = repositoryReducer;
