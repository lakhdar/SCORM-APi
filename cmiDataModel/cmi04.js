(function (win) {
  "use strict";
  win.cmi04 = {
    comments_from_learner: new cmiArray({
      type: {
        comment: new cmiLocaleString({ min: 0, max: 4096 }),
        location: new cmiString({ min: 0, max: 4096 }),
        timestamp: new cmiTimestamp(),
      }
    }),
    comments_from_lms: new cmiArray({
      type: {
        comment: new cmiLocaleString({ min: 0, max: 4096 }),
        location: new cmiString({ min: 0, max: 4096 }),
        timestamp: new cmiTimestamp(),
      }
    }),
    completion_status: new cmiVocabulary({ values: ["completed", "incomplete", "not attempted", "unknown"] }),
    completion_threshold: new cmiDecimal({ min: 0, max: 1, canWrite: false }),
    credit: new cmiVocabulary({ values: ["credit", "no-credit"], canRead: false }),
    entry: new cmiVocabulary({ values: ["ab-initio", "resume"], canRead: false }),
    exit: new cmiVocabulary({ values: ["time-out", "logout", "suspend", "normal"], canRead: false }),
    interactions: new cmiArray({
      type: {
        id: new cmiLongIdentifier({ canWrite: false }),
        type: new cmiVocabulary({ values: ["true-false", "choice", "fill-in", "long-fill-in", "likert", "matching", "performance", "sequencing", "numeric", "other"] }),
        objectives: new cmiArray({
          type: {
            id: new cmiLongIdentifier({ canWrite: false }),
          }
        }),
        timestamp: new cmiTimestamp({ canWrite: false }),
        correct_responses: new cmiArray({
          pattern: {
            id: new cmiFeedback({ feedback: 3, canWrite: false }),
          },
        }),
        weighting: new cmiDecimal({ min: 0, max: 1, canWrite: false }),
        learner_response: new cmiFeedback({ feedback: 1, canWrite: false }),
        result: new cmiVocabulary({ values: ["correct", "incorrect", "unanticipated", "neutral"], canWrite: false }),
        latency: new cmiTimestamp({ canWrite: false }),
        description: new cmiLocaleString({ min: 0, max: 255, canRead: false }),
      }
    }),
    launch_data: new cmiString({ canRead: false }),
    learner_id: new cmiLongIdentifier({ canRead: false }),
    learner_name: new cmiLocaleString({ min: 0, max: 255, canRead: false }),
    learner_preference: new cmiGroup({
      audio_level: new cmiDecimal({ min: 0 }),
      language: new cmiLanguage({ max: 255 }),
      delivery_speed: new cmiDecimal({ min: 0 }),
      audio_captioning: new cmiInteger({ min: -1, max: 1 }),
    }),
    location: new cmiString({ min: 0, max: 1000 }),
    max_time_allowed: new cmiTimestamp({ canRead: false }),
    mode: new cmiVocabulary({ values: ["normal", "browse", "review"] }),
    objectives: new cmiArray({
      type: {
        id: new cmiLongIdentifier(),
        score: new cmiGroup({
          scaled: new cmiDecimal({ min: -1, max: 1 }),
          raw: new cmiDecimal({}),
          min: new cmiDecimal({}),
          max: new cmiDecimal({}),
        }),
        success_status: new cmiVocabulary({ values: ["passed", "failed", "unknown"] }),
        completion_status: new cmiVocabulary({ values: ["completed", "incomplete", "not attempted", "unknown"] }),
        progress_measure: new cmiDecimal({ min: 0, max: 1 }),
        description: new cmiLocaleString({ min: 0, max: 255, canRead: false }),
      }
    }),
    progress_measure: new cmiDecimal({ min: 0, max: 1 }),
    scaled_passing_score: new cmiDecimal({ min: -1, max: 1, canRead: false }),
    score: new cmiGroup({
      scaled: new cmiDecimal({ min: -1, max: 1 }),
      raw: new cmiDecimal({}),
      min: new cmiDecimal({}),
      max: new cmiDecimal({}),
    }),
    session_time: new cmiTimestamp({ canWrite: false }),
    success_status: new cmiVocabulary({ values: ["passed", "failed", "unknown"] }),
    suspend_data: new cmiString({ min: 0, max: 64000 }),
    time_limit_action: new cmiVocabulary({ values: ["exit,message", "exit,no message", "continue,message", "continue,no message"], canRead: false }),
    core: {
      total_time: new cmiTimestamp({ canRead: false }),
    }
  }

})(this);


