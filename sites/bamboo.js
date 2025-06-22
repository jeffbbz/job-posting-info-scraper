window.parseBambooJobData = (url) => {
  const roleLink = url; 
  const companyName = extractBambooCompanyName();
  const datePosted = extractBambooDatePosted();
  const jobTitle = document.querySelector('main h3.jss-g20').innerText || '';
  const location = extractBambooLocationType();
  const salary = extractBambooSalary();  

    return {
      companyName,
      jobTitle,
      roleLink,
      datePosted,
      salary,
      location
    };
}

const extractBambooCompanyName = () => {
  const companyName = document.querySelector('header.jss-g7 a img').alt;
  return companyName || '';
}

const extractBambooLocationType = () => {
  const sectionElements = document.querySelectorAll('.fabric-5qovnk-root.MuiBox-root.css-1phs5iq'); // Select all matching divs
  for (const sectionElement of sectionElements) {
    const locationPElement = [...sectionElement.querySelectorAll('p')].find(
      p => p.innerText.trim() === "Location"
    );

    if (locationPElement) {
      const locationElement = locationPElement.nextElementSibling;
      const locationText = locationElement.innerText.trim();
      if (/remote/i.test(locationText)) {
        return "Remote";
      }
      return locationText;
    }
  }
  return '';
};

const extractBambooDatePosted = () => {
  return '';
}

const extractBambooSalary = () => {
  const sectionElements = document.querySelectorAll('.fabric-5qovnk-root.MuiBox-root.css-1phs5iq'); // Select all matching divs
  for (const sectionElement of sectionElements) {
    const compensationPElement = [...sectionElement.querySelectorAll('p')].find(
      p => p.innerText.trim() === "Compensation"
    );

    if (compensationPElement) {
      const compensationElement = compensationPElement.nextElementSibling;
      const compensationText = compensationElement.innerText.trim();
      const range = compensationText.split('-');
      const fullRange = range.map(num => {
        if (num.includes('K')) {
          return num.replace('K', ',000');
        } else {
          return `${num},000`;
        }
      });
      return fullRange.join(' - ');
    }
  }
  return '';
};