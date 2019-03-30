import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

export interface ValidationTextFieldProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isValid: (value: string) => boolean;
    value: string;
    defaultLabel: string;
    errorLabel: string;
}

export interface ValidationTextFieldState {
    error: boolean;
}

class ValidationTextField extends Component<ValidationTextFieldProps & TextFieldProps, ValidationTextFieldState> {

    state: ValidationTextFieldState = {
        error: false
    };

    onBlur = (event: ChangeEvent<HTMLInputElement>) => {
        const { isValid } = this.props;
        const input = event.target.value;
        const error = input && !isValid(input);
        this.setState({ error });
    };

    render() {
        const { error } = this.state;
        const { onChange, value, defaultLabel, errorLabel, ...rest } = this.props;
        const labelText = error ? errorLabel : defaultLabel;
        return (
            <TextField
                error={error}
                label={labelText}
                value={value}
                onChange={onChange}
                onBlur={this.onBlur}
                {...rest}
            />
        );
    }
}

export default ValidationTextField;