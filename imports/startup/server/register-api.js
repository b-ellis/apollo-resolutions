import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

const testSchema = `
type Query {
    hi: String
    resolutions: [Resolution]
}
`

const typeDefs = [
    testSchema,
    ResolutionsSchema
];

const resolver = {
    Query: {
        hi() {
            return "Hello World";
        },
    }
}

const resolvers = merge(
    resolver,
    ResolutionResolvers
)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

createApolloServer({ schema });