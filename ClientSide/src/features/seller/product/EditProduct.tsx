import React, { useContext } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Field, Form as FinalForm } from 'react-final-form';
import TextInput from '../../../shared/forms/TextInput';
import { TextAreaInput } from '../../../shared/forms/TextAreaInput';
import { RootStoreContext } from '../../../stores/rootStore';
import { Product, ProductFormValues } from '../../../models/product';
import { FORM_ERROR } from 'final-form';
import { ErrorMessage } from '../../../shared/forms/ErrorMessage';
import { observer } from 'mobx-react-lite';

const EditProduct: React.FC<{ onEdit?: () => void, product: Product }> = ({ onEdit, product }) => {

    const userStore = useContext(RootStoreContext);
    const { loading, editProduct } = userStore.productStore;

    const initialValues: ProductFormValues = { ...product };

    return (
        <Grid>
            <Grid.Column computer={8} mobile={16}>
                <Header as='h3' attached='top'>
                    Add Product
                </Header>
                <Segment attached>
                    <FinalForm
                        initialValues={initialValues}
                        onSubmit={(values: ProductFormValues) => editProduct({
                            ...values,
                            stocks: +values.stocks,
                            price: +values.price
                        })
                            .then(() => {
                                if (onEdit) onEdit();
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

                                <Field component='input' type='hidden' name='id' />
                                <Button primary content='Save' loading={loading} />
                            </Form>
                        } />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(EditProduct);