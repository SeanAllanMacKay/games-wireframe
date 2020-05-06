import React from 'react';

import { emit } from '@reducers/sockets'

import { Form } from 'react-final-form'
import { Field, Button, Input } from '@components';

const onSubmit = async (values) => {
    console.log(values)
    emit('join-game', values)
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

                <Field
                    name="gameCode"
                    title="Game Code"
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
                    content="Join Game"
                    type="primary"
                />
            </div>
        )}
    />
);
