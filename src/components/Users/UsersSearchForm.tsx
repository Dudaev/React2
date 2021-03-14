import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
  }

type PropsType = {
    onPageChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FilterType, { setSubmitting } : {setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onPageChanged(values)
        setSubmitting(false);
      }

    return <div>
        <Formik
            initialValues={{ term: '', friend: null}}
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