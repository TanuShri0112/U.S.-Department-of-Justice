// IBC Tender Requirement: Microsoft Teams Integration
// Enables integration with Microsoft Teams for meetings, notifications, and collaboration

/**
 * Microsoft Teams Integration Connector
 * Supports Teams meetings, notifications, and file sharing
 */
export class TeamsIntegration {
  constructor(config) {
    this.clientId = config.clientId;
    this.tenantId = config.tenantId;
    this.redirectUri = config.redirectUri;
    this.scope = config.scope || 'https://graph.microsoft.com/.default';
    this.accessToken = null;
  }

  /**
   * Authenticate with Microsoft Graph API
   */
  async authenticate() {
    try {
      // In production, this would use MSAL (Microsoft Authentication Library)
      // For now, this is a placeholder for the authentication flow
      const authUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize?` +
        `client_id=${this.clientId}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
        `response_mode=query&` +
        `scope=${encodeURIComponent(this.scope)}`;

      // Redirect to Microsoft login
      window.location.href = authUrl;
    } catch (error) {
      console.error('Teams Authentication Error:', error);
      throw error;
    }
  }

  /**
   * Get access token from authorization code
   */
  async getAccessToken(code) {
    try {
      const response = await fetch(`https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          code: code,
          redirect_uri: this.redirectUri,
          grant_type: 'authorization_code',
          scope: this.scope
        })
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Get Access Token Error:', error);
      throw error;
    }
  }

  /**
   * Create a Teams meeting for a training session
   */
  async createMeeting(meetingData) {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated. Please authenticate first.');
      }

      const response = await fetch('https://graph.microsoft.com/v1.0/me/onlineMeetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: meetingData.subject || 'Training Session',
          startDateTime: meetingData.startDateTime,
          endDateTime: meetingData.endDateTime,
          participants: {
            attendees: meetingData.attendees?.map(email => ({
              upn: email,
              role: 'attendee'
            })) || []
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Create meeting failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Create Meeting Error:', error);
      throw error;
    }
  }

  /**
   * Send notification to Teams channel
   */
  async sendChannelNotification(channelId, message) {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated. Please authenticate first.');
      }

      const response = await fetch(
        `https://graph.microsoft.com/v1.0/teams/${channelId}/channels/${channelId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            body: {
              contentType: 'html',
              content: message
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Send notification failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Send Notification Error:', error);
      throw error;
    }
  }

  /**
   * Get Teams calendar events
   */
  async getCalendarEvents(startDate, endDate) {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated. Please authenticate first.');
      }

      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/calendar/events?` +
        `$filter=start/dateTime ge '${startDate}' and end/dateTime le '${endDate}'`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Get calendar events failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get Calendar Events Error:', error);
      throw error;
    }
  }

  /**
   * Join a Teams meeting
   */
  joinMeeting(meetingUrl) {
    // Open Teams meeting in new window
    window.open(meetingUrl, '_blank', 'width=1200,height=800');
  }

  /**
   * Share file to Teams channel
   */
  async shareFileToChannel(channelId, fileData) {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated. Please authenticate first.');
      }

      // First upload file to OneDrive
      const uploadResponse = await fetch(
        `https://graph.microsoft.com/v1.0/me/drive/root:/${fileData.name}:/content`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': fileData.type
          },
          body: fileData.content
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`File upload failed: ${uploadResponse.statusText}`);
      }

      const fileInfo = await uploadResponse.json();

      // Then share to channel
      const shareResponse = await fetch(
        `https://graph.microsoft.com/v1.0/teams/${channelId}/channels/${channelId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            body: {
              contentType: 'html',
              content: `<attachment id="${fileInfo.id}"></attachment>`
            }
          })
        }
      );

      return await shareResponse.json();
    } catch (error) {
      console.error('Share File Error:', error);
      throw error;
    }
  }
}

/**
 * Teams Integration Manager
 */
export class TeamsIntegrationManager {
  constructor() {
    this.teamsIntegration = null;
    this.isConfigured = false;
  }

  /**
   * Initialize Teams integration
   */
  initialize(config) {
    this.teamsIntegration = new TeamsIntegration(config);
    this.isConfigured = true;
    return this;
  }

  /**
   * Schedule a training meeting in Teams
   */
  async scheduleTrainingMeeting(trainingData) {
    if (!this.isConfigured) {
      throw new Error('Teams integration not configured');
    }

    return await this.teamsIntegration.createMeeting({
      subject: `Training: ${trainingData.title}`,
      startDateTime: trainingData.startDateTime,
      endDateTime: trainingData.endDateTime,
      attendees: trainingData.attendees
    });
  }

  /**
   * Send training notification to Teams
   */
  async notifyTrainingChannel(channelId, message) {
    if (!this.isConfigured) {
      throw new Error('Teams integration not configured');
    }

    return await this.teamsIntegration.sendChannelNotification(channelId, message);
  }

  /**
   * Sync Teams calendar with LMS calendar
   */
  async syncCalendar(startDate, endDate) {
    if (!this.isConfigured) {
      throw new Error('Teams integration not configured');
    }

    return await this.teamsIntegration.getCalendarEvents(startDate, endDate);
  }
}

export default TeamsIntegrationManager;

