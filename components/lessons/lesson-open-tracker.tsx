"use client";

import { useEffect } from "react";

type LessonOpenTrackerProps = {
  lessonId: string;
};

export function LessonOpenTracker({ lessonId }: LessonOpenTrackerProps) {
  useEffect(() => {
    void fetch(`/api/lessons/${lessonId}/open`, {
      method: "POST"
    });
  }, [lessonId]);

  return null;
}
