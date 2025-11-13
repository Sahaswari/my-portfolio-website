/**
 * Command-line tool to import portfolio data to database
 * 
 * Usage:
 *   node import-data-cli.js <json-file> [environment]
 * 
 * Examples:
 *   node import-data-cli.js portfolio-data.json
 *   node import-data-cli.js portfolio-data.json local
 *   node import-data-cli.js portfolio-data.json vercel
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ENVIRONMENTS = {
  local: 'http://localhost:5173',
  vercel: 'https://my-portfolio-website-aedrl1muy-sahaswaris-projects.vercel.app'
};

async function importData(jsonFile, environment = 'vercel') {
  try {
    // Read JSON file
    console.log('📖 Reading file:', jsonFile);
    const filePath = path.resolve(jsonFile);
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ Error: File not found:', filePath);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    console.log('✅ File read successfully');
    console.log('📊 Data summary:');
    console.log('  - Projects:', data.projects?.length || 0);
    console.log('  - Blogs:', data.blogs?.length || 0);
    console.log('  - Certifications:', data.certifications?.length || 0);
    console.log('  - Achievements:', data.achievements?.length || 0);
    console.log('  - Volunteering:', data.volunteering?.length || 0);

    // Get target URL
    const baseUrl = ENVIRONMENTS[environment] || environment;
    const apiUrl = `${baseUrl}/api/import-data`;

    console.log('\n🚀 Importing to:', apiUrl);
    console.log('⏳ Please wait...\n');

    // Send to API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ SUCCESS! Data imported to database:\n');
      console.log('  ✓ Projects:', result.projects || 0);
      console.log('  ✓ Blogs:', result.blogs || 0);
      console.log('  ✓ Certifications:', result.certifications || 0);
      console.log('  ✓ Achievements:', result.achievements || 0);
      console.log('  ✓ Volunteering:', result.volunteering || 0);
      console.log('\n🎉 Import completed successfully!');
    } else {
      console.error('❌ Import failed!');
      console.error('Error:', result.error);
      if (result.details) {
        console.error('Details:', result.details);
      }
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node import-data-cli.js <json-file> [environment]');
  console.log('\nEnvironments:');
  console.log('  local  - http://localhost:5173');
  console.log('  vercel - https://my-portfolio-website-aedrl1muy-sahaswaris-projects.vercel.app');
  console.log('  <url>  - Custom URL');
  console.log('\nExamples:');
  console.log('  node import-data-cli.js portfolio-data.json');
  console.log('  node import-data-cli.js portfolio-data.json local');
  console.log('  node import-data-cli.js portfolio-data.json https://my-site.com');
  process.exit(0);
}

const jsonFile = args[0];
const environment = args[1] || 'vercel';

importData(jsonFile, environment);
