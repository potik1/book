import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import { connect } from 'react-redux';
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


  render() {
    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    return (
      <View style={ {flex: 1} }>
        <ScrollView>
          {item && <Form onSubmit={values => this.props.update(item, values)} initialValues={item}/>}
        </ScrollView>
      </View>
    );
  }

}

const mapStateToProps = state => {

  return {
    retrieveError: state.update.retrieveError,
    retrieveLoading: state.update.retrieveLoading,
    updateError: state.update.updateError,
    updateLoading: state.update.updateLoading,
    deleteError: state.del.error,
    deleteLoading: state.del.loading,
    created: state.create.created,
    deleted: state.del.deleted,
    retrieved: state.update.retrieved,
    updated: state.update.updated,
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
