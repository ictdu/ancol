import React, { useContext, useState } from 'react'
import { Button, Card, Header, Icon, Label, Image, Grid, Form, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { Field, Form as FinalForm } from 'react-final-form';
import TextInput from '../../shared/forms/TextInput';
import { formatToLocalPH } from '../../shared/utils/util';
import { OrderData } from '../../models/paypal';
import { ErrorMessage } from '../../shared/forms/ErrorMessage';
import { observer } from 'mobx-react-lite';
import { FORM_ERROR } from 'final-form';

const CheckoutPage = () => {

    const rootStore = useContext(RootStoreContext);
    const { setProduct, product } = rootStore.productStore;
    const { buy, loading } = rootStore.buyerStore;

    const prod = product!;

    const initialValues = {
        productId: prod.id
    }

    const [state, setState] = useState({
        order: null as null | OrderData
    });

    if (state.order) {
        return (
            <Segment placeholder >
                <Header icon>
                    <Icon name='paypal' />
                    To complete the transaction, pay using PayPal.
                </Header>
                <Segment.Inline>
                    <Button fluid={false} primary onClick={() => {
                        const left = (window.screen.width / 2) - (480 / 2);
                        window.open(state.order!.checkoutLink, "_blank",
                            `toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=${left},width=480,height=720`);
                    }}>Proceed</Button>
                    <Button content='Cancel' type='button' onClick={() => {
                        setProduct(null);
                    }} />
                </Segment.Inline>
            </Segment>
        )
    }

    return (
        <Grid style={{ opacity: '0.9' }}>
            <Grid.Column computer={6} mobile={16}>
                <Card fluid>
                    <Card.Content>
                        <Header>
                            Checkout
                        </Header>
                    </Card.Content>
                    <Card.Content>
                        <Label as='a' color='red' tag>
                            {formatToLocalPH(prod.price)}
                        </Label>
                        <Image style={{ marginTop: '1em' }} fluid src='https://i.stack.imgur.com/y9DpT.jpg' />
                        <Header content={prod.name} />
                        {prod.sellerName}
                    </Card.Content>
                    <Card.Content>
                        <div >
                            {prod.description}
                        </div>
                    </Card.Content>
                    <Card.Content extra>
                        <Label style={{ marginBottom: '1em' }}>
                            Stocks
                    <Label.Detail>{prod.stocks}</Label.Detail>
                        </Label>
                        <FinalForm onSubmit={(values) => buy(values.productId, +values.qty, values.shippingAddress)
                            .then(response => {
                                setState({
                                    order: response
                                })
                            })
                            .catch(error => ({
                                [FORM_ERROR]: error
                            }))
                        }
                            initialValues={initialValues}
                            render={({ handleSubmit, submitError, dirtySinceLastSubmit }) =>
                                <Form error onSubmit={handleSubmit}>
                                    <Field name='qty' component={TextInput}
                                        placeholder='Qty'
                                        type='number' />
                                    <Field name='shippingAddress' component={TextInput}
                                        placeholder='Shipping Address' />
                                    <Field name='productId'
                                        component='input'
                                        type='hidden' />

                                    {submitError && !dirtySinceLastSubmit &&
                                        <ErrorMessage error={submitError} />}

                                    <Button primary content='Checkout' type='submit' size='tiny'
                                        loading={loading} />
                                    <Button size='tiny' basic content='Cancel' type='button'
                                        disabled={loading}
                                        onClick={() => {
                                            setProduct(null);
                                        }} />
                                </Form>
                            }
                        />
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    )
}

export default observer(CheckoutPage);