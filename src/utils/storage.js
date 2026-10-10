// Small helpers around localStorage (safe against private-mode / parse errors)
export const KEYS = {
  profile: 'scgp_profile',
  assessment: 'scgp_assessment',
  messages: 'scgp_messages',
  roadmapProgress: 'scgp_roadmap_progress',
};

export function loadData(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeData(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
