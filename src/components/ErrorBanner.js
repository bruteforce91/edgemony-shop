
import React, { useState } from "react";
import "./ErrorBanner.css"

export default function ErrorBanner({message,retry,close}) {
    const [isClosed, setClosed] = useState(false)
    return (
        <div className="banner">
        <span className="banner__message">{message}</span>
        <button
          type="button"
          onClick={() => retry()}
        >
          Retry
        </button>
        <button
          type="button"
          onClick={() => close()}
        >
          X
        </button>
      </div>
    )
}
