const puppeteer = require('puppeteer');

(async function main(){
    try{
    
        const browser = await puppeteer.launch( { headless: false } ); // Mostrar o navegador
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

        await page.goto("https://web.whatsapp.com/");

        await page.waitForSelector("._3OvU8");

        await delay(1000);

        const contactName = "Alone"; //Inserir nome da conversa, sobistitua a palavra entre aspas duplas
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector("._ccCW");

        const editor = await page.$("div[tabindex= '-1']");
        await editor.focus();

        const amountMsgs = 9; // definir quantidade de mensagens enviadas, é sempre -1 do valor total pois o array começa do 0
        
        for(var i = 0; i <= amountMsgs; i++) {
            await page.evaluate(() => {
                const message = "Span de Mensagens no zap"
                document.execCommand('insertText', false, message);
            });

            await page.click("span[data-testid='send']");
            await delay(250);
        };

        await browser.close();


    } catch (err) {
        console.error("error mine", err);
    }

})();

function delay(time){

    return new Promise(function(resolve){
        setTimeout(resolve, time);
    });
}

