import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityGroup } from './security-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SecurityGroupService {
  constructor(
    @InjectRepository(SecurityGroup)
    private readonly securityGroupRepository: Repository<SecurityGroup>,
  ) {}
}
