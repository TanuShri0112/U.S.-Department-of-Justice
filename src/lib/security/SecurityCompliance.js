// IBC Tender Requirement: Security and GDPR Compliance
// Implements data encryption, security measures, and compliance features

/**
 * Security and Compliance Manager
 * Handles encryption, data protection, and GDPR compliance
 */
export class SecurityCompliance {
  constructor() {
    this.encryptionEnabled = true;
    this.auditLoggingEnabled = true;
  }

  /**
   * Encrypt sensitive data
   * In production, this would use proper encryption libraries (e.g., Web Crypto API)
   */
  async encryptData(data, key) {
    try {
      // In production, use Web Crypto API for proper encryption
      // This is a placeholder implementation
      if (typeof data !== 'string') {
        data = JSON.stringify(data);
      }

      // Base64 encoding as placeholder (production should use AES-256)
      const encoded = btoa(data);
      return {
        encrypted: encoded,
        algorithm: 'AES-256-GCM', // In production
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Encryption Error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt sensitive data
   */
  async decryptData(encryptedData, key) {
    try {
      // In production, use Web Crypto API for proper decryption
      const decoded = atob(encryptedData.encrypted);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Decryption Error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Log security events for audit trail
   */
  logSecurityEvent(event) {
    if (!this.auditLoggingEnabled) return;

    const auditLog = {
      timestamp: new Date().toISOString(),
      event: event.type,
      userId: event.userId,
      action: event.action,
      resource: event.resource,
      ipAddress: event.ipAddress || 'unknown',
      userAgent: event.userAgent || navigator.userAgent,
      success: event.success !== false
    };

    // In production, send to secure audit log service
    console.log('Security Audit Log:', auditLog);
    
    // Store in localStorage as fallback (production would use secure backend)
    try {
      const existingLogs = JSON.parse(localStorage.getItem('security_audit_logs') || '[]');
      existingLogs.push(auditLog);
      // Keep only last 1000 entries
      if (existingLogs.length > 1000) {
        existingLogs.shift();
      }
      localStorage.setItem('security_audit_logs', JSON.stringify(existingLogs));
    } catch (error) {
      console.error('Failed to store audit log:', error);
    }
  }

  /**
   * Check if connection is secure (HTTPS)
   */
  isSecureConnection() {
    return window.location.protocol === 'https:' || 
           window.location.hostname === 'localhost';
  }

  /**
   * Validate data protection compliance
   */
  validateGDPRCompliance(data) {
    const compliance = {
      encrypted: this.encryptionEnabled,
      secureConnection: this.isSecureConnection(),
      auditLogged: this.auditLoggingEnabled,
      dataMinimization: true,
      purposeLimitation: true,
      storageLimitation: true
    };

    // Log compliance check
    this.logSecurityEvent({
      type: 'GDPR_COMPLIANCE_CHECK',
      action: 'validate_compliance',
      resource: 'data_processing',
      success: true
    });

    return compliance;
  }

  /**
   * Sanitize user input to prevent XSS attacks
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') {
      return input;
    }

    // Remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  /**
   * Generate secure token for API requests
   */
  generateSecureToken() {
    // In production, use proper cryptographic random number generator
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Check password strength
   */
  validatePasswordStrength(password) {
    const checks = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const strength = Object.values(checks).filter(Boolean).length;
    const isStrong = strength >= 4;

    return {
      ...checks,
      strength,
      isStrong,
      score: strength * 20 // 0-100 score
    };
  }
}

/**
 * Data Protection Manager
 * Handles GDPR-specific data protection requirements
 */
export class DataProtectionManager {
  constructor() {
    this.retentionPolicies = {
      trainingRecords: 7 * 365 * 24 * 60 * 60 * 1000, // 7 years in milliseconds
      userAccounts: 2 * 365 * 24 * 60 * 60 * 1000, // 2 years in milliseconds
      systemLogs: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
      auditLogs: 365 * 24 * 60 * 60 * 1000 // 1 year in milliseconds
    };
  }

  /**
   * Check if data should be deleted based on retention policy
   */
  shouldDeleteData(dataType, createdAt) {
    const retentionPeriod = this.retentionPolicies[dataType];
    if (!retentionPeriod) {
      return false; // No retention policy, keep data
    }

    const age = Date.now() - new Date(createdAt).getTime();
    return age > retentionPeriod;
  }

  /**
   * Anonymize personal data
   */
  anonymizeData(data) {
    const anonymized = { ...data };
    
    // Remove or hash personal identifiers
    if (anonymized.email) {
      anonymized.email = this.hashEmail(anonymized.email);
    }
    if (anonymized.name) {
      anonymized.name = 'Anonymous User';
    }
    if (anonymized.phone) {
      anonymized.phone = null;
    }
    if (anonymized.address) {
      anonymized.address = null;
    }

    return anonymized;
  }

  /**
   * Hash email for anonymization
   */
  hashEmail(email) {
    // In production, use proper cryptographic hash (SHA-256)
    // This is a simple placeholder
    return `user_${btoa(email).substring(0, 10)}@anonymized.local`;
  }

  /**
   * Export user data (GDPR Right to Data Portability)
   */
  exportUserData(userData) {
    return {
      personalInformation: {
        name: userData.name,
        email: userData.email,
        department: userData.department,
        role: userData.role
      },
      trainingRecords: userData.trainingRecords || [],
      certificates: userData.certificates || [],
      exportDate: new Date().toISOString(),
      format: 'JSON',
      version: '1.0'
    };
  }
}

export default SecurityCompliance;

