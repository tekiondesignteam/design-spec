export type RouteHandle = { breadcrumb?: string; section?: string }

export function isRouteHandle(h: unknown): h is RouteHandle {
  return typeof h === 'object' && h !== null
}
