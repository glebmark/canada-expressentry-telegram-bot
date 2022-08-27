import { Controller, Get, Param, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service'


@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService
    ) {}

  @Get('data')
  scrapeData() {
    return this.scraperService.scrapeData();
  }

}
