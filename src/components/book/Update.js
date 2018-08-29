import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Form from './Form';
import { success } from '../../actions/book/create';
import { retrieve, update, reset } from '../../actions/book/update';
import { loading, error } from '../../actions/book/delete';
import { delayRefresh } from '../../utils/helpers';
import Spinner from '../Spinner';

class Update extends Component {

  static propTypes = {
    retrieveError: PropTypes.string,
    retrieveLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(this.props.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onSubmit = (item, values) => {
    this.props.update(item, values);
    Actions.pop();
    delayRefresh();
  };

  render() {

    if (this.props.deleted) return Actions.pop();

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    const {viewStyle, textStyleAlert, textStyleSuccess} = styles;
    return (
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps='always'>
            {this.props.created && <View style={viewStyle}><Text style={textStyleAlert}>{this.props.created['@id']} created.</Text></View>}
            {this.props.updated && <View style={viewStyle}><Text style={textStyleSuccess}>{this.props.updated['@id']} updated</Text></View>}
            {(this.props.retrieveLoading || this.props.updateLoading) && <View style={viewStyle}><Spinner size='large'/></View>}
            {this.props.retrieveError && <View style={viewStyle}><Text style={textStyleAlert}>{this.props.retrieveError}</Text></View>}
            {this.props.updateError && <View style={viewStyle}><Text style={textStyleAlert}> {this.props.updateError}</Text></View>}
            {item && <Form mySubmit={values => this.onSubmit(item, values)} initialValues={item}/>}
          </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    retrieveError: state.book.update.retrieveError,
    retrieveLoading: state.book.update.retrieveLoading,
    updateError: state.book.update.updateError,
    updateLoading: state.book.update.updateLoading,
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
    reset: () => {
      dispatch(reset());
      dispatch(error(null));
      dispatch(loading(false));
      dispatch(success(null));
    },
  };
};

const styles = {
  viewStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  textStyleAlert: {
    color: 'red',
    textAlign: 'center',
  },
  textStyleSuccess: {
    color: 'green',
    textAlign: 'center',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
