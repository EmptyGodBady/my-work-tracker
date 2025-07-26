export enum ERootRoutes {
  "time-tracker" = "time-tracker",
  "dashboard" = "dashboard",
  "login" = "login",
  "registration" = "registration",
  "pdf-generator" = "pdf-generator",
}

export const ROOT_ROUTES = {
  [ERootRoutes["time-tracker"]]: "/time-tracker",
  [ERootRoutes["registration"]]: "/registration",
  [ERootRoutes["pdf-generator"]]: "/pdf-generator",
  [ERootRoutes["login"]]: "/",
  [ERootRoutes["dashboard"]]: "/dashboard",
};
