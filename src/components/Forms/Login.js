import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../helpers/graphql/queries";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";

export default function FormLogin(props) {
  const [login, { data, loading, error, called }] = useLazyQuery(LOGIN_USER);
  const { name, role } = useSelector((state) => ({
    ...state.User,
  }));
  const [log, setLog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.userLogin && called) {
      localStorage.setItem("token", data.userLogin.token);
      dispatch({
        type: "LOGIN",
        payload: {
          token: data.userLogin.token,
          role: "COSTUMER",
        },
      });
      setLog(true);

      console.log("login role" + role);
    }
  }, [called, data, dispatch, log, role]);
  return log ? (
    <Redirect to="/user" />
  ) : (
    <>
      <Formik
        initialValues={{
          Email: "",
          Password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.Email) {
            errors.Email = "Required Field";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
          ) {
            errors.Email = "Invalid Email";
          }
          if (!values.Password) {
            errors.Password = "Required Field";
          } else if (values.Password.length < 9) {
            errors.Password = "Password too short";
          }

          return errors;
        }}
        onSubmit={async ({ Email, Password }, { setSubmitting, resetForm }) => {
          /// code here
          //event.preventDefault();
          setSubmitting(true);
          if (Email.trim() === 0 || Password.trim() === 0) {
            return;
          }
          console.log("llega aca");

          login({
            variables: {
              mail: Email,
              password: Password,
              role: "COSTUMER",
            },
          });

          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) =>
          loading ? (
            <Spinner color={props.color}></Spinner>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                value={values.Email}
                label="Enter your email"
                id="Email"
                name="Email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                color={props.color}
              />

              <Input
                value={values.Password}
                label="Enter your password"
                id="Password"
                type="password"
                name="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                color={props.color}
              />
              <Button color={props.color} type="submit" block>
                {" "}
                SIGN IN{" "}
              </Button>
            </form>
          )
        }
      </Formik>
    </>
  );
}
