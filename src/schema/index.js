import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    rateLimitDirectiveTransformer,
    rateLimitDirectiveTypeDefs,
} from "../directives/rateLimit.js";
import resolvers from "./resolvers.js";

/**
 * Array of GraphQL type definitions including the @rateLimit directive and schema.
 *
 * @type {Array<string | import('graphql').DocumentNode>}
 */
const typeDefs = [
    rateLimitDirectiveTypeDefs,
    `# Rate limit: 1 request per 15 seconds (reduced from 60s for local testing; production intent was 1 request per minute)
      type Query @rateLimit(limit: 1, duration: 15) {
        books: [Book!]
        quote: String
      }
  
      type Book {
        title: String
        author: String
      }`,
];

// Create an executable schema with rate limiting directives
let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = rateLimitDirectiveTransformer(schema);

export default schema;
