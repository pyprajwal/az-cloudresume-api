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

// Terminal simulation with directories and files
// Terminal simulation with directories and files
const directories = {
    '': ['experience', 'skills', 'projects', 'certifications'],  // Root directory
    'experience': ['experience.txt'],  // Experience folder
    'skills': ['skills.txt'],          // Skills folder
    'projects': ['projects.txt'],      // Projects folder
    'certifications': ['certifications.txt']  // Certifications folder
};

const files = {
    'experience.txt': `
        Work Experience:
        1. IT Support Engineer, Axiom Technologies (Jun 2023 - Present)
        2. Service Desk Engineer (L3), COTIVITI Inc. (Dec 2019 - Feb 2023)
        3. Desktop Support Engineer, Standard Chartered Bank (Apr 2019 - Nov 2019)
    `,
    'skills.txt': `
        Skills and Knowledge:
        - Active Directory, Okta, Azure Cloud, VMware
        - Python, PowerShell, Bash scripting
        - HTML, CSS, JavaScript, Java, C
        - Office 365 Administration, SCCM/Intune
        - ServiceNow/Jira, Basic SQL
        - Computer hardware (A+), Networking
    `,
    'projects.txt': `
        Projects:
        1. [Automatic Onboarder](https://github.com/pyprajwal/AZ104-PROJECTS/blob/master/automatic_onboarder/)
        2. [Cloud API Resume Challenge](https://github.com/pyprajwal/az-cloudresume-api)
        3. [Cloudup Tool](https://github.com/pyprajwal/AZ104-PROJECTS/blob/master/clouduploader/cloudup.md)
        4. [File Share App](https://github.com/pyprajwal/AZ104-PROJECTS/tree/master/fileshareapp)
        5. [Bicep VMfleet](https://github.com/pyprajwal/AZ104-PROJECTS/blob/master/biceps/bicepvmfleet.md)
    `,
    'certifications.txt': `
        Certifications:
        1. CISCO CCNA (Cisco Certified Network Associate)
        2. Microsoft Azure Administrator Associate (Az-104)
    `
};

let currentDirectory = '';  // Default to root directory

const commands = {
    help: "Available commands: \n- help: Show this help message\n- ls: List current directory contents\n- cd [dir]: Change directory (use 'cd ..' to go up or 'cd /' for root)\n- pwd: Show current directory\n- cat [file]: Display contents of a file\n- clear: Clear the terminal screen\n- date: Show current date and time",
    ls: () => {
        return directories[currentDirectory].join('    ');
    },
    cd: (dir) => {
        if (dir === '..') {
            currentDirectory = currentDirectory.split('/').slice(0, -1).join('/') || '';  // Move up one level
            return `Moved up to ${currentDirectory || '/'}`;
        } else if (dir === '/' || dir === 'home') {
            currentDirectory = '';  // Go to root/home directory
            return `Changed directory to root`;
        } else if (directories.hasOwnProperty(dir)) {
            currentDirectory = dir;
            return `Changed directory to ${dir}`;
        } else {
            return `Directory not found: ${dir}`;
        }
    },
    pwd: () => {
        return `/${currentDirectory || ''}`;
    },
    cat: (file) => {
        if (files.hasOwnProperty(file)) {
            return files[file];
        } else {
            return `File not found: ${file}`;
        }
    },
    clear: () => {
        outputDiv.innerHTML = '';
        return '';
    },
    date: () => {
        return new Date().toLocaleString();
    }
};

// Event listener for input
commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const input = commandInput.value.trim();
        const [command, ...args] = input.split(' ');
        let output;

        if (commands.hasOwnProperty(command)) {
            output = typeof commands[command] === 'function'
                ? commands[command](...args)
                : commands[command];
        } else {
            output = `Command not recognized: ${command}`;
        }

        if (output) {
            outputDiv.innerHTML += `<div>$ ${input}</div><div>${output}</div>`;
        }

        commandInput.value = '';  // Clear the input
        outputDiv.scrollTop = outputDiv.scrollHeight;  // Scroll to the bottom of the output
    }
});
