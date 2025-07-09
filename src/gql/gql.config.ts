import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { JwtPayload } from 'src/types/jwt.type';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataLoaderService } from 'src/dataloader/dataloader.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory<ApolloDriverConfig> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataloaderService: DataLoaderService,
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      context: ({ req, res }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        let currentUser: {
          id: number;
          email: string;
          role: string;
          securityGroupId?: number | null;
        } | null = null;

        if (token) {
          try {
            const payload = this.jwtService.verify(token) as JwtPayload;
            currentUser = {
              id: payload.sub,
              email: payload.email,
              role: payload.role,
              securityGroupId: payload.securityGroupId || null,
            };
          } catch (err) {
            console.warn('Invalid JWT:', err.message);
          }
        }

        return {
          req,
          res,
          currentUser,
          loaders: this.dataloaderService.createLoaders(),
        };
      },
      formatError: (error) => ({
        message: error.message,
        extensions: {
          code: error.extensions?.code || 500,
          success: error.extensions?.success ?? false,
        },
      }),
    };
  }
}
