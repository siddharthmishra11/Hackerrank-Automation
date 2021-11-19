//node hackerrank.js 
const puppeteer = require("puppeteer");
let minimist = require("minimist");
let arg = minimist(process.argv);
const ans = require("./code");
const link = "https://www.hackerrank.com/auth/login";
const email = arg.email;
const pw = arg.pw;
(async function(){
    try{
     const browserOpen = await puppeteer.launch(
 {  
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
 });
  let browserPages = await browserOpen.pages();
  let page = browserPages[0];
  let pageGoTo = await page.goto(link);
  await page.type("input[type = 'text']",email);
  await page.type("input[type = 'password']",pw);
  await page.click("button[type = 'submit']");
  await waitAndClick("a[data-attr1='algorithms']",page);
  await waitAndClick("input[value='warmup']",page);
  await page.waitFor(3000);
  let allQuesn = await page.$$("button.ui-btn.ui-btn-styled");
  await questnSolver(page,allQuesn[0],ans.answer[1]);
}
    catch(err){
        console.log(err);
    }
})();
// browserOpen.then(function(browser)
// {
//     let pageOpenPromise = browser.pages();
//     return pageOpenPromise;

// }).then(function(browserPages){
//     page = browserPages[0];
//     let pageGoTo = page.goto(link);
//     return pageGoTo;
// }).then(function(X)
// {
//     let keyWillSentPromise = page.type("input[type = 'text']",email);
//     return keyWillSentPromise;

// }).then(function()
// {
//     let keyWillSentPromise = page.type("input[type = 'password']",pw);
//     return keyWillSentPromise;

// }).then(function()
// {
//     let keyWillClickPromise = page.click("button[type = 'submit']");
//     return keyWillClickPromise;

// })
// .then(function()
// { 
//     return waitAndClick("a[data-attr1='algorithms']",page);
// })
// .then(function(){
 
//     return waitAndClick("input[value='warmup']",page);
// })
// .then(()=>{
//     return page.waitFor(3000);
// })
// .then(()=>{
//     return page.$$("button.ui-btn.ui-btn-styled");
// }).then((allQuesn)=>{
//     return questnSolver(page,allQuesn[0],ans.answer[0]);
  
// })
// .catch(function(err)
// {
//     console.log(err);
// })
async function waitAndClick(selector,cpage)
{
    await cpage.waitForSelector(selector);
    return await cpage.click(selector);     
}
async function emulateSelectAll(page) {
	await page.evaluate( () => {
		const isMac = /Mac|iPod|iPhone|iPad/.test( window.navigator.platform );

		document.activeElement.dispatchEvent(
			new KeyboardEvent( 'keydown', {
				bubbles: true,
				cancelable: true,
				key: isMac ? 'Meta' : 'Control',
				code: isMac ? 'MetaLeft' : 'ControlLeft',
				location: window.KeyboardEvent.DOM_KEY_LOCATION_LEFT,
				getModifierState: ( keyArg ) => keyArg === ( isMac ? 'Meta' : 'Control' ),
				ctrlKey: ! isMac,
				metaKey: isMac,
				charCode: 0,
				keyCode: isMac ? 93 : 17,
				which: isMac ? 93 : 17,
			} )
		);

		const preventableEvent = new KeyboardEvent( 'keydown', {
			bubbles: true,
			cancelable: true,
			key: 'a',
			code: 'KeyA',
			location: window.KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
			getModifierState: ( keyArg ) => keyArg === ( isMac ? 'Meta' : 'Control' ),
			ctrlKey: ! isMac,
			metaKey: isMac,
			charCode: 0,
			keyCode: 65,
			which: 65,
		} );

		const wasPrevented = (
			! document.activeElement.dispatchEvent( preventableEvent ) ||
			preventableEvent.defaultPrevented
		);

		if ( ! wasPrevented ) {
			document.execCommand( 'selectall', false, null );
		}

		document.activeElement.dispatchEvent(
			new KeyboardEvent( 'keyup', {
				bubbles: true,
				cancelable: true,
				key: isMac ? 'Meta' : 'Control',
				code: isMac ? 'MetaLeft' : 'ControlLeft',
				location: window.KeyboardEvent.DOM_KEY_LOCATION_LEFT,
				getModifierState: () => false,
				charCode: 0,
				keyCode: isMac ? 93 : 17,
				which: isMac ? 93 : 17,
			} ),
		);
	} );
}
async function questnSolver(page,quesn,answer)
{
    try{
        await quesn.click();
        await page.waitFor(3000);
        await waitAndClick(".monaco-scrollable-element.editor-scrollable.vs.mac",page); 
        await waitAndClick("input.checkbox-input",page);
        await page.waitForSelector("textarea[id='input-1']");
        await page.type("textarea[id='input-1']",answer,{delay:10});
        await emulateSelectAll(page);
        await page.evaluate( () => document.execCommand('cut') );
        await waitAndClick(".monaco-scrollable-element.editor-scrollable.vs.mac",page);
        await emulateSelectAll(page);
        await page.keyboard.down('Shift');
        await page.keyboard.down('Insert');
        await page.keyboard.up('Shift');
        await page.keyboard.up('Insert');
        return await page.click("button.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    }
    catch(err){
        console.log(err);
    }
    //    let clickProm = quesn.click();
    //    clickProm.then(()=>{
    //       return page.waitFor(3000);
    //    }).then(()=>{
    //        return waitAndClick(".monaco-scrollable-element.editor-scrollable.vs.mac",page); 
    //    }).then(()=>{
    //        return waitAndClick("input.checkbox-input",page);}
    //        ).then(()=>{
    //        return page.waitForSelector("textarea[id='input-1']");
    //    }).then(()=>{
    //        return page.type("textarea[id='input-1']",answer,{delay:10});
    //    }).then(()=>{
    //       return emulateSelectAll();
    //    }).then(()=>{
    //       return page.evaluate( () => document.execCommand('cut') );
    //    }).then(()=>{
    //       return waitAndClick(".monaco-scrollable-element.editor-scrollable.vs.mac",page);
    //    }).then(()=>{
    //       return emulateSelectAll();
    //    }).then(()=>{
    //       return page.keyboard.down('Shift');
    //    }).then(()=>{
    //       return page.keyboard.down('Insert');
    //    }).then(()=>{
    //       return page.keyboard.up('Shift');
    //    }).then(()=>{
    //       return page.keyboard.up('Insert');
    //    }).then(()=>{
    //      return page.click("button.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    //    })
    //    .then(()=>{
    //        resolve();
    //    })
    //    .catch(()=>{
    //        reject();
    //    })
   
    
}
