import { generateGqlResponse } from 'src/gql/graphql-response';
import { SecurityGroup } from '../security-group.entity';

export const GqlSecurityResponse = generateGqlResponse(SecurityGroup);
export const GqlSecurityArrayResponse = generateGqlResponse(
  [SecurityGroup],
  true,
);
