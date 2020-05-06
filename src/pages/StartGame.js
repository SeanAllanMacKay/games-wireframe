import React from 'react';

import { emit } from '@reducers/sockets'

import { Form } from 'react-final-form'
import { Field, Button, Input } from '@components';

const onSubmit = async (values) => {
    emit('start-game', values)
}

export default () => (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Field
                    name="name"
                    title="Name"
                    required
                    input={({ value, onChange, onBlur }) => (
                        <Input
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />

                <Button
                    onClick={() => handleSubmit()}
                    content="Start Game"
                    type="primary"
                />
            </div>
        )}
    />
);
