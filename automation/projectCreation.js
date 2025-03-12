import axios from "axios";
import base64 from "base-64";
import dotenv from 'dotenv';
dotenv.config();

// const { JIRA_URL, authHeader, axios } = require("./config");
const authHeader = `Basic ${base64.encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`)}`;

async function createProject(projectKey, projectName, projectType = "software") {
  try {
    const response = await axios.post(
      `${process.env.JIRA_BASE_URL}/rest/api/2/project`,
      {
        key: projectKey,
        name: projectName,
        projectTypeKey: projectType,
        leadAccountId: "your-lead-account-id", // Update this as needed
      },
      { headers: authHeader }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

module.exports = { createProject };
