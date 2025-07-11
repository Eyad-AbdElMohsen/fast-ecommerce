import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { NestDataLoader } from 'src/decorators/loader.decorator';

export const GET_LOADER_CONTEXT_KEY: string = 'GET_LOADER_CONTEXT_KEY';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}

  /**
   * @inheritdoc
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const graphqlExecutionContext: GraphQLExecutionContext =
      GqlExecutionContext.create(context);
    const ctx: any = graphqlExecutionContext.getContext();

    if (ctx[GET_LOADER_CONTEXT_KEY] === undefined) {
      ctx[GET_LOADER_CONTEXT_KEY] = (type: string): NestDataLoader => {
        if (ctx[type] === undefined) {
          try {
            ctx[type] = this.moduleRef
              .get<NestDataLoader>(type, { strict: false })
              .generateDataLoader();
          } catch (e) {
            throw new InternalServerErrorException(
              `The loader ${type} is not provided`,
            );
          }
        }
        return ctx[type];
      };
    }

    return next.handle();
  }
}
