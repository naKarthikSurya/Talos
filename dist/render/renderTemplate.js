import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '../../');
export function renderTemplate(templateName, context = {}) {
    const templatePath = path.join(packageRoot, 'templates', templateName);
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found: ${templatePath}`);
    }
    let content = fs.readFileSync(templatePath, 'utf8');
    // Basic variable replacement {{varName}}
    for (const [key, value] of Object.entries(context)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        content = content.replace(regex, String(value));
    }
    return content;
}
