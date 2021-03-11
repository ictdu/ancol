import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement> { }

export const TextAreaInput: React.FC<IProps> = ({
    input,
    label,
    placeholder,
    meta: { error, touched }
}) => {
    return (
        <Form.Field>
            {label &&
                <label>{label}</label>
            }
            <textarea placeholder={placeholder} onSubmit={() => input.onChange('')} {...input} style={{ height: 'auto' }} rows={3}>
                {input.value}
            </textarea>
            {touched && !!error &&
                <Label basic color='red'>
                    {error}
                </Label>
            }
        </Form.Field>
    )
}