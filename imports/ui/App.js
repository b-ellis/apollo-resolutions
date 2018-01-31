import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';

const App = ({ loading, resolutions, client, user }) => {
    if(loading == true){
        return null
    } else {
        return (
        <div>
            { user._id ? (
                <button onClick={() => {
                    Meteor.logout();
                    client.resetStore();
                }}
                >
                    Logout
                </button>
            ) : (
                <div>
                    <LoginForm client={client} />
                    <RegisterForm client={client} />
                </div>
            ) }
            <ResolutionForm />
            <ul>
                {resolutions.map(resolution => (
                    <li key={resolution._id}>
                    {resolution.name}
                    <GoalForm resolutionId={resolution._id} />
                    </li>
                ))}
            </ul>
        </div>)
    }
};

const resolutionsQuery = gql`
    query Resolutions {
        resolutions{
            _id
            name
        }
        user{
            _id
        }
    }
`;

export default graphql(resolutionsQuery, {
    props: ({ data }) => ({...data})
})(withApollo(App));