import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CardPointeApiService } from '../../common/services';

@Module({
  imports: [HttpModule],
  controllers: [ProfileController],
  providers: [ProfileService, CardPointeApiService],
})
export class ProfileModule {}
