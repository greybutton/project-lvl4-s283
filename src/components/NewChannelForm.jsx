import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ channelCreatingState }) => {
  const props = {
    channelCreatingState,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
class NewChannelForm extends React.Component {
  addChannel = (values) => {
    const {
      addChannel, reset,
    } = this.props;
    addChannel(values, reset);
  }

  render() {
    const {
      channelCreatingState, handleSubmit, submitting,
    } = this.props;
    const failed = channelCreatingState === 'failed';

    return (
      <form className="mb-3" onSubmit={handleSubmit(this.addChannel)}>
        <div className="input-group">
          <Field
            required
            name="name"
            component="input"
            className="form-control"
            disabled={submitting}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
        {submitting && <div>Sending</div>}
        {failed && <div>Error. Try again.</div>}
      </form>
    );
  }
}

export default NewChannelForm;
