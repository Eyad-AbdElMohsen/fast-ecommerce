import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { Repository, In } from 'typeorm';
import { User } from '../user.entity';
import { NestDataLoader } from 'src/decorators/loader.decorator';

@Injectable()
export class UserLoader implements NestDataLoader {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  generateDataLoader(): DataLoader<number, User[]> {
    return new DataLoader<number, User[]>(
      async (securityGroupIds: number[]) => {
        return this.findUsersBySecurityGroupIds(securityGroupIds);
      },
    );
  }

  private async findUsersBySecurityGroupIds(
    securityGroupIds: number[],
  ): Promise<User[][]> {
    const users = await this.userRepo.find({
      where: {
        securityGroupId: In(securityGroupIds),
      },
    });

    const userMap = new Map<number, User[]>();

    for (let user of users) {
      if (!user.securityGroupId) continue;

      if (!userMap.has(user.securityGroupId)) {
        userMap.set(user.securityGroupId, []);
      }
      
      userMap.get(user.securityGroupId)!.push(user);
    }

    return securityGroupIds.map((id) => userMap.get(id) || []);
  }
}
