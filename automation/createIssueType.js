import axios from "axios";
import base64 from "base-64";
import dotenv from 'dotenv';
dotenv.config();

const authHeader = `Basic ${base64.encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`)}`;
async function createIssueType() {
    const url = `${process.env.JIRA_BASE_URL}/rest/api/2/issuetype`;

    const issueTypeData = {
        name: "Custom Issue Type",
        description: "A custom issue type for tracking critical defects",
        type: "standard"
    };

    try {
        const response = await axios.post(url, issueTypeData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            }
        });
        console.log("Issue Type Created Successfully:", response.data);
        
    } catch (error) {
        console.error("Error Creating Issue Type:", error.response ? error.response.data : error.message);
    }
}
createIssueType();
