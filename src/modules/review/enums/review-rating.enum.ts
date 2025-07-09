import { registerEnumType } from '@nestjs/graphql';

export enum ReviewRatingEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}
registerEnumType(ReviewRatingEnum, {
  name: 'ReviewRating',
});
