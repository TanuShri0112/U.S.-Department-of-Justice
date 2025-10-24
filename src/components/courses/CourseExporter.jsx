// ECPAT update start - Course Export Component
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, FileJson, Package } from 'lucide-react';
import { ScormPackageGenerator } from '@/lib/scorm/ScormPackageGenerator';
import { StorylineExporter } from '@/lib/export/StorylineExporter';

export function CourseExporter({ courseData }) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExportSCORM = async () => {
    try {
      setExporting(true);
      setProgress(10);

      const generator = new ScormPackageGenerator(courseData);
      setProgress(30);

      const blob = await generator.generatePackage();
      setProgress(90);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseData.id}_scorm.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setProgress(100);
    } catch (error) {
      console.error('Failed to export SCORM package:', error);
    } finally {
      setTimeout(() => {
        setExporting(false);
        setProgress(0);
      }, 1000);
    }
  };

  const handleExportStoryline = async () => {
    try {
      setExporting(true);
      setProgress(10);

      const exporter = new StorylineExporter(courseData);
      setProgress(30);

      const blob = await exporter.export();
      setProgress(90);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseData.id}_storyline.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setProgress(100);
    } catch (error) {
      console.error('Failed to export Storyline project:', error);
    } finally {
      setTimeout(() => {
        setExporting(false);
        setProgress(0);
      }, 1000);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Export Course</h3>
      
      <div className="space-y-6">
        {/* SCORM Export */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-medium">SCORM Package</h4>
              <p className="text-sm text-foreground-subtle">
                Export as SCORM 1.2 compatible package
              </p>
            </div>
          </div>
          <Button
            onClick={handleExportSCORM}
            disabled={exporting}
          >
            <Download className="w-4 h-4 mr-2" />
            Export SCORM
          </Button>
        </div>

        {/* Storyline Export */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileJson className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-medium">Storyline Project</h4>
              <p className="text-sm text-foreground-subtle">
                Export as Articulate Storyline compatible format
              </p>
            </div>
          </div>
          <Button
            onClick={handleExportStoryline}
            disabled={exporting}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Storyline
          </Button>
        </div>

        {/* Progress Indicator */}
        {exporting && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-center text-foreground-subtle">
              Preparing export...
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
// ECPAT update end
