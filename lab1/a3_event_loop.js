// A3 — Event Loop, reproduce the exact output order
function runA3(){
    console.clear();
    console.log("Running A3 — Event Loop (homework)");

    const EXPECTED = [
        "1 sync start",
        "2 sync end",
        "3 microtask: promise.then",
        "4 microtask: queueMicrotask",
        "5 microtask: nested",
        "6 timeout",
    ];

    const seen = [];
    const log = (msg) => { console.log(msg); seen.push(msg); };

    // ─────────────────────────────────────────────────────────────
    // Start with the first sync log:
    log("1 sync start");

    // LAST overall (macrotask after all microtasks)
    setTimeout(() => log("6 timeout"), 0);

    // 1st microtask; inside it we enqueue another microtask ("nested")
    Promise.resolve().then(() => {
        log("3 microtask: promise.then");
        queueMicrotask(() => log("5 microtask: nested")); // enqueued after the already-queued microtasks
    });

    // 2nd microtask queued FIFO, so it runs after the promise.then handler
    queueMicrotask(() => log("4 microtask: queueMicrotask"));

    // End of synchronous section:
    log("2 sync end");
    // ─────────────────────────────────────────────────────────────

    // Tiny checker (non-blocking)
    setTimeout(() => {
        const pass = EXPECTED.length === seen.length && EXPECTED.every((v, i) => v === seen[i]);
        console.log("---");
        console.log(pass ? " Order matches EXACTLY" : " Order does not match");
        if (!pass) {
            console.log("Expected:", EXPECTED);
            console.log("Got     :", seen);
        }
    }, 1);
}

// Expose for HTML button
window.runA3 = runA3;
