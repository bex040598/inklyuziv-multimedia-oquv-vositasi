export type ActionStatus = "idle" | "success" | "error";

export type ActionState = {
  status: ActionStatus;
  message?: string;
  errors?: Record<string, string>;
  payload?: Record<string, unknown>;
};

export type AccessibilityState = {
  largeText: boolean;
  highContrast: boolean;
  simplifiedUi: boolean;
  dyslexiaFont: boolean;
  focusOutline: boolean;
  reduceMotion: boolean;
  captions: boolean;
  textToSpeech: boolean;
  easyLanguage: boolean;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
};

export type RecommendationMap = {
  visual: string;
  hearing: string;
  mobility: string;
  autism: string;
  intellectual: string;
};
