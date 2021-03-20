import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
  }

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    initialValue: FilterType
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FilterType, { setSubmitting } : {setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onFilterChanged(values)
        setSubmitting(false);
      }

    return <div>
        <Formik
            initialValues={{ term: props.initialValue.term, friend: props.initialValue.friend}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
            >
            {({ isSubmitting }) => (
                <Form>
                <Field type="text" name="term"/>
                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
        </Formik>
    </div>
})