const roleRequirements = {
  "Cloud Engineer": ["AWS", "Azure", "Linux", "Networking", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
  "DevOps Engineer": ["Git", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux", "Cloud", "Security", "Monitoring"],
  "Cybersecurity Analyst": ["Networking", "Linux", "Security", "Risk Management", "SIEM", "Incident Response", "Cloud Security", "Python"],
  "Software Developer": ["JavaScript", "APIs", "Databases", "Testing", "Git", "UI/UX", "Problem Solving", "Cloud Basics"],
  "Data Analyst": ["Python", "SQL", "Excel", "Power BI", "Statistics", "Data Cleaning", "Data Visualisation", "Communication"]
};

const learningActions = {
  AWS: "Complete a beginner AWS cloud lab and document it in your portfolio.",
  Azure: "Build a small Azure resource group and write a short setup guide.",
  Linux: "Practise basic Linux file, process, networking, and permission commands.",
  Networking: "Revise IP addressing, DNS, routing, firewalls, and HTTP basics.",
  Docker: "Containerise one small application and push the Dockerfile to GitHub.",
  Kubernetes: "Deploy a simple web app to a local Kubernetes cluster.",
  Terraform: "Create a basic infrastructure-as-code example using Terraform.",
  "CI/CD": "Create a Jenkins or GitHub Actions pipeline for a small project.",
  Monitoring: "Add a health endpoint, logs, and basic metrics to an application.",
  Git: "Use branches, pull requests, and meaningful commit messages.",
  Jenkins: "Create a Jenkinsfile with build, test, quality, and deploy stages.",
  Cloud: "Compare AWS, Azure, and GCP services used for web app deployment.",
  Security: "Run a dependency security scan and document the results.",
  "Risk Management": "Create a simple risk register for a sample IT system.",
  SIEM: "Explore how SIEM tools collect logs and detect suspicious activity.",
  "Incident Response": "Write a basic incident response checklist.",
  "Cloud Security": "Review IAM, MFA, encryption, and network security controls.",
  Python: "Create a small Python automation script and upload it to GitHub.",
  JavaScript: "Build a small interactive front-end feature using JavaScript.",
  APIs: "Create or test a REST API endpoint.",
  Databases: "Design a small database table or collection for a sample app.",
  Testing: "Write unit tests for at least two application functions.",
  "UI/UX": "Create a low-fidelity prototype for one user journey.",
  "Problem Solving": "Write a reflection explaining how you solved a technical issue.",
  "Cloud Basics": "Deploy a simple static or backend app to a cloud service.",
  SQL: "Write SELECT, JOIN, GROUP BY, and filtering queries on a dataset.",
  Excel: "Create a simple dashboard using formulas and charts.",
  "Power BI": "Create a Power BI dashboard from a cleaned dataset.",
  Statistics: "Revise mean, median, variance, correlation, and simple trends.",
  "Data Cleaning": "Clean a messy dataset and document each step.",
  "Data Visualisation": "Create charts that explain patterns in a dataset.",
  Communication: "Practise explaining a technical project in two minutes."
};

export function getRoles() {
  return Object.keys(roleRequirements);
}

function calculateReadiness(requiredSkills, userSkills) {
  const total = requiredSkills.length;
  const matched = requiredSkills.filter((skill) => Number(userSkills[skill] || 0) >= 3).length;

  return Math.round((matched / total) * 100);
}

export function generateRoadmap(targetRole, userSkills) {
  const requiredSkills = roleRequirements[targetRole];

  if (!requiredSkills) {
    return {
      targetRole,
      readinessScore: 0,
      missingSkills: [],
      priorityActions: [],
      message: "Target role not found. Please select a supported career role."
    };
  }

  const missingSkills = requiredSkills
    .filter((skill) => Number(userSkills[skill] || 0) < 3)
    .map((skill) => ({
      skill,
      currentLevel: Number(userSkills[skill] || 0),
      recommendedAction: learningActions[skill] || "Practise this skill with a small project."
    }));

  const readinessScore = calculateReadiness(requiredSkills, userSkills);

  return {
    targetRole,
    readinessScore,
    missingSkills,
    priorityActions: missingSkills.slice(0, 4),
    message:
      readinessScore >= 75
        ? "You are progressing well. Focus on portfolio evidence and interview preparation."
        : "You have useful foundations, but the roadmap highlights skills to strengthen before applying."
  };
}
