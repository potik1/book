import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import Form from './Form';
import { success } from '../../actions/book/create';
import { retrieve, update, reset } from '../../actions/book/update';
import { del, loading, error } from '../../actions/book/delete';

class Update extends Component {

  static propTypes = {
    retrieveError: PropTypes.string,
    retrieveLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(this.props.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onSubmit(values, item) {
    this.props.update(values, item);
    Actions.pop();
    setTimeout(() => {
      Actions.refresh({test: true});
    }, 10);
  };

  render() {

    //if (this.props.updateLoading || this.props.retrieveLoading) return <Spinner size="large"/>;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    return (
        <View style={{flex: 1}}>
          <ScrollView>
            {item && <Form mySubmit={values => this.onSubmit(item, values)}
                           initialValues={item}/>}
          </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    retrieveError: state.book.update.retrieveError,
    retrieveLoading: state.book.update.retrieveLoading,
    updateError: state.book.update.updateError,
    updateLoading: state.book.update.updateLoading,
    deleteError: state.book.del.error,
    deleteLoading: state.book.del.loading,
    created: state.book.create.created,
    deleted: state.book.del.deleted,
    retrieved: state.book.update.retrieved,
    updated: state.book.update.updated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    update: (item, values) => dispatch(update(item, values)),
    del: item => dispatch(del(item)),
    reset: () => {
      dispatch(reset());
      dispatch(error(null));
      dispatch(loading(false));
      dispatch(success(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
