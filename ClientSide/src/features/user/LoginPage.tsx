import React, { useContext, useEffect } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { Field, Form as FinalForm } from 'react-final-form';
import TextInput from '../../shared/forms/TextInput';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../stores/rootStore';
import { ErrorMessage } from '../../shared/forms/ErrorMessage';
import { FORM_ERROR } from 'final-form';
import { history } from '../..';

const LoginPage = () => {

    const rootStore = useContext(RootStoreContext);
    const { loading, login } = rootStore.userStore;

    useEffect(() => {
        const token = window.localStorage.getItem('jwt_ancol');
        if (token)
            history.push('/');
    })

    return (
        <Grid centered style={{ paddingTop: '4em' }}>
            <Grid.Column computer={4} mobile={16}>
                <div className="ui middle aligned center aligned grid">
                    <div className="column">
                        <h2 className="ui image header">
                            <div className="content">
                                Log-in to your account
                            </div>
                        </h2>

                        <FinalForm onSubmit={(values) => login(values.email, values.password).catch(error =>
                            ({ [FORM_ERROR]: error })
                        )}
                            render={({ handleSubmit, submitError, dirtySinceLastSubmit }) =>
                                <form className="ui large form error" onSubmit={handleSubmit}>
                                    <div className="ui stacked secondary  segment">
                                        <Field name='email'
                                            component={TextInput}
                                            placeholder='Email' />
                                        <Field name='password'
                                            component={TextInput}
                                            placeholder='Password'
                                            type='password' />

                                        {submitError && !dirtySinceLastSubmit &&
                                            <ErrorMessage error={submitError} />}

                                        <Button
                                            loading={loading}
                                            className='ui fluid large teal submit button'
                                            type='submit' content='Login' />
                                    </div>
                                    <div className="ui error message"></div>
                                </form>
                            }
                        />

                        <div className="ui message">
                            New to us? Register
                        </div>
                    </div>
                </div>
            </Grid.Column>
        </Grid>
    )
}

export default observer(LoginPage);