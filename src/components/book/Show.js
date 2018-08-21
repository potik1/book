import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Card, List, ListItem, SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Spinner from '../Spinner';
import { retrieve, reset } from '../../actions/book/show';
import { del, loading, error } from '../../actions/book/delete';
import { Confirm } from '../Confirm';
import {delayRefresh} from '../../utils/helpers';

class Show extends Component {

  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired,
    showModal:PropTypes.bool,
    refresh:PropTypes.number
  };

  state = {showModal: false};

  componentDidMount() {
    this.props.retrieve(this.props.id);
  }

 componentWillReceiveProps(nextProps){
    if(this.props.refresh !== nextProps.refresh) {
      this.props.retrieve(this.props.id);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  remove() {
    this.setState({showModal: !this.state.showModal});
  }

  onAccept() {
    const {del, retrieved} = this.props;
    del(retrieved);
    this.setState({showModal: false});
    Actions.pop();
    delayRefresh();
  }

  onDecline() {
    this.setState({showModal: false});
  }

  static renderRow(title, value) {
    return (
        <ListItem
            subtitleStyle={{color: 'black', fontSize: 16}}
            titleStyle={{color: 'gray', fontSize: 16, paddingBottom: 10}}
            key={value}
            hideChevron={true}
            title={title}
            subtitle={value}
            subtitleNumberOfLines={100}
        />
    );
  }

  actionButtons(id) {
    return (
        <View style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignContent: 'center',
        }}>
          <SocialIcon
              iconSize={34}
              type='plus-circle'
              iconColor='#3faab4'
              onPress={() => Actions.bookCreate()}
          />
          <SocialIcon
              iconSize={34}
              type='edit'
              iconColor='#3faab4'
              onPress={() => Actions.bookUpdate({id})}
          />
          <SocialIcon
              iconSize={34}
              type='minus-circle'
              iconColor='#3faab4'
              onPress={() => this.remove()}
          />
        </View>
    );
  }

  render() {

    if (this.props.loading) return <Spinner size="large"/>;

    const item = this.props.retrieved;

    return (
        <View style={{flex: 1}}>
          <ScrollView>
            {item &&
            <Card title={'BOOK NO.  ' + item['@id'].substring(7)}>
              <List title="title">
                {Show.renderRow('id', item['@id'])}
                {Show.renderRow('isbn', item['isbn'])}
                {Show.renderRow('description', item['description'])}
                {Show.renderRow('author', item['author'])}
                {Show.renderRow('title', item['title'])}
                {Show.renderRow('publicationDate', item['publicationDate'])}
              </List>
            </Card>
            }
          </ScrollView>
          {item && this.actionButtons(item['@id'])}
          <Confirm
              visible={this.state.showModal}
              onAccept={() => this.onAccept()}
              onDecline={() => this.onDecline()}
          >
            Are you sure you want to delete this?
          </Confirm>
        </View>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    error: state.book.show.error,
    loading: state.book.show.loading,
    retrieved: state.book.show.retrieved,
    deleteError: state.book.del.error,
    deleteLoading: state.book.del.loading,
    deleted: state.book.del.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    del: item => dispatch(del(item)),
    reset: () => {
      dispatch(reset());
      dispatch(error(null));
      dispatch(loading(false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
