import React from 'react'
import {Form, Input, SubmitButton} from 'formik-antd'
import {Formik} from 'formik'

// const maxLength300 = maxLength(300)
type PropsType = {
    onSubmit: (id: number,values: any) => void
    id: number
}

export const SendMessageForm: React.FC<PropsType> = ({id, onSubmit}) => {
    const submit = (values: {body: string}, actions:any) => {
        onSubmit(id, values.body)
        actions.setSubmitting(false)
        actions.resetForm({values: ''})
    }
    return (
        <Formik
            onSubmit={submit}
            initialValues={{ body: '' }}>
            {({isSubmitting}) => (
                <Form style={{display: 'flex'}}>
                    <Input.TextArea rows={4} name='body' placeholder='Message' style={{background: 'none', resize: 'none', marginBottom: 10}}/>
                    <SubmitButton disabled={isSubmitting} style={{height: 98,  wordWrap: 'break-word'}}>
                        Send Message
                    </SubmitButton>
                </Form>
            )}
        </Formik>
    )
}
