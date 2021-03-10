import React, { Fragment } from 'react'
import { Segment, Button, Breadcrumb } from 'semantic-ui-react'

export const ControlSection: React.FC<{ setPage: any, page: 'add' | 'edit' | 'products' }> = ({ setPage, page }) => {
    return (
        <Segment secondary>
            {page === 'products' &&
                <Button content="Add product" primary size="tiny" onClick={() => setPage('add')} />
            }

            {page === 'add' &&
                <Breadcrumb>
                    <Breadcrumb.Section link onClick={() => setPage('products')}>Products</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Add</Breadcrumb.Section>
                </Breadcrumb>
            }

        </Segment>
    )
}
