"use client";

import { useEffect, useState } from "react";

export function PoweredByPayFooter() {
  const [ref, setRef] = useState("footer");
  useEffect(() => {
    const { hostname, pathname } = window.location;
    setRef(`footer-${hostname + pathname}`);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      <a
        href={`https://pay.daimo.com?ref=${ref}`}
        target="_blank"
        className="text-sm text-white hover:text-gray-200 flex items-center gap-2 group"
      >
        <span className="group-hover:text-white transition-all duration-200">
          Powered by Daimo Pay
        </span>
      </a>
      <span className="text-sm text-white">•</span>
      <a
        href="https://daimo.com/terms-of-use"
        target="_blank"
        className="text-sm text-white hover:text-gray-200"
      >
        Terms
      </a>
      <span className="text-sm text-white">•</span>
      <a
        href="https://daimo.com/privacy"
        target="_blank"
        className="text-sm text-white hover:text-gray-200"
      >
        Privacy
      </a>
    </div>
  );
}
