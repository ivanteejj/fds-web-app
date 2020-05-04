import React from 'react'
import {
    Form,
    Label,
    Dropdown,
    Grid
} from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'

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

const LoginForm = () => {
    return (
        <Grid className="segment centered">
        <Formik
            initialValues={{ userid: '', username: '', password: '', type: type[0].value}}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                //backend code here

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
            <h1>Sign In </h1>
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

          <Form.Button onClick={handleSubmit} disabled={isSubmitting}>
              Submit
         </Form.Button>
        </Form>
      )}        

        
        </Formik>
        </Grid>
    );
}

export default LoginForm;
