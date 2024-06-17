const blockedSites = ["twitter.com", "x.com", "haaretz.co.il", "ynet.co.il", "themarker.com", "calcalist.co.il", "globes.co.il", "vox.com"];

function blockRequest(details) {
  for (let site of blockedSites) {
    if (details.url.includes(site)) {
      return { cancel: true };
    }
  }
  return { cancel: false };
}

browser.webRequest.onBeforeRequest.addListener(
  blockRequest,
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Listen for messages from the popup to update blocked sites
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "updateSites") {
    blockedSites.length = 0;
    blockedSites.push(...message.sites);
  }
});

