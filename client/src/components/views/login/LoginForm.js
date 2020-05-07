import React from 'react'
import {
    Form,
    Label,
    Dropdown,
    Grid
} from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {useHistory} from "react-router-dom"

const type = [
    {
        text: 'Customer',
        value: 'Customer',
    },
    {
        text: 'Restaurant Staff',
        value: 'Restaurant Staff',
    },
    
    {
        text: 'FDS Manager',
        value: 'FDS Manager',
    }
]

const LoginSchema = Yup.object().shape({
    userid: Yup.string()
        .required("Userid is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required")
});

const LoginForm = ({validLogin}) => {
    let history = useHistory()
    return (
        <Grid padded className="segment centered">
        <Formik
            initialValues={{ userid: '', username: '', password: '', type: type[0].value}}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                // TODO: backend code here
                //comment out the unused user roles
                // validLogin (userid, user_type, rid (set as null if NA))

                //fds
                // validLogin(20, "fds", null);
                // return history.push("/fds/summary")

                // customer
                // validLogin(20, "customer", null);
                // return history.push("/customer/shop")

                // rider
                validLogin(30, "rider", null);
                return history.push("/rider/summary")

                //validLogin(10, "staff", 3);
                //return history.push("/staff/summary")
            }}
        > 

        {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue }) => (
        <Form>
            <h1>Login </h1>
            <span>
                as a{' '}
                <Dropdown
                    inline
                    name="type"
                    options={type}
                    value={values.type}
                    onChange={(e, { name, value }) => {
                        handleChange(e)
                        setFieldValue(name, value)
                    }}
                    onBlur={handleBlur}
                />
            </span>

          <Form.Group>
            <Form.Input
              label="Userid"
              type="text"
              name="userid"
              placeholder="Userid"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userid}
              className={touched.userid && errors.userid ? "has-error" : null}
               />
          </Form.Group>

          {touched.userid && errors.userid ? (
                <Label className="error-message" basic color='red' pointing>
                   {errors.userid}
                </Label>
               ): null}

          <Form.Group>
            <Form.Input
              label="Password"
              type="password"
              name="password"
            placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={touched.password && errors.password ? "has-error" : null}
               />
          </Form.Group>

          {touched.password && errors.password ? (
                <Label className="error-message" basic color='red' pointing>
                 {errors.password}
                </Label>
               ): null}

          <Form.Button onClick={handleSubmit} disabled={isSubmitting} color={'teal'}>
              Sign In
         </Form.Button>
        </Form>
      )}        

        
        </Formik>
        </Grid>
    );
}

export default LoginForm;
