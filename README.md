# Job Posting Info Scraper

[![forthebadge](http://forthebadge.com/images/badges/made-with-javascript.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

This is a Firefox extensions designed to scrape some limited info from various job postings and save it to clipboard in TSV format for easy copy and paste to my person google sheet job application tracker.

It's very specific to my own private current use case workflow and is bare-bones with no options or settings. 

## Usage

Extension is triggered by clicking the extension icon in the toolbar.

Triggering the extension will on a job posting from Ashby, BambooHR, Greenhouse, Lever, or Rippling will copy the company name, job role title, url, date posted (if available), lowest salary range (if available) and location (if available) in TSV format, which can then be easily pasted into a google sheets doc.

When the information is not available or wasn't accurately parsed, the field will usually be an empty string.

## Where does it work?

As mentioned it currently works (mostly) for Ashby, BambooHR, Greenhouse, Lever, or Rippling. There are plans to add more sites as well.

## Note on Dates

Most listings don't have the date posted on the listing, but this is often available at a public api or in a script in the HTML source. This extension is meant to be used in conjunction with another extension of mine, Job Posting Date Adder, which accesses public apis or parses script data to find the date published or created and then inject it to the DOM. This doesn't always work, but it definitely doesn't work if you are not using that firefox extension.

## Installation

Temporary Installation

1. Open Firefox and go to: `about:debugging`

2. Click "This Firefox" (on the left sidebar).

3. Click "Load Temporary Add-on":

4. Navigate to your extension’s folder and select the `manifest.json` file.

5. Click on the extensions button in the toolbar and choose "Pin to Toolbar" on the extension.

6. The extension will install temporarily and stay active until you restart Firefox.



