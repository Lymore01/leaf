// for router lookup

interface SampleRoutes {
    [key: string]: string;
}

export const sampleRouters: SampleRoutes = {
  "/": "Home",
  "/about": "About",
  "*": "NotFound",
};
