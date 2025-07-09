import { Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */
}
