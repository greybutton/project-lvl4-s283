import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
// import * as actionCreators from '../actions';
import { channelsSelector } from '../selectors';

const Container = connect(
  (state) => {
    const props = {
      channels: channelsSelector(state),
    };
    return props;
  },
)(Component);

export default Container;
