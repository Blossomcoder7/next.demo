"use client";
type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type BadgeColor = "red" | "gold" | "blue" | "green" | string;

interface BadgeOptions {
  color?: BadgeColor;
  position?: BadgePosition;
  showDot?: boolean; // Show just a dot instead of text
}

export default function updateFavicon(
  content: string | number = "",
  options: BadgeOptions = {}
) {
  const { color = "red", position = "top-right", showDot = false } = options;

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Color mapping
  const colorMap: Record<string, string> = {
    red: "#ff0000",
    gold: "#ffd700",
    blue: "#0066ff",
    green: "#00cc00",
  };

  const badgeColor = colorMap[color] || color;

  // Position mapping for text
  const getPosition = (pos: BadgePosition) => {
    switch (pos) {
      case "top-left":
        return { x: 16, y: 20 };
      case "top-right":
        return { x: 48, y: 20 };
      case "bottom-left":
        return { x: 16, y: 48 };
      case "bottom-right":
        return { x: 48, y: 48 };
      default:
        return { x: 48, y: 20 };
    }
  };

  // Position mapping for dots (smaller, closer to corners)
  const getDotPosition = (pos: BadgePosition) => {
    switch (pos) {
      case "top-left":
        return { x: 12, y: 12 };
      case "top-right":
        return { x: 52, y: 12 };
      case "bottom-left":
        return { x: 12, y: 52 };
      case "bottom-right":
        return { x: 52, y: 52 };
      default:
        return { x: 52, y: 12 };
    }
  };

  // Function to update favicon
  const updateFaviconElement = (dataUrl: string) => {
    const existingFavicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement;
    if (existingFavicon) {
      existingFavicon.remove();
    }

    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.type = "image/png";
    newFavicon.href = dataUrl;
    document.head.appendChild(newFavicon);
  };

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "/fav.webp";

  img.onload = () => {
    ctx.clearRect(0, 0, 64, 64);
    ctx.drawImage(img, 0, 0, 64, 64);

    if (content || showDot) {
      const displayText = content.toString();

      if (showDot) {
        // Show just a dot
        const dotPos = getDotPosition(position);
        const badgeRadius = 8;

        ctx.fillStyle = badgeColor;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(dotPos.x, dotPos.y, badgeRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      } else if (displayText) {
        // Show text only (no background)
        const textPos = getPosition(position);
        const textLength = displayText.length;

        // Determine font size based on text length - much larger now
        let fontSize;
        if (textLength === 1) {
          fontSize = 28;
        } else if (textLength === 2) {
          fontSize = 24;
        } else {
          fontSize = 20;
        }

        // Set up text styling
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Prepare final text (truncate if too long)
        const finalText =
          textLength > 3 ? displayText.substring(0, 2) + "+" : displayText;

        // Draw text with strong outline for visibility
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 6;
        ctx.miterLimit = 2;
        ctx.strokeText(finalText, textPos.x, textPos.y);

        // Draw the colored text
        ctx.fillStyle = badgeColor;
        ctx.fillText(finalText, textPos.x, textPos.y);
      }
    }

    updateFaviconElement(canvas.toDataURL("image/png"));
  };

  img.onerror = () => {
    console.log("Base favicon image failed to load, creating simple favicon");

    // Create simple background
    ctx.fillStyle = "#4f46e5";
    ctx.fillRect(0, 0, 64, 64);

    // Add a simple white border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 60, 60);

    if (content || showDot) {
      const displayText = content.toString();

      if (showDot) {
        const dotPos = getDotPosition(position);

        ctx.fillStyle = badgeColor;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(dotPos.x, dotPos.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      } else if (displayText) {
        const textPos = getPosition(position);

        // Text styling for fallback - much larger
        ctx.font = "bold 28px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const finalText =
          displayText.length > 2
            ? displayText.substring(0, 2) + "+"
            : displayText;

        // Strong white outline
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 6;
        ctx.strokeText(finalText, textPos.x, textPos.y);

        // Colored text
        ctx.fillStyle = badgeColor;
        ctx.fillText(finalText, textPos.x, textPos.y);
      }
    }

    updateFaviconElement(canvas.toDataURL("image/png"));
  };

  setTimeout(() => {
    if (!img.complete) {
      img.onerror?.(new Event("error"));
    }
  }, 1000);
}

// Helper function for easy dot usage
export function updateFaviconDot(
  color: BadgeColor = "red",
  position: BadgePosition = "top-right"
) {
  updateFavicon("", { color, position, showDot: true });
}

// Helper function to clear favicon badge
export function clearFaviconBadge() {
  updateFavicon("");
}
