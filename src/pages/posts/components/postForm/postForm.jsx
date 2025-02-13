import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from "../../../../components/container/styles"
import { Typo } from '../../../../components/typo/typo'
import { addPost } from '../../../../redux/slices/postsSlice'
import * as SC from './styles'

const DEFAULT_VALUES = { title: '', body: '' }


export const PostForm = () => {
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState(DEFAULT_VALUES)

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost(formValues))
        setFormValues(DEFAULT_VALUES)
    }

    const disabled = !formValues.title || !formValues.body

    return (
        <Container>
            <Typo>Добавление нового поста</Typo>
            <SC.Form onSubmit={onSubmit}>
                <SC.Field>
                    <SC.Input 
                        type='text' 
                        name="title" 
                        value={formValues.title}
                        placeholder='Заголовок поста' 
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </SC.Field>
                <SC.Field>
                    <SC.Textarea 
                        name='body' 
                        placeholder='Текст' 
                        value={formValues.body}
                        rows={10} cols={30} 
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </SC.Field>
                <SC.Button type='submit' disabled={disabled}>Сохранить</SC.Button>
            </SC.Form>
        </Container>
    )
}