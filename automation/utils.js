import { selector } from "./variables.js";
import dotenv from 'dotenv';
dotenv.config();

export const utils = {
    async login(page) {
        await page.goto(process.env.LOGIN_URL || "");
        await page.getByRole(selector.link, { name: 'Log In', exact: true }).click();
        await page.getByLabel(selector.usernameInput).fill(process.env.JIRA_USERNAME || "");
        await page.getByTestId(selector.passwordInput).fill(process.env.JIRA_PASSWORD || "");
        await page.getByTestId(selector.loginButton).click();
    },

    async loginCred(page) {
        await page.goto(process.env.LOGIN_LINKS || "");
        await page.getByRole(selector.link, { name: 'Log In', exact: true }).click();
        await page.getByLabel(selector.usernameInput).fill(process.env.JIRA_USERNAME || "");
        await page.getByTestId(selector.passwordInput).fill(process.env.JIRA_PASSWORD || "");
        await page.getByTestId(selector.loginButton).click();

        await page.locator("//a[@id='link-issue-tab-panel-link']").click();
    },

    async createProject(page){
        await page.getByRole(selector.button, { name: selector.projects }).click();
        await page.getByRole(selector.link, { name: selector.createProject }).click();
        await page.getByRole(selector.button, { name: selector.next }).click();
        await page.getByRole(selector.button, { name: selector.select }).click();
        await page.getByLabel(selector.name).fill('project-management');
        await page.getByRole(selector.button, { name: selector.submit }).click();
        await page.getByRole(selector.button, { name: selector.submit }).click();
    }
};