import { generateGqlResponse } from 'src/gql/graphql-response';
import { User } from '../user.entity';

export const GqlUserResponse = generateGqlResponse(User);
export const GqlUsersResponse = generateGqlResponse([User], true);
