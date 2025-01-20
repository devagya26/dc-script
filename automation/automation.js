import { chromium } from 'playwright';
import { utils } from "./utils.js"
import { selector } from "./variables.js";
import fs from 'fs';
import path from "path";

(async () => {
    const file = path.resolve("./issues_data.json");
    const issueData = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext();
    const page = await context.newPage();

    //login
    await utils.login(page);

    //create project
    await utils.createProject(page);

    //Navigate to Create Issue form
    await page.getByRole(selector.button, { name: selector.create, exact: true }).click();
    for (const issue of issueData) {

    //Select issue type
    await page.getByLabel(selector.issueTypeReq).click();
    await page.getByLabel(selector.issueTypeReq).fill(issue.type);
    await page.getByLabel(selector.issueTypeReq).press('Enter');

    //If Epic Selected in Issue Type
    if (issue.type.toLowerCase() === 'epic' && issue.type) { 
        await page.locator(selector.epicFill).fill(issue.epicName);
    }

    //Fill in issue details
    await page.getByLabel(selector.summaryReq).fill(issue.summary);

    //Description
    await page.locator(selector.description).contentFrame().getByRole(selector.paragraph).click();
    await page.locator(selector.description).contentFrame().getByLabel(selector.richTextArea).fill(issue.description);

    // try {
    //     await page.locator(selector.description).contentFrame().getByRole(selector.paragraph).click();
    //     await page.locator(selector.description).contentFrame().getByLabel(selector.richTextArea).fill(issue.description);
    // } catch (error) {
    //     console.error("First selector failed. Trying the fallback selector...");
    //     await page.frameLocator(selector.des).locator('html').click();
    //     await page.frameLocator(selector.des).getByLabel(selector.richTextArea).fill(issue.description);
    // }

    // await page.frameLocator(selector.des).locator('html').click();
    // await page.frameLocator(selector.des).getByLabel(selector.richTextArea).fill(issue.description);

    // if (issue.type === 'bug') {
    //     await page.frameLocator(selector.des).locator('html').click();
    //     await page.frameLocator(selector.des).getByLabel(selector.richTextArea).fill(issue.description);
    // } else {
    //     await page.locator(selector.description).contentFrame().getByRole(selector.paragraph).click();
    //     await page.locator(selector.description).contentFrame().getByLabel(selector.richTextArea).fill(issue.description);
    // }

    //select Priority
    await page.getByRole(selector.combox, { name: selector.priority }).click();
    await page.getByRole(selector.combox, { name: selector.priority }).fill(issue.priority);

    //Linked Issues
    if (issue.linked && issue.key) {
        await page.locator(selector.issueLink).click();
        await page.locator(selector.issueLink).selectOption(issue.linked);
        await page.getByLabel('Issue', { exact: true }).click();
        await page.getByLabel('Issue', { exact: true }).fill(issue.key);
        await page.locator(selector.issueTag).click();
    } 

    //Submit the issue form
    await page.getByLabel(selector.createAnother).check();
    await page.getByTitle(selector.submitButton).click();
    }

    // await browser.close();
    await page.pause();
})();