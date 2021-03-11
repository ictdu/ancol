import React, { useContext } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Field, Form as FinalForm } from 'react-final-form';
import TextInput from '../../../shared/forms/TextInput';
import { TextAreaInput } from '../../../shared/forms/TextAreaInput';
import { RootStoreContext } from '../../../stores/rootStore';
import { ProductFormValues } from '../../../models/product';
import { FORM_ERROR } from 'final-form';
import { ErrorMessage } from '../../../shared/forms/ErrorMessage';
import { observer } from 'mobx-react-lite';


const AddProduct: React.FC<{ onAdded?: () => void }> = ({ onAdded }) => {

    const userStore = useContext(RootStoreContext);
    const { loading, addProduct } = userStore.productStore;

    return (
        <Grid>
            <Grid.Column computer={8} mobile={16}>
                <Header as='h3' attached='top'>
                    Add Product
                </Header>
                <Segment attached>
                    <FinalForm onSubmit={(values: ProductFormValues) => addProduct({
                        ...values,
                        stocks: +values.stocks,
                        price: +values.price
                    })
                        .then(() => {
                            if (onAdded) onAdded();
                        })
                        .catch(error => ({
                            [FORM_ERROR]: error
                        }))}
                        render={({ handleSubmit, submitError, dirtySinceLastSubmit }) =>
                            <Form onSubmit={handleSubmit} error>
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

                                {submitError && !dirtySinceLastSubmit &&
                                    <ErrorMessage error={submitError} />}

                                <Button primary content='Save' loading={loading} />
                            </Form>
                        } />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(AddProduct);