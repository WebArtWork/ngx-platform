const path = require("path");
const fs = require("fs");

const filePath = path.join(process.cwd(), "config.json");

try {
	// Read the file
	const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

	// Delete the fields
	delete jsonData.ngx;
	delete jsonData.wjst;

	// Write the updated JSON back to the file
	fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

	console.log('Fields "ngx" and "wjst" have been deleted successfully.');
} catch (error) {
	console.error("Error processing file:", error);
}
