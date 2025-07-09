import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSecurityInput, FindOrCreateSecurityInput } from './input/create-group.input';
import { SecurityGroup } from './security-group.entity';


@Injectable()
export class SecurityGroupService {
  constructor(
    @InjectRepository(SecurityGroup)
    private readonly securityRepo: Repository<SecurityGroup>,
  ) {}
  async findOrCreate(input: FindOrCreateSecurityInput): Promise<SecurityGroup> {
    let securityGroup = await this.securityRepo.findOne({
      where: {
        groupName: 'superAdmin',
      },
    });
    if (!securityGroup) {
      securityGroup = await this.createSecurityGroup(input);
    }
    return securityGroup;
  }

  async createSecurityGroup(input: CreateSecurityInput) {
    const newSecurityGroup = this.securityRepo.create(input);
    return await this.securityRepo.save(newSecurityGroup);
  }

  async getSecurityGroups() {
    return await this.securityRepo.find();
  }

  async findOneById(id: number) {
    return await this.securityRepo.findOneBy({ id });
  }
}
