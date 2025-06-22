window.formatCompanyName = (url) => {
  const extractedName = url.split('/')[3].trim();
  return capitalizeName(extractedName);
}

const capitalizeName = (name) => {
  return name.split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

window.parseSalaryFromText = function(text) {
  // Try to match a range
  const salaryRangeRegex = /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?\s*[-–]\s*\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g;
  const rangeMatch = text.match(salaryRangeRegex);
  if (rangeMatch && rangeMatch.length > 0) {
    return removeDecimals(rangeMatch[0]);
  }

  // Fallback: match a single value
  const dollarAmount = '\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?';
  const optionalUSD = '(?:\\s*USD)?';
  const salaryRegex = new RegExp(`${dollarAmount}${optionalUSD}`, 'g');
  const salaryMatches = text.match(salaryRegex);
  if (salaryMatches && salaryMatches.length > 0) {
    return removeDecimals(salaryMatches[0]);
  }

  return null;
}

const removeDecimals = (amount) => {
  return amount.replace(/\.\d{2}/g, '');
}