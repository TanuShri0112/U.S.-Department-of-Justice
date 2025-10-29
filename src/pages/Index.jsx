// ECPAT update start - Travel & Tourism Landing Page
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  BookOpen,
  Monitor,
  BarChart,
  Download,
  Mail,
  Clock
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/banner_chatbot.jpeg)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-6"
            {...fadeIn}
          >
            DAI Global LMS
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            This demo dashboard illustrates how DAI Global LMS supports Monitoring, Evaluation, and Learning (MEL) for development and disaster risk finance programs.
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600"
            >
              Start Learning
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <a href="/" className="block p-5 rounded-lg border hover:shadow-sm transition">
              <div className="font-semibold mb-1">Home</div>
              <p className="text-sm text-gray-600">Overview and purpose</p>
            </a>
            <a href="/dashboard" className="block p-5 rounded-lg border hover:shadow-sm transition">
              <div className="font-semibold mb-1">MEL Insights Dashboard</div>
              <p className="text-sm text-gray-600">Analytics and impact</p>
            </a>
            <a href="/courses" className="block p-5 rounded-lg border hover:shadow-sm transition">
              <div className="font-semibold mb-1">Learning Modules</div>
              <p className="text-sm text-gray-600">Demo modules and objectives</p>
            </a>
            <a href="/resources" className="block p-5 rounded-lg border hover:shadow-sm transition">
              <div className="font-semibold mb-1">Knowledge Repository</div>
              <p className="text-sm text-gray-600">Library and document center</p>
            </a>
            <a href="/reports" className="block p-5 rounded-lg border hover:shadow-sm transition">
              <div className="font-semibold mb-1">Reports and Analytics</div>
              <p className="text-sm text-gray-600">Exports and filters</p>
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Banner */}
      <section className="bg-primary-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <Clock className="w-6 h-6 text-primary" />
            <p className="text-lg font-medium">
              Project Duration: November 2025 – January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* About the Program */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 h-full">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">About the Program</h3>
                <p className="text-foreground-subtle">
                  Expert-designed modules covering essential aspects of travel and tourism industry practices.
                </p>
              </Card>
            </motion.div>

            {/* Course Overview */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 h-full">
                <Monitor className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Course Overview</h3>
                <p className="text-foreground-subtle">
                  10 comprehensive online training courses, each 20-30 minutes in length.
                </p>
              </Card>
            </motion.div>

            {/* Multimedia Learning */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 h-full">
                <Calendar className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Multimedia Learning</h3>
                <p className="text-foreground-subtle">
                  Interactive content with videos, images, and engaging activities.
                </p>
              </Card>
            </motion.div>

            {/* Progress Tracking */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 h-full">
                <BarChart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p className="text-foreground-subtle">
                  SCORM/xAPI enabled tracking for comprehensive learning analytics.
                </p>
              </Card>
            </motion.div>

            {/* SCORM Package */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 h-full">
                <Download className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">SCORM Compatible</h3>
                <p className="text-foreground-subtle">
                  Download courses as SCORM packages for use in any LMS.
                </p>
              </Card>
            </motion.div>

            {/* Support */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 h-full">
                <Mail className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p className="text-foreground-subtle">
                  Dedicated support team to assist with your learning journey.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section + Contact */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Request a live walkthrough or access credentials
            </h2>
            <p className="text-lg text-foreground-subtle mb-8 max-w-2xl mx-auto">
              Our team will provide a guided demo of the MEL features and analytics capabilities.
            </p>
            <a href="/help?section=contact">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600"
            >
              Contact / Request Demo
            </Button>
            </a>
            <p className="text-xs text-gray-500 mt-4 max-w-2xl mx-auto">
              By requesting access you agree to our data handling practices. DAI Global complies with GDPR. We only process demo contact details to arrange access and support and do not share them with third parties.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
// ECPAT update end