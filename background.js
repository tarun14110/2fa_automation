chrome.webNavigation.onCompleted.addListener(
    function(currtab) {
        if (confirm("Press OK to automate 2FA process.")) {
            let password = prompt("What is your password?");
            console.log(currtab);
            chrome.tabs.sendMessage(
                currtab.tabId, {
                    reddit_automate: true,
                    reddit_password: password,
                }
            );
        }
    }, {
        url: [{
            urlMatches: 'https://www.reddit.com/settings/privacy'
        }]
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.scan_and_get_code) {
            let code = prompt("Download the Google Authenticator app, scan the provided QR code, and type the code generated by the app here");
            chrome.tabs.sendMessage(
                sender.tab.id, {
                    reddit_place_code: true,
                    reddit_code: code
                }
            );
        }
        if (request.reddit_finished) {
            confirm("Finished setting up 2FA");
        }
    }
);