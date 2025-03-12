const projectConfig = {
  projectId: "Project_1",
  issues: {
    Epic: 14,     
    Story: 10,   
    Task: 8,     
    Bug: 7       
  },
  maxNoOfChildIssuesPerEpic: 5, 
  maxNoOfLinksPerIssue: 5,      
  maxNoOfSubtasksPerTask: 3,    
};

function seededRandom(seed) {
  let value = seed;
  return function () {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function generateDatabaseWithSeed(seed, items) {
  const random = seededRandom(seed); 
  const linkedOptions = ["relates to", "is duplicated by", "is blocked by", "duplicates", "blocks", "clones", "is cloned by"]; 
  const proj = "PM"; 
  let issueCount = 0; 
  let createdIssues = []; 

  let issueCounts = {};

  return items
    .map((item) => {
      if (projectConfig.issues[item.type] !== undefined) {
        issueCounts[item.type] = (issueCounts[item.type] || 0) + 1;
        if (issueCounts[item.type] > projectConfig.issues[item.type]) {
          return null; 
        }
      } //limiting issue type

      issueCount++;
      const issueKey = `${proj}-${issueCount}`;
      createdIssues.push(issueKey); 

      // Get only existing issues for linking
      const availableKeys = [...createdIssues];

      // Generate multiple link types (2-3 per issue)
      const numLinkTypes = Math.floor(random() * 2) + 2;
      const selectedLinkTypes = [];
      while (selectedLinkTypes.length < numLinkTypes) {
        const linkTypeName = linkedOptions[Math.floor(random() * linkedOptions.length)];
        if (!selectedLinkTypes.includes(linkTypeName)) {
          selectedLinkTypes.push(linkTypeName);
        }
      }

      // Generate unique links per link type using only created issues
      const links = selectedLinkTypes.map((linkType) => {
        let numKeys = Math.floor(random() * projectConfig.maxNoOfLinksPerIssue) + 1;
        numKeys = Math.min(numKeys, projectConfig.maxNoOfLinksPerIssue, availableKeys.length);

        const keys = [];
        while (keys.length < numKeys) {
          const randomKey = availableKeys[Math.floor(random() * availableKeys.length)];
          if (!keys.includes(randomKey)) {
            keys.push(randomKey);
          }
        }

        return {
          linkTypeName: linkType,
          issueRefs: keys, 
        };
      });

      // Assign child issues only if the item is an Epic
      let childIssueRefs = [];
      if (item.type === "Epic") {
        const maxChildIssues = projectConfig.maxNoOfChildIssuesPerEpic;
        childIssueRefs = availableKeys.slice(0, Math.floor(random() * Math.min(availableKeys.length, maxChildIssues)));
      }

      // Assign subtasks if the item is a Task, Story, or Bug
      let subtaskRefs = [];
      if (["Task", "Story", "Bug"].includes(item.type)) {
        const maxSubtasks = projectConfig.maxNoOfSubtasksPerTask;
        subtaskRefs = availableKeys.slice(0, Math.floor(random() * Math.min(availableKeys.length, maxSubtasks)));
      }

      return {
        key: issueKey, 
        fields: {
          summary: item.summary,
          description: item.description,
          type: item.type,
          priority: item.priority,
        },
        projectRef: proj,
        links, 
        ...(item.type === "Epic" && { childIssueRefs }), 
        ...(subtaskRefs.length > 0 && { subtaskRefs }), 
      };
    })
    .filter(Boolean); 
}


const items = [
  {
    "epicName": "Epic 1",
    "summary": "Implement Core Feature",
    "description": "Development of the core feature set for the application.",
    "type": "Epic",
    "priority": "Custom Priority"
  },
  {
    "epicName": "Epic 2",
    "summary": "Enhance User Interface",
    "description": "Improvement of the user interface for better user experience.",
    "type": "Epic",
    "priority": "High"
  },
  {
    "epicName": "Epic 3",
    "summary": "Integrate Payment Gateway",
    "description": "Integration with third-party payment gateway.",
    "type": "Epic",
    "priority": "High"
  },
  {
    "epicName": "Epic 4",
    "summary": "Optimize Database",
    "description": "Performance optimization for database queries.",
    "type": "Epic",
    "priority": "Custom Priority"
  },
  {
    "epicName": "Epic 5",
    "summary": "Improve Security",
    "description": "Implementation of enhanced security features.",
    "type": "Epic",
    "priority": "High"
  },
  {
    "epicName": "Epic 6",
    "summary": "Excess Epic",
    "description": "This epic should be skipped.",
    "type": "Epic",
    "priority": "Medium"
  },
  {
    "epicName": "Epic 7",
    "summary": "Excess Epic",
    "description": "This epic should be skipped.",
    "type": "Epic",
    "priority": "Medium"
  },
  {
    "epicName": "Epic 8",
    "summary": "Implement Core Feature",
    "description": "Development of the core feature set for the application.",
    "type": "Epic",
    "priority": "Custom Priority"
  },
  {
    "epicName": "Epic 9",
    "summary": "Enhance User Interface",
    "description": "Improvement of the user interface for better user experience.",
    "type": "Epic",
    "priority": "High"
  },
  {
    "epicName": "Epic 10",
    "summary": "Integrate Payment Gateway",
    "description": "Integration with third-party payment gateway.",
    "type": "Epic",
    "priority": "High"
  },
  {
    "epicName": "Epic 11",
    "summary": "Optimize Database",
    "description": "Performance optimization for database queries.",
    "type": "Epic",
    "priority": "Custom Priority"
  },
  {
    "epicName": "Epic 12",
    "summary": "Improve Security",
    "description": "Implementation of enhanced security features.",
    "type": "Epic",
    "priority": "High"
  },
  {
    "epicName": "Epic 13",
    "summary": "Excess Epic",
    "description": "This epic should be skipped.",
    "type": "Epic",
    "priority": "Medium"
  },
  {
    "epicName": "Epic 14",
    "summary": "Excess Epic",
    "description": "This epic should be skipped.",
    "type": "Epic",
    "priority": "Medium"
  },
  {
    "summary": "Design wireframes for new feature",
    "type": "Bug",
    "priority": "High",
  },
  {
    "summary": "Design wireframes for new feature",
    "type": "Bug",
    "priority": "High",
  },
  {
    "summary": "Design wireframes for new feature",
    "description": "Create wireframes for the new feature in Epic 1.",
    "type": "Task",
    "priority": "High",
  },
  {
    "summary": "Develop feature module",
    "description": "Develop the module based on the wireframes.",
    "type": "Story",
    "priority": "High",
  },
  {
    "summary": "Test feature module",
    "description": "Conduct testing on the developed module.",
    "type": "Task",
    "priority": "Medium",
  },
  {
    "summary": "Improve navigation UI",
    "description": "Enhance navigation UI as part of Epic 2.",
    "type": "Story",
    "priority": "Medium",
  },
  {
    "summary": "Update CSS styles",
    "description": "Ensure CSS styles are consistent.",
    "type": "Task",
    "priority": "Low",
  },
  {
    "summary": "Develop feature module",
    "description": "Develop the module based on the wireframes.",
    "type": "Story",
    "priority": "High",
  },
  {
    "summary": "Test feature module",
    "description": "Conduct testing on the developed module.",
    "type": "Task",
    "priority": "Medium",
  },
  {
    "summary": "Improve navigation UI",
    "description": "Enhance navigation UI as part of Epic 2.",
    "type": "Story",
    "priority": "Medium",
  },
  {
    "summary": "Update CSS styles",
    "description": "Ensure CSS styles are consistent.",
    "type": "Task",
    "priority": "Low",
  },
  {
    "summary": "Develop feature module",
    "description": "Develop the module based on the wireframes.",
    "type": "Story",
    "priority": "High",
  },
  {
    "summary": "Test feature module",
    "description": "Conduct testing on the developed module.",
    "type": "Task",
    "priority": "Medium",
  },
  {
    "summary": "Improve navigation UI",
    "description": "Enhance navigation UI as part of Epic 2.",
    "type": "Story",
    "priority": "Medium",
  },
  {
    "summary": "Update CSS styles",
    "description": "Ensure CSS styles are consistent.",
    "type": "Task",
    "priority": "Low",
  },
  {
    "summary": "Test feature module",
    "description": "Conduct testing on the developed module.",
    "type": "Task",
    "priority": "Medium",
  },
  {
    "summary": "Improve navigation UI",
    "description": "Enhance navigation UI as part of Epic 2.",
    "type": "Story",
    "priority": "Medium",
  },
  {
    "summary": "Update CSS styles",
    "description": "Ensure CSS styles are consistent.",
    "type": "Task",
    "priority": "Low",
  }
];

const seed = 42;
const processedItems = generateDatabaseWithSeed(seed, items);
console.dir(processedItems, { depth: null });
