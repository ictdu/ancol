import React, { useContext } from 'react'
import { Button, Card, Header, Icon, Label, Image, Grid, Form } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { Field, Form as FinalForm } from 'react-final-form';
import TextInput from '../../shared/forms/TextInput';
import { formatToLocalPH } from '../../shared/utils/util';

export const CheckoutPage = () => {

    const rootStore = useContext(RootStoreContext);
    const { setProduct, product } = rootStore.productStore;

    const prod = product!;

    return (
        <Grid>
            <Grid.Column computer={6} mobile={16}>

                <Card fluid>

                    <Card.Content>
                        <Header content='Checkout'>
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
                        <FinalForm onSubmit={(values) => console.log(values)}
                            render={({ }) =>
                                <Form error>
                                    <Field name='qty' component={TextInput}
                                        placeholder='Qty'
                                        type='number' />


                                    <Button primary content='Checkout' type='submit' size='tiny' />
                                    <Button size='tiny' basic content='Cancel' type='button' onClick={() => {
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