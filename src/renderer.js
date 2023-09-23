window.addEventListener("DOMContentLoaded", async () => {
    window.api.panel.events("first_run", (m) => console.log(m));
    window.api.panel.events("get_add_app", (m) => console.log(m));
});
