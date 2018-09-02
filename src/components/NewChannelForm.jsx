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
  addChannel = async (values) => {
    const {
      addChannel, reset,
    } = this.props;
    await addChannel(values, reset);
  }

  render() {
    const {
      channelCreatingState, handleSubmit, submitting,
    } = this.props;
    const failed = channelCreatingState === 'failed';

    return (
      <form onSubmit={handleSubmit(this.addChannel)}>
        <div className="input-group mb-3">
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
              type="button"
            >
              Add
            </button>
          </div>
          {submitting && <div>Sending</div>}
          {failed && <div>Error. Try again.</div>}
        </div>
      </form>
    );
  }
}

export default NewChannelForm;
