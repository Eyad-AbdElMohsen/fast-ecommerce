import { Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */
}
