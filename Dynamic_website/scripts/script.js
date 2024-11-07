// Add any interactive JavaScript features here if needed, like dark mode toggle
console.log("Welcome to Prajwal Pokhrel's portfolio!");
document.getElementById("themeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

// Get the terminal toggle button and the body
const terminalToggleButton = document.getElementById('terminalToggle');
const body = document.body;

// Add event listener to toggle terminal mode
terminalToggleButton.addEventListener('click', () => {
    body.classList.toggle('terminal-mode');  // Toggle 'terminal-mode' class on the body
});


// Select the elements
const commandInput = document.getElementById("command-input");
const outputDiv = document.getElementById("output");

const commands = {
  help: "Available commands: \n- help: Show this help message\n- greet: Display a greeting\n- about: Show information about the portfolio owner\n- experience: Display work experience\n- skills: Show a list of skills\n- projects: List all projects\n- certifications: Show a list of certifications\n- contact: Display contact information\n- clear: Clear the terminal screen\n- date: Show current date and time",
  greet: "Hello, welcome to my portfolio CLI! Feel free to explore my projects and experience.",
  about: "I am an IT Support Engineer with experience in Active Directory, Azure, VMware, Office 365, and much more. I am passionate about technology and enjoy solving problems and optimizing systems.",
  experience: `
      Work Experience:
      1. IT Support Engineer, Axiom Technologies (Jun 2023 - Present)
      2. Service Desk Engineer (L3), COTIVITI Inc. (Dec 2019 - Feb 2023)
      3. Desktop Support Engineer, Standard Chartered Bank (Apr 2019 - Nov 2019)
  `,
  skills: `
      Skills and Knowledge:
      - Active Directory, Okta, Azure Cloud, VMware
      - Python, PowerShell, Bash scripting
      - HTML, CSS, JavaScript, Java, C
      - Office 365 Administration, SCCM/Intune
      - ServiceNow/Jira, Basic SQL
      - Computer hardware (A+), Networking
  `,
  projects: `
      Projects:
      1. [Automatic Onboarder](https://github.com/pyprajwal/AZ104-PROJECTS/blob/master/automatic_onboarder/)
      2. [Cloud API Resume Challenge](https://github.com/pyprajwal/az-cloudresume-api)
      3. [Cloudup Tool](https://github.com/pyprajwal/AZ104-PROJECTS/blob/master/clouduploader/cloudup.md)
      4. [File Share App](https://github.com/pyprajwal/AZ104-PROJECTS/tree/master/fileshareapp)
      5. [Bicep VMfleet](https://github.com/pyprajwal/AZ104-PROJECTS/blob/master/biceps/bicepvmfleet.md)
  `,
  certifications: `
      Certifications:
      - CISCO CCNA (Cisco Certified Network Associate)
      - Microsoft Azure Administrator Associate (Az-104)
  `,
  contact: `
      Contact Information:
      - Email: prajwal.pokhrel63@gmail.com
      - Phone: +61456671987
      - Location: Sydney, NSW, Australia
  `,
  clear: function () {
      outputDiv.innerHTML = "";
  },
  date: function () {
      return `Current date and time: ${new Date().toLocaleString()}`;
  },
};

// Function to process commands
function processCommand(command) {
    // Trim the command and check if it exists in the commands object
    const cleanedCommand = command.trim().toLowerCase();

    if (commands[cleanedCommand]) {
        if (typeof commands[cleanedCommand] === 'function') {
            outputDiv.innerHTML += `$ ${command}\n${commands[cleanedCommand]()}\n`;
        } else {
            outputDiv.innerHTML += `$ ${command}\n${commands[cleanedCommand]}\n`;
        }
    } else {
        outputDiv.innerHTML += `$ ${command}\nCommand not recognized. Type 'help' for available commands.\n`;
    }

    // Scroll to the bottom to show new output
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Listen for 'Enter' key to submit the command
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        processCommand(command);  // Process the command
        commandInput.value = "";  // Clear the input field
    }
});