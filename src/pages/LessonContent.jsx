import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, FileText, Video, Headphones, ArrowLeft, Edit, Save, X, Trash2, BookOpen, FileDown, ExternalLink, FileType2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ImmersiveReader } from '@/components/shared/ImmersiveReader';
import { useSidebar } from '@/contexts/SidebarContext';

const LessonContent = () => {
  const { courseId, moduleId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { setMainCollapsed } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImmersiveReader, setShowImmersiveReader] = useState(false);

  // Mock lesson data - in real app this would come from API based on lessonId
  const [lesson, setLesson] = useState({
    id: lessonId,
    title: 'Introduction to Business Trust Fundamentals',
    type: 'text',
    content: `Business trusts are legal entities that hold and manage assets for the benefit of beneficiaries. They operate under specific legal frameworks and provide various advantages for business operations.

Key Concepts:
- Legal Structure: Business trusts are formed under state law and provide a flexible structure for business operations
- Fiduciary Duties: Trustees have legal obligations to manage assets in the best interests of beneficiaries
- Tax Advantages: Business trusts can provide certain tax benefits depending on their structure and jurisdiction
- Asset Protection: Properly structured trusts can offer protection from creditors and legal claims

Applications in Modern Commerce:
Business trusts are commonly used in various industries including real estate investment, equipment leasing, and natural resource development. They provide a means for multiple investors to pool resources while maintaining professional management oversight.

The regulatory framework governing business trusts varies by jurisdiction, with some states providing more favorable legal environments than others. Understanding these regulatory differences is crucial for anyone considering the formation or investment in a business trust.`,
    duration: '15 minutes',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    audioUrl: '',
    description: 'Comprehensive overview of business trust concepts and their practical applications in modern commerce.',
    pdfUrl: '',
    heroImage: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1600&h=900&fit=crop&auto=format',
    gallery: []
  });

  const [editForm, setEditForm] = useState({
    title: lesson.title,
    type: lesson.type,
    content: lesson.content,
    duration: lesson.duration,
    description: lesson.description,
    videoUrl: lesson.videoUrl,
    audioUrl: lesson.audioUrl,
    pdfUrl: lesson.pdfUrl,
    heroImage: lesson.heroImage
  });

  // Collapse sidebar on mount for immersive reading
  useEffect(() => {
    setMainCollapsed(true);
  }, [setMainCollapsed]);

  // Update lesson content based on moduleId + lessonId
  React.useEffect(() => {
    if (!lessonId) return;
    const moduleMap = {
      '1': { // Law Enforcement Training - Module 1: Foundations of Law Enforcement Training in the U.S.
      '1': {
          title: 'Adult Learning in Tactical & Compliance Settings (Andragogy in policing)',
          type: 'text',
          content: `# Module 1 • Foundations of Law Enforcement Training in the U.S.\n\n## Topic 1.1: Adult Learning in Tactical & Compliance Settings\n\n### Understanding Andragogy in Policing\n\nAdult learning principles are crucial for effective law enforcement training. Unlike traditional pedagogy, andragogy recognizes that adult learners bring life experiences and prefer self-directed learning.\n\n### Key Principles:\n\n**Self-Directed Learning:**\n- Officers prefer to control their learning pace\n- Build on existing experience and knowledge\n- Focus on practical, job-relevant skills\n\n**Problem-Centered Approach:**\n- Use real-world scenarios and case studies\n- Connect training to actual policing situations\n- Emphasize practical application over theory\n\n**Experience-Based Learning:**\n- Leverage officers' field experience\n- Use peer-to-peer learning opportunities\n- Encourage reflection on past incidents\n\n### Tactical Training Considerations:\n\n- **High-Stress Learning:** Training must prepare officers for real-world pressure\n- **Muscle Memory Development:** Repetitive practice for critical skills\n- **Decision-Making Under Stress:** Scenario-based training that mimics real conditions\n\n### Compliance Training Elements:\n\n- **Legal Updates:** Regular training on new laws and procedures\n- **Policy Changes:** Department-specific protocol updates\n- **Ethical Standards:** Maintaining integrity in all situations\n\n### Best Practices:\n\n1. **Interactive Learning:** Use role-playing and simulations\n2. **Peer Teaching:** Experienced officers mentoring newer ones\n3. **Continuous Assessment:** Regular evaluation of skills and knowledge\n4. **Feedback Loops:** Constructive criticism and improvement suggestions`,
          duration: '45 minutes',
          videoUrl: 'https://images.unsplash.com/photo-1520483601560-4b17b0c93a77?w=800&h=600&fit=crop',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Master adult learning principles specifically designed for law enforcement training environments.',
          heroImage: 'https://images.unsplash.com/photo-1520483601560-4b17b0c93a77?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '2': {
          title: 'DOJ & POST Training Requirements',
          type: 'video',
          content: `# Topic 1.2: DOJ & POST Training Requirements\n\n## Department of Justice Training Standards\n\nThe DOJ establishes federal training standards that all law enforcement agencies must meet. These standards ensure consistency and quality across all training programs.\n\n### Federal Training Requirements:\n\n**Minimum Standards:**\n- 40 hours of basic training\n- Annual continuing education requirements\n- Specialized training for specific roles\n\n**DOJ Compliance Areas:**\n- Constitutional law updates\n- Civil rights training\n- Use of force protocols\n- Community policing principles\n\n## POST (Peace Officer Standards and Training)\n\nEach state maintains its own POST requirements, which often exceed federal minimums.\n\n### Common POST Requirements:\n\n**Basic Academy:**\n- 16-24 weeks of intensive training\n- Physical fitness standards\n- Written and practical examinations\n\n**Continuing Education:**\n- 24-40 hours annually\n- Specific topic requirements\n- Documentation and tracking\n\n### Training Documentation:\n\n- **Certification Records:** Maintained for each officer\n- **Training Logs:** Detailed records of all training\n- **Compliance Audits:** Regular reviews of training records\n\n### State-Specific Variations:\n\n- **California POST:** 664 hours minimum basic training\n- **Texas TCOLE:** 696 hours for basic peace officer\n- **Florida CJSTC:** 770 hours for law enforcement\n\n### Compliance Monitoring:\n\n- Regular audits of training records\n- Verification of instructor qualifications\n- Assessment of training effectiveness\n- Documentation of all training activities`,
          duration: '35 minutes',
          videoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Understand federal and state training requirements for law enforcement officers.',
          heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '3': {
          title: 'Ethical & Civil Rights Foundations (Use of force, Miranda, implicit bias)',
          type: 'text',
          content: `# Topic 1.3: Ethical & Civil Rights Foundations\n\n## Core Ethical Principles in Law Enforcement\n\n### Constitutional Framework:\n\n**Fourth Amendment:**\n- Search and seizure limitations\n- Probable cause requirements\n- Warrant exceptions and limitations\n\n**Fifth Amendment:**\n- Miranda rights and requirements\n- Self-incrimination protections\n- Due process guarantees\n\n**Sixth Amendment:**\n- Right to counsel\n- Speedy trial requirements\n- Confrontation clause\n\n### Use of Force Standards:\n\n**Graham v. Connor Standard:**\n- Objective reasonableness test\n- Factors: severity of crime, threat level, resistance\n- Totality of circumstances analysis\n\n**Force Continuum:**\n1. **Presence:** Officer presence as deterrent\n2. **Verbal Commands:** Clear, direct instructions\n3. **Empty Hand Control:** Physical restraint techniques\n4. **Less Lethal Options:** Tasers, pepper spray, batons\n5. **Deadly Force:** Last resort, imminent threat\n\n### Miranda Rights Training:\n\n**When Required:**\n- Custodial interrogation\n- Suspect in custody\n- Police questioning\n\n**Proper Administration:**\n- Clear, understandable language\n- Confirmation of understanding\n- Waiver documentation\n\n### Implicit Bias Recognition:\n\n**Common Biases:**\n- Racial and ethnic stereotypes\n- Gender-based assumptions\n- Socioeconomic prejudices\n- Age-related biases\n\n**Mitigation Strategies:**\n- Self-awareness training\n- Cultural competency education\n- Community engagement\n- Regular bias assessments\n\n### Ethical Decision-Making:\n\n**Ethical Framework:**\n1. **Identify the ethical issue**\n2. **Gather relevant information**\n3. **Consider alternatives**\n4. **Evaluate consequences**\n5. **Make decision**\n6. **Reflect on outcome**\n\n### Civil Rights Violations Prevention:\n\n- **Equal Protection:** Treat all individuals fairly\n- **Due Process:** Follow proper procedures\n- **Freedom of Speech:** Respect First Amendment rights\n- **Privacy Rights:** Protect personal information\n\n### Training Scenarios:\n\n- **High-Stress Situations:** Maintaining ethics under pressure\n- **Community Interactions:** Building trust and respect\n- **Use of Force Decisions:** Making split-second ethical choices\n- **Reporting Misconduct:** Whistleblower protections and procedures`,
          duration: '50 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Master the ethical foundations and civil rights principles essential for law enforcement.',
          heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '4': {
          title: 'Trauma-informed instruction for first responders',
          type: 'audio',
          content: `# Topic 1.4: Trauma-Informed Instruction for First Responders\n\n## Understanding Trauma in Law Enforcement\n\n### What is Trauma?\n\nTrauma is a response to deeply distressing or disturbing events that overwhelm an individual's ability to cope. For first responders, this includes:\n\n- **Direct Trauma:** Personal involvement in traumatic events\n- **Vicarious Trauma:** Exposure to others' traumatic experiences\n- **Cumulative Trauma:** Repeated exposure over time\n\n### Impact on First Responders:\n\n**Physical Symptoms:**\n- Sleep disturbances\n- Fatigue and exhaustion\n- Headaches and muscle tension\n- Gastrointestinal issues\n\n**Emotional Symptoms:**\n- Anxiety and depression\n- Irritability and anger\n- Emotional numbness\n- Hypervigilance\n\n**Behavioral Changes:**\n- Social withdrawal\n- Substance use\n- Relationship difficulties\n- Work performance issues\n\n### Trauma-Informed Training Principles:\n\n**1. Safety:**\n- Physical and emotional safety\n- Predictable environment\n- Clear boundaries and expectations\n\n**2. Trustworthiness:**\n- Transparent communication\n- Consistent follow-through\n- Reliable support systems\n\n**3. Choice:**\n- Participant autonomy\n- Informed consent\n- Voluntary participation\n\n**4. Collaboration:**\n- Peer support networks\n- Shared decision-making\n- Team-based approaches\n\n**5. Empowerment:**\n- Building resilience skills\n- Strengths-based approach\n- Recovery-focused training\n\n### Training Delivery Methods:\n\n**Small Group Discussions:**\n- Safe space for sharing\n- Peer support opportunities\n- Facilitated by trained professionals\n\n**Scenario-Based Learning:**\n- Realistic trauma situations\n- Controlled exposure\n- Debriefing and support\n\n**Mindfulness Techniques:**\n- Stress reduction methods\n- Grounding exercises\n- Breathing techniques\n\n### Support Resources:\n\n- **Peer Support Programs:** Fellow officers trained in support\n- **Professional Counseling:** Licensed mental health professionals\n- **Employee Assistance Programs:** Confidential support services\n- **Critical Incident Stress Management:** Immediate and ongoing support\n\n### Self-Care Strategies:\n\n- **Physical Health:** Regular exercise, proper nutrition, adequate sleep\n- **Mental Health:** Therapy, meditation, hobbies\n- **Social Support:** Family, friends, colleagues\n- **Professional Development:** Continued learning and growth\n\n### Recognizing Warning Signs:\n\n**In Self:**\n- Persistent negative thoughts\n- Sleep or appetite changes\n- Increased substance use\n- Social isolation\n\n**In Colleagues:**\n- Behavioral changes\n- Performance decline\n- Absenteeism\n- Relationship problems\n\n### Intervention Strategies:\n\n- **Direct Approach:** Private, non-confrontational conversation\n- **Resource Sharing:** Information about available support\n- **Professional Referral:** Encouraging professional help\n- **Follow-up:** Continued support and monitoring`,
          duration: '40 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Learn trauma-informed approaches for training first responders and supporting their mental health.',
          heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        }
      },
      '2': { // Law Enforcement Training - Module 2: Stakeholder Analysis & Needs Assessment
        '1': {
          title: 'Identifying Key Stakeholders in Law Enforcement Training',
          type: 'text',
          content: `# Module 2 • Stakeholder Analysis & Needs Assessment\n\n## Topic 2.1: Identifying Key Stakeholders\n\n### Primary Stakeholders:\n\n**Internal Stakeholders:**\n- **Officers:** Direct recipients of training\n- **Supervisors:** Training oversight and implementation\n- **Command Staff:** Strategic training decisions\n- **Training Coordinators:** Program development and delivery\n\n**External Stakeholders:**\n- **Community Members:** Public safety expectations\n- **Local Government:** Budget and policy decisions\n- **Civil Rights Organizations:** Compliance monitoring\n- **Media:** Public perception and transparency\n\n### Stakeholder Analysis Framework:\n\n**Power vs Interest Matrix:**\n- **High Power, High Interest:** Key players requiring close management\n- **High Power, Low Interest:** Keep satisfied with minimal effort\n- **Low Power, High Interest:** Keep informed and engaged\n- **Low Power, Low Interest:** Monitor with minimal effort\n\n### Engagement Strategies:\n\n**For High-Power Stakeholders:**\n- Regular briefings and updates\n- Direct involvement in decision-making\n- Customized communication approaches\n\n**For Community Stakeholders:**\n- Public forums and town halls\n- Community advisory boards\n- Transparent reporting and feedback\n\n### Communication Methods:\n\n- **Formal Meetings:** Scheduled stakeholder sessions\n- **Surveys and Feedback:** Regular input collection\n- **Focus Groups:** Targeted discussions\n- **Public Forums:** Community engagement events`,
          duration: '30 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Learn to identify and analyze key stakeholders in law enforcement training programs.',
          heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '2': {
          title: 'Conducting Training Needs Assessment',
          type: 'video',
          content: `# Topic 2.2: Conducting Training Needs Assessment\n\n## Assessment Methods:\n\n### Data Collection Techniques:\n\n**Surveys and Questionnaires:**\n- Officer self-assessments\n- Supervisor evaluations\n- Performance gap analysis\n- Skill inventory assessments\n\n**Interviews and Focus Groups:**\n- One-on-one interviews with key personnel\n- Group discussions with officers\n- Command staff interviews\n- Community leader consultations\n\n**Performance Analysis:**\n- Review of incident reports\n- Performance evaluation data\n- Complaint and commendation analysis\n- Use of force reports\n\n### Assessment Framework:\n\n**1. Organizational Analysis:**\n- Department goals and objectives\n- Current training programs\n- Resource availability\n- Policy and procedure requirements\n\n**2. Task Analysis:**\n- Job function requirements\n- Skill and knowledge needs\n- Performance standards\n- Critical incident analysis\n\n**3. Person Analysis:**\n- Individual skill assessments\n- Learning style preferences\n- Experience levels\n- Career development goals\n\n### Data Analysis:\n\n**Quantitative Methods:**\n- Statistical analysis of survey data\n- Performance metrics comparison\n- Gap analysis calculations\n- Trend identification\n\n**Qualitative Methods:**\n- Thematic analysis of interviews\n- Content analysis of feedback\n- Case study development\n- Best practice identification\n\n### Reporting and Recommendations:\n\n**Assessment Report Components:**\n- Executive summary\n- Methodology description\n- Key findings\n- Recommendations\n- Implementation timeline\n- Resource requirements\n\n**Stakeholder Communication:**\n- Executive briefings\n- Department-wide presentations\n- Community reports\n- Media communications`,
          duration: '45 minutes',
          videoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Master the process of conducting comprehensive training needs assessments.',
          heroImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '3': {
          title: 'Prioritizing Training Needs and Resource Allocation',
          type: 'text',
          content: `# Topic 2.3: Prioritizing Training Needs and Resource Allocation\n\n## Prioritization Framework:\n\n### Risk-Based Prioritization:\n\n**High-Risk, High-Impact Training:**\n- Use of force training\n- Constitutional law updates\n- Critical incident response\n- Emergency procedures\n\n**Compliance Requirements:**\n- Mandatory annual training\n- Legal requirement updates\n- Policy changes\n- Certification renewals\n\n**Performance Improvement:**\n- Skill development needs\n- Career advancement training\n- Leadership development\n- Specialized skills\n\n### Resource Allocation Matrix:\n\n**Budget Considerations:**\n- Training costs vs. benefits\n- Return on investment analysis\n- Cost-effective delivery methods\n- Grant and funding opportunities\n\n**Time Management:**\n- Officer availability\n- Shift scheduling conflicts\n- Training duration optimization\n- Blended learning approaches\n\n**Personnel Resources:**\n- Instructor availability\n- Subject matter experts\n- External consultants\n- Peer training programs\n\n### Implementation Planning:\n\n**Phased Approach:**\n- Immediate needs (0-3 months)\n- Short-term goals (3-6 months)\n- Medium-term objectives (6-12 months)\n- Long-term development (1+ years)\n\n**Resource Requirements:**\n- Budget allocation\n- Personnel assignments\n- Equipment and materials\n- Facility needs\n\n**Success Metrics:**\n- Performance improvement indicators\n- Compliance measurements\n- Officer satisfaction scores\n- Community feedback\n\n### Monitoring and Evaluation:\n\n**Progress Tracking:**\n- Training completion rates\n- Performance improvements\n- Feedback collection\n- Continuous assessment\n\n**Adjustment Strategies:**\n- Program modifications\n- Resource reallocation\n- Timeline adjustments\n- Method improvements`,
          duration: '35 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Learn to prioritize training needs and effectively allocate resources for maximum impact.',
          heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        }
      },
      '3': { // Law Enforcement Training - Module 3: Customized Curriculum & Scenario Design
        '1': {
          title: 'Curriculum Development for Law Enforcement',
          type: 'text',
          content: `# Module 3 • Customized Curriculum & Scenario Design\n\n## Topic 3.1: Curriculum Development for Law Enforcement\n\n### Curriculum Design Principles:\n\n**Adult Learning Theory Application:**\n- Self-directed learning opportunities\n- Experience-based instruction\n- Problem-centered approaches\n- Immediate applicability focus\n\n**Competency-Based Framework:**\n- Clear learning objectives\n- Measurable outcomes\n- Skill-based assessments\n- Performance standards\n\n### Curriculum Components:\n\n**1. Learning Objectives:**\n- Specific, measurable goals\n- Behavioral outcomes\n- Knowledge, skills, and attitudes\n- Performance criteria\n\n**2. Content Organization:**\n- Logical sequence of topics\n- Prerequisite relationships\n- Progressive complexity\n- Integration opportunities\n\n**3. Instructional Methods:**\n- Lecture and presentation\n- Interactive discussions\n- Hands-on practice\n- Scenario-based learning\n\n**4. Assessment Strategies:**\n- Knowledge tests\n- Practical demonstrations\n- Performance evaluations\n- Continuous feedback\n\n### Curriculum Development Process:\n\n**Phase 1: Analysis**\n- Needs assessment review\n- Stakeholder input\n- Resource evaluation\n- Timeline development\n\n**Phase 2: Design**\n- Learning objective creation\n- Content selection\n- Method determination\n- Assessment planning\n\n**Phase 3: Development**\n- Material creation\n- Resource preparation\n- Instructor training\n- Pilot testing\n\n**Phase 4: Implementation**\n- Program delivery\n- Progress monitoring\n- Feedback collection\n- Continuous improvement\n\n### Specialized Curriculum Areas:\n\n**Tactical Training:**\n- Use of force scenarios\n- Emergency response procedures\n- Equipment training\n- Physical fitness requirements\n\n**Legal Training:**\n- Constitutional law updates\n- Court procedures\n- Evidence handling\n- Testimony preparation\n\n**Community Relations:**\n- Cultural competency\n- Communication skills\n- Conflict resolution\n- Community engagement\n\n**Leadership Development:**\n- Management principles\n- Decision-making skills\n- Team building\n- Change management`,
          duration: '40 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Master the principles and processes of developing effective law enforcement curricula.',
          heroImage: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '2': {
          title: 'Scenario-Based Training Design',
          type: 'video',
          content: `# Topic 3.2: Scenario-Based Training Design\n\n## Scenario Development Framework:\n\n### Scenario Types:\n\n**Use of Force Scenarios:**\n- De-escalation techniques\n- Force continuum application\n- Decision-making under stress\n- Legal justification training\n\n**Community Interaction Scenarios:**\n- Cultural sensitivity training\n- Communication challenges\n- Conflict resolution\n- Community engagement\n\n**Emergency Response Scenarios:**\n- Active shooter situations\n- Natural disasters\n- Mass casualty incidents\n- Crisis management\n\n### Scenario Design Principles:\n\n**Realism:**\n- Authentic situations\n- Real-world complexity\n- Multiple variables\n- Unpredictable elements\n\n**Safety:**\n- Controlled environment\n- Safety protocols\n- Medical support\n- Emergency procedures\n\n**Learning Objectives:**\n- Clear skill development\n- Knowledge application\n- Decision-making practice\n- Performance evaluation\n\n### Scenario Components:\n\n**1. Setup and Context:**\n- Background information\n- Character development\n- Environmental factors\n- Initial conditions\n\n**2. Progression and Variables:**\n- Dynamic elements\n- Multiple outcomes\n- Escalation options\n- De-escalation opportunities\n\n**3. Assessment Criteria:**\n- Performance standards\n- Decision points\n- Communication skills\n- Legal compliance\n\n### Implementation Strategies:\n\n**Role-Playing:**\n- Officer participants\n- Community actors\n- Supervisor observers\n- Instructor facilitators\n\n**Technology Integration:**\n- Virtual reality systems\n- Simulation software\n- Video recording\n- Performance analysis\n\n**Debriefing Process:**\n- Immediate feedback\n- Performance review\n- Learning reinforcement\n- Improvement planning\n\n### Scenario Evaluation:\n\n**Effectiveness Measures:**\n- Learning objective achievement\n- Participant feedback\n- Performance improvement\n- Real-world application\n\n**Continuous Improvement:**\n- Regular updates\n- Feedback incorporation\n- Best practice sharing\n- Innovation integration`,
          duration: '50 minutes',
          videoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Learn to design and implement effective scenario-based training for law enforcement.',
          heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '3': {
          title: 'Assessment and Evaluation Methods',
          type: 'text',
          content: `# Topic 3.3: Assessment and Evaluation Methods\n\n## Assessment Framework:\n\n### Formative Assessment:\n\n**During Training:**\n- Continuous feedback\n- Skill demonstrations\n- Knowledge checks\n- Performance observations\n\n**Methods:**\n- Instructor observations\n- Peer evaluations\n- Self-assessments\n- Practice exercises\n\n### Summative Assessment:\n\n**End of Training:**\n- Comprehensive evaluations\n- Final demonstrations\n- Written examinations\n- Practical tests\n\n**Certification Requirements:**\n- Minimum passing scores\n- Skill competency levels\n- Legal compliance verification\n- Performance standards\n\n### Assessment Types:\n\n**Knowledge Assessment:**\n- Written examinations\n- Oral questioning\n- Case study analysis\n- Legal knowledge tests\n\n**Skill Assessment:**\n- Practical demonstrations\n- Scenario performance\n- Equipment operation\n- Physical fitness tests\n\n**Attitude Assessment:**\n- Ethical decision-making\n- Professional conduct\n- Community relations\n- Leadership qualities\n\n### Evaluation Methods:\n\n**Objective Measures:**\n- Standardized tests\n- Performance metrics\n- Completion rates\n- Compliance scores\n\n**Subjective Measures:**\n- Instructor evaluations\n- Peer assessments\n- Self-reports\n- Community feedback\n\n### Technology-Enhanced Assessment:\n\n**Digital Platforms:**\n- Online testing systems\n- Performance tracking\n- Data analytics\n- Progress monitoring\n\n**Simulation Technology:**\n- Virtual reality assessments\n- Computer-based scenarios\n- Interactive simulations\n- Real-time feedback\n\n### Continuous Improvement:\n\n**Data Collection:**\n- Performance tracking\n- Feedback analysis\n- Outcome measurement\n- Trend identification\n\n**Program Refinement:**\n- Content updates\n- Method improvements\n- Resource optimization\n- Innovation integration\n\n### Reporting and Documentation:\n\n**Individual Records:**\n- Training completion\n- Performance scores\n- Skill certifications\n- Development plans\n\n**Program Evaluation:**\n- Overall effectiveness\n- Resource utilization\n- Stakeholder satisfaction\n- Continuous improvement\n\n### Quality Assurance:\n\n**Standards Compliance:**\n- POST requirements\n- DOJ standards\n- Department policies\n- Legal mandates\n\n**Best Practices:**\n- Industry standards\n- Research-based methods\n- Peer comparisons\n- Innovation adoption`,
          duration: '45 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/assets/Us-department-of-justice.pdf',
          description: 'Master comprehensive assessment and evaluation methods for law enforcement training programs.',
          heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        }
      }
    };

    const lessonsForModule = moduleMap[moduleId] || moduleMap['1'];
    const selected = lessonsForModule[lessonId] || lessonsForModule['1'];
    setLesson(prev => ({ ...prev, ...selected, id: lessonId }));
    setEditForm(prev => ({ ...prev, ...selected }));
  }, [moduleId, lessonId]);

  const scrollTo = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const extractTextHeadings = () => {
    if (!lesson.content) return [];
    const lines = lesson.content.split('\n');
    const headings = [];
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      const isColonHeading = trimmed.endsWith(':') && !trimmed.startsWith('-');
      const isMdHeading = /^#{1,3}\s+/.test(trimmed);
      if (isColonHeading || isMdHeading) {
        const text = isMdHeading ? trimmed.replace(/^#{1,3}\s+/, '') : trimmed.replace(/:$/, '');
        headings.push({ id: `h-${idx}`, text });
      }
    });
    return headings;
  };

  const renderTextContent = () => {
    if (!lesson.content) return null;
    const lines = lesson.content.split('\n');
    return (
      <div className="space-y-3">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />;
          const isColonHeading = trimmed.endsWith(':') && !trimmed.startsWith('-');
          const isMdHeading = /^#{1,3}\s+/.test(trimmed);
          if (isColonHeading || isMdHeading) {
            const text = isMdHeading ? trimmed.replace(/^#{1,3}\s+/, '') : trimmed.replace(/:$/, '');
            return (
              <h4 key={idx} id={`h-${idx}`} className="text-lg font-semibold mt-6">
                {text}
              </h4>
            );
          }
          return (
            <p key={idx} className="text-slate-700 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSave = () => {
    setLesson(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
    toast({
      title: "Lesson Updated",
      description: "Lesson content has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm({
      title: lesson.title,
      type: lesson.type,
      content: lesson.content,
      duration: lesson.duration,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      audioUrl: lesson.audioUrl,
      pdfUrl: lesson.pdfUrl
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      toast({
        title: "Lesson Deleted",
        description: "Lesson has been deleted successfully.",
      });
      navigate(`/courses/modules/${moduleId}/units`);
    }
  };

  const renderContent = () => {
      return (
      <div className="space-y-10">
        {lesson.content && (
          <section id="section-text" aria-label="Text">
            <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Text Content</h3>
              <Button onClick={() => setShowImmersiveReader(true)} variant="outline" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Immersive Reader
            </Button>
          </div>
          <div className="prose prose-slate max-w-none">
            {isEditing ? (
                <Textarea value={editForm.content} onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))} className="min-h-[300px] w-full" />
              ) : (
                renderTextContent()
            )}
          </div>
          </section>
        )}

        {lesson.videoUrl && (
          <section id="section-video" aria-label="Video">
          <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              <video controls className="w-full h-full" poster="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&auto=format">
                <source src={lesson.videoUrl} type="video/mp4" />
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
                </div>
          </section>
        )}

        {lesson.audioUrl && (
          <section id="section-audio" aria-label="Audio">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full">
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">Audio Lesson</h4>
                  <p className="text-sm text-slate-600">Duration: {lesson.duration}</p>
                </div>
                  <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-blue-600 hover:bg-blue-700">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={lesson.audioUrl} type="audio/mpeg" />
                  </audio>
              </div>
            </CardContent>
          </Card>
          </section>
        )}

        {lesson.pdfUrl && (
          <section id="section-pdf" aria-label="PDF">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">PDF Document</h3>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={lesson.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Open
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href={lesson.pdfUrl} download className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> Download
                  </a>
              </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border">
              <iframe src={lesson.pdfUrl} title="PDF Viewer" className="w-full h-[70vh] bg-white" />
          </div>
            {lesson.gallery && lesson.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {lesson.gallery.map((src, idx) => (
                  <img key={idx} src={src} alt={`lesson-${idx}`} className="rounded-lg w-full h-40 object-cover" />
                ))}
            </div>
            )}
          </section>
          )}
        </div>
      );
  };

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'pdf': return <FileType2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      case 'pdf': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto p-6 lg:p-8 animate-fade-in max-w-screen-2xl">
      {/* Hero header with background image */}
      <div
        className="relative mb-6 overflow-hidden rounded-2xl h-44 md:h-56"
        style={{ backgroundImage: `url(${lesson.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-end p-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">{lesson.title}</h2>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            {isEditing ? (
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
              />
            ) : (
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
            )}
            <div className="flex items-center gap-2 mt-2">
              {isEditing ? (
                <Select value={editForm.type} onValueChange={(value) => setEditForm(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getTypeColor()}>
                  {getTypeIcon()}
                  <span className="ml-1 capitalize">{lesson.type}</span>
                </Badge>
              )}
              {isEditing ? (
                <Input
                  value={editForm.duration}
                  onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-32"
                  placeholder="Duration"
                />
              ) : (
                <Badge variant="outline">
                  {lesson.duration}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <Card className="shadow-xl border-0 rounded-2xl">
          <CardContent className="p-6 lg:p-8">
            {renderContent()}
          </CardContent>
        </Card>

        <div className="lg:sticky lg:top-6 lg:h-fit lg:overflow-visible lg:z-10">
          {(lesson.content || lesson.videoUrl || lesson.audioUrl || lesson.pdfUrl) && (
            <Card className="border-0 shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Quick links</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                {lesson.content && (
                  <button onClick={() => scrollTo('section-text')} className="block text-left w-full hover:text-blue-600">Text</button>
                )}
                {lesson.videoUrl && (
                  <button onClick={() => scrollTo('section-video')} className="block text-left w-full hover:text-blue-600">Video</button>
                )}
                {lesson.audioUrl && (
                  <button onClick={() => scrollTo('section-audio')} className="block text-left w-full hover:text-blue-600">Audio</button>
                )}
                {lesson.pdfUrl && (
                  <button onClick={() => scrollTo('section-pdf')} className="block text-left w-full hover:text-blue-600">PDF</button>
                )}
              </CardContent>
            </Card>
          )}

          {lesson.content && (
            <Card className="border-0 shadow-md rounded-2xl mt-4">
              <CardHeader>
                <CardTitle className="text-base">On this page</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                {extractTextHeadings().map((h) => (
                  <button key={h.id} onClick={() => scrollTo(h.id)} className="block text-left w-full hover:text-blue-600">{h.text}</button>
                ))}
                <div className="pt-3">
                  <Button onClick={() => setShowImmersiveReader(true)} variant="outline" className="w-full flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Immersive Reader
              </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.pdfUrl && (
            <Card className="border-0 shadow-md rounded-2xl mt-4">
              <CardHeader>
                <CardTitle className="text-base">Document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600">Use the controls to open or download.</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={lesson.pdfUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> Open</a>
                  </Button>
                  <Button asChild className="flex-1">
                    <a href={lesson.pdfUrl} download><FileDown className="h-4 w-4 mr-2" /> Download</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ImmersiveReader
        content={lesson.content}
        isOpen={showImmersiveReader}
        onClose={() => setShowImmersiveReader(false)}
        title={lesson.title}
      />
      </div>
    </div>
  );
};

export default LessonContent;