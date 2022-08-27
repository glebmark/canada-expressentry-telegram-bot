import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
//   imports: [
//     UserModule,
//     QuestModule,
//   ],
  controllers: [
    ScraperController,
  ],
  providers: [
    ScraperService
  ],
//   exports: [BuildingService, MagicGuildService],
})
export class ScraperModule {}
