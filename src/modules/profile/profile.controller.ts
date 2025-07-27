import { Body, Controller, Post } from '@nestjs/common';
import { CreateUpdateProfileDto } from '../../common/services/card-pointe/dtos';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createOrUpdateProfile(
    @Body() createUpdateProfileDto: CreateUpdateProfileDto,
  ) {
    return this.profileService.createOrUpdateProfile(createUpdateProfileDto);
  }
}
