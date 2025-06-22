window.parseLeverJobData = (url) => {
  const roleLink = url;
  const companyName = extractLeverCompanyName();
  const datePosted = extractLeverDatePosted();
  const jobTitle = document.querySelector('.posting-headline h2').innerText || '';
  const location = document.querySelector('.sort-by-time.posting-category.medium-category-label.capitalize-labels.workplaceTypes').innerText || '';
  const salary = extractLeverSalary();  

    return {
      companyName,
      jobTitle,
      roleLink,
      datePosted,
      salary,
      location
    };
}

const extractLeverCompanyName = () => {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (script) {
    const data = JSON.parse(script.textContent);
    if (data["@type"] === "JobPosting" && data.hiringOrganization?.name) {
        return data.hiringOrganization.name
      }
  }
  return '';
}

const extractLeverDatePosted = () => {
  const dateElementText = document.querySelector('div[aria-label="date posted"]').innerText;
  return dateElementText || '';
}

const extractLeverSalary = () => {
  // 1. Try to find salary in a div with class 'section page-centered' and data-qa='salary-range'
  const salaryRangeDiv = document.querySelector("div.section.page-centered[data-qa='salary-range']");
  if (salaryRangeDiv && salaryRangeDiv.innerText.trim()) {
    const text = salaryRangeDiv.innerText.trim();
    const formatted = parseSalaryFromText(text);
    if (formatted) return formatted;
    return text;
  }

  // 2. Try to find a span inside a div inside a div with class 'section page-centered' and data-qa='closing-description'
  const closingDescriptionDiv = document.querySelector("div.section.page-centered[data-qa='closing-description']");
  if (closingDescriptionDiv) {
    const innerDiv = closingDescriptionDiv.querySelector('div');
    if (innerDiv) {
      const span = innerDiv.querySelector('span');
      if (span && span.innerText.trim()) {
        const text = span.innerText.trim();
        const formatted = parseSalaryFromText(text);
        if (formatted) return formatted;
        return text;
      }
    }
  }

  // 3. Fallback to previous logic
  const script = document.querySelector('script[type="application/ld+json"]');
  if (script) {
    const data = JSON.parse(script.textContent);
    const description = data.description;
    const formatted = parseSalaryFromText(description);
    if (formatted) return formatted;
  }
  return '';
};