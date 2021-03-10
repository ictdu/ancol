import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Field, Form as FinalForm } from 'react-final-form';
import TextInput from '../../../shared/forms/TextInput';
import { TextAreaInput } from '../../../shared/forms/TextAreaInput';

export const AddProduct = () => {
    return (
        <Grid>
            <Grid.Column computer={8} mobile={16}>
                <Header as='h3' attached='top'>
                    Add Product
                </Header>
                <Segment attached>
                    <FinalForm onSubmit={(values) => console.log(values)}
                        render={({ handleSubmit }) =>
                            <Form onSubmit={handleSubmit}>
                                <Field component={TextInput}
                                    label='Name'
                                    name='name'
                                    placeholder='Name' />
                                <Field component={TextInput}
                                    label='Stocks'
                                    type='number'
                                    name='stocks'
                                    placeholder='Stocks' />
                                <Field component={TextInput}
                                    label='Price'
                                    type='number'
                                    name='price'
                                    placeholder='Price' />
                                <Field component={TextAreaInput}
                                    label='Description'
                                    name='description'
                                    placeholder='Description' />

                                <Button primary content='Save' />
                            </Form>
                        } />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}
