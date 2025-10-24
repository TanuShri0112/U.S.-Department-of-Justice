// ECPAT update start - SCORM Package Generator
import JSZip from 'jszip';

export class ScormPackageGenerator {
  constructor(courseData) {
    this.courseData = courseData;
    this.zip = new JSZip();
  }

  async generatePackage() {
    // Add SCORM manifest
    this.addManifest();
    
    // Add course content
    await this.addCourseContent();
    
    // Generate the zip file
    return await this.zip.generateAsync({ type: 'blob' });
  }

  addManifest() {
    const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="ECPAT_${this.courseData.id}" version="1.2"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                             http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                             http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ECPAT_ORG">
    <organization identifier="ECPAT_ORG">
      <title>${this.courseData.title}</title>
      <item identifier="ITEM_1" identifierref="RESOURCE_1">
        <title>${this.courseData.title}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RESOURCE_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="scorm_api.js"/>
      <file href="styles.css"/>
      ${this.courseData.assets.map(asset => `<file href="assets/${asset}"/>`).join('\n      ')}
    </resource>
  </resources>
</manifest>`;

    this.zip.file('imsmanifest.xml', manifest);
  }

  async addCourseContent() {
    // Add index.html
    const indexHtml = this.generateIndexHtml();
    this.zip.file('index.html', indexHtml);

    // Add SCORM API wrapper
    const scormApi = this.generateScormApi();
    this.zip.file('scorm_api.js', scormApi);

    // Add styles
    const styles = this.generateStyles();
    this.zip.file('styles.css', styles);

    // Add assets
    const assetsFolder = this.zip.folder('assets');
    for (const asset of this.courseData.assets) {
      try {
        const response = await fetch(asset.url);
        const blob = await response.blob();
        assetsFolder.file(asset.filename, blob);
      } catch (error) {
        console.error(`Failed to add asset: ${asset.filename}`, error);
      }
    }
  }

  generateIndexHtml() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.courseData.title}</title>
    <link rel="stylesheet" href="styles.css">
    <script src="scorm_api.js"></script>
</head>
<body>
    <div id="course-container">
        <h1>${this.courseData.title}</h1>
        <div id="content">
            ${this.courseData.content}
        </div>
        <div id="navigation">
            <button onclick="prevPage()">Previous</button>
            <button onclick="nextPage()">Next</button>
        </div>
    </div>
    <script>
        // Initialize SCORM
        window.onload = function() {
            ScormAPI.initialize();
        };
        window.onunload = function() {
            ScormAPI.terminate();
        };
    </script>
</body>
</html>`;
  }

  generateScormApi() {
    return `// SCORM API Integration
const ScormAPI = {
    initialize: function() {
        if (window.parent && window.parent.API) {
            this.API = window.parent.API;
            return this.API.LMSInitialize('');
        }
        return false;
    },
    
    setValue: function(key, value) {
        if (this.API) {
            return this.API.LMSSetValue(key, value);
        }
        return false;
    },
    
    getValue: function(key) {
        if (this.API) {
            return this.API.LMSGetValue(key);
        }
        return '';
    },
    
    commit: function() {
        if (this.API) {
            return this.API.LMSCommit('');
        }
        return false;
    },
    
    terminate: function() {
        if (this.API) {
            return this.API.LMSFinish('');
        }
        return false;
    }
};`;
  }

  generateStyles() {
    return `/* ECPAT Course Styles */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

#course-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #2c3e50;
    text-align: center;
}

#content {
    margin: 20px 0;
}

#navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #2980b9;
}`;
  }
}
// ECPAT update end
