function notify(text, tag) {
    function sendNotification(text, tag) {
        if (typeof tag === "undefined") {
            new Notification(text);
         } else {
             new Notification(text, {tag});
         }
    }

    if (Notification.permission === "granted") {
        sendNotification(text, tag);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(perm => {
            if (perm === "granted")
                sendNotification(text, tag);
        });
    }
}

function wrap(old, wrapper) {
    return function() {
        wrapper(old, ...arguments);
    }
}

return {
    notify,
    wrap
};