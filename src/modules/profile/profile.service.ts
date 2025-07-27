import { Injectable, Logger } from '@nestjs/common';
import { CardPointeApiService } from '../../common/services';
import { ProfileEntity } from '../../common/entities';
import { CreateUpdateProfileDto } from '../../common/services/card-pointe/dtos';

@Injectable()
export class ProfileService {
  private logger: Logger;
  constructor(private readonly cardPointeApiService: CardPointeApiService) {
    this.logger = new Logger(ProfileService.name);
  }

  async createOrUpdateProfile(
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileEntity> {
    const profile: ProfileEntity =
      await this.cardPointeApiService.createOrUpdateProfile(
        createUpdateProfileDto,
      );
    this.logger.log(`profile ${JSON.stringify(profile)}`);
    return profile;
  }
}
