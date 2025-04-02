const fs = require('fs');
const path = require('path');

async function updateDataDragonVersion() {
  try {
    // Fetch latest version
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions = await response.json();
    const latestVersion = versions[0];

    // Read current .env file
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    
    try {
      envContent = fs.readFileSync(envPath, 'utf8');
    } catch (error) {
      // If .env doesn't exist, create it with default content
      envContent = fs.readFileSync(path.join(process.cwd(), '.env.example'), 'utf8');
    }

    // Update or add the version
    const versionRegex = /NEXT_PUBLIC_DATA_DRAGON_VERSION=.*/;
    const newVersionLine = `NEXT_PUBLIC_DATA_DRAGON_VERSION=${latestVersion}`;
    
    if (versionRegex.test(envContent)) {
      envContent = envContent.replace(versionRegex, newVersionLine);
    } else {
      envContent += `\n${newVersionLine}`;
    }

    // Write back to .env
    fs.writeFileSync(envPath, envContent);
    console.log(`Updated Data Dragon version to ${latestVersion}`);
  } catch (error) {
    console.error('Error updating Data Dragon version:', error);
    process.exit(1);
  }
}

updateDataDragonVersion(); 