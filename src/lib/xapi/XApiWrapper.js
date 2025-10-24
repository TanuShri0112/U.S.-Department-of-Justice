// ECPAT update start - xAPI Integration Layer
import { XAPI } from 'xapi-js';

class XApiWrapper {
  constructor() {
    this.xapi = null;
    this.actorEmail = '';
    this.courseId = '';
  }

  init(config) {
    this.xapi = new XAPI({
      endpoint: config.endpoint,
      auth: config.auth,
      actor: {
        mbox: `mailto:${config.actorEmail}`,
        name: config.actorName,
        objectType: 'Agent'
      }
    });
    this.actorEmail = config.actorEmail;
    this.courseId = config.courseId;
  }

  sendStatement(verb, object, result = null) {
    if (!this.xapi) return;

    const statement = {
      actor: {
        mbox: `mailto:${this.actorEmail}`,
        objectType: 'Agent'
      },
      verb: {
        id: `http://adlnet.gov/expapi/verbs/${verb}`,
        display: { 'en-US': verb }
      },
      object: {
        id: `http://ecpat.org/courses/${this.courseId}/${object.id}`,
        definition: {
          name: { 'en-US': object.name },
          description: { 'en-US': object.description }
        },
        objectType: 'Activity'
      }
    };

    if (result) {
      statement.result = result;
    }

    return this.xapi.sendStatement(statement);
  }

  // Track course started
  startedCourse() {
    return this.sendStatement('launched', {
      id: this.courseId,
      name: 'Course Started',
      description: 'User started the course'
    });
  }

  // Track course completion
  completedCourse(progress) {
    return this.sendStatement('completed', {
      id: this.courseId,
      name: 'Course Completed',
      description: 'User completed the course'
    }, {
      completion: true,
      success: true,
      score: { scaled: progress / 100 }
    });
  }

  // Track time spent
  trackDuration(durationSeconds) {
    return this.sendStatement('experienced', {
      id: `${this.courseId}/duration`,
      name: 'Time Spent',
      description: 'Duration spent in course'
    }, {
      duration: `PT${durationSeconds}S`
    });
  }

  // Track interaction with course content
  trackInteraction(interactionId, interactionType, response) {
    return this.sendStatement('interacted', {
      id: `${this.courseId}/${interactionId}`,
      name: 'Content Interaction',
      description: `User interacted with ${interactionType}`
    }, {
      response: response
    });
  }
}

export const xapiWrapper = new XApiWrapper();
// ECPAT update end
