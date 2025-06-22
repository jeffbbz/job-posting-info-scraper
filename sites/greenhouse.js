window.parseGreenhouseJobData = (url) => {
  const roleLink = url; 
  const companyName = formatCompanyName(url);
  const datePosted = extractGreenhouseDatePosted();
  const jobTitle = document.querySelector('.job__title h1.section-header').innerText || '';
  const location = document.querySelector('.job__location').innerText || '';
  const salary = extractGreenhouseSalary();  

    return {
      companyName,
      jobTitle,
      roleLink,
      datePosted,
      salary,
      location
    };
}

const extractGreenhouseDatePosted = () => {
  const dateElementText = document.querySelector('.greenhouse-date-initial').innerText;
  return dateElementText ? dateElementText.split(' ')[2] : '';
}

const extractGreenhouseSalary = () => {
  const descriptionElement = document.querySelector('.job__description');
  if (descriptionElement) {
    const descriptionText = descriptionElement.innerText;
    const parsed = parseSalaryFromText(descriptionText);
    if (parsed) return parsed;
  }
  return '';
};