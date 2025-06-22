window.parseAshbyJobData = (url) => {
  const roleLink = url;
  const companyName = formatCompanyName(url);
  const datePosted = extractAshbyDatePosted();
  const jobTitle = document.querySelector('h1._title_ud4nd_34._large_ud4nd_67.ashby-job-posting-heading').innerText || '';
  const location = extractAshbyLocationType();
  const salary = extractAshbySalary() || '';  

    return {
      companyName,
      jobTitle,
      roleLink,
      datePosted,
      salary,
      location
    };
}

const extractAshbyDatePosted = () => { 
  const sectionElements = document.querySelectorAll('._section_101oc_37'); // Select all matching divs
  for (const sectionElement of sectionElements) {
    const headingElement = sectionElement.querySelector('h2._heading_101oc_53');
    if (headingElement && headingElement.innerHTML.trim() === 'Published At') {
      const paragraphElement = sectionElement.querySelector('p');
      if (paragraphElement) {
        return paragraphElement.innerText.trim(); // Extract and trim the text from the <p> tag
      }
    }
  }
  return '';
}

const extractAshbyLocationType = () => {
  const sectionElements = document.querySelectorAll('._section_101oc_37'); // Select all matching divs
  for (const sectionElement of sectionElements) {
    const headingElement = sectionElement.querySelector('h2._heading_101oc_53');
    if (headingElement && headingElement.innerHTML.trim() === 'Location Type') {
      const paragraphElement = sectionElement.querySelector('p');
      if (paragraphElement) {
        return paragraphElement.innerText.trim(); // Extract and trim the text from the <p> tag
      }
    }
  }
  return '';
};

const extractAshbySalary = () => {
  // 1. Check for structured compensation data first
  const compensationHeading = Array.from(document.querySelectorAll('h2')).find(
    h2 => h2.textContent.trim() === 'Compensation'
  );

  if (compensationHeading) {
    const compensationSpan = document.querySelector('span._compensationTierSummary_14ib5_335');
    if (compensationSpan) {
      const baseSalary = compensationSpan.textContent
        .split('•')[0]
        .trim()
        .replace(/–/g, '-')
        .replace(/\b(\d+)K\b/g, '$1,000');
      const parsed = parseSalaryFromText(baseSalary);
      if (parsed) return parsed;
      return baseSalary;
    }
  }

  // 2. Fallback: Regex extraction from description
  const descriptionElement = document.querySelector('._descriptionText_14ib5_206');
  if (descriptionElement) {
    const descriptionText = descriptionElement.innerText;
    const parsed = parseSalaryFromText(descriptionText);
    if (parsed) return parsed;
  }

  return '';
};