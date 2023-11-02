let spooledChat = (() => {
    let spool = [];
    let spooler_running = false;

    function spooler() {
        if (!spool.length) {
            spooler_running = false;
            return;
        }
        api_chat_send(...spool.shift());
        setTimeout(spooler, 500);
    }

    return (message, opts) => {
        spool.push([message, opts]);
        if (!spooler_running) {
            spooler_running = true;
            spooler();
        }
    }
})();

function informUser(message, name, color, allow_html) {
    if (!allow_html)
        message = html_tag_esc(message, false, true);

    addChat(
        null,
        0,
        "user",
        name,
        message,
        name,
        true,
        false,
        false,
        color,
        getDate()
    );
}

function informMono(message, name, color, allow_html) {
    if (!allow_html)
        message = html_tag_esc(message, false, true);

    informUser(`<pre style='white-space:pre-wrap;'>${message}</pre>`, name, color, true);
}

/* function addCommandDoc(name, desc, args) {
 * } */

function addCommand(cmd, func, overwrite = false) {
    if (typeof client_commands[cmd] !== "undefined" && !overwrite) {
        throw new Error("This command is already defined!");
    }

    client_commands[cmd] = func;
}

return {
    spooledChat,
    informUser,
    informMono,
    // addCommandDoc,
    addCommand
};