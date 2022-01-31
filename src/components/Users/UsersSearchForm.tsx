import { Formik} from 'formik'
import React from 'react'
import {FilterType} from '../../Redux/usersReducer'
import {useSelector} from 'react-redux'
import {Form, Field, SubmitButton} from 'formik-antd'
import { AppStateType } from '../../Redux/redux-store'
const UsersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
    term: string
    friend: FriendFormType
}
export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const filter = useSelector((state: AppStateType) => state.usersPage.filter)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter:FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        console.log(filter)
        onFilterChanged(filter)
        setSubmitting(false)

    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={UsersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    {/*@ts-ignore*/}
                    <Field style={{width: "65%", border: '1px solid blue', marginRight: 10, outline: 'none'}} type="text" name="term"/>
                    {/*@ts-ignore*/}
                    <Field name="friend" as="select" style={{height: 26, width: "20%", border: '1px solid blue', marginRight: 10, outline: 'none'}}>
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    {/*@ts-ignore*/}
                    <SubmitButton  size={'small'} disabled={isSubmitting} style={{width: '10%'}}>
                        Find
                    </SubmitButton>
                </Form>
            )}
        </Formik>
    </div>
})