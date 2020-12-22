import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ErrorMessage from "../Component/ErrorMessage";
import { RootState } from "../Redux";
import { loginReqAction } from "../Redux/User/action";

import { RouteComponentProps } from "react-router-dom";
type Props = RouteComponentProps;
export default function Login(props: Props): JSX.Element {
  const { history } = props;
  const dispatch = useDispatch();
  const isLodding = useSelector(
    (state: RootState) => state.user.isLodding
  );
  const errors = useSelector(
    (state: RootState) => state.user.loginErr
  );
  const user = useSelector((state: RootState) => state.user.user);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("submitted");

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem(
      "emailInput"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "passwordInput"
    ) as HTMLInputElement;

    const res = dispatch(
      loginReqAction(emailInput.value, passwordInput.value, true)
    ) as any;
    res
      .then(() => {
        toast.success("login success");
        history.push("/");
      })
      .catch((message: any) => {
        toast.warn("check error message");
      });
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Log in</h1>
            {errors && <ErrorMessage errors={errors} />}

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  id="emailInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  required={true}
                ></input>{" "}
              </fieldset>
              <fieldset className="form-group">
                <input
                  id="passwordInput"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required={true}
                ></input>{" "}
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
