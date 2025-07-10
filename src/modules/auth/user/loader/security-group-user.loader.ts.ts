import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { NestDataLoader } from 'src/decorators/loader.decorator';
import { SecurityGroup } from '../../security-group/security-group.entity';

@Injectable()
export class SecurityGroupUserLoader implements NestDataLoader {
  constructor(
    @InjectRepository(SecurityGroup)
    private readonly securityGroupRepo: Repository<SecurityGroup>,
  ) {}

  generateDataLoader() {
    return new DataLoader<number, SecurityGroup | null>(async (securityGroupsIds: number[]) => {
      return this.findSecurityGroupsByIds(securityGroupsIds);
    });
  }

  private async findSecurityGroupsByIds(securityGroupsIds: number[]) {
    const securityGroups = await this.securityGroupRepo.findBy({
      id: In(securityGroupsIds),
    });
    const securityGroupsMap = new Map<number, SecurityGroup>();

    securityGroups.forEach((securityGroup) => {
      securityGroupsMap.set(securityGroup.id, securityGroup);
    });

    return securityGroupsIds.map((id) => securityGroupsMap.get(id) || null);
  }
}