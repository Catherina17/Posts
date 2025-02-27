import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container } from '../../components/ui/container/container'
import { Typo } from '../../components/ui/typo/typo'
import { Field } from '../../components/ui/field/field'
import { Input } from '../../components/ui/input/input'
import { Form } from '../../components/ui/form/form'
import { login } from '../../redux/slices/authSlice'
import { Modal } from '../../components/ui/modal/modal'
import { Button } from '../../components/ui/button/button'

export const AuthPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const disabled = !formValues.email || !formValues.password

    const onSubmit = (e) => {
        e.preventDefault()

        try {
            const users = JSON.parse(localStorage.getItem('users'))

            if (!users) {
                setModalMessage('Данный пользователь не найден')
                setModalVisible(true)
                return
            }

            const currentUser = users.find((user) => user.email === formValues.email && user.password === formValues.password)

            if (!currentUser) {
                setModalMessage('Данный пользователь не найден')
                setModalVisible(true)
                return
            }

            dispatch(login(currentUser))

            navigate('/posts')
        } catch (e) {
            console.log(e)
        }
    }


    return <Container>
        <Typo>Страница авторизации</Typo>
        <Form onSubmit={onSubmit}>
            <Field>
                <Input
                    type='email' 
                    name="email" 
                    value={formValues.email}
                    placeholder='Email' 
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                />
            </Field>
            <Field>
                <Input
                    type='password' 
                    name="password" 
                    value={formValues.password}
                    placeholder='Пароль' 
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                />
            </Field>
            <Button type='submit' disabled={disabled}>Авторизация</Button>
        </Form> 
        {modalVisible && (
            <Modal title={modalMessage}>
                <Button onClick={() => setModalVisible(false)}>Ок</Button>
            </Modal>
        )}      
    </Container>
}