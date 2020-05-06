import React from 'react';
import { Field } from 'react-final-form'

import { textColor, errorTextColor } from '@config/colors'

const requiredField = (value) => value ? undefined : 'Required'

export default ({ name, validate, title, input, style, actions, required }) =>  (
    <Field
        name={name}
        validate={validate ? validate : required ? requiredField : null}
        fieldSubscriptionItems={['active']}
        render={({ input: { value, onChange, onBlur }, meta: { active, touched, error } }) => (
            <div
                style={{
                    width: '100%',
                    ...style,
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 0 20px 0'
                }}
            >
                <h4
                    style={{
                        fontSize: '25px',
                        margin: '0 0 5px 0',
                        color: textColor
                    }}
                >
                    {title}
                </h4>
                {input({ value, onChange, onBlur })}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <p
                        style={{
                            color: errorTextColor,
                            fontSize: '25px',
                        }}
                    >
                        {touched && error}
                    </p>

                    {actions ?
                        <>
                            {actions}
                        </>
                        :
                        null
                    }
                </div>
            </div>
        )}
    />

);