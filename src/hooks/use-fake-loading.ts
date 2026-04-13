"use client";

import * as React from "react";

export function useFakeLoading(delayMs = 420) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);
  return ready;
}
