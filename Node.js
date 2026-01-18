<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gost Hub | Private Host</title>
    <style>
        /* --- HACKER UI THEME --- */
        body { background-color: #050505; color: #00ff00; font-family: 'Courier New', monospace; margin: 0; padding: 20px; }
        h1 { text-align: center; text-shadow: 0 0 10px #00ff00; border-bottom: 1px solid #333; padding-bottom: 10px; }
        
        /* Loading Screen */
        #loader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; justify-content: center; align-items: center; z-index: 999; }
        
        /* File Grid */
        #file-list { display: flex; flex-direction: column; gap: 10px; max-width: 600px; margin: 0 auto; display: none; }
        
        .file-card { 
            background: #111; border: 1px solid #333; padding: 15px; display: flex; justify-content: space-between; align-items: center; 
            transition: 0.2s; cursor: pointer; text-decoration: none; color: #00ff00;
        }
        .file-card:hover { border-color: #00ff00; background: #0a0a0a; box-shadow: 0 0 15px rgba(0, 255, 0, 0.2); }
        
        .btn { background: #00ff00; color: #000; padding: 5px 10px; font-weight: bold; border-radius: 3px; font-size: 12px; }
        
        /* Footer */
        .status { text-align: center; margin-top: 30px; color: #555; font-size: 12px; }
    </style>
</head>
<body>

    <div id="loader">
        <p>INITIALIZING GHOST PROTOCOL...</p>
    </div>

    <h1>⚡ GOST HUB STORAGE</h1>

    <div id="file-list"></div>

    <div class="status">System Secure. Repository Linked.</div>

<script>
    // --- CONFIGURATION ---
    const REPO_OWNER = "SHARVANKUMARSINGH";
    const REPO_NAME = "Gost-hub";
    
    // --- 🛡️ 1. SECURITY LAYER (Anti-Bot) ---
    const agent = navigator.userAgent.toLowerCase();
    if(agent.includes("httrack") || agent.includes("wget") || agent.includes("bot")) {
        document.body.innerHTML = "<h1>403 FORBIDDEN</h1>";
        throw new Error("Access Denied");
    }

    // --- 🛡️ 2. DISABLE INSPECTOR ---
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = (e) => { if(e.keyCode == 123) return false; }

    // --- 3. AUTO-FETCHER (The Host Engine) ---
    async function loadFiles() {
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            const container = document.getElementById("file-list");
            
            data.forEach(file => {
                // Filter: Don't show the index.html or README
                if(file.name === "index.html" || file.name === "README.md" || file.type === "dir") return;

                // Create the File Card
                const card = document.createElement("a");
                card.className = "file-card";
                card.href = file.download_url; // Link to the raw code
                card.target = "_blank"; // Open in new tab
                
                card.innerHTML = `
                    <span>📄 ${file.name}</span>
                    <span class="btn">RAW VIEW</span>
                `;
                
                container.appendChild(card);
            });

            // Unlock UI after loading
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("file-list").style.display = "flex";
            }, 1500); // 1.5s delay to fool scrapers

        } catch (error) {
            document.getElementById("loader").innerHTML = "<p style='color:red'>CONNECTION FAILED</p>";
        }
    }

    // Run the engine
    loadFiles();
</script>

</body>
</html>
