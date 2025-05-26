const dropZone = document.getElementById("dropZone");
const result = document.getElementById("result");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("hover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("hover");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("hover");

  const file = e.dataTransfer.files[0];
  if (file && file.name.endsWith(".txt")) {
    const reader = new FileReader();
    reader.onload = function () {
      const content = reader.result;
      checkEligibilityForAll(content);
    };
    reader.readAsText(file);
  } else {
    result.innerHTML = "<p style='color:red'>❌ Please drop a valid .txt file!</p>";
  }
});

function checkEligibilityForAll(text) {
  const students = text.split('---\n');
  result.innerHTML = "";

  students.forEach((block, index) => {
    if (block.trim().length === 0) return;

    const lines = block.trim().split('\n');
    let name = "Unknown", cgpa = 0, projects = 0, skills = "";

    lines.forEach(line => {
      if (line.startsWith("Name:")) name = line.split(":")[1].trim();
      else if (line.startsWith("CGPA:")) cgpa = parseFloat(line.split(":")[1]);
      else if (line.startsWith("Skills:")) skills = line.split(":")[1].toLowerCase();
      else if (line.startsWith("Projects:")) projects = parseInt(line.split(":")[1]);
    });

    const skillList = skills.split(",").map(s => s.trim());
    const requiredSkills = ["c++", "python", "java"];
    const hasSkill = requiredSkills.some(skill => skillList.includes(skill));
    const isEligible = cgpa >= 7.0 && hasSkill && projects >= 2;

    const studentDiv = document.createElement("div");
    studentDiv.innerHTML = `
      <strong>${name}</strong><br>
      CGPA: ${cgpa} | Projects: ${projects} | Skills: ${skillList.join(', ')}<br>
      <span style="color:${isEligible ? 'green' : 'red'}">
        ${isEligible ? '✅ Eligible' : '❌ Not Eligible'}
      </span>
      <hr/>
    `;
    result.appendChild(studentDiv);
  });
}
