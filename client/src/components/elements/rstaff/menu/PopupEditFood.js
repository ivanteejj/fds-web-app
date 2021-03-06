import React from "react";
import {
    Button,
    Divider,
    Form,
    Input,
    Dropdown,
    Grid,
    Label
} from "semantic-ui-react";
import * as Yup from "yup";
import { Formik } from "formik";
import "../../../stylesheets/Popup.css"

export default function PopupEditFood({closePopup, item, categories, submitEditFood, submitDeleteFood}) {
    const EditFoodSchema = Yup.object().shape({
        fname: Yup.string().required("Food name is required"),
        price: Yup.number().required("Price is required"),
        category: Yup.string().required("Category is required"),
        daily_limit: Yup.number()
            .required("Daily Limit is required")
            .moreThan(item.daily_sold, "Daily Limit must be more than Daily Sold")
    })

    const catOptions = categories.map(item => ({
        key: item,
        text: item,
        value: item
    }))

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => closePopup("editFood", false)}>x</span>
                <>
                    <Button
                        floated={'left'} size="medium"
                        content={'Delete Food'}
                        color={'red'}
                        onClick={() => submitDeleteFood(item)}
                    />
                    <h1>{item.fname}</h1>
                    <Divider/>

                    <Formik
                        initialValues={{ fid: item.fid, fname: item.fname, price: item.price, category: item.category, daily_limit: item.daily_limit}}
                        validationSchema={EditFoodSchema}
                        onSubmit={(values) => submitEditFood(values)}
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
                                <Grid textAlign={'left'}>
                                    <Grid.Row>
                                        <Grid.Column width={11}>
                                            <Input
                                                placeholder={values.fname}
                                                label={'Food Name'}
                                                type="text"
                                                name="fname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.fname}
                                                className={touched.fname && errors.fname ? "has-error" : null}
                                            />
                                        </Grid.Column>

                                        <Grid.Column width={3}>
                                            <Input
                                                placeholder={`$${values.price}`}
                                                label={'SGD'}
                                                type="text"
                                                name="price"
                                                value={values.price}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={touched.price && errors.price ? "has-error" : null}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={11}>
                                            {touched.fname && errors.fname ? (
                                                <Label className="error-message" basic color='red' pointing>
                                                    {errors.fname}
                                                </Label>
                                            ): null}
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            {touched.price && errors.price ? (
                                                <Label className="error-message" basic color='red' pointing>
                                                    {errors.price}
                                                </Label>
                                            ): null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column>
                                            <span>
                                                Category: {' '}
                                                <Dropdown
                                                    search selection
                                                    name="category"
                                                    options={catOptions}
                                                    value={values.category}
                                                    onChange={(e, { name, value }) => {
                                                        handleChange(e)
                                                        setFieldValue(name, value)
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                            </span>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={11}>
                                            <Input
                                                placeholder={values.daily_limit}
                                                label={'Daily Limit'}
                                                type="text"
                                                name="daily_limit"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.daily_limit}
                                                className={touched.daily_limit && errors.daily_limit ? "has-error" : null}
                                            />
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <text>{`Daily Sold: ${item.daily_sold}`}</text>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column>
                                            {touched.daily_limit && errors.daily_limit ? (
                                                <Label className="error-message" basic color='red' pointing>
                                                    {errors.daily_limit}
                                                </Label>
                                            ): null}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>


                                <Form.Button
                                    floated={'center'} size="medium"
                                    content={'Confirm changes'}
                                    color={'orange'}
                                    onClick={handleSubmit}
                                />
                            </Form>
                        ) }
                    </Formik>
                </>
            </div>
        </div>
    )
}