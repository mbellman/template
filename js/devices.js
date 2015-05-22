var UA_RULES = [
  ['iPhone;', 'phone'],
  ['iPod;', 'phone'],
  ['iPad;', 'tablet'],
  ['Android.*Mobile Safari', 'phone'],  
  ['Android.*Safari', 'tablet'], 
  ['iemobile', 'phone'], 
  ['Windows Phone', 'phone'], 
  ['.*', 'desktop'],       // Fallback to desktop.
];

function detectDevice() {
    var ua = navigator.userAgent;
    for (var i = 0; i < UA_RULES.length; i++) {
        var device = UA_RULES[i][1];
        var re = new RegExp(UA_RULES[i][0]);
        if (ua.match(re)) {
            return device;
        }
    }

    var isKindle = /Kindle/i.test(ua) || /Silk/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua);

    if(isKindle) { 
        //Your code here
        device = 'tablet';
        return device;
    }
}

var pages = {
    platform: detectDevice(),
    ua: navigator.userAgent.toLowerCase()
};