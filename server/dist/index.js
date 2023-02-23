import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './utils/resolvers.js';
import { typeDefs } from './utils/graphqlTypes.js';
import './services/db.js';
const server = new ApolloServer({ typeDefs, resolvers });
startStandaloneServer(server, {
    listen: { port: 4000 }
}).then(() => console.log(`Server ready`));
