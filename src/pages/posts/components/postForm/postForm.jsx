import { useState } from 'react'
import { Container } from '../../../../components/ui/container/container'
import { Typo } from '../../../../components/ui/typo/typo'
import { Form } from '../../../../components/ui/form/form'
import { Field } from '../../../../components/ui/field/field'
import { Input } from '../../../../components/ui/input/input'
import { Button } from '../../../../components/ui/button/button'
import * as SC from './styles'

const DEFAULT_VALUES = { title: '', body: '' }

export const PostForm = ({ title, onSubmitForm, defaultValues }) => {
    const [formValues, setFormValues] = useState(defaultValues || DEFAULT_VALUES)

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        onSubmitForm(formValues)

        !defaultValues && setFormValues(DEFAULT_VALUES)
    }

    const disabled = !formValues.title || !formValues.body

    return (
        <Container>
            <Typo>{title}</Typo>
            <Form onSubmit={onSubmit}>
                <Field>
                    <Input
                        type='text' 
                        name="title" 
                        value={formValues.title}
                        placeholder='Заголовок' 
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <SC.Textarea 
                        name='body' 
                        placeholder='Текст' 
                        value={formValues.body}
                        rows={10} cols={30} 
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Button type='submit' disabled={disabled}>Сохранить</Button>
            </Form>
        </Container>
    )
}