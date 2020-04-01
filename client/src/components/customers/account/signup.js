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

const RegisterSchema = Yup.object().shape({
    userid: Yup.string()
        .required("Userid is required"),
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required")
});

const Signup = () => {

    return (
        <Grid className="segment centered">
        <Formik
            initialValues={{ userid: '', username: '', password: '', type: type[0].value}}
            validationSchema={RegisterSchema}
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
            <h1>Register </h1>
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
              placeholder="userid"
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
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={touched.username && errors.username ? "has-error" : null}
               />   
          </Form.Group>

          {touched.username && errors.username ? (
                <Label className="error-message" basic color='red' pointing>
                   {errors.username}
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

          <Form.Button type='submit' onClick={handleSubmit}>
              Submit
         </Form.Button>
        </Form>
      )}        

        
        </Formik>
        </Grid>
    );
}

export default Signup;
