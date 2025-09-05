export const detectPageReload = () => {
  const entry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;
  return entry?.type === 'reload';
};

// usage
/* 
if (detectPageReload()) {
  console.log("Page was reloaded");
}
*/
