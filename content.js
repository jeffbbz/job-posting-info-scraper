browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrapeJob") {
    const url = window.location.href;
    const sites = {
      ashbyhq: parseAshbyJobData,
      bamboohr: parseBambooJobData,
      greenhouse: parseGreenhouseJobData,
      lever: parseLeverJobData,
      rippling: parseRipplingJobData,
    }

    const currentSite = Object.keys(sites).find(site => url.includes(site));
    const jobData = currentSite ? sites[currentSite](url) : {};
    const tsvData = formatJobDataToTSV(jobData);
    sendResponse({tsvData});
  }
});

const formatJobDataToTSV = (jobData) => {
  return `${jobData.companyName}\t${jobData.jobTitle}\t${jobData.roleLink}\t${jobData.datePosted}\t\t${jobData.salary}\t${jobData.location}`;
}


