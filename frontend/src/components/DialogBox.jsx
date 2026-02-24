import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * DialogBox — RPG-style dialog with typewriter effect and pagination.
 *
 * Props:
 *   text        {string}    Full text to display (can contain \n for line breaks)
 *   title       {string?}   Optional title shown inside the balloon (e.g. NPC name)
 *   onComplete  {function}  Called when the user has read all pages
 *   speed       {number?}   Typing speed in ms per character (default: 25)
 *   maxChars    {number?}   Max characters per page (default: 120)
 *   buttonLabel {string?}   Label for the final button (default: "ENTENDIDO ✓")
 */
export default function DialogBox({
    text,
    title,
    onComplete,
    speed = 25,
    maxChars = 120,
    buttonLabel = "ENTENDIDO ✓"
}) {
    const pages = useRef([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const intervalRef = useRef(null);

    useEffect(() => {
        pages.current = splitIntoPages(text, maxChars);
        setPageIndex(0);
        setDisplayedText("");
        setIsTyping(true);
    }, [text, maxChars]);

    useEffect(() => {
        if (!pages.current.length) return;
        const currentPage = pages.current[pageIndex] || "";
        let charIndex = 0;

        setDisplayedText("");
        setIsTyping(true);

        intervalRef.current = setInterval(() => {
            charIndex++;
            setDisplayedText(currentPage.slice(0, charIndex));
            if (charIndex >= currentPage.length) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setIsTyping(false);
            }
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [pageIndex, speed, text]);

    const handleClick = useCallback(() => {
        if (isTyping) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
            setDisplayedText(pages.current[pageIndex] || "");
            setIsTyping(false);
        }
    }, [isTyping, pageIndex]);

    const handleNext = useCallback(() => {
        if (pageIndex < pages.current.length - 1) {
            setPageIndex(prev => prev + 1);
        } else {
            onComplete?.();
        }
    }, [pageIndex, onComplete]);

    const isLastPage = pageIndex >= pages.current.length - 1;
    const totalPages = pages.current.length;

    return (
        <div
            onClick={handleClick}
            style={{
                position: "relative",
                width: "100%",
                cursor: isTyping ? "pointer" : "default"
            }}
        >
            {/* Balloon frame — stretched to fill the container */}
            <img
                src="/fundobalao.png"
                alt=""
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                    pointerEvents: "none",
                    mixBlendMode: "screen"
                }}
            />

            {/* Text content — drives the container height */}
            <div style={{
                position: "relative",
                zIndex: 1,
                padding: "38px 36px 52px 42px",
                minHeight: 160
            }}>
                {/* Title inside the balloon */}
                {title && (
                    <div style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#80bdff",
                        letterSpacing: 1,
                        marginBottom: 8,
                        textTransform: "uppercase",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)"
                    }}>
                        {title}
                    </div>
                )}

                <div style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: "#e8e0d0",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "pre-line",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                    minHeight: 50
                }}>
                    {displayedText}
                    {isTyping && <span style={{ opacity: 0.6, animation: "dbPulse 0.5s infinite" }}>▍</span>}
                </div>

                {!isTyping && (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 12
                    }}>
                        {totalPages > 1 && (
                            <span style={{ fontSize: 9, color: "#a89870", letterSpacing: 1, textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>
                                {pageIndex + 1}/{totalPages}
                            </span>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            style={{
                                marginLeft: "auto",
                                background: "linear-gradient(180deg, #c9a84c 0%, #8b6914 100%)",
                                border: "1px solid #8b6914",
                                color: "#fff",
                                padding: "6px 16px",
                                borderRadius: 5,
                                fontSize: 11,
                                fontWeight: 800,
                                letterSpacing: 1,
                                cursor: "pointer",
                                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
                            }}
                        >
                            {isLastPage ? buttonLabel : "CONTINUAR ▶"}
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes dbPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
            `}</style>
        </div>
    );
}

function splitIntoPages(text, maxChars) {
    if (!text) return [""];
    const clean = text.replace(/\r\n/g, "\n").trim();
    if (clean.length <= maxChars) return [clean];

    const pages = [];
    let remaining = clean;

    while (remaining.length > 0) {
        if (remaining.length <= maxChars) {
            pages.push(remaining.trim());
            break;
        }

        const chunk = remaining.slice(0, maxChars);
        let breakAt = -1;

        const lastNewline = chunk.lastIndexOf("\n");
        if (lastNewline > maxChars * 0.3) {
            breakAt = lastNewline;
        }

        if (breakAt === -1) {
            for (let i = chunk.length - 1; i > maxChars * 0.3; i--) {
                if (chunk[i] === "." || chunk[i] === "!" || chunk[i] === "?") {
                    breakAt = i + 1;
                    break;
                }
            }
        }

        if (breakAt === -1) {
            const lastSpace = chunk.lastIndexOf(" ");
            breakAt = lastSpace > 0 ? lastSpace : maxChars;
        }

        pages.push(remaining.slice(0, breakAt).trim());
        remaining = remaining.slice(breakAt).trim();
    }

    return pages;
}
