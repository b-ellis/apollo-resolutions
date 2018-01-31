import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default class LoginForm extends Component {

    registerUser = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(this.email.value, this.password.value, 
            (error) => {
                if(!error){
                    this.props.client.resetStore();
                }
                console.log(error);
            }
        );
    }

    render() {
        return (
            <div>
                <form type='text' onSubmit={this.registerUser}>
                    <input type='email' ref={input => (this.email = input)} />
                    <input type='password' ref={input => (this.password = input)} />
                    <button type='submit'>Login User</button>
                </form>
            </div>
        )
    }
}