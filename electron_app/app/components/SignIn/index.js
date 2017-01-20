import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import IconDone from 'material-ui/svg-icons/action/done';

import {lightBlue500} from 'material-ui/styles/colors'

import style from './style.css'

import { required, createValidator } from '../../utils/validation'

const validate = values => {
  const errors = {};

  errors.username = required(values.username);
  errors.password = required(values.password);

  return errors
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
  }

  componentWillMount(){
    const { updateTitle, locale } = this.props;

    updateTitle("");
  }

  renderInput ({ input, label, id, type, meta: { touched, error, warning } }) {
    const { locale } = this.props;
    return (
      <div className={style.inputWrapper}>
        <TextField
          {...input}
          className={style.input}
          type={type}
          hintText={label}
          errorText={touched && ((error && translations[locale][error]))}
        />
      </div>
    );
  }

  render() {
    const { locale, handleSubmit, submitting, sendForm } = this.props;

    return (
      <div className={style.container}>
        <Paper zDepth={2} className={style.box}>
          <h1 className={style.title}>{translations[locale].title}</h1>
          <form onSubmit={handleSubmit(sendForm)}>
            <Field name="username" id="username" type="text" component={this.renderInput} label={translations[locale].username}/>
            <Field name="password" id="password" type="password" component={this.renderInput} label={translations[locale].password}/>
            <div className={style.actions}>
              <RaisedButton
                type="submit"
                target="_blank"
                label={translations[locale].btnSend}
                secondary={true}
                icon={<IconDone />}
              />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

SignIn.PropTypes = {
  locale: PropTypes.string,

  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,

  onSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  locale: 'fr'
};

export default reduxForm({
  form: 'sign-in',
  validate
})(SignIn)
