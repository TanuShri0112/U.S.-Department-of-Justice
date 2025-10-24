// ECPAT update start - Simplified Admin Panel
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Upload,
  FileVideo,
  Image as ImageIcon,
  FileText,
  Download,
  BarChart,
  Settings,
  Trash
} from 'lucide-react';
import { ScormPackageGenerator } from '@/lib/scorm/ScormPackageGenerator';

export function ECPATAdminPanel() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    setUploading(true);
    // Implement file upload logic here
    setUploading(false);
  };

  const handleExportScorm = async (courseId) => {
    // Implement SCORM package generation
    const courseData = {
      id: courseId,
      title: 'Course Title',
      content: 'Course Content',
      assets: []
    };
    
    const generator = new ScormPackageGenerator(courseData);
    const blob = await generator.generatePackage();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course_${courseId}_scorm.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Course Management</h1>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Content Management Tab */}
        <TabsContent value="content">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course List */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Courses</h3>
                <ScrollArea className="h-[400px] border rounded-lg p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    {/* Course items would be mapped here */}
                    <Card
                      className="p-4 cursor-pointer hover:bg-primary-50"
                      onClick={() => setSelectedCourse(1)}
                    >
                      <h4 className="font-medium">Tourism Ethics</h4>
                      <p className="text-sm text-foreground-subtle">20 minutes</p>
                    </Card>
                  </motion.div>
                </ScrollArea>
              </div>

              {/* Course Details */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Course Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Course title" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="20" />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">Save Changes</Button>
                    <Button
                      variant="outline"
                      onClick={() => handleExportScorm(1)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export SCORM
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Media Management Tab */}
        <TabsContent value="media">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Media Library</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <FileVideo className="w-8 h-8 text-primary mb-2" />
                    <h4 className="font-medium">Videos</h4>
                    <Button variant="outline" className="mt-2 w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Video
                    </Button>
                  </Card>
                  <Card className="p-4">
                    <ImageIcon className="w-8 h-8 text-primary mb-2" />
                    <h4 className="font-medium">Images</h4>
                    <Button variant="outline" className="mt-2 w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </Card>
                  <Card className="p-4">
                    <FileText className="w-8 h-8 text-primary mb-2" />
                    <h4 className="font-medium">Documents</h4>
                    <Button variant="outline" className="mt-2 w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Learning Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Course Completion Rates</h4>
                  <div className="h-[200px] bg-primary-50 rounded-lg flex items-center justify-center">
                    <BarChart className="w-8 h-8 text-primary" />
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Average Time Spent</h4>
                  <div className="h-[200px] bg-primary-50 rounded-lg flex items-center justify-center">
                    <BarChart className="w-8 h-8 text-primary" />
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">SCORM Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="scorm-version">SCORM Version</Label>
                  <select
                    id="scorm-version"
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="1.2">SCORM 1.2</option>
                    <option value="2004">SCORM 2004</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="completion-threshold">
                    Completion Threshold (%)
                  </Label>
                  <Input
                    id="completion-threshold"
                    type="number"
                    placeholder="80"
                  />
                </div>
                <Button>Save Settings</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
// ECPAT update end
