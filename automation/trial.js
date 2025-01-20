import { chromium } from 'playwright';
import { utils } from "./utils.js"
import { selector } from "./variables.js";
import fs from 'fs';
import path from "path";

(async () => {
    const file = path.resolve("./issues_data.json");
    const issueData = JSON.parse(fs.readFileSync(file, 'utf-8'));

    // Launch browser
    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext();
    const page = await context.newPage();

    // iFrame
    // const iframe = page.frame({
    //     url: selector.src
    // }); 
    // const iframe = page.frameLocator(selector.src);

    //login
    await utils.login(page);

    //create project
    await utils.createProject(page);

    // //creating Issue Card : EPICs
    // await utils.epic1(page);
    // await utils.epic2(page);
    // //creating Issue Card : TASKS
    // await utils.task1(page);
    // await utils.task2(page);
    // await utils.task3(page);
    // await utils.task4(page);
    // await utils.task5(page);
    // await utils.task6(page);

    // //creating Issue Card : STORY
    // await utils.story1(page);
    // await utils.story2(page);
    // await utils.story3(page);
    // await utils.story4(page);
    // await utils.story5(page);
    // await utils.story6(page);

    // await utils.bug1(page);

    // Navigate to Create Issue form
    await page.getByRole(selector.button, { name: selector.create, exact: true }).click();
    for (const issue of issueData) {

    // Select issue type
    await page.getByLabel(selector.issueTypeReq).click();
    await page.getByLabel(selector.issueTypeReq).fill(issue.type);
    await page.getByLabel(selector.issueTypeReq).press('Enter');

    // Fill in issue details
    await page.getByLabel(selector.summaryReq).fill(issue.summary);
    
    // if (page.locator(selector.description)){
    //     await page.locator(selector.description).contentFrame().getByLabel(selector.richTextArea).fill(issue.description);
    // } else {
    //     await page.locator(selector.des).contentFrame().getByLabel(selector.richTextArea).fill(issue.description);
    // }
    // await page.locator(selector.description).contentFrame().getByLabel(selector.richTextArea).fill(issue.description); 
    // await page.locator(selector.des).contentFrame().getByLabel(selector.richTextArea).fill(issue.description);

    // try {
    //     await page.locator(selector.description).contentFrame().getByLabel(selector.richTextArea).fill(issue.description); 
    // } catch (error) {
    //     await page.locator(selector.des).contentFrame().getByRole(selector.paragraph).fill(issue.description);
    // }

    // await page.locator(selector.des).contentFrame().getByRole(selector.paragraph).fill(issue.description);
    // await iframe.locator(selector.des).fill(issue.description); 

    //Description
    await page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph').click();
    await page.locator('iframe[title="Rich Text Area"]').contentFrame().getByLabel('Description, Rich Text Area.').fill(issue.description);

    //select Priority
    await page.getByRole(selector.combox, { name: selector.priority }).click();
    await page.getByRole('option', { name: issue.priority }).click();

    // await page.getByRole(selector.combox, { name: selector.priority }).press('Enter');

    // Linked Issues
    // await page.locator('#issuelinks-linktype').selectOption('is blocked by');
    // await page.getByLabel('Issue- . Begin typing to').click();
    // await page.getByLabel('Issue- . Begin typing to').fill('PROJ-2');

    // await page.locator('#issuelinks-linktype').selectOption('is blocked by');
    // await page.getByLabel('Issue- . Begin typing to').click();
    // await page.getByLabel('Issue- . Begin typing to').fill('Proj-1');

    // // // Submit the issue form
    await page.getByLabel(selector.createAnother).check();
    await page.getByTitle(selector.submitButton).click();

    // Wait for the issue to be created
    await page.waitForTimeout(2000); // Adjust this timeout as needed
    }
    
    await page.pause();

    // await browser.close();
})();