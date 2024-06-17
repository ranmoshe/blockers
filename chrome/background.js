let blockedSites = ["twitter.com", "x.com", "haaretz.co.il", "ynet.co.il", "themarker.com", "calcalist.co.il", "globes.co.il", "vox.com"];

chrome.storage.sync.get(['blockedSites'], function(result) {
  if (result.blockedSites) {
    blockedSites = result.blockedSites;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    for (let site of blockedSites) {
      if (details.url.includes(site)) {
        return { cancel: true };
      }
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

