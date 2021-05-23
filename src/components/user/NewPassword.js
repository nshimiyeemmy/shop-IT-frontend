import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userActions';

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Password Reset Successfully');
      history.push('/login');
    }
  }, [dispatch, alert, error, success, history]);

  //creating the submitHandler to handle the email and password submit
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', password);
    formData.append('comfirmPassword', comfirmPassword);
    dispatch(resetPassword(match.params.token, formData));
  };
  return (
    <Fragment>
      <MetaData title={'New Password Reset'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={comfirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
