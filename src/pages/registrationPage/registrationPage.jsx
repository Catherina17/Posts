import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../components/ui/container/container'
import { Form } from '../../components/ui/form/form'
import { Field } from '../../components/ui/field/field'
import { Input } from '../../components/ui/input/input'
import { Typo } from '../../components/ui/typo/typo'
import { Modal } from '../../components/ui/modal/modal'
import { Button } from '../../components/ui/button/button'

export const RegistrationPage = () => {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({ name: '', surname: '', email: '', password: '' })
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        try {
            const users = JSON.parse(localStorage.getItem('users'))
            const userId = Date.now()
            const newUser = { id: userId, ...formValues }

            if (!users) {
                localStorage.setItem('users', JSON.stringify([newUser]))
                setModalMessage('Вы успешно зарегистрировались!')
                setModalVisible(true)
                return
            }

            if(users.find((user) => user.email === formValues.email)) {
                setModalMessage('Пользователь с таким email уже существует')
                setModalVisible(true)
                return
            }

            users.push(newUser)

            localStorage.setItem('users', JSON.stringify(users))
            
            setModalMessage('Вы успешно зарегистрировались!')
            setModalVisible(true)
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }    

    const disabled = !formValues.email || !formValues.password

    const onCloseModal = () => {
        setModalVisible(false)
        navigate('/auth')
    }

    return (
        <Container>
            <Typo>Страница регистрации</Typo>
            <Form onSubmit={onSubmit}>
                <Field>
                    <Input
                        type='text' 
                        name="name" 
                        value={formValues.name}
                        placeholder='Имя' 
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        type='text' 
                        name="surname" 
                        value={formValues.surname}
                        placeholder='Фамилия' 
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
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
                <Button type='submit' disabled={disabled}>Регистрация</Button>
            </Form>
            {modalVisible && (
                <Modal title={modalMessage}>
                    <Button onClick={onCloseModal}>Ок</Button>
                </Modal>
            )}
        </Container>
    )
}