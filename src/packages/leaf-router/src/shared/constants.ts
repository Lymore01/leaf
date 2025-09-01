// for router lookup
// todo: clean up later
interface SampleRoutes {
    [key: string]: string;
}

export const sampleRouters: SampleRoutes = {
  "/": "Home",
  "/about": "About",
  "*": "NotFound",
};
