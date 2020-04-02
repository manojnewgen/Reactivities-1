import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';

import TextInput from '../../app/common/form/TextInput';
import { Button, Form, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';


const validate = combineValidators({
    email: isRequired('email'),
    username: isRequired('username'),
    displayName: isRequired('displayName'),

    password: isRequired('password')
})

const RegisterForm = () => {

    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;

    return (
        <FinalForm
            validate={validate}
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Editörün Seçimine  Üye Olun '
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        name='username'
                        component={TextInput}
                        placeholder='Kulanıcı adınız'
                    />
                    <Field
                        name='displayName'
                        component={TextInput}
                        placeholder='İsminiz'
                    />
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        type='password'
                        component={TextInput}
                        placeholder='Password'
                    />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage
                            error={submitError}
                        />
                        // &&
                        // toast.error(submitError.statusText)
                    )}

                    <Button
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        //positive
                        color='teal'
                        content='Üye Ol'
                        fluid
                    />
                </Form>

            )}

        />
    )
}


export default RegisterForm
