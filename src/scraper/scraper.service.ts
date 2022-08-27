import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  constructor(
    // @InjectRepository(Building)
    // private buildingRepository: Repository<Building>,
  ) {}

  scrapeData = async () => {

        return new Promise(async (resolve, reject) => {
            try {
                console.log('started')
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                // TODO move url to DB
                const initURL = "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"

                await page.goto(initURL);
                
                // TODO move most nested selector to DB
                await page.waitForSelector('.sorting_1')
                
                let data = await page.evaluate(() => {

                    let allTableRowsHTMLElement = document.querySelectorAll('tr');

                    const allTableRows = [...allTableRowsHTMLElement];

                    // TODO add if statement between 76 and 77 draws, they are different
                    const result = allTableRows.map(tr => {
                        const tableRowRawDirty = [...tr.childNodes]
                        // TODO refactor to regExp
                        const tableRowRaw = tableRowRawDirty.filter(td => td.textContent !== '\n\t\t  ' && td.textContent !== '\n\t\t') 

                        const tableRow = tableRowRaw.map(td => {
                            return td.textContent
                        })

                        // TODO remove first result, it's note draw!
                        return {
                            // row: tableRow
                            drawIndex: tableRow[0] ? tableRow[0] : null, // TODO toNumber
                            date: tableRow[1] ? tableRow[1] : null, // TODO check how save date to postgres properly
                            program: tableRow[2] ? tableRow[2] : null,
                            invitations: tableRow[3] ? tableRow[3] : null,  // TODO toNumber
                            lowestCRS: tableRow[4] ? tableRow[4] : null,  // TODO toNumber
                            url: `https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds/invitations.html?q=${tableRow[0] ? tableRow[0] : null}`, // TODO toNumber
                            // TODO change url field to virtual typeORM field, calculate on runtime from drawIndex and new url field in scraperSettings table
                        }
                    })

                    return result;
                })
                browser.close();

                console.log(data)
                console.log('done')

                // TODO add checks if data is valid, because if in future EE Canada will change structure of table, it would break DB
                return resolve(data);
            } catch (e) {
                return reject(e);
            }
        })    
    }
}
