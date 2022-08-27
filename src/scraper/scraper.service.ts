import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  constructor(
    // @InjectRepository(Building)
    // private buildingRepository: Repository<Building>,
  ) {}

  scrapeData = async () => {
    function run () {
        return new Promise(async (resolve, reject) => {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                // TODO move url to DB
                const initURL = "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"

                await page.goto(initURL);
                
                // TODO move most nested selector to DB
                await page.waitForSelector('.sorting_1')
                
                let data = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('a');

                    items.forEach((item) => {
                        if(item.innerHTML === '219')
                        results.push({
                            url:  item.getAttribute('href'), // TODO save this URLs in DB
                            text: item.innerHTML,
                        })
                    })



                    return results;
                })
                browser.close();
                console.log(data)
                return resolve(data);
            } catch (e) {
                return reject(e);
            }
        })
    }
    run()
    // .then(console.log).catch(console.error);

    
}

  
}
