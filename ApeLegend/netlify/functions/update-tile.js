<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Ape Egg NFT Viewer</title>
<style>
        body {
            background: linear-gradient(135deg, #000a12, #001f3f);
            color: #cfd8dc;
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        .top-menu {
            background: rgba(30, 0, 60, 0.9);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #00e5ff;
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
        }
        .menu-items {
            display: flex;
            margin: 0 auto;
        }
        .menu-item {
            padding: 0.5rem 1.5rem;
            margin: 0 0.5rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            color: #cfd8dc;
        }
        .menu-item:hover {
            background: rgba(138, 43, 226, 0.3);
            text-shadow: 0 0 10px rgba(214, 163, 255, 0.8);
        }
        .menu-item.active {
            background: rgba(138, 43, 226, 0.5);
            text-shadow: 0 0 10px rgba(214, 163, 255, 1);
        }
        .points-display {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 0.5rem 1rem;
            background: rgba(90, 24, 154, 0.3);
            border-radius: 8px;
            border: 1px dashed #4dd0e1;
            position: absolute;
            right: 2rem;
        }
        .points-total {
            font-size: 1.2rem;
            font-weight: bold;
            color: #80deea;
        }
        .points-rate {
            font-size: 0.9rem;
            color: #4dd0e1;
        }
        .container {
            max-width: 1000px;
            margin: 2rem auto;
            background: rgba(30, 0, 60, 0.7);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 0 30px rgba(138, 43, 226, 0.4);
            border: 1px solid #00e5ff;
        }
        h1 {
            color: #80deea;
            text-shadow: 0 0 10px rgba(214, 163, 255, 0.5);
            margin-bottom: 1.5rem;
        }
        button {
            background: linear-gradient(45deg, #00bcd4, #00acc1);
            color: white;
            border: none;
            padding: 8px 16px;
            margin: 0.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(138, 43, 226, 0.5);
            text-shadow: 0 0 15px rgba(214, 163, 255, 0.9);
        }
        button:disabled {
            background: #444;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
            opacity: 0.5;
        }
        #disconnectButton {
            background: linear-gradient(45deg, #ff3864, #ff1493);
        }
        #walletStatus {
            font-size: 1.2rem;
            margin: 1.5rem 0;
            color: #4dd0e1;
        }
        #walletAddress {
            background: rgba(90, 24, 154, 0.3);
            padding: 1rem;
            border-radius: 8px;
            word-break: break-all;
            font-family: monospace;
            border: 1px dashed #4dd0e1;
            margin-bottom: 1.5rem;
        }
        .nft-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .nft-card {
            background: rgba(70, 0, 120, 0.5);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #4dd0e1;
            transition: transform 0.3s ease;
            cursor: pointer;
            position: relative;
        }
        .nft-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(138, 43, 226, 0.5);
        }
        .nft-card.selected {
            border: 3px solid #00ff00;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.9);
        }
        .nft-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .nft-info {
            padding: 1rem;
        }
        .nft-name {
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #cfd8dc;
        }
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #00e5ff;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .glow {
            animation: pulse 2s infinite alternate;
        }
        @keyframes pulse {
            0% { text-shadow: 0 0 5px rgba(214, 163, 255, 0.5); }
            100% { text-shadow: 0 0 15px rgba(214, 163, 255, 0.9); }
        }
        .error-message {
            color: #ff6b6b;
            margin-top: 1rem;
        }
        .page {
            display: none;
        }
        .page.active {
            display: block;
        }
        .map-container {
            margin-top: 2rem;
        }
        .map-grid {
            display: grid;
            grid-template-columns: repeat(25, 1fr);
            gap: 2px;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }
        .map-tile {
            aspect-ratio: 1/1;
            background-size: cover;
            background-position: center;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
            border: 2px solid #1E90FF;
        }
        .map-tile:hover {
            transform: scale(1.1);
            z-index: 2;
            box-shadow: 0 0 10px rgba(214, 163, 255, 0.7);
        }
        .map-tile.occupied {
            border: 3px solid #ff0000 !important;
            animation: pulse-red 1s infinite;
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.9);
        }
        .map-tile.yours {
            border: 3px solid #00ff00 !important;
            animation: pulse-green 1s infinite;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.9);
        }
        @keyframes pulse-red {
            0% { 
                border-color: #ff0000;
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.7); 
            }
            50% { 
                border-color: #ff4444;
                box-shadow: 0 0 25px rgba(255, 0, 0, 0.9); 
            }
            100% { 
                border-color: #ff0000;
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.7); 
            }
        }
        @keyframes pulse-green {
            0% { 
                border-color: #00ff00;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.7); 
            }
            50% { 
                border-color: #44ff44;
                box-shadow: 0 0 25px rgba(0, 255, 0, 0.9); 
            }
            100% { 
                border-color: #00ff00;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.7); 
            }
        }
        .map-tile.in-transit {
            animation: pulse-transit 1s infinite;
        }
        @keyframes pulse-transit {
            0% { box-shadow: 0 0 5px rgba(255, 255, 0, 0.5); }
            100% { box-shadow: 0 0 15px rgba(255, 255, 0, 0.9); }
        }
        .nft-count {
            font-size: 0.8rem;
            color: #4dd0e1;
            margin-left: 10px;
            background: rgba(90, 24, 154, 0.3);
            padding: 4px 8px;
            border-radius: 12px;
        }
        .landform-legend {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        .legend-item {
            display: flex;
            align-items: center;
            font-size: 0.8rem;
        }
        .legend-color {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            border: 1px solid #fff;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 100;
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: linear-gradient(135deg, #000a12, #001f3f);
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid #00e5ff;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 0 30px rgba(138, 43, 226, 0.8);
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-title {
            color: #80deea;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .modal-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .attack-button {
            background: linear-gradient(45deg, #ff3864, #ff1493);
        }
        .send-button {
            background: linear-gradient(45deg, #00c853, #00e676);
        }
        .build-button {
            background: linear-gradient(45deg, #ff9500, #ffab00);
        }
        .confirm-button {
            background: linear-gradient(45deg, #001f3f, #7b1fa2);
        }
        .timer {
            color: #ffeb3b;
            text-align: center;
            margin: 1rem 0;
            font-size: 1.2rem;
        }
        .tile-info {
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(90, 24, 154, 0.3);
            border-radius: 8px;
        }
        .tile-info p {
            margin: 0.5rem 0;
        }
        .action-nfts {
            margin-top: 1.5rem;
        }
        .action-nfts-title {
            text-align: center;
            margin-bottom: 1rem;
            color: #80deea;
        }
        .action-nfts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
            max-height: 300px;
            overflow-y: auto;
            padding: 0.5rem;
        }
        .action-nft-card {
            background: rgba(70, 0, 120, 0.5);
            border-radius: 8px;
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid transparent;
            position: relative;
        }
        .action-nft-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.5);
        }
        .action-nft-card.selected {
            border: 2px solid #00ff00;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
        }
        .action-nft-image {
            width: 100%;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
        .action-nft-name {
            font-size: 0.7rem;
            text-align: center;
            margin-top: 0.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .checkmark {
            position: absolute;
            top: 5px;
            right: 5px;
            color: #00ff00;
            font-size: 1.2rem;
            text-shadow: 0 0 5px #000;
            display: none;
        }
        .action-nft-card.selected .checkmark {
            display: block;
        }
        .selection-count {
            text-align: center;
            margin-top: 0.5rem;
            color: #4dd0e1;
            font-size: 0.8rem;
        }
        .building-option {
            padding: 1rem;
            margin: 0.5rem 0;
            background: rgba(70, 0, 120, 0.5);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .building-option:hover {
            background: rgba(90, 24, 154, 0.7);
        }
        .building-option h4 {
            margin: 0 0 0.5rem 0;
            color: #80deea;
        }
        .building-option p {
            margin: 0;
            font-size: 0.9rem;
            color: #4dd0e1;
        }
        .building-info {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(90, 24, 154, 0.3);
            border-radius: 8px;
        }
        .building-level {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .level-bar {
            flex-grow: 1;
            height: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            margin: 0 1rem;
            overflow: hidden;
        }
        .level-fill {
            height: 100%;
            background: linear-gradient(90deg, #00bcd4, #00acc1);
            border-radius: 5px;
        }
        .upgrade-button {
            background: linear-gradient(45deg, #001f3f, #7b1fa2);
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
        }
        .building-cooldown {
            color: #ffeb3b;
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        .nft-status-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-size: 0.9rem;
    z-index: 2;
}
        .nft-status-text {
            color: #ffeb3b;
            font-weight: bold;
            margin-top: 0.5rem;
        }
        .nft-in-use {
            position: relative;
        }
        .nft-in-use .nft-image {
            filter: blur(2px);
        }
    
        .genesis-border {
            border: 3px solid gold !important;
            box-shadow: 0 0 12px gold !important;
        }
        .mutant-border {
            border: 3px solid dodgerblue !important;
            box-shadow: 0 0 12px dodgerblue !important;
        }
        .action-nft-image.blur {
            filter: blur(3px);
        }
        .nft-traits {
            margin-top: 0.5rem;
            font-size: 0.75rem;
            color: #4dd0e1;
        }


.menu-item.disabled-blur {
    filter: blur(2px);
    pointer-events: none;
    opacity: 0.6;
}


@media (max-width: 768px) {
    .top-menu {
        flex-direction: column;
        align-items: flex-start;
    }

    .menu-items {
        flex-direction: column;
        width: 100%;
    }

    .menu-item {
        margin: 0.25rem 0;
        width: 100%;
        text-align: left;
    }

    .container {
        padding: 1rem;
        margin: 1rem;
    }

    .nft-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    .map-grid {
        grid-template-columns: repeat(10, 1fr);
        max-width: 100%;
    }

    .points-display {
        position: static;
        margin-bottom: 1rem;
        width: 100%;
        align-items: flex-start;
    }

    .modal-content {
        width: 95%;
        padding: 1rem;
    }

    .action-nfts-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .nft-image {
        height: auto;
        max-height: 150px;
    }

    .action-nft-image {
        height: auto;
        max-height: 80px;
    }
}


@media (max-width: 768px) {
    .top-menu {
        flex-direction: column;
        align-items: flex-start;
    }

    .menu-items {
        flex-direction: column;
        width: 100%;
        display: none;
    }

    .menu-items.show {
        display: flex;
    }

    .menu-toggle {
        display: block;
        cursor: pointer;
        padding: 0.5rem 1rem;
        color: #cfd8dc;
        background: rgba(30, 0, 60, 0.8);
        border: 1px solid #00e5ff;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }

    .container {
        padding: 1rem;
        margin: 1rem;
    }

    .nft-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    .map-grid {
        grid-template-columns: repeat(10, 1fr);
        max-width: 100%;
    }

    .points-display {
        position: static;
        margin-bottom: 1rem;
        width: 100%;
        align-items: flex-start;
        transform: scale(0.8); /* Make it ~20% smaller */
        transform-origin: top right;
    }

    .modal-content {
        width: 95%;
        padding: 1rem;
    }

    .action-nfts-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .nft-image {
        height: auto;
        max-height: 150px;
    }

    .action-nft-image {
        height: auto;
        max-height: 80px;
    }
}

/* Overlay should only cover the image */
.nft-card .nft-status-overlay {
    height: auto !important;
    bottom: auto;
    top: 0;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}


@media (max-width: 768px) {
    .points-display {
        transform: scale(0.8);
        transform-origin: top center;
        align-items: center;
        margin: 0 auto 1rem auto;
    }
}

@media (min-width: 769px) {
    .menu-toggle {
        display: none !important;
    }
}

</style>
</head>
<body>
<div class="top-menu">
<div class="menu-toggle" onclick="document.querySelector('.menu-items').classList.toggle('show')">☰ Menu</div>
<div class="menu-items">
<div class="menu-item active" data-page="myItems">My Items</div>
<div class="menu-item" data-page="map">Map</div>
<div class="menu-item disabled-blur" onclick="event.preventDefault(); event.stopPropagation(); showComingSoon('Wheel of Destiny')">Wheel of Destiny</div>
<div class="menu-item disabled-blur" onclick="event.preventDefault(); event.stopPropagation(); showComingSoon('Casino Royale')">Casino Royale</div>
<div class="menu-item disabled-blur" onclick="event.preventDefault(); event.stopPropagation(); showComingSoon('Raffle House')">Raffle House</div>
<div class="menu-item disabled-blur" onclick="event.preventDefault(); event.stopPropagation(); showComingSoon('Hatching Grounds')">Hatching Grounds</div>
<div class="menu-item disabled-blur" onclick="event.preventDefault(); event.stopPropagation(); showComingSoon('Point Terminal')">Point Terminal</div>
<div class="menu-item" id="guideTab" onclick="showGuide()">Guide</div>
</div>
</div>

<div class="container" style="position: relative;">
<div class="page active" id="myItemsPage">
<div class="points-display">
<div class="points-total" id="pointsTotal">Nanas: 0</div>
<div class="points-rate" id="pointsRate">Production: 0/hr</div>
</div>
<div style="text-align: center; margin-bottom: 1.5rem;">
<h1 class="glow">Ape Egg</h1>
<div>
<button id="connectButton">Connect Wallet</button>
<button disabled="" id="disconnectButton">Disconnect</button>
</div>
<p id="walletStatus">Wallet status: Not connected</p>
<p id="walletAddress"></p>
<p id="networkStatus"></p>
</div>
<div id="nftContainer" style="display: none;">
<h2>Your NFTs <span class="nft-count" id="nftCount">0</span> <button id="recallNftsButton" style="margin-left: 10px;">Recall NFTs</button><span class="loading" id="loadingIndicator" style="display: none;"></span></h2>
<div class="nft-grid" id="nftGrid"></div>
<p class="error-message" id="errorMessage" style="display: none;"></p>
</div>
</div>
<div class="page" id="mapPage">
<div class="points-display">
<div class="points-total" id="pointsTotal">Nanas: 0</div>
<div class="points-rate" id="pointsRate">Production: 0/hr</div>
</div>
<div style="text-align: center; margin-bottom: 1rem;">
<h1 class="glow">ApeChain Map</h1>
<p>Explore the ApeChain world and discover new territories.</p>
</div>
<div class="map-container">
<div class="map-grid" id="mapGrid"></div>
<div class="landform-legend">
<div class="legend-item">
<div class="legend-color" style="background-color: #8B4513;"></div>
<span>Mountain</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background-color: #87CEEB;"></div>
<span>Sky</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background-color: #1E90FF;"></div>
<span>Sea</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background-color: #4B0082;"></div>
<span>Underground</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background-color: #333;"></div>
<span>Unmarked</span>
</div>
</div>
</div>
</div>
</div>
<div class="modal" id="tileModal">
<div class="modal-content">
<h3 class="modal-title" id="modalTitle">Tile Actions</h3>
<div class="tile-info" id="tileInfo">
<p><strong>Landform:</strong> <span id="tileLandform"></span></p>
<p><strong>Status:</strong> <span id="tileStatus"></span></p>
<div id="tileOwnerInfo"></div>
<div class="building-info" id="tileBuildingInfo" style="display: none;"></div>
</div>
<div class="timer" id="actionTimer"></div>
<div class="modal-buttons" id="initialActionButtons">
<button class="attack-button" disabled="" id="attackButton">Attack</button>
<button class="send-button" disabled="" id="sendButton">Send</button>
<button class="build-button" id="buildButton" style="display: none;">Build</button>
</div>
<div class="action-nfts" id="actionNfts" style="display: none;">
<h4 class="action-nfts-title" id="actionNftsTitle">Select NFTs to Use</h4>
<div class="selection-count" id="selectionCount">Selected: 0/4</div>
<div class="action-nfts-grid" id="actionNftsGrid"></div>
<div class="modal-buttons">
<button class="confirm-button" id="confirmActionButton">Confirm</button>
<button id="cancelActionButton">Cancel</button>
</div>
</div>
</div>
</div>
<div class="modal" id="buildingModal">
<div class="modal-content">
<h3 class="modal-title">Build on Tile <span id="buildingTileIndex"></span></h3>
<div class="timer" id="buildingTimer"></div>
<div id="buildingOptions">
<div class="building-option" data-building="nest">
<h4>Nest Tower (Defensive)</h4>
<p>Increases defense against attacks. Each level provides additional protection.</p>
</div>
<div class="building-option" data-building="storage">
<h4>Egg Storage (Prosperity)</h4>
<p>Increases point production from NFTs on this land. Each level increases bonus by 10%.</p>
</div>
</div>
<div class="modal-buttons">
<button id="cancelBuildingButton">Cancel</button>
</div>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js">

// Auto cleanup defenders left on enemy land
if (!window.defenderCleanupInterval) {
    window.defenderCleanupInterval = setInterval(() => {
        Object.entries(gameState.nftLocations).forEach(([nftId, loc]) => {
            if (loc !== 'cooldown' && typeof loc === 'number') {
                const tile = gameState.tiles[loc];
                if (tile && tile.owner !== gameState.playerAddress && tile.owner !== gameState.connectedWallet) {
                    gameState.nftLocations[nftId] = 'cooldown';
                    localStorage.setItem(`cooldownStart_${nftId}`, Date.now());
                }
            }
        });
        updateNftCards();
    }, 1000);
    console.log("✅ Defender cleanup interval started.");
} else {
    console.log("⚠️ Defender cleanup interval already running.");
}

async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script>
window.addEventListener("load", async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            const address = accounts[0];
            console.log("✅ Wallet already connected:", address);
            gameState.connectedWallet = address;
            walletStatus.textContent = "Wallet status: Connected";
            walletAddress.textContent = address;
            connectButton.disabled = true;
            disconnectButton.disabled = false;

            try {
                const res = await fetch(`/.netlify/functions/get-session?wallet=${address}`);
                if (!res.ok) throw new Error("Not found");
                const parsed = await res.json();
                if (parsed && parsed.tiles) {
                    for (let i = 0; i < 500; i++) {
                        const tile = parsed.tiles[i];
                        if (!window.__tilesPopulatedFromSupabase__) {
                                                  gameState.tiles[i].owner = tile.owner;
                        }
                        if (tile.nftIds) gameState.tiles[i].nftIds = tile.nftIds;
                        gameState.tiles[i].transitNFTs = tile.transitNFTs || [];
                        gameState.tiles[i].inTransit = tile.inTransit || false;
                        gameState.tiles[i].arrivalTime = tile.arrivalTime || null;
                        gameState.tiles[i].transitStartTime = tile.transitStartTime || null;
                        gameState.tiles[i].buildings = tile.buildings || {
                            nest: { level: 0, completeTime: null },
                            storage: { level: 0, completeTime: null }
                        };
                    }
                    gameState.nftLocations = parsed.nftLocations || {};
                    gameState.points = parsed.points || 0;
                    gameState.pointsProduction = parsed.pointsProduction || 0;
                    gameState.lastPointsUpdate = parsed.lastPointsUpdate || Date.now();

                    pointsTotalElements.forEach(el => el.textContent = `Nanas: ${gameState.points.toFixed(3)}`);
                    pointsRateElements.forEach(el => el.textContent = `Production: ${gameState.pointsProduction.toFixed(1)}/hr`);

                    updateTileVisuals();
                    updateNftCards();
                    // 

// 🕵️ Injected tracker for early tile assignment detection
Object.defineProperty(gameState, "tiles", {
  set(value) {
    console.trace("🚨 EARLY gameState.tiles assigned:");
    this._tiles = value;
  },
  get() {
    return this._tiles;
  },
  configurable: true
});

gameState._tiles = Array.from({ length: 500 }, () => ({
    owner: null,
    nftIds: [],
    inTransit: false,
    arrivalTime: null,
    transitStartTime: null,
    buildings: {
        nest: { level: 0, completeTime: null },
        storage: { level: 0, completeTime: null }
    }
}));

generateMap(); // deferred until after tile ownership is loaded
                    calculatePointsProduction();
                    console.log("✅ Game state restored from Netlify.");

    // 🌍 Fetch global tile data from Supabase and overwrite local tiles
    try {
        const response = await fetch("/.netlify/functions/get-tiles");
        const globalTiles = await response.json();
        if (Array.isArray(globalTiles)) {
            globalTiles.forEach(tile => {
                if (gameState.tiles[tile.id]) {
                    gameState.tiles[tile.id].owner = tile.owner;
                    gameState.tiles[tile.id].nftIds = tile.nft_ids;
gameState.nftLocations = gameState.nftLocations || {};
tile.nft_ids?.forEach(id => gameState.nftLocations[id] = tile.id);
                    gameState.tiles[tile.id].inTransit = tile.in_transit;
                    gameState.tiles[tile.id].arrivalTime = tile.arrival_time;
                    gameState.tiles[tile.id].transitStartTime = tile.transit_start_time;
                    gameState.tiles[tile.id].buildings = tile.buildings;
                }
            });
            console.log("🌐 Global map sync completed from Supabase.");
        }
    } catch (error) {
        console.warn("❌ Failed to fetch global tiles:", error);
    }

generateMap();
updateTileVisuals();
                } else {
                    console.log("📦 No saved session found on Netlify");
                }
            } catch (e) {
                console.error("❌ Failed to load session from Netlify:", e);
            }
        }
    }
});



function formatUpgradeTimeMs(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.round((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
}

        const NFT_CONTRACT_ADDRESS = "0x18Ea9d0Bac606F12124fc54d550bA86Aa201069F";
        const APE_CHAIN_RPC = "https://apechain.calderachain.xyz/http";
        const APE_CHAIN_ID = 33139;
        const APE_CHAIN_NAME = "ApeChain";
        const APE_CHAIN_SYMBOL = "APE";
        const APE_CHAIN_BLOCK_EXPLORER = "https://apescan.io";
        const API_KEY = "A1PYF17WZ4SSMUVICVNCDY853E1NYQHD53";
        const MAX_SELECTION = 4;
        const STORAGE_KEY = "apeEggGameState";


function storeDefenderNfts(ownerAddress, nftDataArray) {
    if (!ownerAddress || !Array.isArray(nftDataArray)) return;
    const key = `${STORAGE_KEY}_${ownerAddress.toLowerCase()}`;
    const state = JSON.parse(localStorage.getItem(key) || '{}');

    if (!state.tiles || !Array.isArray(state.tiles) || state.tiles.length !== 500) {
        state.tiles = Array(500).fill().map(() => ({
            owner: null,
            nftIds: [],
            buildings: { nest: { level: 0 }, storage: { level: 0 } }
        }));
    }

    if (!state.nfts) state.nfts = [];

    const newNfts = nftDataArray.filter(n => !state.nfts.some(existing => existing.id === n.id));
    if (newNfts.length > 0) {
        console.log(`💾 Storing ${newNfts.length} NFTs under ${ownerAddress}`);
        state.nfts.push(...newNfts);
        localStorage.setItem(key, JSON.stringify(state));
    } else {
        console.log("✅ No new NFTs to store for defender.");
    }
}

function loadDefenderNFTsForTile(tileIndex) {
    const tile = gameState.tiles[tileIndex];
    const key = `${STORAGE_KEY}_${tile.owner?.toLowerCase()}`;
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    const defenderIds = state?.tiles?.[tileIndex]?.nftIds || [];

    const defenders = defenderIds.map(id =>
        (state.nfts || []).find(n => String(n.id) === String(id))
    ).filter(n => !!n);

    if (!gameState.nfts) gameState.nfts = [];

    defenders.forEach(n => {
        if (!gameState.nfts.find(existing => existing.id === n.id)) {
            console.log(`🔁 Loading defender NFT ${n.name} (ID: ${n.id}) from localStorage`);
            gameState.nfts.push(n);
        }
    });
}





function storeDefenderNfts(ownerAddress, nftDataArray) {
    if (!ownerAddress || !Array.isArray(nftDataArray)) return;
    const key = `${STORAGE_KEY}_${ownerAddress.toLowerCase()}`;
    const state = JSON.parse(localStorage.getItem(key) || '{}');

    if (!state.tiles || !Array.isArray(state.tiles) || state.tiles.length !== 500) {
        state.tiles = Array(500).fill().map(() => ({
            owner: null,
            nftIds: [],
            buildings: { nest: { level: 0 }, storage: { level: 0 } }
        }));
    }

    if (!state.nfts) state.nfts = [];

    const newNfts = nftDataArray.filter(n => !state.nfts.some(existing => existing.id === n.id));
    if (newNfts.length > 0) {
        console.log(`💾 Storing ${newNfts.length} NFTs under ${ownerAddress}`);
        state.nfts.push(...newNfts);
        localStorage.setItem(key, JSON.stringify(state));
    } else {
        console.log("✅ No new NFTs to store for defender.");
    }
}



        const MAP_SEED = "apechain-static-seed-12345";
        const BUILDING_COOLDOWN = 5000;
        const POINTS_UPDATE_INTERVAL = 10000;
        const TRANSIT_DURATION = 0;
        const STUCK_TRANSIT_TIMEOUT = 5000;

        const gameState = {
  _tiles: [], // backing field for tiles

            connectedWallet: null,
            selectedTile: null,
            selectedAction: null,
            selectedNFTs: [],
            nfts: [],
            tiles: Array(500).fill().map(() => ({
                landform: null,
                owner: null,
                nftIds: [],
                inTransit: false,
                transitStartTime: null,
                arrivalTime: null,
                transitNFTs: [],
                buildings: {
                    nest: { level: 0, completeTime: null },
                    storage: { level: 0, completeTime: null }
                }
            })),
            nftLocations: {},
            transitIntervals: {},
            points: 0,
            pointsProduction: 0,
            lastPointsUpdate: Date.now(),
            pointsInterval: null
        };


// Restore cooldowns from localStorage
Object.keys(localStorage).forEach(key => {
    if (key.startsWith("cooldownStart_")) {
        const nftId = parseInt(key.replace("cooldownStart_", ""));
        const start = parseInt(localStorage.getItem(key));
        const elapsed = Date.now() - start;
        const total = 10 * 60 * 1000;
        const remaining = total - elapsed;

        if (remaining > 0) {
            gameState.nftLocations[nftId] = 'cooldown';
        } else {
            localStorage.removeItem(key);
            gameState.nftLocations[nftId] = null;
        }
    }
});




        const LANDFORMS = {
            SUMMIT: {
                name: "Mountain",
                color: "#8B4513",
                image: "https://img.icons8.com/color/96/mountain.png"
            },
            SKY: {
                name: "Sky",
                color: "#87CEEB",
                image: "https://img.icons8.com/color/96/clouds.png"
            },
            SEA: {
                name: "Sea",
                color: "#1E90FF",
                image: "https://img.icons8.com/color/96/waves.png"
            },
            UNDERGROUND: {
                name: "Underground",
                color: "#4B0082",
                image: "https://img.icons8.com/color/96/cave.png"
            },
            UNMARKED: {
                name: "Unmarked",
                color: "#333",
                image: "https://img.icons8.com/color/96/question-mark.png"
            }
        };

        const BUILDINGS = {
            NEST: {
                name: "Nest Tower",
                type: "defensive",
                maxLevel: 5,
                description: "Increases defense against attacks"
            },
            STORAGE: {
                name: "Egg Storage",
                type: "prosperity",
                maxLevel: 5,
                description: "Increases point production from NFTs"
            }
        };

        let contractABI = [];
        const connectButton = document.getElementById('connectButton');
        const disconnectButton = document.getElementById('disconnectButton');
        const walletStatus = document.getElementById('walletStatus');
        const walletAddress = document.getElementById('walletAddress');
        const networkStatus = document.getElementById('networkStatus');
        const nftContainer = document.getElementById('nftContainer');
        const nftGrid = document.getElementById('nftGrid');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const errorMessage = document.getElementById('errorMessage');
        const nftCount = document.getElementById('nftCount');
        const menuItems = document.querySelectorAll('.menu-item');
        const pages = document.querySelectorAll('.page');
        const mapGrid = document.getElementById('mapGrid');
        const tileModal = document.getElementById('tileModal');
        const modalTitle = document.getElementById('modalTitle');
        const tileLandform = document.getElementById('tileLandform');
        const tileStatus = document.getElementById('tileStatus');
        const tileOwnerInfo = document.getElementById('tileOwnerInfo');
        const tileBuildingInfo = document.getElementById('tileBuildingInfo');
        const actionTimer = document.getElementById('actionTimer');
        const initialActionButtons = document.getElementById('initialActionButtons');
        const attackButton = document.getElementById('attackButton');
        const sendButton = document.getElementById('sendButton');
        const buildButton = document.getElementById('buildButton');
        const actionNfts = document.getElementById('actionNfts');
        const actionNftsTitle = document.getElementById('actionNftsTitle');
        const selectionCount = document.getElementById('selectionCount');
        const actionNftsGrid = document.getElementById('actionNftsGrid');
        const confirmActionButton = document.getElementById('confirmActionButton');
        const cancelActionButton = document.getElementById('cancelActionButton');
        const buildingModal = document.getElementById('buildingModal');
        const buildingTileIndex = document.getElementById('buildingTileIndex');
        const buildingTimer = document.getElementById('buildingTimer');
        const buildingOptions = document.getElementById('buildingOptions');
        const cancelBuildingButton = document.getElementById('cancelBuildingButton');
        const pointsTotalElements = document.querySelectorAll('#pointsTotal');
const pointsRateElements = document.querySelectorAll('#pointsRate');

        function simpleHash(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash);
        }

        function saveGameState() {
    saveGameStateToBackend();
            if (!gameState.connectedWallet) return;
            const walletKey = `${STORAGE_KEY}_${gameState.connectedWallet.toLowerCase()}`;
            const data = {
                tiles: gameState.tiles,
                nftLocations: gameState.nftLocations,
                points: gameState.points,
                pointsProduction: gameState.pointsProduction,
                lastPointsUpdate: gameState.lastPointsUpdate
            };
            localStorage.setItem(walletKey, JSON.stringify(data));
            const stateToSave = {
                tiles: gameState.tiles,
                nftLocations: gameState.nftLocations,
                points: gameState.points,
                pointsProduction: gameState.pointsProduction,
                lastPointsUpdate: gameState.lastPointsUpdate
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        }

        function loadGameState() {
            if (!gameState.connectedWallet) return false;
            const walletKey = `${STORAGE_KEY}_${gameState.connectedWallet.toLowerCase()}`;
            const saved = localStorage.getItem(walletKey);
            if (!saved) return false;
            try {
                const parsed = JSON.parse(saved);
                for (let i = 0; i < 500; i++) {
                    const tile = parsed.tiles[i];
                    if (tile.owner === gameState.connectedWallet) {
                        gameState.tiles[i].owner = tile.owner;
                        if (tile.nftIds) gameState.tiles[i].nftIds = tile.nftIds;
                    }
                    gameState.tiles[i].transitNFTs = tile.transitNFTs || [];
                    gameState.tiles[i].inTransit = tile.inTransit || false;
                    gameState.tiles[i].arrivalTime = tile.arrivalTime || null;
                    gameState.tiles[i].transitStartTime = tile.transitStartTime || null;
                    if (tile.buildings) gameState.tiles[i].buildings = tile.buildings;
                }
                gameState.nftLocations = parsed.nftLocations || {};
                gameState.points = parsed.points || 0;
                gameState.pointsProduction = parsed.pointsProduction || 0;
                gameState.lastPointsUpdate = parsed.lastPointsUpdate || Date.now();
                pointsTotalElements.forEach(el => el.textContent = `Nanas: ${gameState.points.toFixed(3)}`);
                pointsRateElements.forEach(el => el.textContent = `Production: ${gameState.pointsProduction.toFixed(1)}/hr`);
                return true;
            } catch (e) { console.error('Load error', e); return false; }
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                try {
                    const parsedState = JSON.parse(savedState);
                    if (!window.__tilesPopulatedFromSupabase__) {
                                          if (parsedState.tiles && parsedState.tiles.length === 500) {
                    }
                        for (let i = 0; i < 500; i++) {
                            gameState.tiles[i].owner = parsedState.tiles[i].owner;
                            gameState.tiles[i].nftIds = parsedState.tiles[i].nftIds || [];
                            gameState.tiles[i].transitNFTs = parsedState.tiles[i].transitNFTs || [];
                            gameState.tiles[i].inTransit = parsedState.tiles[i].inTransit || false;
                            gameState.tiles[i].arrivalTime = parsedState.tiles[i].arrivalTime || null;
                            gameState.tiles[i].transitStartTime = parsedState.tiles[i].transitStartTime || null;
                            if (parsedState.tiles[i].buildings) {
                                gameState.tiles[i].buildings = parsedState.tiles[i].buildings;
                            }
                            if (gameState.tiles[i].inTransit) {
                                if (Date.now() >= gameState.tiles[i].arrivalTime) {
                                    completeTransit(i);
                                } else {
                                    
        tileElement.classList.remove("green-tile");
        tileElement.classList.add("red-tile");
    }
                            }
                        }
                    }
                    if (parsedState.nftLocations) {
                        gameState.nftLocations = parsedState.nftLocations;
                    }
                    if (parsedState.points !== undefined) {
                        gameState.points = parsedState.points;
                        pointsTotalElements.forEach(el => el.textContent = `Nanas: ${gameState.points.toFixed(3)}`);
                    }
                    if (parsedState.pointsProduction !== undefined) {
                        gameState.pointsProduction = parsedState.pointsProduction;
                        pointsRateElements.forEach(el => el.textContent = `Production: ${gameState.pointsProduction.toFixed(1)}/hr`);
                    }
                    if (parsedState.lastPointsUpdate !== undefined) {
                        gameState.lastPointsUpdate = parsedState.lastPointsUpdate;
                    }
                    return true;
                } catch (e) {
                    console.error("Error loading saved state:", e);
                    return false;
                }
            }
            return false;
        }

        function generateMap() {
            mapGrid.innerHTML = '';
            const landforms = [];
            for (let i = 0; i < 100; i++) landforms.push(LANDFORMS.SUMMIT);
            for (let i = 0; i < 100; i++) landforms.push(LANDFORMS.SKY);
            for (let i = 0; i < 100; i++) landforms.push(LANDFORMS.SEA);
            for (let i = 0; i < 100; i++) landforms.push(LANDFORMS.UNDERGROUND);
            for (let i = 0; i < 100; i++) landforms.push(LANDFORMS.UNMARKED);
            seededShuffle(landforms, MAP_SEED);
            for (let i = 0; i < 500; i++) {
                const landform = landforms[i];
                gameState.tiles[i].landform = landform;
                const tile = document.createElement('div');
                tile.className = 'map-tile';
                tile.style.backgroundImage = `url(${landform.image})`;
                tile.style.backgroundColor = landform.color;
                tile.dataset.index = i;
                tile.addEventListener('click', () => handleTileClick(i));
                mapGrid.appendChild(tile);
            }
            updateTileVisuals();
                startDefenderCleanup();
        }

        function seededShuffle(array, seed) {
            const rng = new Math.seedrandom(seed);
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(rng() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function updateTileVisuals() {
            for (let i = 0; i < 500; i++) {
                const tile = gameState.tiles[i];
        
                const tileElement = document.querySelector(`.map-tile[data-index="${i}"]`);
                if (!tileElement) continue;
                
                tileElement.className = 'map-tile';
                
                if (tile.owner) {
                    if (gameState.connectedWallet === tile.owner) {
                        tileElement.classList.add('yours');
                    } else {
                        tileElement.classList.add('occupied');
                    }
                }
                
                if (tile.inTransit) {
                    tileElement.classList.add('in-transit');
                    if (!gameState.transitIntervals[i]) {
                        updateTransitTimer(i);
                    }
                }
            }
        }

        function updateNftCards() {
            const nftCards = document.querySelectorAll('.nft-card');
            nftCards.forEach(card => {
                const nftId = card.dataset.nftId;
                const statusOverlay = card.querySelector('.nft-status-overlay');
                if (statusOverlay) {
                    card.removeChild(statusOverlay);
                }
                card.classList.remove('nft-in-use');
                const location = gameState.nftLocations[nftId];
                if (location !== undefined && location !== null) {

                if (location === 'cooldown') {
                    card.classList.add('nft-in-use');

                    const storageKey = `cooldownStart_${nftId}`;
                    let start = localStorage.getItem(storageKey);
                    if (!start) {
                        start = Date.now();
                        localStorage.setItem(storageKey, start);
                    } else {
                        start = parseInt(start);
                    }

                    let overlay = card.querySelector('.nft-status-overlay');
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.className = 'nft-status-overlay';
                        card.appendChild(overlay);
                    }

                    let textDiv = overlay.querySelector('.nft-status-text');
                    if (!textDiv) {
                        textDiv = document.createElement('div');
                        textDiv.className = 'nft-status-text';
                        overlay.appendChild(textDiv);
                    }

                    const update = () => {
                        const elapsed = Date.now() - start;
                        const total = 10 * 60 * 1000;
                        const remaining = total - elapsed;
                        if (remaining <= 0) {
                            gameState.nftLocations[nftId] = null;
                            localStorage.removeItem(storageKey);
                            overlay.remove();
                            card.classList.remove('nft-in-use');
                            textDiv.remove();
                            updateNftCards();
                            return;
                        }
                        const mins = Math.floor(remaining / 60000);
                        const secs = Math.floor((remaining % 60000) / 1000);
                        textDiv.innerHTML = `Cooldown<br>${mins}m ${secs}s`;
                    };

                    update();
                    setInterval(update, 1000);
                    return;
                }

                    card.classList.add('nft-in-use');
                    const overlay = document.createElement('div');
                    overlay.className = 'nft-status-overlay';
                    if (location === 'in-transit') {
                        overlay.innerHTML = '<div class=\"nft-status-text\">In Transit</div>';
                    } else if (typeof location === 'number') {
                        const tile = gameState.tiles[location];
                        if (tile) {
                            overlay.innerHTML = `<div class=\"nft-status-text\">Working on Land ${location + 1}</div>`;
                        }
                    }
                    card.appendChild(overlay);
                }
            });
        }

        
function calculatePointsProduction() {
    let production = 0;
    for (let i = 0; i < 500; i++) {
        const tile = gameState.tiles[i];
        if (tile.owner === gameState.connectedWallet && !tile.inTransit) {
            // Only apply building bonus if upgrade is complete
            const storageUpgradeInProgress = tile.buildings.storage.completeTime && tile.buildings.storage.completeTime > Date.now();
            let storageLevel = storageUpgradeInProgress ? tile.buildings.storage.level - 1 : tile.buildings.storage.level;
            if (storageLevel < 0) storageLevel = 0;

            for (const nftId of tile.nftIds) {
                const nft = gameState.nfts.find(n => n.id === nftId);
                if (nft && nft.metadata?.attributes) {
                    const typeAttr = nft.metadata.attributes.find(attr => attr.trait_type === 'Type');
                    const factionAttr = nft.metadata.attributes.find(attr => attr.trait_type === 'Faction');
                    const type = typeAttr?.value?.toLowerCase() || '';
                    const faction = factionAttr?.value?.toLowerCase() || '';
                    let pointsPerHour = 0;

                    if (type.includes('genesis')) {
                        pointsPerHour = (faction === 'worker' || faction === 'captain') ? 0.33 : 0.3;
                    } else if (type.includes('mutant')) {
                        pointsPerHour = (faction === 'worker' || faction === 'captain') ? 0.22 : 0.2;
                    } else {
                        pointsPerHour = (faction === 'worker' || faction === 'captain') ? 0.11 : 0.1;
                    }

                    if (storageLevel > 0) {
                        pointsPerHour *= (1 + (storageLevel * 0.1));
                    }

                    // Apply landform bonus if NFT matches tile landform
                    const landformAttr = nft.metadata.attributes.find(attr => attr.trait_type === 'Landform');
                    if (landformAttr && landformAttr.value === tile.landform.name) {
                        pointsPerHour *= 1.1; // 10% bonus
                    }

                    production += pointsPerHour;
                }
            }
        }
    }
    gameState.pointsProduction = production;
    pointsRateElements.forEach(el => el.textContent = `Production: ${production.toFixed(3)}/hr`);
    saveGameState();
    return production;
}


function updatePoints() {
            const now = Date.now();
            const timePassed = (now - gameState.lastPointsUpdate) / 3600000;
            if (timePassed > 0) {
                gameState.points += gameState.pointsProduction * timePassed;
                gameState.lastPointsUpdate = now;
                pointsTotalElements.forEach(el => el.textContent = `Nanas: ${gameState.points.toFixed(3)}`);
                saveGameState();
            }
        }

        function showModal() {
            tileModal.style.display = 'flex';
        }

        function handleTileClick(tileIndex) {
    const tileElement = document.querySelector(`.map-tile[data-index="${tileIndex}"]`);
    actionTimer.textContent = '';
            gameState.selectedTile = tileIndex;
            const tile = gameState.tiles[tileIndex];
            modalTitle.textContent = `Tile ${tileIndex + 1}`;
            tileLandform.textContent = tile.landform.name;
            gameState.selectedAction = null;
            gameState.selectedNFTs = [];
            updateSelectionCount();
            initialActionButtons.style.display = 'flex';
            actionNfts.style.display = 'none';
            if (tile.inTransit) {
                const timeLeft = Math.max(0, Math.ceil((tile.arrivalTime - Date.now()) / 1000));
                tileStatus.textContent = `NFT arriving in ${timeLeft} seconds`;
                if (gameState.selectedTile === tileIndex) { actionTimer.textContent = timeLeft > 0 ? `Time remaining: ${Math.floor(timeLeft/60)}m ${timeLeft%60}s` : ''; }
                initialActionButtons.style.display = 'none';
                showModal();
                updateNftCards();
                updateTileVisuals();
                startDefenderCleanup();
                return;
            }
            let buildingInProgress = false;
            for (const buildingType in tile.buildings) {
                if (tile.buildings[buildingType].completeTime && tile.buildings[buildingType].completeTime > Date.now()) {
                    const timeLeft = Math.max(0, Math.ceil((tile.buildings[buildingType].completeTime - Date.now()) / 1000));
                    tileStatus.textContent = `Building in progress (${timeLeft}s remaining)`;
                    if (gameState.selectedTile === tileIndex) { actionTimer.textContent = timeLeft > 0 ? `Time remaining: ${Math.floor(timeLeft/60)}m ${timeLeft%60}s` : ''; }
                    initialActionButtons.style.display = 'none';
                    showModal();
    if (tile.owner === gameState.connectedWallet) {
        const hasOngoingUpgrade = Object.values(tile.buildings).some(b => b.completeTime && b.completeTime > Date.now());
        if (hasOngoingUpgrade) {
            const buttons = tileBuildingInfo.querySelectorAll('.upgrade-button');
            buttons.forEach(btn => {
                btn.disabled = true;
                btn.style.filter = 'blur(1px)';
                btn.style.opacity = 0.5;
            });
        }
    }

                    updateBuildingTimer(tileIndex, buildingType);
                    buildingInProgress = true;
                    break;
                }
            }
            if (buildingInProgress) return;
            if (tile.owner) {
                if (tile.owner === gameState.connectedWallet) {
                    tileStatus.textContent = "Owned by you";
                    const nftNames = tile.nftIds.map(nftId => {
                        const nft = gameState.nfts.find(n => n.id === nftId);
                        return nft ? nft.name : 'Unknown NFT';
                    }).join(', ');
                    tileOwnerInfo.innerHTML = `<p><strong>Your NFTs:</strong> ${nftNames || 'None'}</p>`;
                    tileBuildingInfo.style.display = 'block';
                    
                const hasOngoingUpgrade = Object.values(tile.buildings).some(b => b.completeTime && b.completeTime > Date.now());
tileBuildingInfo.innerHTML = '';
                    for (const buildingType in BUILDINGS) {
                        const building = BUILDINGS[buildingType];
                        const buildingData = tile.buildings[buildingType.toLowerCase()];
                        const level = buildingData?.level || 0;
                        const buildingDiv = document.createElement('div');
                        buildingDiv.innerHTML = `
                            <h4>${building.name} (Level ${level})</h4>
                            <p>${building.description}</p>
                            <div class="building-level">
                                <span>Level ${level}/${building.maxLevel}</span>
                                <div class="level-bar">
                                    <div class="level-fill" style="width: ${(level / building.maxLevel) * 100}%"></div>
                                </div>
                                ${level < building.maxLevel ? 
                                    `${level < building.maxLevel && !hasOngoingUpgrade ?
    `<button class="upgrade-button" onclick="initiateUpgrade(${tileIndex}, '${buildingType.toLowerCase()}')">Upgrade</button>` :
    `<button class="upgrade-button" disabled style="opacity: 0.5; filter: blur(1px);">Upgrade</button>`}` : 
                                    '<span>Max Level</span>'
                                }
                            </div>
                        `;
                        
                const durationSpan = document.createElement('span');
                durationSpan.style.marginLeft = '10px';
                durationSpan.style.fontSize = '0.8rem';
                durationSpan.style.color = '#ffeb3b';
                durationSpan.textContent = getUpgradeDurationText(tileIndex, buildingType.toLowerCase());
                const btn = buildingDiv.querySelector('.upgrade-button');
                if (btn && btn.parentNode) btn.parentNode.appendChild(durationSpan);

tileBuildingInfo.appendChild(buildingDiv);
                    }
                    showBuildOption(tileIndex);
                } else {
                    
        tileElement.classList.remove("green-tile");
        tileElement.classList.add("red-tile");
    }
            } else {
                tileStatus.textContent = "Unoccupied";
                tileOwnerInfo.innerHTML = '';
                tileBuildingInfo.style.display = 'none';
                sendButton.disabled = gameState.nfts.filter(nft => !gameState.nftLocations[nft.id]).length === 0;
                attackButton.disabled = true;
                buildButton.style.display = 'none';
            }
            showModal();
        }

        function completeTransit(tileIndex) {
            const tile = gameState.tiles[tileIndex];
            clearInterval(gameState.transitIntervals[tileIndex]);
            delete gameState.transitIntervals[tileIndex];
            tile.inTransit = false;
            tile.arrivalTime = null;
            tile.transitStartTime = null;
            if (Date.now() >= tile.arrivalTime) {
                const previousOwner = defenderTile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(defenderTileIndex);
                tile.nftIds = [...tile.transitNFTs];
                tile.nftIds.forEach(nftId => {
                    gameState.nftLocations[nftId] = tileIndex;
                });
            } else {
                tile.transitNFTs.forEach(nftId => {
                    gameState.nftLocations[nftId] = null;
                });
            }
            tile.transitNFTs = [];
            updateNftCards();
            calculatePointsProduction();
            saveGameState();
        }

        function updateTransitTimer(tileIndex) {
            const tile = gameState.tiles[tileIndex];
            if (!tile.inTransit) return;
            if (gameState.transitIntervals[tileIndex]) {
                clearInterval(gameState.transitIntervals[tileIndex]);
                delete gameState.transitIntervals[tileIndex];
            }
            const checkTransit = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - tile.transitStartTime;
                const timeLeft = Math.max(0, tile.arrivalTime - currentTime);
                if (timeLeft <= 0) {
                    completeTransit(tileIndex);
                } else if (elapsed > STUCK_TRANSIT_TIMEOUT) {
                    console.log(`Transit stuck for tile ${tileIndex}, returning NFTs`);
                    completeTransit(tileIndex);
                }
            };
            gameState.transitIntervals[tileIndex] = setInterval(checkTransit, 1000);
            checkTransit();
        }

        function updateBuildingTimer(tileIndex, buildingType) {
            const tile = gameState.tiles[tileIndex];
            const building = tile.buildings[buildingType];
            if (!building.completeTime || building.completeTime <= Date.now()) return;
            if (gameState.transitIntervals[`building_${tileIndex}_${buildingType}`]) {
                clearInterval(gameState.transitIntervals[`building_${tileIndex}_${buildingType}`]);
            }
            gameState.transitIntervals[`building_${tileIndex}_${buildingType}`] = setInterval(() => {
                const timeLeft = Math.max(0, Math.ceil((building.completeTime - Date.now()) / 1000));
                if (gameState.selectedTile === tileIndex) { actionTimer.textContent = timeLeft > 0 ? `Time remaining: ${Math.floor(timeLeft/60)}m ${timeLeft%60}s` : ''; }
                if (timeLeft <= 0) {
                    clearInterval(gameState.transitIntervals[`building_${tileIndex}_${buildingType}`]);
                    delete gameState.transitIntervals[`building_${tileIndex}_${buildingType}`];
                    tileStatus.textContent = "Owned by you";
                    const nftNames = tile.nftIds.map(nftId => {
                        const nft = gameState.nfts.find(n => n.id === nftId);
                        return nft ? nft.name : 'Unknown NFT';
                    }).join(', ');
                    tileOwnerInfo.innerHTML = `<p><strong>Your NFTs:</strong> ${nftNames || 'None'}</p>`;
                    tileBuildingInfo.style.display = 'block';
                    tileBuildingInfo.innerHTML = '';
                    for (const type in BUILDINGS) {
                        const bldg = BUILDINGS[type];
                        const bldgData = tile.buildings[type.toLowerCase()];
                        const level = bldgData?.level || 0;
                        const buildingDiv = document.createElement('div');
                        buildingDiv.innerHTML = `
                            <h4>${bldg.name} (Level ${level})</h4>
                            <p>${bldg.description}</p>
                            <div class="building-level">
                                <span>Level ${level}/${bldg.maxLevel}</span>
                                <div class="level-bar">
                                    <div class="level-fill" style="width: ${(level / bldg.maxLevel) * 100}%"></div>
                                </div>
                                ${level < bldg.maxLevel ? 
                                    `<button class="upgrade-button" onclick="initiateUpgrade(${tileIndex}, '${type.toLowerCase()}')">Upgrade</button>` : 
                                    '<span>Max Level</span>'
                                }
                            </div>
                        `;
                        
                const durationSpan = document.createElement('span');
                durationSpan.style.marginLeft = '10px';
                durationSpan.style.fontSize = '0.8rem';
                durationSpan.style.color = '#ffeb3b';
                durationSpan.textContent = getUpgradeDurationText(tileIndex, buildingType.toLowerCase());
                const btn = buildingDiv.querySelector('.upgrade-button');
                if (btn && btn.parentNode) btn.parentNode.appendChild(durationSpan);

tileBuildingInfo.appendChild(buildingDiv);
                    }
                    if (buildingType === 'storage') {
                        calculatePointsProduction();
                    }
                    saveGameState();
                }
            }, 1000);
        }

        function updateSelectionCount() {
            selectionCount.textContent = `Selected: ${gameState.selectedNFTs.length}/${MAX_SELECTION}`;
            selectionCount.style.color = gameState.selectedNFTs.length >= MAX_SELECTION ? '#ff3864' : '#b388ff';
        }

        function showBuildOption(tileIndex) {
            const tile = gameState.tiles[tileIndex];
            const allBuildingsBuilt = Object.values(tile.buildings).every(b => b.level > 0);
            initialActionButtons.style.display = 'flex';
            attackButton.disabled = true;
            sendButton.disabled = true;
            buildButton.style.display = allBuildingsBuilt ? 'none' : 'block';
            actionNfts.style.display = 'none';
            showModal();
        }

        function showNftSelection(action) {
            gameState.selectedAction = action;
            initialActionButtons.style.display = 'none';
            actionNfts.style.display = 'block';
            if (action === 'attack') {
                actionNftsTitle.textContent = 'Select NFTs to Attack With (Max 4)';
            } else if (action === 'send') {
                actionNftsTitle.textContent = 'Select NFTs to Send (Max 4)';
            }
            actionNftsGrid.innerHTML = '';

            const availableNFTs = gameState.nfts.filter(nft => !gameState.nftLocations[nft.id] && gameState.nftLocations[nft.id] !== 0);
    // 🚫 Prevent selecting already used NFTs
            if (availableNFTs.length === 0) {
                actionNftsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No available NFTs</p>';
                confirmActionButton.disabled = true;
                return;
            }
            availableNFTs.forEach(nft => {
                const nftCard = document.createElement('div');
                nftCard.className = 'action-nft-card';
                nftCard.dataset.nftId = nft.id;
                
                const typeAttr = nft.metadata?.attributes?.find(attr => attr.trait_type === 'Type');
                if (typeAttr) {
                    const val = typeAttr.value.toLowerCase();
                    if (val.includes('genesis')) nftCard.classList.add('genesis-border');
// Removed orphaned else if (val.includes('mutant')) nftCard.classList.add('mutant-border');
                }
                nftCard.innerHTML = `
                    <div style="position: relative;">
                        <img src="${nft.image}" class="action-nft-image" alt="NFT">
                        <div class="blur-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6);"></div>
                    </div>
                    <div class="action-nft-name">${nft.name}</div>
                    <div class="nft-traits">
                        Faction: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Faction')?.value || 'N/A'}<br>
                        Landform: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Landform')?.value || 'N/A'}<br>
                        Gender: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Gender')?.value || 'N/A'}<br>
                        Type: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Type')?.value || 'N/A'}
                    </div>
                    <div class="checkmark">✓</div>
                `;
                if (gameState.selectedNFTs.includes(nft.id)) {
                    nftCard.classList.add('selected');
                }
                nftCard.addEventListener('click', () => toggleNftSelection(nft.id));
                actionNftsGrid.appendChild(nftCard);
            });
            confirmActionButton.disabled = gameState.selectedNFTs.length === 0;
        }

        function toggleNftSelection(nftId) {
            const index = gameState.selectedNFTs.indexOf(nftId);
            if (index === -1) {
                if (gameState.selectedNFTs.length >= MAX_SELECTION) {
                    alert(`You can select a maximum of ${MAX_SELECTION} NFTs`);
                    return;
                }
                gameState.selectedNFTs.push(nftId);
            } else {
                gameState.selectedNFTs.splice(index, 1);
            }
            const nftCard = document.querySelector(`.action-nft-card[data-nft-id="${nftId}"]`);
            if (nftCard) {
                nftCard.classList.toggle('selected');
            const img = nftCard.querySelector('.action-nft-image');
            const overlay = nftCard.querySelector('.blur-overlay');
            if (nftCard.classList.contains('selected')) {
                img.classList.add('blur');
                overlay.style.display = 'block';
                nftCard.style.border = '1px solid #555';
                nftCard.style.boxShadow = 'none';
            } else {
                img.classList.remove('blur');
                overlay.style.display = 'none';
                nftCard.style.border = '';
                nftCard.style.boxShadow = '';
            }
            }
            updateSelectionCount();
            confirmActionButton.disabled = gameState.selectedNFTs.length === 0;
        }

        
function resolveAttack(attackerTileIndex, defenderTileIndex, attackerNFTs, defenderNFTs, defenderBuildings) {
    const defenderTile = gameState.tiles[defenderTileIndex];
    function getPower(nft, isAttacker) {
        const typeAttr = nft.metadata?.attributes?.find(a => a.trait_type === 'Type')?.value?.toLowerCase() || '';
        const factionAttr = nft.metadata?.attributes?.find(a => a.trait_type === 'Faction')?.value?.toLowerCase() || '';
        const landformAttr = nft.metadata?.attributes?.find(a => a.trait_type === 'Landform')?.value;

        let power = 0;
        if (typeAttr.includes('genesis')) power = 20;
        else if (typeAttr.includes('mutant')) power = 15;
        else power = 10;

        if (factionAttr === 'captain' || factionAttr === 'thief') {
            power += 3;
        }

        if (landformAttr && landformAttr === gameState.tiles[defenderTileIndex].landform.name) {
            power += 2;
        }

        return power;
    }

    let attackerTotal = attackerNFTs.reduce((sum, nft) => sum + getPower(nft, true), 0);
    let defenderTotal = defenderNFTs.reduce((sum, nft) => sum + getPower(nft, false), 0);

    if (defenderBuildings?.nest?.level) {
        defenderTotal += defenderBuildings.nest.level * 5;
    }

    const winChance = attackerTotal / (attackerTotal + defenderTotal);
    const roll = Math.random();
    const won = roll < winChance;

    showAttackResultPopup(winChance, won);

    if (won) {
        // Attacker wins: defenders go on cooldown
        defenderNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = 'cooldown';
            const storageKey = `cooldownStart_${nft.id}`;
            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, Date.now());
            }
        });
    } else {
        // Defender wins: attackers go on cooldown
        attackerNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = 'cooldown';
            const storageKey = `cooldownStart_${nft.id}`;
            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, Date.now());
            }
        });
    }


    if (won) {
        const tile = gameState.tiles[defenderTileIndex];
        const previousOwner = defenderTile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(defenderTileIndex);
        loadDefenderNFTsForTile(defenderTileIndex);
        loadDefenderNFTsForTile(defenderTileIndex);
        const defenderNFTs = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, defenderNFTs);
        // Save defenders before overwrite
        const previousDefenders = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, previousDefenders);
tile.nftIds = attackerNFTs.map(n => n.id);
        attackerNFTs.forEach(n => {
            gameState.nftLocations[n.id] = defenderTileIndex;
        });
        updateNftCards();
        tile.buildings = {
            nest: { level: 0, completeTime: null },
            storage: { level: 0, completeTime: null }
        };
        tile.transitNFTs = [];
        tile.inTransit = false;
        tile.arrivalTime = null;
        tile.transitStartTime = null;

        attackerNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = defenderTileIndex;
        });

        // Update defender's localStorage game state if available
                for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_KEY + '_')) {
                try {
            if (key.startsWith(STORAGE_KEY + '_')) {
                    const parsed = JSON.parse(localStorage.getItem(key));
                    
            }

console.log("Checking localStorage key:", key);
console.log("Parsed owner:", parsed?.tiles?.[defenderTileIndex]?.owner, "| Previous owner:", previousOwner);

        if (parsed?.tiles?.[defenderTileIndex]?.owner === previousOwner)
 {
                        parsed.tiles[defenderTileIndex].owner = null;
                        parsed.tiles[defenderTileIndex].nftIds = [];
                        parsed.tiles[defenderTileIndex].buildings = {
                            nest: { level: 0, completeTime: null },
                            storage: { level: 0, completeTime: null }
                        };
                        localStorage.setItem(key, JSON.stringify(parsed));
                    }
                } catch (e) { console.warn("Failed to patch defender state", key); }
            }
        }

    } else {
        attackerNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = 'cooldown';
        });
        setTimeout(() => {
            attackerNFTs.forEach(nft => {
                gameState.nftLocations[nft.id] = null;
            });
            updateNftCards();
        }, 10 * 60 * 1000);
    }

    updateNftCards();
    updateTileVisuals();
                startDefenderCleanup();
    saveGameState();
}

function showAttackResultPopup(winChance, won) {
    const popup = document.getElementById("attackResultPopup");
    const resultText = document.getElementById("attackResultText");
    const percent = Math.round(winChance * 100);
    resultText.textContent = `You had a ${percent}% chance and you ` + (won ? "WON" : "LOST");
    resultText.style.color = won ? "#00ff00" : "#ff3864";
    popup.style.display = "flex";
}


function confirmAction() {
            if (gameState.selectedNFTs.length === 0) {
                alert('Please select at least one NFT');
                return;
            }
    // 🔒 Prevent duplicate usage of NFTs
    const inUseNft = gameState.selectedNFTs.find(nftId => gameState.nftLocations[nftId]);
    if (inUseNft) {
        alert("One or more selected NFTs are already in use.");
        return;
    }

    if (gameState.selectedNFTs.length > MAX_SELECTION) {
        alert(`You can select a maximum of ${MAX_SELECTION} NFTs`);
        return;
    }

    const tileIndex = gameState.selectedTile;
    const tile = gameState.tiles[tileIndex];
    const tileElement = document.querySelector(`.map-tile[data-index="${tileIndex}"]`);

    if (gameState.selectedAction === 'send') {
        if (gameState.transitIntervals[tileIndex]) {
            clearInterval(gameState.transitIntervals[tileIndex]);
            delete gameState.transitIntervals[tileIndex];
        }
        const previousOwner = tile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(tileIndex);
        // 🔄 Immediately mark NFTs as pending to block re-use
        gameState.selectedNFTs.forEach(nftId => {
            gameState.nftLocations[nftId] = 'pending';
        });
        tile.nftIds = [...gameState.selectedNFTs];
        const fullNfts = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, fullNfts);
        gameState.selectedNFTs.forEach(nftId => {
            gameState.nftLocations[nftId] = tileIndex;
        });
        tileElement?.classList.add('in-transit');
        updateNftCards();
        updateTileVisuals();
                startDefenderCleanup();
        closeModal();
        saveGameState();
    } else if (gameState.selectedAction === 'attack') {
        const attackerNFTs = gameState.nfts
            .filter(n => gameState.selectedNFTs.includes(n.id));

        // 🔄 Immediately mark NFTs as pending to block re-use
        gameState.selectedNFTs.forEach(nftId => {
            gameState.nftLocations[nftId] = 'pending';
        });

        const defenderTile = gameState.tiles[tileIndex];

        // 🔧 NEW: Fetch defender NFTs from localStorage using tile owner
        const key = `${STORAGE_KEY}_${defenderTile.owner?.toLowerCase()}`;
        const state = JSON.parse(localStorage.getItem(key) || '{}');

        const defenderIds = state?.tiles?.[tileIndex]?.nftIds || [];
        const defenderNFTs = defenderIds
            .map(id => (state.nfts || []).find(n => String(n.id) === String(id)))
            .filter(n => !!n);

        if (defenderNFTs.length === 0) {
            console.warn("⚠️ No defender NFTs found, using fallback!");
            defenderNFTs.push({
                id: 'defaultDefender',
                name: 'Default Defender',
                metadata: { attributes: [{ trait_type: 'Faction', value: 'Defender' }] }
            });
        }

        resolveAttack(
            gameState.selectedTile,
            tileIndex,
            attackerNFTs,
            defenderNFTs,
            state?.tiles?.[tileIndex]?.buildings
        );

        closeModal();
    }
}

        function initiateAttack() {
            showNftSelection('attack');
        }

        function initiateSend() {
            showNftSelection('send');
        }

        function initiateBuild() {
            const tileIndex = gameState.selectedTile;
            buildingTileIndex.textContent = tileIndex + 1;
            buildingTimer.textContent = '';
            buildingOptions.style.display = 'block';
            closeModal();
            showBuildingModal();
        }

        function showBuildingModal() {
            buildingModal.style.display = 'flex';
        }

        function closeBuildingModal() {
            buildingModal.style.display = 'none';
        }

        function buildStructure(buildingType) {
            const tileIndex = gameState.selectedTile;
            const tile = gameState.tiles[tileIndex];
            if (tile.buildings[buildingType].level > 0) {
                alert('This tile already has this building');
                return;
            }
            tile.buildings[buildingType].level = 1;
            tile.buildings[buildingType].completeTime = Date.now() + BUILDING_COOLDOWN;
            closeBuildingModal();
            showModal();
            tileStatus.textContent = `Building ${buildingType === 'nest' ? 'Nest Tower' : 'Egg Storage'} (Level 1)`;
            actionTimer.textContent = `Time remaining: ${Math.ceil(BUILDING_COOLDOWN / 1000)}s`;
            initialActionButtons.style.display = 'none';
            updateBuildingTimer(tileIndex, buildingType);
            saveGameState();
        }

        function initiateUpgrade(tileIndex, buildingType) {
            gameState.selectedTile = tileIndex;
            const tile = gameState.tiles[tileIndex];
            const building = tile.buildings[buildingType];
    const otherUpgrades = Object.keys(tile.buildings).some(type => 
        type !== buildingType && 
        tile.buildings[type].completeTime && 
        tile.buildings[type].completeTime > Date.now()
    );
    if (otherUpgrades) {
        alert('Another building on this tile is already upgrading.');
        return;
    }
            const buildingConfig = BUILDINGS[buildingType === 'nest' ? 'NEST' : 'STORAGE'];
            if (building.level >= buildingConfig.maxLevel) {
                alert('Building is already at maximum level');
                return;
            }
            if (building.completeTime && building.completeTime > Date.now()) {
                alert('Building is already in progress');
                return;
            }
            building.level++;
            // New cooldown logic
            const levelDurations = [0, 5, 10, 15, 20, 30]; // in minutes
            let durationMinutes = levelDurations[building.level] || 0;
            let reduction = 0;

            for (const nftId of tile.nftIds) {
                const nft = gameState.nfts.find(n => n.id === nftId);
                if (nft && nft.metadata?.attributes) {
                    const faction = nft.metadata.attributes.find(a => a.trait_type === 'Faction')?.value?.toLowerCase();
                    const type = nft.metadata.attributes.find(a => a.trait_type === 'Type')?.value?.toLowerCase();
                    if (['builder', 'captain'].includes(faction)) {
                        if (['builder', 'captain'].includes(faction)) {
    if (type?.includes('genesis')) reduction += 0.20;
    else if (type?.includes('mutant')) reduction += 0.15;
    else reduction += 0.10;
} else if (type?.includes('genesis')) reduction += 0.20;
// Removed orphaned elsereduction += 0.10;
                    }
                }
            }

            const finalDuration = durationMinutes * 60 * 1000 * (1 - reduction);
            building.completeTime = Date.now() + finalDuration;
            tileStatus.textContent = `Upgrading ${buildingConfig.name} to Level ${building.level}`;
            actionTimer.textContent = `Time remaining: ${Math.ceil(BUILDING_COOLDOWN / 1000)}s`;
            initialActionButtons.style.display = 'none';
            updateBuildingTimer(tileIndex, buildingType);
            saveGameState();
        }

        function closeModal() {
            tileModal.style.display = 'none';
        }

        function shortenAddress(address) {
            return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
        }

        function setupPageNavigation() {
            menuItems.forEach(item => {
    if (item.id === 'guideTab') return;
                item.addEventListener('click', () => {
                    menuItems.forEach(i => i.classList.remove('active'));
                    pages.forEach(p => p.classList.remove('active'));
                    item.classList.add('active');
                    const pageId = item.getAttribute('data-page') + 'Page';
                    document.getElementById(pageId).classList.add('active');
                });
            });
        }

        async function fetchABI() {
            try {
                const response = await fetch(`https://api.apescan.io/api?module=contract&action=getabi&address=${NFT_CONTRACT_ADDRESS}&apikey=${API_KEY}`);
                const data = await response.json();
                if (data.status === "1") {
                    contractABI = JSON.parse(data.result);
                } else {
                    console.error("Failed to fetch ABI:", data.message);
                    showError("Error fetching contract ABI.");
                }
            } catch (error) {
                console.error("API fetch error:", error);
                showError("Error fetching ABI from ApeScan.");
            }
        }

        function checkWallet() {
            if (window.ethereum) {
                connectButton.disabled = false;
                return true;
            } else {
                walletStatus.textContent = "⚠️ No Ethereum wallet detected. Install Rabby or MetaMask.";
                connectButton.disabled = true;
                return false;
            }
        }

        async function switchToApeChain() {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: `0x${APE_CHAIN_ID.toString(16)}`,
                        chainName: APE_CHAIN_NAME,
                        nativeCurrency: {
                            name: APE_CHAIN_SYMBOL,
                            symbol: APE_CHAIN_SYMBOL,
                            decimals: 18
                        },
                        rpcUrls: [APE_CHAIN_RPC],
                        blockExplorerUrls: [APE_CHAIN_BLOCK_EXPLORER]
                    }]
                });
                return true;
            } catch (error) {
                console.error("Failed to switch to ApeChain:", error);
                return false;
            }
        }

        
function startDefenderCleanup() {
    if (window.defenderCleanupInterval) {
        clearInterval(window.defenderCleanupInterval);
    }
    window.defenderCleanupInterval = setInterval(() => {
        Object.entries(gameState.nftLocations).forEach(([nftId, loc]) => {
            if (loc !== 'cooldown' && typeof loc === 'number') {
                const tile = gameState.tiles[loc];
                if (tile && tile.owner !== gameState.connectedWallet) {
                    gameState.nftLocations[nftId] = 'cooldown';
                    localStorage.setItem(`cooldownStart_${nftId}`, Date.now());
                }
            }
        });
        updateNftCards();
    }, 1000);
    console.log("✅ Defender cleanup interval started.");
}


async function connectWallet() {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const network = await window.ethereum.request({ method: 'eth_chainId' });
                if (network !== `0x${APE_CHAIN_ID.toString(16)}`) {
                    const switched = await switchToApeChain();
                    if (!switched) {
                        showError("Please switch to ApeChain.");
                        return;
                    }
                }
                const account = accounts[0];
                
                gameState.points = 0;
                gameState.pointsProduction = 0;
                pointsTotal.textContent = 'Nanas: 0';
                pointsRate.textContent = 'Production: 0/hr';
                
                gameState.connectedWallet = account;
                walletAddress.textContent = `Connected: ${account}`;
                walletStatus.textContent = `Wallet status: Connected to ApeChain`;
                nftContainer.style.display = 'block';
                connectButton.disabled = true;
                disconnectButton.disabled = false;
                
                loadGameState();
                fetchNFTs(account);
                
                if (gameState.pointsInterval) {
                    clearInterval(gameState.pointsInterval);
                }
                gameState.pointsInterval = setInterval(() => {
    calculatePointsProduction();
    updatePoints();
}, POINTS_UPDATE_INTERVAL);
                
                updateTileVisuals();
                startDefenderCleanup();
            } catch (error) {
                console.error("Connection error:", error);
                showError("Error connecting to wallet.");
            }
        }

        function disconnectWallet() {
            gameState.connectedWallet = null;
            walletAddress.textContent = '';
            walletStatus.textContent = 'Wallet status: Not connected';
            nftContainer.style.display = 'none';
            connectButton.disabled = false;
            disconnectButton.disabled = true;
            nftCount.textContent = '0';
            gameState.selectedNFTs = [];
            
            gameState.points = 0;
            gameState.pointsProduction = 0;
            pointsTotal.textContent = 'Nanas: 0';
            pointsRate.textContent = 'Production: 0/hr';
            
            Object.values(gameState.transitIntervals).forEach(interval => clearInterval(interval));
            gameState.transitIntervals = {};
            if (gameState.pointsInterval) {
                clearInterval(gameState.pointsInterval);
                gameState.pointsInterval = null;
            }
            updateTileVisuals();
                startDefenderCleanup();
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            nftContainer.style.display = 'none';
            loadingIndicator.style.display = 'none';
                

        }

        async function fetchNFTs(account) {
            try {
                const web3 = new Web3(window.ethereum);
                const contract = new web3.eth.Contract(contractABI, NFT_CONTRACT_ADDRESS);
                const balance = await contract.methods.balanceOf(account).call();
                console.log("NFT Balance:", balance);
                nftGrid.innerHTML = "";
                nftCount.textContent = balance;
                gameState.nfts = [];
                loadingIndicator.style.display = 'inline-block';
                const processedTokenIds = new Set();
                for (let i = 0; i < balance; i++) {
                    try {
                        let tokenIds = [];
                        try {
                            tokenIds = await contract.methods.tokenOfOwnerByIndex(account, i).call();
                        } catch (error) {
                            console.log('Fallback to tokensOfOwner method');
                            tokenIds = await contract.methods.tokensOfOwner(account).call();
                        }
                        for (const tokenId of tokenIds) {
                            if (processedTokenIds.has(tokenId)) continue;
                            processedTokenIds.add(tokenId);
                            const tokenURI = await contract.methods.tokenURI(tokenId).call();
                            const metadata = await fetch(tokenURI).then(response => response.json());
                            const imageUrl = metadata.image;
                            const name = metadata.name;
                            const nftData = {
                                id: tokenId,
                                name: name,
                                image: imageUrl,
                                metadata: metadata
                            };
                        
                            gameState.nfts.push(nftData);
                            const nftCard = document.createElement('div');
                            nftCard.className = 'nft-card';
                        const typeAttr = metadata?.attributes?.find(attr => attr.trait_type === 'Type');
                        if (typeAttr) {
                            const val = typeAttr.value.toLowerCase();
                            if (val.includes('genesis')) nftCard.classList.add('genesis-border');
// Removed orphaned else if (val.includes('mutant')) nftCard.classList.add('mutant-border');
                        }
                            nftCard.dataset.nftId = tokenId;
                            nftCard.addEventListener('click', () => toggleNftSelection(tokenId));
                            nftCard.innerHTML = `
                                <img src="${imageUrl}" class="nft-image" alt="NFT Image">
                                <div class="nft-info">
                                    <div class="nft-name">${name}</div>
                                    <div class="nft-stats">
                                        <div>Faction: ${metadata.attributes?.find(attr => attr.trait_type === 'Faction')?.value || 'N/A'}</div>
                                        <div>Landform: ${metadata.attributes?.find(attr => attr.trait_type === 'Landform')?.value || 'N/A'}</div>
                                        <div>Gender: ${metadata.attributes?.find(attr => attr.trait_type === 'Gender')?.value || 'N/A'}</div>
                                        <div>Type: ${metadata.attributes?.find(attr => attr.trait_type === 'Type')?.value || 'N/A'}</div>
                                    </div>
                                </div>
                            `;
                            nftGrid.appendChild(nftCard);
                        }
                    } catch (error) {
                        console.error("Error fetching NFT metadata:", error);
                    }
                }
                loadingIndicator.style.display = 'none';
                

                updateNftCards();
                updateTileVisuals();
                startDefenderCleanup();
                calculatePointsProduction();
                updatePoints();
            } catch (error) {
                console.error("Error fetching NFTs:", error);
                showError("Error fetching NFTs.");
            }
        }

        connectButton.addEventListener('click', connectWallet);
        disconnectButton.addEventListener('click', disconnectWallet);
        attackButton.addEventListener('click', initiateAttack);
        sendButton.addEventListener('click', initiateSend);
        buildButton.addEventListener('click', initiateBuild);
        confirmActionButton.addEventListener('click', confirmAction);
        cancelActionButton.addEventListener('click', () => {
            gameState.selectedNFTs = [];
            actionNfts.style.display = 'none';
            initialActionButtons.style.display = 'flex';
        });
        cancelBuildingButton.addEventListener('click', closeBuildingModal);
        document.querySelectorAll('.building-option').forEach(option => {
            option.addEventListener('click', () => {
                const buildingType = option.getAttribute('data-building');
                buildStructure(buildingType);
            });
        });
        window.addEventListener('click', (event) => {
            if (event.target === tileModal) {
                closeModal();
            }
            if (event.target === buildingModal) {
                closeBuildingModal();
            }
        });
        window.addEventListener('beforeunload', () => {
            saveGameState();
        });
        window.addEventListener('load', () => {
            checkWallet();
            fetchABI();
            setupPageNavigation();
            // Merge ownership info from all wallet states
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(STORAGE_KEY + '_')) {
                    try {
                        if (!window.__tilesPopulatedFromSupabase__) {
                                                  const parsed = JSON.parse(localStorage.getItem(key));
                        }
                        if (parsed.tiles?.length === 500) {
                            for (let j = 0; j < 500; j++) {
                                if (!gameState.tiles[j].owner && parsed.tiles[j].owner) {
                                    gameState.tiles[j].owner = parsed.tiles[j].owner;
                                }
                            }
                        }
                    } catch (err) { console.warn('Bad wallet state', key); }
                }
            }
            
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!window.__tilesPopulatedFromSupabase__) {
                  if (key.startsWith(STORAGE_KEY + '_')) {
        }
            try {
            if (key.startsWith(STORAGE_KEY + '_')) {
                const parsed = JSON.parse(localStorage.getItem(key));
                if (parsed.tiles?.length === 500) {
            }
                    for (let j = 0; j < 500; j++) {
                        if (!gameState.tiles[j].owner && parsed.tiles[j].owner) {
                            gameState.tiles[j].owner = parsed.tiles[j].owner;
                        }
                    }
                }
            } catch (err) { console.warn('Bad wallet state', key); }
        }
    }

    // 
gameState._tiles = Array.from({ length: 500 }, () => ({
    owner: null,
    nftIds: [],
    inTransit: false,
    arrivalTime: null,
    transitStartTime: null,
    buildings: {
        nest: { level: 0, completeTime: null },
        storage: { level: 0, completeTime: null }
    }
}));

generateMap(); // deferred until after tile ownership is loaded
    updateTileVisuals();
                startDefenderCleanup();
            if (loadGameState()) {
                for (let i = 0; i < gameState.tiles.length; i++) {
                    const tile = gameState.tiles[i];
                    if (tile.inTransit && tile.arrivalTime && tile.arrivalTime <= Date.now()) {
                        completeTransit(i);
                    }
                }
                saveGameState();
            }
            updateTileVisuals();
                startDefenderCleanup();
        });
        
function getUpgradeDurationText(tileIndex, buildingType) {
    const tile = gameState.tiles[tileIndex];
    const currentLevel = tile.buildings[buildingType]?.level || 0;
    const nextLevel = currentLevel + 1;
    const levelDurations = [0, 5, 10, 15, 20, 30];
    let durationMinutes = levelDurations[nextLevel] || 0;
    let reduction = 0;
    for (const nftId of tile.nftIds) {
        const nft = gameState.nfts.find(n => n.id === nftId);
        if (nft && nft.metadata?.attributes) {
            const faction = nft.metadata.attributes.find(attr => attr.trait_type === 'Faction')?.value?.toLowerCase();
            const type = nft.metadata.attributes.find(attr => attr.trait_type === 'Type')?.value?.toLowerCase();
            if (['builder', 'captain'].includes(faction)) {
                if (['builder', 'captain'].includes(faction)) {
    if (type?.includes('genesis')) reduction += 0.20;
    else if (type?.includes('mutant')) reduction += 0.15;
    else reduction += 0.10;
} else if (type?.includes('genesis')) reduction += 0.20;
// Removed orphaned elsereduction += 0.10;
            }
        }
    }
    const finalDuration = durationMinutes * 60 * 1000 * (1 - reduction);
    const minutes = Math.floor(finalDuration / 60000);
    const seconds = Math.round((finalDuration % 60000) / 1000);
    return `~${minutes}m ${seconds}s`;
}













window.initiateUpgrade = initiateUpgrade;
    async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js">async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<!-- BEGIN CUSTOM GAME LOGIC EXTENSIONS -->
<style>
    #gamePopup {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(30, 0, 60, 0.95);
        color: #ffeb3b;
        padding: 1rem 2rem;
        border: 2px solid #9c4dff;
        border-radius: 12px;
        box-shadow: 0 0 20px #9c4dff;
        z-index: 9999;
        font-size: 1rem;
        display: none;
    }

.menu-item.disabled-blur {
    filter: blur(2px);
    pointer-events: none;
    opacity: 0.6;
}


@media (max-width: 768px) {
    .top-menu {
        flex-direction: column;
        align-items: flex-start;
    }

    .menu-items {
        flex-direction: column;
        width: 100%;
    }

    .menu-item {
        margin: 0.25rem 0;
        width: 100%;
        text-align: left;
    }

    .container {
        padding: 1rem;
        margin: 1rem;
    }

    .nft-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    .map-grid {
        grid-template-columns: repeat(10, 1fr);
        max-width: 100%;
    }

    .points-display {
        position: static;
        margin-bottom: 1rem;
        width: 100%;
        align-items: flex-start;
    }

    .modal-content {
        width: 95%;
        padding: 1rem;
    }

    .action-nfts-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .nft-image {
        height: auto;
        max-height: 150px;
    }

    .action-nft-image {
        height: auto;
        max-height: 80px;
    }
}


@media (max-width: 768px) {
    .top-menu {
        flex-direction: column;
        align-items: flex-start;
    }

    .menu-items {
        flex-direction: column;
        width: 100%;
        display: none;
    }

    .menu-items.show {
        display: flex;
    }

    .menu-toggle {
        display: block;
        cursor: pointer;
        padding: 0.5rem 1rem;
        color: #cfd8dc;
        background: rgba(30, 0, 60, 0.8);
        border: 1px solid #00e5ff;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }

    .container {
        padding: 1rem;
        margin: 1rem;
    }

    .nft-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    .map-grid {
        grid-template-columns: repeat(10, 1fr);
        max-width: 100%;
    }

    .points-display {
        position: static;
        margin-bottom: 1rem;
        width: 100%;
        align-items: flex-start;
        transform: scale(0.8); /* Make it ~20% smaller */
        transform-origin: top right;
    }

    .modal-content {
        width: 95%;
        padding: 1rem;
    }

    .action-nfts-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .nft-image {
        height: auto;
        max-height: 150px;
    }

    .action-nft-image {
        height: auto;
        max-height: 80px;
    }
}

/* Overlay should only cover the image */
.nft-card .nft-status-overlay {
    height: auto !important;
    bottom: auto;
    top: 0;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}


@media (max-width: 768px) {
    .points-display {
        transform: scale(0.8);
        transform-origin: top center;
        align-items: center;
        margin: 0 auto 1rem auto;
    }
}

@media (min-width: 769px) {
    .menu-toggle {
        display: none !important;
    }
}

</style>
<div id="gamePopup"></div>
<script>
    function showGameMessage(message, duration = 3000) {
        const popup = document.getElementById('gamePopup');
        popup.textContent = message;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, duration);
    }

    // Override alert for game messages
    window.alert = showGameMessage;

    // Example: Show blur on upgrade buttons if upgrade in progress
    function disableOtherUpgrades(tileIndex) {
        const tile = gameState.tiles[tileIndex];
        const buttons = tileModal.querySelectorAll('.upgrade-button');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.filter = 'blur(1px)';
            btn.style.opacity = 0.5;
        });
    }

    // Hook tile hover logic
    document.addEventListener('mouseover', (event) => {
        const tile = event.target.closest('.map-tile');
        if (!tile) return;
        const index = parseInt(tile.dataset.index);
        const tileData = gameState.tiles[index];
        if (!tileData) return;

        const hoverInfoId = 'tile-hover-info';
        let hoverInfo = document.getElementById(hoverInfoId);
        if (!hoverInfo) {
            hoverInfo = document.createElement('div');
            hoverInfo.id = hoverInfoId;
            hoverInfo.style.position = 'absolute';
            hoverInfo.style.zIndex = '999';
            hoverInfo.style.background = 'rgba(0,0,0,0.8)';
            hoverInfo.style.padding = '6px 12px';
            hoverInfo.style.borderRadius = '8px';
            hoverInfo.style.color = 'white';
            hoverInfo.style.pointerEvents = 'none';
            document.body.appendChild(hoverInfo);
        }

        if (gameState.connectedWallet && tileData.owner === gameState.connectedWallet) {
            const upgradeInProgress = Object.values(tileData.buildings).find(b => b.completeTime && b.completeTime > Date.now());
            if (upgradeInProgress) {
    const ms = upgradeInProgress.completeTime - Date.now();
    const timeStr = formatUpgradeTimeMs(ms);
    hoverInfo.innerHTML = `Tile ${index + 1}<br>~${timeStr} Upgrade in Progress`;
} else {
    hoverInfo.innerHTML = `Tile ${index + 1}`;
}
            hoverInfo.style.display = 'block';

            document.addEventListener('mousemove', e => {
                hoverInfo.style.left = e.pageX + 15 + 'px';
                hoverInfo.style.top = e.pageY + 15 + 'px';
            });
        } else {
            if (hoverInfo) hoverInfo.style.display = 'none';
        }
    });

    // Add blur logic for attack/send when wallet not connected
    const observer = new MutationObserver(() => {
        const walletConnected = !!gameState.connectedWallet;
        attackButton.disabled = !walletConnected;
        sendButton.disabled = !walletConnected;
        if (!walletConnected) {
            attackButton.style.filter = sendButton.style.filter = 'blur(1px)';
        } else {
            attackButton.style.filter = sendButton.style.filter = '';
        }
    });
    observer.observe(document.getElementById('walletStatus'), { childList: true, subtree: true });

    // Add recall all NFTs (placeholder - real logic should include update of gameState.nftLocations and tiles)
    const recallButton = document.createElement('button');
    recallButton.textContent = 'Recall All NFTs';
    recallButton.onclick = () => {
        if (confirm('Are you sure you want to recall all NFTs?')) {
            for (const nftId in gameState.nftLocations) {
                gameState.nftLocations[nftId] = null;
            }
            gameState.tiles.forEach(tile => {
                tile.nftIds = [];
                tile.inTransit = false;
                tile.transitNFTs = [];
            });
            showGameMessage('All NFTs recalled.');
            updateNftCards();
            updateTileVisuals();
                startDefenderCleanup();
        }
    };
    document.getElementById('nftContainer')?.appendChild(recallButton);
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<!-- END CUSTOM GAME LOGIC EXTENSIONS -->
<script>
// Enhanced recall logic
document.getElementById('recallNftsButton')?.addEventListener('click', () => {
    if (!gameState.connectedWallet) {
        showGameMessage('Connect wallet first.');
        return;
    }

    const nftOptions = gameState.nfts.map(nft => {
        return `<option value="${nft.id}">${nft.name} (#${nft.id})</option>`;
    });
    const selection = // OLD PROMPT REMOVED
    if (!selection) return;

    if (selection.toLowerCase() === 'all') {
        for (const nftId in gameState.nftLocations) {
            gameState.nftLocations[nftId] = null;
        }
        gameState.tiles.forEach(tile => {
            if (tile.owner === gameState.connectedWallet) {
                tile.nftIds = [];
                tile.owner = null;
                tile.buildings = {
                    nest: { level: 0, completeTime: null },
                    storage: { level: 0, completeTime: null }
                };
            }
        });
        showGameMessage('All NFTs recalled. Tiles released.');
    } else {
        
        tileElement.classList.remove("green-tile");
        tileElement.classList.add("red-tile");
    },
                        storage: { level: 0, completeTime: null }
                    };
                }
            }
        });
        showGameMessage('NFT recalled.');
    }
    updateTileVisuals();
                startDefenderCleanup();
    updateNftCards();
    saveGameState();
});

// Fix tile hover sticking & show time left
let activeTileHoverIndex = null;
document.addEventListener('mousemove', (e) => {
    const tile = e.target.closest('.map-tile');
    const hoverBox = document.getElementById('tile-hover-info');
    if (!tile) {
        if (hoverBox) hoverBox.style.display = 'none';
        activeTileHoverIndex = null;
        return;
    }

    const index = parseInt(tile.dataset.index);
    if (index === activeTileHoverIndex) return;
    activeTileHoverIndex = index;

    const tileData = gameState.tiles[index];
    if (gameState.connectedWallet && tileData.owner === gameState.connectedWallet) {
        const building = Object.values(tileData.buildings).find(b => b.completeTime && b.completeTime > Date.now());
        const timeLeft = building ? Math.max(0, Math.ceil((building.completeTime - Date.now()) / 1000)) : null;

        hoverBox.innerHTML = `Tile ${index + 1}${timeLeft ? `<br>Upgrade time left: ${timeLeft}s` : ''}`;
        hoverBox.style.display = 'block';
        hoverBox.style.left = e.pageX + 10 + 'px';
        hoverBox.style.top = e.pageY + 10 + 'px';
    } else {
        hoverBox.style.display = 'none';
    }
});

// Disable interaction with blurred buttons if wallet not connected
['attackButton', 'sendButton'].forEach(id => {
    const btn = document.getElementById(id);
    btn?.addEventListener('click', e => {
        if (!gameState.connectedWallet) {
            e.preventDefault();
            e.stopPropagation();
            showGameMessage('You must connect your wallet to interact.');
        }
    });
});

// Hide enemy wallet addresses
const originalHandleTileClick = handleTileClick;
handleTileClick = function(tileIndex) {
    originalHandleTileClick(tileIndex);
    const tile = gameState.tiles[tileIndex];
    if (tile.owner && tile.owner !== gameState.connectedWallet) {
        document.getElementById('tileOwnerInfo').innerHTML = '';
    }

    // Blur upgrade buttons if upgrade in progress
    const upgrades = Object.values(tile.buildings).filter(b => b.completeTime && b.completeTime > Date.now());
    if (upgrades.length > 0) {
        const buttons = document.querySelectorAll('#tileBuildingInfo .upgrade-button');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.filter = 'blur(1px)';
            btn.style.opacity = 0.5;
        });
    }
};
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<!-- Recall NFTs Modal -->
<div class="modal" id="recallModal">
<div class="modal-content">
<h3 class="modal-title">Recall NFTs</h3>
<p>Select an NFT to recall or press "Recall All"</p>
<select id="recallSelect" style="width:100%;padding:10px;border-radius:8px;margin-bottom:1rem;"></select>
<div class="modal-buttons">
<button id="recallOneBtn">Recall Selected</button>
<button id="recallAllBtn">Recall All</button>
<button onclick="document.getElementById('recallModal').style.display='none'">Cancel</button>
</div>
</div>
</div>
<script>
document.getElementById('recallNftsButton')?.addEventListener('click', () => {
    if (!gameState.connectedWallet) {
        showGameMessage("Connect wallet first.");
        return;
    }
    const select = document.getElementById("recallSelect");
    select.innerHTML = "";
    const seen = new Set();
    for (const nft of gameState.nfts) {
        if (!seen.has(nft.id)) {
            seen.add(nft.id);
            const option = document.createElement("option");
            option.value = nft.id;
            option.textContent = `${nft.name} (#${nft.id})`;
            select.appendChild(option);
        }
    }
    document.getElementById("recallModal").style.display = "flex";
});

document.getElementById("recallAllBtn")?.addEventListener("click", () => {
    for (const nftId in gameState.nftLocations) {
        gameState.nftLocations[nftId] = null;
    }
    gameState.tiles.forEach(tile => {
        if (tile.owner === gameState.connectedWallet) {
            tile.nftIds = [];
            tile.owner = null;
            tile.buildings = {
                nest: { level: 0, completeTime: null },
                storage: { level: 0, completeTime: null }
            };
        }
    });
    showGameMessage("All NFTs recalled.");
    updateNftCards();
    updateTileVisuals();
                startDefenderCleanup();
    saveGameState();
    document.getElementById("recallModal").style.display = "none";
});

document.getElementById("recallOneBtn")?.addEventListener("click", () => {
    const selectedId = document.getElementById("recallSelect").value;
    gameState.nftLocations[selectedId] = null;
    gameState.tiles.forEach(tile => {
        const idx = tile.nftIds.indexOf(selectedId);
        if (idx !== -1) {
            tile.nftIds.splice(idx, 1);
            if (tile.nftIds.length === 0) {
                tile.owner = null;
                tile.buildings = {
                    nest: { level: 0, completeTime: null },
                    storage: { level: 0, completeTime: null }
                };
            }
        }
    });
    showGameMessage("NFT recalled.");
    updateNftCards();
    updateTileVisuals();
                startDefenderCleanup();
    saveGameState();
    document.getElementById("recallModal").style.display = "none";
});

// Fix #2 and #6: prevent button clicks and NFT selections when wallet disconnected
["attackButton", "sendButton"].forEach(id => {
    const btn = document.getElementById(id);
    btn?.addEventListener("click", (e) => {
        if (!gameState.connectedWallet) {
            e.preventDefault();
            e.stopPropagation();
            showGameMessage("Connect wallet to interact.");
        }
    });
});

// Block NFT selections when disconnected
document.addEventListener("click", e => {
    if (!gameState.connectedWallet && e.target.closest('.nft-card')) {
        e.preventDefault();
        e.stopPropagation();
        showGameMessage("Connect wallet to select NFTs.");
    }
});

// Fix #3: show each NFT only once
function removeDuplicateNFTs(nfts) {
    const seen = new Set();
    return nfts.filter(nft => {
        if (seen.has(nft.id)) return false;
        seen.add(nft.id);
        return true;
    });
}
gameState.nfts = removeDuplicateNFTs(gameState.nfts);

// Fix #4: instant NFT arrival (override confirmAction)

confirmAction = function() {
    if (!gameState.connectedWallet) {
        showGameMessage("Connect your wallet first.");
        return;
    }
    if (gameState.selectedNFTs.length === 0) {
        showGameMessage("Select NFTs first");
        return;
    }
    const tileIndex = gameState.selectedTile;
    const tile = gameState.tiles[tileIndex];
    const previousOwner = defenderTile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(defenderTileIndex);
    tile.nftIds = [...gameState.selectedNFTs];
        const fullNfts = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, fullNfts);
    gameState.selectedNFTs.forEach(nftId => {
        gameState.nftLocations[nftId] = tileIndex;
    });
    updateNftCards();

    updateTileVisuals();
                startDefenderCleanup();
    closeModal();
    saveGameState();
};
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script>
// Fix 1: Make sure only new modal shows
document.getElementById('recallNftsButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const select = document.getElementById("recallSelect");
    select.innerHTML = "";
    const seen = new Set();
    for (const nft of gameState.nfts) {
        if (!seen.has(nft.id)) {
            seen.add(nft.id);
            const option = document.createElement("option");
            option.value = nft.id;
            option.textContent = `${nft.name} (#${nft.id})`;
            select.appendChild(option);
        }
    }
    document.getElementById("recallModal").style.display = "flex";
});

// Fix 2 & 6: Fully block interactions when wallet is disconnected and reorder NFT list
document.addEventListener("click", (e) => {
    const target = e.target;
    const isCard = target.closest('.nft-card');
    const isActionButton = target.closest('#attackButton, #sendButton');
    if (!gameState.connectedWallet) {
        if (isCard || isActionButton) {
            e.preventDefault();
            e.stopPropagation();
            showGameMessage("Connect your wallet first.");
        }
    }
});

// Fix 3: Make NFT arrival instant (send)

confirmAction = function() {
    if (!gameState.connectedWallet) {
        showGameMessage("Connect your wallet first.");
        return;
    }
    if (gameState.selectedNFTs.length === 0) {
        showGameMessage("Select NFTs first");
        return;
    }
    const tileIndex = gameState.selectedTile;
    const tile = gameState.tiles[tileIndex];
    const previousOwner = defenderTile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(defenderTileIndex);
    tile.nftIds = [...gameState.selectedNFTs];
        const fullNfts = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, fullNfts);
    gameState.selectedNFTs.forEach(nftId => {
        gameState.nftLocations[nftId] = tileIndex;
    });
    updateNftCards();

    updateTileVisuals();
                startDefenderCleanup();
    closeModal();
    saveGameState();
};

// Fix 4: Tie points to wallet address and persist/update across reloads
function getWalletKey(address) {
    return `walletPoints_${address}`;
}

function loadWalletPoints(address) {
    const raw = localStorage.getItem(getWalletKey(address));
    return raw ? parseFloat(raw) : 0;
}

function saveWalletPoints(address, points) {
    localStorage.setItem(getWalletKey(address), points.toString());
}

// Update total points correctly over time, even while disconnected
setInterval(() => {
    const now = Date.now();
    const elapsed = (now - gameState.lastPointsUpdate) / 3600000;
    if (elapsed <= 0) return;
    gameState.lastPointsUpdate = now;
    if (gameState.connectedWallet) {
        gameState.points += gameState.pointsProduction * elapsed;
        pointsTotalElements.forEach(el => el.textContent = `Nanas: ${gameState.points.toFixed(3)}`);
        saveWalletPoints(gameState.connectedWallet, gameState.points);
    }
}, 10000);

// On connect, restore points
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        gameState.connectedWallet = account;
        gameState.points = loadWalletPoints(account);
        pointsTotalElements.forEach(el => el.textContent = `Nanas: ${gameState.points.toFixed(3)}`);
        ...
    } catch (e) {
        showGameMessage("Error connecting wallet.");
    }
}

// On disconnect, preserve state and hide points
function disconnectWallet() {
    ...
    pointsTotal.textContent = 'Nanas: 0';
}

// Fix 5 handled above (button removed)

// Fix 6: Idle NFTs shown first always
function updateNftCards() {
    ...
    const availableNFTs = [], workingNFTs = [];
    for (const nft of gameState.nfts) {
        const loc = gameState.nftLocations[nft.id];
        if (loc === undefined || loc === null) availableNFTs.push(nft);
// Removed orphaned elseworkingNFTs.push(nft);
    }
    const sortedNFTs = [...availableNFTs, ...workingNFTs];
    ...
}

// Fix 7: Stop timer leaks and only show timers on owned tiles
function updateBuildingTimer(tileIndex, buildingType) {
    const tile = gameState.tiles[tileIndex];
    const building = tile.buildings[buildingType];
    if (!building.completeTime || building.completeTime <= Date.now()) return;

    if (gameState.transitIntervals[`building_${tileIndex}_${buildingType}`]) {
        clearInterval(gameState.transitIntervals[`building_${tileIndex}_${buildingType}`]);
    }

    gameState.transitIntervals[`building_${tileIndex}_${buildingType}`] = setInterval(() => {
        const timeLeft = Math.max(0, Math.ceil((building.completeTime - Date.now()) / 1000));
        if (tile.owner === gameState.connectedWallet) {
            if (gameState.selectedTile === tileIndex) { actionTimer.textContent = timeLeft > 0 ? `Time remaining: ${Math.floor(timeLeft/60)}m ${timeLeft%60}s` : ''; }
        } else {
            
        tileElement.classList.remove("green-tile");
        tileElement.classList.add("red-tile");
    }

        if (timeLeft <= 0) {
            clearInterval(gameState.transitIntervals[`building_${tileIndex}_${buildingType}`]);
            delete gameState.transitIntervals[`building_${tileIndex}_${buildingType}`];
            ...
        }
    }, 1000);
}
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script>
// ========== RECALL NFT POPUP CLEAN FIX ==========
document.getElementById('recallNftsButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modal = document.getElementById("recallModal");
    const select = document.getElementById("recallSelect");
    select.innerHTML = "";
    const seen = new Set();
    for (const nft of gameState.nfts) {
        if (!seen.has(nft.id)) {
            seen.add(nft.id);
            const option = document.createElement("option");
            option.value = nft.id;
            option.textContent = `${nft.name} (#${nft.id})`;
            select.appendChild(option);
        }
    }
    modal.style.display = "flex";
});

// ========== INSTANT NFT ARRIVAL ==========

confirmAction = function() {
    if (!gameState.connectedWallet) {
        showGameMessage("Connect your wallet first.");
        return;
    }
    if (gameState.selectedNFTs.length === 0) {
        showGameMessage("Select NFTs first");
        return;
    }
    const tileIndex = gameState.selectedTile;
    const tile = gameState.tiles[tileIndex];
    const previousOwner = defenderTile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(defenderTileIndex);
    tile.nftIds = [...gameState.selectedNFTs];
        const fullNfts = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, fullNfts);
    gameState.selectedNFTs.forEach(nftId => {
        gameState.nftLocations[nftId] = tileIndex;
    });
    updateNftCards();

    updateTileVisuals();
                startDefenderCleanup();
    closeModal();
    saveGameState();
};

// ========== REMOVE DUPLICATE NFTS FROM DISPLAY ==========
function updateNftCards() {
    if (!gameState.nfts) return;
    const container = document.getElementById("nftGrid");
    if (!container) return;
    container.innerHTML = "";

    const seenIds = new Set();
    const uniqueNFTs = gameState.nfts.filter(nft => {
        if (seenIds.has(nft.id)) return false;
        seenIds.add(nft.id);
        return true;
    });

    const availableNFTs = [], workingNFTs = [];
    for (const nft of uniqueNFTs) {
        const loc = gameState.nftLocations[nft.id];
        if (loc === undefined || loc === null) availableNFTs.push(nft);
// Removed orphaned elseworkingNFTs.push(nft);
    }
    const sortedNFTs = [...availableNFTs, ...workingNFTs];

    for (const nft of sortedNFTs) {
        const card = document.createElement('div');
        card.className = 'nft-card';
        card.dataset.nftId = nft.id;
        const typeAttr = nft.metadata?.attributes?.find(attr => attr.trait_type === 'Type');
        if (typeAttr) {
            const val = typeAttr.value.toLowerCase();
            if (val.includes('genesis')) card.classList.add('genesis-border');
// Removed orphaned else if (val.includes('mutant')) card.classList.add('mutant-border');
        }
        card.innerHTML = `
            <img src="${nft.image}" class="nft-image" alt="NFT Image">
            <div class="nft-info">
                <div class="nft-name">${nft.name}</div>
                <div class="nft-stats">
                    <div>Faction: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Faction')?.value || 'N/A'}</div>
                    <div>Landform: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Landform')?.value || 'N/A'}</div>
                    <div>Gender: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Gender')?.value || 'N/A'}</div>
                    <div>Type: ${nft.metadata?.attributes?.find(attr => attr.trait_type === 'Type')?.value || 'N/A'}</div>
                </div>
            </div>`;
        container.appendChild(card);
    }
}

// ========== REMOVE DUPLICATES FROM SELECTION ==========
function showNftSelection(action) {
    gameState.selectedAction = action;
    initialActionButtons.style.display = 'none';
    actionNfts.style.display = 'block';
    actionNftsGrid.innerHTML = '';
    gameState.selectedNFTs = [];

    const seen = new Set();
    const filteredNFTs = gameState.nfts.filter(n => {
        if (seen.has(n.id)) return false;
        seen.add(n.id);
        return gameState.nftLocations[n.id] === null || gameState.nftLocations[n.id] === undefined;
    });

    filteredNFTs.forEach(nft => {
        const nftCard = document.createElement('div');
        nftCard.className = 'action-nft-card';
        nftCard.dataset.nftId = nft.id;
        ...
        actionNftsGrid.appendChild(nftCard);
    });

    updateSelectionCount();
}

// ========== FIX BUILD TIMER ONLY ON PLAYER OWNED TILES ==========
function updateBuildingTimer(tileIndex, buildingType) {
    const tile = gameState.tiles[tileIndex];
    const building = tile.buildings[buildingType];
    const key = `building_${tileIndex}_${buildingType}`;
    if (!building.completeTime || building.completeTime <= Date.now()) return;

    if (gameState.transitIntervals[key]) {
        clearInterval(gameState.transitIntervals[key]);
    }

    gameState.transitIntervals[key] = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.ceil((building.completeTime - now) / 1000));
        const tileEl = document.querySelector(`.map-tile[data-index='${tileIndex}']`);

        if (tile.owner === gameState.connectedWallet) {
            const timer = document.getElementById("actionTimer");
            if (timer && gameState.selectedTile === tileIndex) {
                timer.textContent = timeLeft > 0 ? `Time remaining: ${timeLeft}s` : '';
            }
        }

        if (timeLeft <= 0) {
            clearInterval(gameState.transitIntervals[key]);
            delete gameState.transitIntervals[key];
            tile.buildings[buildingType].completeTime = null;
            saveGameState();
            updateTileVisuals();
                startDefenderCleanup();
            updateNftCards();
        }
    }, 1000);
}
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script>
document.addEventListener('mousemove', (e) => {
    const tile = e.target.closest('.map-tile');
    const hoverBoxId = 'tile-hover-info';
    let hoverBox = document.getElementById(hoverBoxId);

    if (!tile) {
        if (hoverBox) hoverBox.style.display = 'none';
        return;
    }

    const index = parseInt(tile.dataset.index);
    const tileData = gameState.tiles[index];
    if (!tileData) return;

    if (!hoverBox) {
        hoverBox = document.createElement('div');
        hoverBox.id = hoverBoxId;
        hoverBox.style.position = 'absolute';
        hoverBox.style.zIndex = '999';
        hoverBox.style.background = 'rgba(0,0,0,0.8)';
        hoverBox.style.padding = '6px 12px';
        hoverBox.style.borderRadius = '8px';
        hoverBox.style.color = 'white';
        hoverBox.style.pointerEvents = 'none';
        document.body.appendChild(hoverBox);
    }

    let text = `Tile ${index + 1}`;
    if (tileData.owner === gameState.connectedWallet) {
        const upgrade = Object.values(tileData.buildings).find(b => b.completeTime && b.completeTime > Date.now());
        if (upgrade) {
            const timeLeft = Math.max(0, Math.ceil((upgrade.completeTime - Date.now()) / 1000));
            text += `<br>Upgrade time left: ${timeLeft}s`;
        }
    }

    hoverBox.innerHTML = text;
    hoverBox.style.display = 'block';
    hoverBox.style.left = e.pageX + 10 + 'px';
    hoverBox.style.top = e.pageY + 10 + 'px';
});
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script>
function updatePointsUI() {
    const el = document.getElementById("pointsRate");
    if (el) el.innerHTML = `Production: ${gameState.pointsProduction.toFixed(3)}/hr`;
}

// Initial run
updatePointsUI();

// Schedule with delay after other scripts
setInterval(() => {
  setTimeout(updatePointsUI, 250); // let others finish first
}, 10000);
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<div class="modal" id="attackResultPopup" style="z-index:200;">
<div class="modal-content" style="text-align:center;">
<h3 class="modal-title">Battle Result</h3>
<p id="attackResultText" style="font-size:1.2rem;"></p>
<div class="modal-buttons">
<button onclick="document.getElementById('attackResultPopup').style.display='none'">Close</button>
</div>
</div>
</div>

<div class="modal" id="guideModal">
  <div class="modal-content">
    <h2 class="modal-title">How to Play</h2>
    <div style="text-align:left; font-size: 0.9rem; color: #cfd8dc;">
      <p><strong>🔗 Connect Your Wallet:</strong> Use Rabby, MetaMask, or WalletConnect to connect and load your NFTs.</p>
      <p><strong>🥚 NFT Traits:</strong> Each egg has Faction, Type, Gender, and Landform. Genesis and Mutant types give better bonuses.</p>
      <p><strong>🗺️ Map Overview:</strong> Explore the 500 tiles and view ownership, landform, and buildings.</p>
      <p><strong>🚀 Sending NFTs:</strong> Click a tile to send up to 4 NFTs. They start producing <em>Nanas</em> based on their bonuses.</p>
      <p><strong>⚔️ Attacking:</strong> Choose enemy tiles and send NFTs to attack. Win chance depends on type, faction, landform, and defender's buildings.</p>
      <p><strong>🏗️ Buildings:</strong> Nest Tower increases defense; Egg Storage increases production. Each has 5 upgrade levels.</p>
      <p><strong>💸 Nanas:</strong> Earned per hour. Used in future features like Raffles, Casino, and Hatching Grounds.</p>
      <p><strong>📜 Tips for Success:</strong></p>
      <ul>
        <li>Use <strong>Workers</strong> or <strong>Captains</strong> for production bonus.</li>
        <li>Match NFT landform with tile for +10% boost.</li>
        <li>Use <strong>Builders</strong> or <strong>Captains</strong> to reduce upgrade times.</li>
        <li>Use <strong>Thieves</strong> or <strong>Captains</strong> to improve attack success rate.</li>
      </ul>
    </div>
    <div class="modal-buttons"><button onclick="closeGuide()">Close</button></div>
  </div>
</div>

<script>
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.menu-items')?.classList.remove('show');
        }
    });
});

async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>

<script>
if (!window.mapRefreshInterval) {
    window.mapRefreshInterval = setInterval(async () => {
        if (!gameState.connectedWallet) return;
        if (!window.__tilesPopulatedFromSupabase__) {
                  try {
        }
            const res = await fetch(`/.netlify/functions/get-session?wallet=${gameState.connectedWallet}`);
            if (!res.ok) throw new Error("Failed to fetch session");
            const parsed = await res.json();
            if (!parsed || !parsed.tiles) return;

            for (let i = 0; i < 500; i++) {
                const tile = parsed.tiles[i];
                gameState.tiles[i].owner = tile.owner;
                        if (tile.nftIds) gameState.tiles[i].nftIds = tile.nftIds;
                gameState.tiles[i].inTransit = tile.inTransit || false;
                gameState.tiles[i].arrivalTime = tile.arrivalTime || null;
                gameState.tiles[i].transitStartTime = tile.transitStartTime || null;
                gameState.tiles[i].buildings = tile.buildings || {
                    nest: { level: 0, completeTime: null },
                    storage: { level: 0, completeTime: null }
                };
            }

            updateTileVisuals();
        } catch (err) {
            console.warn("Map sync failed:", err);
        }
    }, 1000);
    console.log("🔄 Map auto-refresh enabled");
}

async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>

</body>

<script>
function showGuide() {
  document.getElementById("guideModal").style.display = "flex";
}
function closeGuide() {
  document.getElementById("guideModal").style.display = "none";
}
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>

</html>
<script>


function updatePointsUI() {
    const el = document.getElementById("pointsRate");
    if (el) el.innerHTML = `Production: ${gameState.pointsProduction.toFixed(3)}/hr`;
}
// Removed orphaned else if (type?.includes('mutant')) {
                pointsPerHour = (faction === 'worker' || faction === 'captain') ? 0.24 : 0.2;
            } else {
                
        tileElement.classList.remove("green-tile");
        tileElement.classList.add("red-tile");
    }

            totalPerMinute += pointsPerHour / 60;
        }
    }

    const pointsPerHour = (totalPerMinute * 60).toFixed(2);
    let display = document.getElementById("points-display");
    if (!display) {
        display = document.createElement("div");
        display.id = "points-display";
        display.style.position = "fixed";
        display.style.top = "10px";
        display.style.right = "10px";
        display.style.background = "rgba(0,0,0,0.8)";
        display.style.color = "white";
        display.style.padding = "6px 12px";
        display.style.borderRadius = "8px";
        display.style.zIndex = "9999";
        document.body.appendChild(display);
    }
    display.innerHTML = `Estimated Earnings: ${pointsPerHour} pts/hour`;
}




function resolveAttack(attackerTileIndex, defenderTileIndex, attackerNFTs, defenderNFTs, defenderBuildings) {
    const defenderTile = gameState.tiles[defenderTileIndex];
    function getPower(nft, isAttacker) {
        const typeAttr = nft.metadata?.attributes?.find(a => a.trait_type === 'Type')?.value?.toLowerCase() || '';
        const factionAttr = nft.metadata?.attributes?.find(a => a.trait_type === 'Faction')?.value?.toLowerCase() || '';
        const landformAttr = nft.metadata?.attributes?.find(a => a.trait_type === 'Landform')?.value;

        let power = 0;
        if (typeAttr.includes('genesis')) power = 20;
        else if (typeAttr.includes('mutant')) power = 15;
        else power = 10;

        if (factionAttr === 'captain' || factionAttr === 'thief') {
            power += 3;
        }

        if (landformAttr && landformAttr === gameState.tiles[defenderTileIndex].landform.name) {
            power += 2;
        }

        return power;
    }

    let attackerTotal = attackerNFTs.reduce((sum, nft) => sum + getPower(nft, true), 0);
    let defenderTotal = defenderNFTs.reduce((sum, nft) => sum + getPower(nft, false), 0);

    if (defenderBuildings?.nest?.level) {
        defenderTotal += defenderBuildings.nest.level * 5;
    }

    const winChance = attackerTotal / (attackerTotal + defenderTotal);
    const roll = Math.random();
    const won = roll < winChance;

    showAttackResultPopup(winChance, won);

    if (won) {
        // Attacker wins: defenders go on cooldown
        defenderNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = 'cooldown';
            const storageKey = `cooldownStart_${nft.id}`;
            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, Date.now());
            }
        });
    } else {
        // Defender wins: attackers go on cooldown
        attackerNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = 'cooldown';
            const storageKey = `cooldownStart_${nft.id}`;
            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, Date.now());
            }
        });
    }


    if (won) {
        // Attacker wins: take land, reset buildings, transfer NFTs
        const tile = gameState.tiles[defenderTileIndex];
        const previousOwner = defenderTile.owner;
        tile.owner = gameState.connectedWallet;
        updateTileInSupabase(defenderTileIndex);
        loadDefenderNFTsForTile(defenderTileIndex);
        loadDefenderNFTsForTile(defenderTileIndex);
        const defenderNFTs = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, defenderNFTs);
        // Save defenders before overwrite
        const previousDefenders = gameState.nfts.filter(n => tile.nftIds.includes(n.id));
        storeDefenderNfts(tile.owner, previousDefenders);
tile.nftIds = attackerNFTs.map(n => n.id);
        tile.buildings = {
            nest: { level: 0, completeTime: null },
            storage: { level: 0, completeTime: null }
        };
        tile.transitNFTs = [];
        tile.inTransit = false;
        tile.arrivalTime = null;
        tile.transitStartTime = null;

        attackerNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = defenderTileIndex;
        });

        // Update defender's localStorage game state if available
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_KEY + '_')) {
                try {
            if (key.startsWith(STORAGE_KEY + '_')) {
                    const parsed = JSON.parse(localStorage.getItem(key));
                    if (parsed?.tiles?.[defenderTileIndex]?.owner === gameState.tiles[defenderTileIndex].owner) {
            }
                        parsed.tiles[defenderTileIndex].owner = null;
                        parsed.tiles[defenderTileIndex].nftIds = [];
                        parsed.tiles[defenderTileIndex].buildings = {
                            nest: { level: 0, completeTime: null },
                            storage: { level: 0, completeTime: null }
                        };
                        localStorage.setItem(key, JSON.stringify(parsed));
                    }
                } catch (e) { console.warn("Failed to patch defender state", key); }
            }
        }

    } else {
        // Defender wins: NFTs go back to sender and are on cooldown
        attackerNFTs.forEach(nft => {
            gameState.nftLocations[nft.id] = 'cooldown';
        });
        setTimeout(() => {
            attackerNFTs.forEach(nft => {
                gameState.nftLocations[nft.id] = null;
            });
            updateNftCards();
        }, 10 * 60 * 1000); // 10 minutes
    }

    updateNftCards();
    updateTileVisuals();
                startDefenderCleanup();
    saveGameState();
}


function showAttackResultPopup(winChance, won) {
    const popup = document.getElementById("attackResultPopup");
    const resultText = document.getElementById("attackResultText");
    const percent = Math.round(winChance * 100);
    resultText.textContent = `You had a ${percent}% chance and you ` + (won ? "WON" : "LOST");
    resultText.style.color = won ? "#00ff00" : "#ff3864";
    popup.style.display = "flex";
}
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
<script>
function showComingSoon(name) {
    alert(name + ' — Not added to the game yet');
}
async function saveGameStateToBackend() {
    if (!gameState.connectedWallet) return;
    try {
        const response = await fetch("/.netlify/functions/save-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet: gameState.connectedWallet,
                gameState: gameState
            }),
        });
        if (!response.ok) throw new Error("Request failed");
        const result = await response.json().catch(() => null);
        console.log("✅ Game state saved to Netlify:", result);
    } catch (error) {
        console.error("❌ Failed to save to backend:", error);
    }
}


// 🔁 Auto-refresh map tiles and NFT states every 1 second
if (!window.gameRefreshInterval) {
    window.gameRefreshInterval = setInterval(() => {
        updateTileVisuals();
        updateNftCards();
    }, 1000);
    console.log("✅ Game visuals auto-refresh interval started.");
}


async function updateTileInSupabase(tileId) {
    const tile = gameState.tiles[tileId];
    try {
        await fetch("/.netlify/functions/update-tile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: tileId,
                owner: tile.owner,
                nft_ids: tile.nftIds,
                buildings: tile.buildings,
                in_transit: tile.inTransit,
                arrival_time: tile.arrivalTime,
                transit_start_time: tile.transitStartTime
            })
        });
    } catch (err) {
        console.warn("Failed to update Supabase tile:", err);
    }
}

</script>
