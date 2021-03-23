import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.style.scss';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState(
            { [name]: value }
        )

    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <div className="sign-in">
                <h2>I have allready an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" value={this.state.email} name="email" onChange={this.handleChange} required label="email" />

                    <FormInput type="password" name="password" value={this.state.password} onChange={this.handleChange} required label="password" />
                    <div className="buttons">
                        <CustomButton type="submit" >SIGN IN</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn type="button" >SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;