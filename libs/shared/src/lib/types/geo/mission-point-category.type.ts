export const missionPointCategories = ['WAYPOINT', 'TAKEOFF'] as const;

export type MissionPointCategory = (typeof missionPointCategories)[number];
