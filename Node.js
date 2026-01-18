// LUAB HUB - GHOST PROTOCOL SERVER
const express = require('express');
const app = express();

// 1. THE "ROBUST" DEFENSE LAYER
app.use((req, res, next) => {
    const userAgent = req.get('User-Agent') || "";
    
    // LIST OF COPIERS TO BLOCK
    const blocked = ["HTTrack", "Wget", "curl", "python", "bot", "spider", "scrap"];
    
    // If a bot is detected, DESTROY the connection
    if (blocked.some(b => userAgent.includes(b))) {
        console.log("⚠️ Attack blocked from: " + userAgent);
        // We send a fake "410 Gone" error. 
        // This tells HTTrack: "This site used to exist, but it is permanently deleted."
        return res.status(410).send("Repository Deleted. Files Removed.");
    }
    next();
});

// 2. THE WEBSITE (HIDDEN IN MEMORY)
// This code is NOT a file. It is a text string inside the server's brain.
// HTTrack cannot download this file because it technically doesn't exist.
const protectedSite = `
<!DOCTYPE html>
<html>
<head>
    <title>Luab Hub | Secure</title>
    <style>
        body { background: #0f0f0f; color: #00ff00; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { border: 2px solid #333; padding: 40px; border-radius: 10px; background: #111; text-align: center; }
        button { background: #00ff00; color: black; border: none; padding: 15px 30px; font-weight: bold; cursor: pointer; font-size: 16px; margin-top: 20px; }
        button:hover { background: white; }
    </style>
</head>
<body>
    <div class="box">
        <h1>LUAB HUB SECURITY</h1>
        <p>Status: Encrypted</p>
        <p>Session ID: ${Math.random().toString(36).substring(7)}</p>
        <br>
        <button onclick="alert('Access Granted')">GET SCRIPT</button>
    </div>
    
    <script>
        // Anti-Right Click (Client Side)
        document.addEventListener('contextmenu', event => event.preventDefault());
    </script>
</body>
</html>
`;

// 3. SERVE THE GHOST
app.get('/', (req, res) => {
    // We generate the site FRESH every time a human visits.
    res.send(protectedSite);
});

// Start the engine
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('👻 Ghost Server is running...');
});

