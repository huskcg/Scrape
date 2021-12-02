const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null})
    const page = await browser.newPage()
    
    await page.goto('https://vieclam24h.vn/taikhoan/login_ntd');

    const navigationPromise = page.waitForNavigation();

    
    await page.type('input[name="email"]', 'huskcgclone@gmail.com');
    await page.type('input[name="password"]', '8b@tzCWwTgEWd9b');
    await page.click('button[type="submit"]');
    
    await navigationPromise
    
    // Click
    await page.waitForSelector('i[class="icon-searchUser fs-44"]');
    await page.click('i[class="icon-searchUser fs-44"]');

    // Click
    await page.waitForSelector('i[class="jsx-3076173449 icon-left icon-search"]');
    await page.click('i[class="jsx-3076173449 icon-left icon-search"]');

    // await page.waitForSelector('div[class="box-list-job"]>ul>li[class="jsx-2853556610"]>div[class="jsx-2853556610 job-box"]>div[class="jsx-2853556610 job-row"]>div[class="jsx-2853556610 job-cnt"]')
    await page.waitForSelector('div[class="jsx-2853556610 candi-name truncate-ellipsis"]');
    
    const pageTarget = page.target();
    await page.click('div[class="jsx-2853556610 candi-name truncate-ellipsis"]');
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
    const newPage = await newTarget.page();
    const detailCV = await newPage.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('.jsx-505050862.fs-24')
        // let items = document.querySelectorAll('script[type="application/json"]')
        items.forEach((item) => {
            results.push({
                name: item.innerText,
            });
        });
        return results;
    })


    // const text = await page.evaluate(() => Array.from(document.querySelectorAll('span[class="jsx-2853556610 ml-1 align-middle effect-basic-job"]'), element => element.textContent));
    // await page.click('div.box-list-job > ul > li.');
    // console.log(text[0]);
    // console.log(text[19]);
    // console.log(text[20]);
    
    // const examples = await page.$$('div[class="jsx-2853556610 candi-name truncate-ellipsis"]');
    // console.log(examples.length);
    // console.log(typeof(examples));
    // for (var i=0; i<examples.length; i++) {
    //     await examples[i].click();

    //     await page.evaluate(() => {
    //         let results = [];
    //         let items = document.querySelectorAll('div.jsx-505050862 media-body > h4');
    //         items.forEach((item) => {
    //             results.push({
    //                 text: item.innerText
    //             });
    //         });
    //         return results;
    //     });
    // }

    // await examples[4].click();
    


    // await page.evaluate(() => {
    //     let elements = document.querySelectorAll('.box-list-job ul li.jsx-2853556610');
    //     // alert(elements.length);
        
    //     for (var i = 0; i < elements.length; i++) {
    //         elements[i].click();
    //     }
        
    //  });
    console.log(detailCV);
    console.log(page.url());

    // await browser.close()
   })()