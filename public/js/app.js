const skillsByRole = {
  "Cloud Engineer": ["AWS", "Azure", "Linux", "Networking", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
  "DevOps Engineer": ["Git", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux", "Cloud", "Security", "Monitoring"],
  "Cybersecurity Analyst": ["Networking", "Linux", "Security", "Risk Management", "SIEM", "Incident Response", "Cloud Security", "Python"],
  "Software Developer": ["JavaScript", "APIs", "Databases", "Testing", "Git", "UI/UX", "Problem Solving", "Cloud Basics"],
  "Data Analyst": ["Python", "SQL", "Excel", "Power BI", "Statistics", "Data Cleaning", "Data Visualisation", "Communication"]
};

const targetRole = document.getElementById("targetRole");
const skillInputs = document.getElementById("skillInputs");
const form = document.getElementById("roadmapForm");
const result = document.getElementById("result");

function renderSkills() {
  const selectedRole = targetRole.value;
  skillInputs.innerHTML = "";

  skillsByRole[selectedRole].forEach((skill) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <label for="${skill}">${skill}</label>
      <input id="${skill}" name="${skill}" type="number" min="0" max="5" value="2" />
    `;
    skillInputs.appendChild(wrapper);
  });
}

async function generateRoadmap(event) {
  event.preventDefault();

  const skills = {};
  skillsByRole[targetRole.value].forEach((skill) => {
    skills[skill] = Number(document.getElementById(skill).value);
  });

  const response = await fetch("/api/roadmap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetRole: targetRole.value, skills })
  });

  const data = await response.json();

  result.innerHTML = `
    <h3>${data.targetRole} Roadmap</h3>
    <p><strong>Readiness Score:</strong> ${data.readinessScore}%</p>
    <p>${data.message}</p>
    <h4>Priority Actions</h4>
    ${data.priorityActions.map((item) => `
      <div class="action-card">
        <strong>${item.skill}</strong>
        <p>Current level: ${item.currentLevel}/5</p>
        <p>${item.recommendedAction}</p>
      </div>
    `).join("")}
  `;
}

targetRole.addEventListener("change", renderSkills);
form.addEventListener("submit", generateRoadmap);
renderSkills();
