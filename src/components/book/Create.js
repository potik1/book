import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, loading, error } from '../../actions/book/create';
import { Actions } from 'react-native-router-flux';

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  onSubmit(values) {
    this.props.create(values);
    Actions.pop();
    setTimeout(() => {
      Actions.refresh({refresh: true});
    }, 200);
  };

  render() {

    if (this.props.created) return Actions.bookShow(item['@id']);

    const {viewStyle} = styles;
    return (
        <View>
          <ScrollView>
            {this.props.loading && <Spinner size="large"/>}
            {this.props.error &&
            <View style={viewStyle}><Text>{this.props.error}</Text></View>}
            <Form mySubmit={values => this.onSubmit(values)}/>
          </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    created: state.book.create.created,
    error: state.book.create.error,
    loading: state.book.create.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: values => dispatch(create(values)),
    reset: () => {
      dispatch(loading(false));
      dispatch(error(null));
    },
  };
};

const styles={
  viewStyle:{
    borderBottomWidth:1,
    padding:5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection:'row',
    borderColor:'#ddd',
    position: 'relative',
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
