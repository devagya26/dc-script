import axios from "axios";
import base64 from "base-64";
import dotenv from 'dotenv';
dotenv.config();

const createJiraSubtask = async () => {
  const parentIssueKey = 'PARENT-123';  
  const projectKey = 'PROJ';  
  const subtaskIssueTypeId = '10003';  

  const authHeader = `Basic ${base64.encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`)}`;
  async function createJiraSubtask() {
  const url = `${process.env.JIRA_BASE_URL}/rest/api/2/issuetype`;
  
  const data = {
    fields: {
      summary: 'Subtask summary',
      issuetype: {
        id: subtaskIssueTypeId
      },
      parent: {
        key: parentIssueKey
      },
      project: {
        key: projectKey
      },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'Description of the subtask',
                type: 'text'
              }
            ]
          }
        ]
      }
    }  
  };    
  };

//   try {
//     const response = await axios.post(url, issueTypeData, {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": authHeader
//         }
//     });
//     console.log("Issue Type Created Successfully:", response.data);
    
// } catch (error) {
//     console.error("Error Creating Issue Type:", error.response ? error.response.data : error.message);
// }

  try {
    const response = await axios.post(url, issueTypeData, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader
      }
    });

    console.log('Subtask created successfully:', response.data);
  } catch (error) {
    console.error('Error creating subtask:', error.response ? error.response.data : error.message);
  }
};

createJiraSubtask();
