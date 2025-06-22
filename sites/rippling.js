window.parseRipplingJobData = (url) => {
  const roleLink = url; 
  const companyName = formatCompanyName(url);
  const datePosted = extractRipplingDatePosted();
  const jobTitle = document.querySelector('h2.css-10i6wsd-H2Element').innerText || '';
  const location = extractRipplingLocationType();
  const salary = extractRipplingSalary();  

    return {
      companyName,
      jobTitle,
      roleLink,
      datePosted,
      salary,
      location
    };
}

const extractRipplingDatePosted = () => {
  const dateElementText = document.querySelector('.css-1jugqli[aria-label="date created"] p').innerText;
  return dateElementText || '';
}

const extractRipplingLocationType = () => {
  const locationIcon = document.querySelector('span[data-icon="LOCATION_OUTLINE"]');

  if (locationIcon) {
    const locationElement = locationIcon.nextElementSibling;
    const locationText = locationElement.innerText.trim();
    if (/remote/i.test(locationText)) {
      return "Remote";
    }
    return locationText || '';
  }
};

const extractRipplingSalary = () => {
  const nextData = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
  const jobDescription = nextData.props.pageProps.apiData.jobPost.description.role;
  if (jobDescription) {
    const parsed = parseSalaryFromText(jobDescription);
    if (parsed) return parsed;
  }
  return '';
};