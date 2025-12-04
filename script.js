function generateQuote() {
    const quoteText = document.getElementById("quoteInput").value;
    const userName = document.getElementById("nameInput").value;
    const profilePicInput = document.getElementById("profilePicInput").files[0];
    const backgroundSelect = document.getElementById("backgroundSelect").value;
    const fontSelect = document.getElementById("fontSelect").value;
    const fontSizeSelect = document.getElementById("fontSizeSelect").value;

    if (!quoteText || !userName) {
        alert("Please enter both a quote and your name!");
        return;
    }

    const canvas = document.getElementById("quoteCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 400;

    let backgroundColor = "#fff";
    if (backgroundSelect === "lightblue") backgroundColor = "#add8e6";
    if (backgroundSelect === "darkblue") backgroundColor = "#003366";
    if (backgroundSelect === "gray") backgroundColor = "#808080";

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSizeSelect}px ${fontSelect}`;
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(quoteText, canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#555";
    ctx.fillText(`- ${userName}`, canvas.width / 2, canvas.height / 2 + 30);

    if (profilePicInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const imgSize = 50;
                ctx.drawImage(img, 20, 20, imgSize, imgSize);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(profilePicInput);
    }

    document.getElementById("downloadBtn").style.display = "block";
}

document.getElementById("shareTwitter").onclick = function() {
    const canvas = document.getElementById("quoteCanvas");
    const dataURL = canvas.toDataURL("image/png");

    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(dataURL)}&text=Check%20out%20my%20quote!`;
    window.open(twitterUrl, "_blank");
};

function downloadQuote() {
    const canvas = document.getElementById("quoteCanvas");
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'quote_image.png';
    link.click();
}
