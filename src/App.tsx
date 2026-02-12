import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import {
  Award,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Menu,
  Phone,
  TrendingUp,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'features', label: 'Features' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'why-mybridge', label: 'Why MyBridge' },
  { id: 'modules', label: 'Modules' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'success-stories', label: 'Success Stories' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'contact', label: 'Contact Us' },
]

const modules = [
  {
    id: 'payroll-statutory',
    title: 'Payroll & Statutory Compliance',
    icon: '💰',
    description: 'Automated salary processing with full compliance',
    features: [
      'Automated salary calculations with customizable pay structures',
      'Tax deductions (TDS, PF, ESI) with latest tax slabs',
      'Statutory compliance reports (Form 16, 24Q, PF, ESI)',
      'Automated payslip generation and distribution',
      'Direct bank integration for salary disbursement',
      'Multi-currency and multi-location support',
    ],
    detailedFeatures: [
      { title: 'Flexible Pay Structure', description: 'Create unlimited salary components - Basic, HRA, Allowances, Bonuses, Deductions', icon: '🏗️' },
      { title: 'Automated Tax Calculations', description: 'Real-time computation of Income Tax, Professional Tax, PF, ESI with latest rules', icon: '🧮' },
      { title: 'Statutory Reports', description: 'One-click generation of Form 16, 24Q, PF ECR, ESI returns, and bonus calculations', icon: '📋' },
      { title: 'Payslip Distribution', description: 'Automated email delivery of payslips with password protection', icon: '📧' },
      { title: 'Bank Integration', description: 'Generate NEFT/RTGS files for direct salary credit to employee accounts', icon: '🏦' },
      { title: 'Arrears & Bonus', description: 'Handle salary arrears, annual bonus, incentives, and one-time payments', icon: '💸' },
    ],
    benefits: ['95% faster payroll processing', 'Zero calculation errors', '100% statutory compliance', 'Real-time audit trails'],
    useCases: [
      'Manufacturing units with complex shift allowances',
      'Multi-location companies with different state compliances',
      'Service companies with variable pay structures',
    ],
  },
  {
    id: 'attendance-leave',
    title: 'Attendance & Leave Management',
    icon: '📅',
    description: 'Smart attendance tracking with leave automation',
    features: [
      'Biometric device integration (All major brands)',
      'Geo-fencing & GPS-based attendance',
      'Flexible shift management and roster planning',
      'Multi-level leave request workflows',
      'Holiday calendar with location-based holidays',
      'Real-time attendance dashboards and alerts',
    ],
    detailedFeatures: [
      { title: 'Biometric Integration', description: 'Seamless integration with fingerprint, face recognition, and RFID devices', icon: '👆' },
      { title: 'Mobile Attendance', description: 'Geo-fenced mobile punch-in/out with selfie capture and location tracking', icon: '📱' },
      { title: 'Shift Roster', description: 'Create rotating shifts, night shifts, split shifts with automatic overtime calculation', icon: '🔄' },
      { title: 'Leave Policies', description: 'Configure unlimited leave types - Casual, Sick, Earned, Comp-off, Maternity, LOP', icon: '📝' },
      { title: 'Approval Workflow', description: 'Multi-level approval chains with email/SMS notifications', icon: '✔️' },
      { title: 'Attendance Reports', description: 'Daily/monthly attendance reports, late-coming, early-going, absenteeism analytics', icon: '📊' },
    ],
    benefits: ['Eliminate buddy punching', '99% attendance accuracy', '70% reduction in leave queries', 'Real-time workforce visibility'],
    useCases: ['Manufacturing with 24x7 shift operations', 'Field sales teams with remote check-ins', 'Healthcare with complex shift rotations'],
  },
  {
    id: 'performance',
    title: 'Performance Management',
    icon: '🎯',
    description: 'Goal setting and continuous performance tracking',
    features: [
      'KPI & OKR framework with goal cascading',
      '360-degree feedback from peers and managers',
      'Quarterly and annual performance reviews',
      'Goal tracking with real-time progress updates',
      'One-on-one meeting notes and action items',
      'Performance analytics and ratings distribution',
    ],
    detailedFeatures: [
      { title: 'Goal Management', description: 'Set SMART goals, link to company objectives, track progress with milestones', icon: '🎯' },
      { title: '360° Feedback', description: 'Collect feedback from managers, peers, direct reports, and self-assessment', icon: '🔄' },
      { title: 'Performance Reviews', description: 'Structured appraisal cycles with rating scales, competency matrix, and normalization', icon: '⭐' },
      { title: 'Continuous Feedback', description: 'Real-time praise, constructive feedback, and coaching throughout the year', icon: '💬' },
      { title: '1-on-1 Meetings', description: 'Schedule check-ins, document discussions, track action items and follow-ups', icon: '👥' },
      { title: 'Analytics Dashboard', description: 'Performance trends, rating distribution, high/low performers, flight risk analysis', icon: '📈' },
    ],
    benefits: ['Align individual goals with company objectives', 'Identify top performers and development areas', 'Reduce turnover with continuous engagement', 'Data-driven promotion decisions'],
    useCases: ['IT companies with project-based performance', 'Sales teams with target-driven KPIs', 'Service organizations with competency frameworks'],
  },
  {
    id: 'recruitment',
    title: 'Recruitment & Onboarding',
    icon: '👥',
    description: 'End-to-end hiring process automation',
    features: [
      'Multi-channel job posting (Portal, LinkedIn, Naukri)',
      'Applicant tracking with resume parsing',
      'Interview scheduling with calendar integration',
      'Offer letter generation and e-signature',
      'Digital onboarding with document collection',
      'New hire buddy assignment and training tracking',
    ],
    detailedFeatures: [
      { title: 'Job Posting', description: 'Create JDs, post to multiple job boards, track source effectiveness', icon: '📢' },
      { title: 'Resume Screening', description: 'AI-powered resume parsing, candidate scoring, skill matching', icon: '🔍' },
      { title: 'Interview Management', description: 'Schedule interviews, share feedback forms, conduct virtual interviews', icon: '🎤' },
      { title: 'Offer Management', description: 'Generate offer letters, track acceptance, manage salary negotiations', icon: '📄' },
      { title: 'Digital Onboarding', description: 'Pre-joining portal, document upload, background verification tracking', icon: '🚀' },
      { title: 'Training & Buddy', description: 'Assign mentors, create onboarding checklist, track training completion', icon: '🎓' },
    ],
    benefits: ['60% faster time-to-hire', 'Better candidate experience', '50% reduction in onboarding time', 'Improved new hire retention'],
    useCases: ['High-volume hiring for retail and BPO', 'Campus recruitment for IT companies', 'Executive hiring with multi-round interviews'],
  },
  {
    id: 'employee-self-service',
    title: 'Employee Self Service',
    icon: '📱',
    description: 'Empower employees with self-service portal',
    features: [
      'Personal information and documents management',
      'Leave application and balance tracking',
      'Attendance records and regularization requests',
      'Payslip downloads and tax declarations',
      'Reimbursement claims submission',
      'Mobile app for on-the-go access',
    ],
    detailedFeatures: [
      { title: 'Employee Profile', description: 'Update contact details, emergency contacts, bank account, address proof', icon: '👤' },
      { title: 'Leave Management', description: 'Apply leaves, check balance, view leave history, calendar view', icon: '🏖️' },
      { title: 'Attendance Portal', description: 'View attendance, apply regularization, check in-out times, monthly summary', icon: '⏰' },
      { title: 'Payroll Access', description: 'Download payslips, Form 16, view salary breakup, investment declarations', icon: '💵' },
      { title: 'Claims & Expenses', description: 'Submit expense claims, upload bills, track reimbursement status', icon: '🧾' },
      { title: 'Mobile App', description: 'iOS & Android apps with push notifications and offline access', icon: '📲' },
    ],
    benefits: ['80% reduction in HR queries', 'Improved employee satisfaction', '24/7 access to HR services', 'Paperless HR operations'],
    useCases: ['Distributed workforce across locations', 'Field employees with limited office access', 'Remote and hybrid work models'],
  },
  {
    id: 'expense',
    title: 'Expense Management',
    icon: '💳',
    description: 'Streamlined expense tracking and reimbursement',
    features: [
      'Multiple expense categories and policies',
      'Mobile receipt capture with OCR',
      'Multi-level approval workflows',
      'Mileage calculation for travel expenses',
      'Integration with accounting systems',
      'Budget tracking and overspend alerts',
    ],
    detailedFeatures: [
      { title: 'Expense Policies', description: 'Define per-diem rates, travel class, hotel budgets, expense limits by role', icon: '📜' },
      { title: 'Receipt Management', description: 'Capture receipts via mobile, OCR extraction, automatic categorization', icon: '📸' },
      { title: 'Approval Workflow', description: 'Role-based approvals, amount thresholds, finance team verification', icon: '✅' },
      { title: 'Travel Expenses', description: 'Mileage calculator, advance requests, multi-city trip expenses', icon: '✈️' },
      { title: 'Reimbursement', description: 'Direct bank transfer, salary credit, or cheque payment', icon: '💰' },
      { title: 'Reports & Analytics', description: 'Expense trends, category-wise spending, budget utilization, GST reports', icon: '📊' },
    ],
    benefits: ['Faster reimbursement processing', '100% receipt compliance', 'Better budget control', 'Reduced expense fraud'],
    useCases: ['Sales teams with frequent travel', 'Project-based consulting firms', 'Organizations with client billable expenses'],
  },
]

const benefitsData = [
  { icon: '⚡', title: 'Save 80% Time', description: 'Automate repetitive HR tasks' },
  { icon: '✅', title: '100% Compliance', description: 'Stay updated with labor laws' },
  { icon: '📊', title: 'Real-time Insights', description: 'Data-driven HR decisions' },
  { icon: '🔒', title: 'Secure & Reliable', description: 'Bank-grade data security' },
  { icon: '☁️', title: 'Cloud-based', description: 'Access anywhere, anytime' },
  { icon: '🤝', title: 'Easy Integration', description: 'Connect with existing tools' },
]

const customers = [
  {
    name: 'JK Tyre',
    industry: 'Manufacturing',
    employees: '1200+',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/JK_Tyre_logo.svg/512px-JK_Tyre_logo.svg.png',
  },
  {
    name: 'Zydus Pharma',
    industry: 'Pharmaceuticals',
    employees: '2500+',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Zydus_Lifesciences_logo.svg/512px-Zydus_Lifesciences_logo.svg.png',
  },
  {
    name: 'ShopKirana',
    industry: 'Retail Tech',
    employees: '800+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Shopkirana_logo.svg/512px-Shopkirana_logo.svg.png',
  },
  {
    name: 'Vasu Chemicals',
    industry: 'Chemical Manufacturing',
    employees: '600+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Vasu_Chemicals_logo.svg/512px-Vasu_Chemicals_logo.svg.png',
  },
]

const otherCustomers = [
  { name: 'Apex Industries', industry: 'Textiles', employees: '900+' },
  { name: 'TechNova Solutions', industry: 'IT Services', employees: '1500+' },
  { name: 'MedCare Hospitals', industry: 'Healthcare', employees: '2000+' },
  { name: 'LogisticsPro', industry: 'Logistics', employees: '1100+' },
]

const caseStudies = [
  {
    company: 'JK Tyre',
    industry: 'Manufacturing',
    employees: '1200+',
    challenge: 'Manual payroll processing taking 10 days/month across multiple manufacturing units',
    solution: 'Implemented MyBridge automated payroll with multi-location support',
    result: '90% reduction in processing time, zero errors, seamless compliance',
  },
  {
    company: 'Zydus Pharma',
    industry: 'Pharmaceuticals',
    employees: '2500+',
    challenge: 'Complex shift management and attendance tracking for R&D and manufacturing teams',
    solution: 'Deployed biometric + geo-fencing solution with shift roster automation',
    result: 'Real-time visibility, 95% attendance accuracy, improved productivity',
  },
  {
    company: 'ShopKirana',
    industry: 'Retail Tech',
    employees: '800+',
    challenge: 'High employee turnover, slow onboarding, distributed workforce management',
    solution: 'Digital onboarding with self-service portal and mobile app access',
    result: '50% faster onboarding, 30% improved retention, better employee satisfaction',
  },
  {
    company: 'Vasu Chemicals',
    industry: 'Chemical Manufacturing',
    employees: '600+',
    challenge: 'Statutory compliance complexity and multiple location payroll management',
    solution: 'Comprehensive HRMS with automated compliance and centralized payroll',
    result: '100% compliance achieved, 80% time saved in HR operations',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'HR Director',
    company: 'TechCorp India',
    quote: 'MyBridge transformed our HR operations. Payroll that took 10 days now takes 2 hours!',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Operations Head',
    company: 'Manufacturing Co',
    quote: 'The attendance tracking with geo-fencing is a game-changer for our multi-site operations.',
  },
  {
    name: 'Anita Desai',
    role: 'CEO',
    company: 'Retail Chain',
    quote: 'Employee engagement improved significantly with the self-service portal. Highly recommend!',
  },
]

const integrations = [
  { name: 'Zoho', logo: 'https://www.zoho.com/branding/images/zoho-logo-512-color.png' },
  { name: 'SAP', logo: 'https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg' },
  { name: 'Microsoft 365', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png' },
  { name: 'Google Workspace', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Google_Workspace_Logo.svg/512px-Google_Workspace_Logo.svg.png' },
  { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png' },
  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png' },
  { name: 'QuickBooks', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Intuit_QuickBooks_logo.svg/512px-Intuit_QuickBooks_logo.svg.png' },
  { name: 'Tally', logo: 'https://tallysolutions.com/wp-content/themes/tally/img/tally-logo.svg' },
  { name: 'Microsoft Teams', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/512px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png' },
  { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png' },
]

const heroGradient = 'linear-gradient(135deg, #1F1C3E 0%, #6C2BD9 45%, #F97316 100%)'
const accentColor = '#F97316'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeModule, setActiveModule] = useState<(typeof modules)[number] | null>(null)
  const [currentPanel, setCurrentPanel] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const modal = useDisclosure()
  const toast = useToast()
  const navBg = useColorModeValue('white', '#0f0f1f')
  const cardBg = useColorModeValue('white', '#1B1B32')
  const borderColor = useColorModeValue('gray.100', '#2A2945')
  const textSubtle = useColorModeValue('gray.600', 'gray.300')

  const handleNav = (index: number) => {
    setCurrentPanel(index)
    setMobileMenuOpen(false)
  }

  const openModule = (module: (typeof modules)[number]) => {
    setActiveModule(module)
    modal.onOpen()
  }

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({
      title: 'Message sent',
      description: 'Our team will contact you shortly.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    ;(event.target as HTMLFormElement).reset()
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchFinish = () => {
    if (!touchStart || touchEnd === null) return
    const distance = touchStart - touchEnd
    const minSwipe = 50
    if (distance > minSwipe && currentPanel < sections.length - 1) {
      setCurrentPanel((prev) => prev + 1)
    }
    if (distance < -minSwipe && currentPanel > 0) {
      setCurrentPanel((prev) => prev - 1)
    }
  }

  const otherLogos = useMemo(() => otherCustomers, [])

  const panelContent = [
    {
      id: 'home',
      content: (
        <Flex direction="column" justify="center" minH="100vh" px={{ base: 6, md: 16 }} py={{ base: 24, md: 32 }} bgGradient={heroGradient} color="white">
          <Stack spacing={8} maxW="5xl" textAlign="center" mx="auto">
            <Tag size="lg" bg="whiteAlpha.200" w="fit-content" borderRadius="full" mx="auto">
              The Future of Workforce Management
            </Tag>
            <Heading fontSize={{ base: '4xl', md: '6xl' }} lineHeight="1.1">
              Transform Your <chakra.span color={accentColor}>HR Operations</chakra.span>
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} opacity={0.9} maxW="3xl" mx="auto">
              A complete HRMS solution designed to automate payroll, attendance, and performance so you can focus on your people.
            </Text>
            <Flex gap={4} wrap="wrap" justify="center">
              <Button size="lg" colorScheme="orange" bg="white" color="#0052CC" _hover={{ bg: 'whiteAlpha.900' }} onClick={() => handleNav(sections.findIndex((s) => s.id === 'contact'))}>
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" color="white" borderColor="whiteAlpha.600" onClick={() => handleNav(sections.findIndex((s) => s.id === 'modules'))}>
                Explore Modules
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {[{ label: 'Active Users', value: '10K+' }, { label: 'Companies', value: '500+' }, { label: 'Uptime', value: '99.9%' }, { label: 'Support', value: '24/7' }].map((stat) => (
                <Box key={stat.label} borderRadius="2xl" bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.300" p={5}>
                  <Heading size="lg">{stat.value}</Heading>
                  <Text opacity={0.75}>{stat.label}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Flex>
      ),
    },
    {
      id: 'about',
      content: (
        <SectionContainer>
          <Stack spacing={10} maxW="6xl">
            <Heading textAlign="center">About MyBridge</Heading>
            <Card cardBg={cardBg} borderColor={borderColor} p={8}>
              <Heading size="lg" mb={4}>
                Our Mission
              </Heading>
              <Text fontSize="lg" color={textSubtle}>
                We're on a mission to make HR operations simple, efficient, and delightful for every organization. MyBridge was born from the frustration of dealing with complex, outdated HR systems. We believe managing people should be easy, not bureaucratic.
              </Text>
            </Card>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {[
                { icon: <TrendingUp color={accentColor} />, title: 'Growing Fast', text: '500+ companies trust us' },
                { icon: <Award color={accentColor} />, title: 'Award Winning', text: 'Best HR Tech 2024' },
                { icon: <Users color={accentColor} />, title: 'Expert Team', text: '50+ HR professionals' },
              ].map((item) => (
                <Card key={item.title} cardBg={cardBg} borderColor={borderColor} textAlign="center">
                  <Box mb={4}>{item.icon}</Box>
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                  <Text color={textSubtle}>{item.text}</Text>
                </Card>
              ))}
            </SimpleGrid>
            <Card cardBg="linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.15))" borderColor="transparent" p={8}>
              <Heading size="lg" mb={4}>
                Why We're Different
              </Heading>
              <Stack spacing={3} fontSize="lg" color={textSubtle}>
                {[
                  'Built specifically for the Indian market with local compliance',
                  'Simple pricing with no hidden costs',
                  'Dedicated customer success team',
                  'Regular product updates based on customer feedback',
                ].map((item) => (
                  <Flex key={item} align="center" gap={3}>
                    <CheckCircle2 color={accentColor} />
                    <Text>{item}</Text>
                  </Flex>
                ))}
              </Stack>
            </Card>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'features',
      content: (
        <SectionContainer>
          <Stack spacing={8} maxW="6xl">
            <Heading textAlign="center">Complete HR Suite</Heading>
            <Text textAlign="center" color={textSubtle}>
              Everything you need to manage your workforce in one secure platform.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {[
                { emoji: '🎯', title: 'Core HR Management', text: 'Employee database, org charts, document management, and employee lifecycle tracking.' },
                { emoji: '📊', title: 'Analytics & Reports', text: 'Real-time dashboards, custom reports, and predictive analytics for informed decision making.' },
                { emoji: '🔐', title: 'Security & Compliance', text: 'Role-based access, audit trails, GDPR compliance, and regular security audits.' },
                { emoji: '🧩', title: 'Seamless Integration', text: 'Connect with your existing tools via REST APIs, webhooks, and pre-built integrations.' },
              ].map((feature) => (
                <Card key={feature.title} cardBg={cardBg} borderColor={borderColor}>
                  <Text fontSize="3xl">{feature.emoji}</Text>
                  <Heading size="md" mt={3} mb={2}>
                    {feature.title}
                  </Heading>
                  <Text color={textSubtle}>{feature.text}</Text>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'benefits',
      content: (
        <SectionContainer>
          <Stack spacing={8} maxW="6xl">
            <Heading textAlign="center">Benefits</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {benefitsData.map((benefit) => (
                <Card key={benefit.title} cardBg={cardBg} borderColor={borderColor}>
                  <Text fontSize="3xl">{benefit.icon}</Text>
                  <Heading size="md" mt={3} mb={2}>
                    {benefit.title}
                  </Heading>
                  <Text color={textSubtle}>{benefit.description}</Text>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'why-mybridge',
      content: (
        <SectionContainer>
          <Stack spacing={8} maxW="6xl">
            <Heading textAlign="center">Why MyBridge</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box borderRadius="2xl" border="2px solid" borderColor="#FECDD3" bg="#FFF1F2" p={8}>
                <Heading size="md" color="#F43F5E" mb={4}>
                  ❌ Manual Process
                </Heading>
                <Stack color="#B91C1C" spacing={3} fontWeight="500">
                  {[
                    '10+ days for monthly payroll processing',
                    'High risk of calculation errors',
                    'Spreadsheet-based tracking',
                    'Compliance headaches and penalties',
                    'No real-time data access',
                    'Poor employee experience',
                  ].map((item) => (
                    <Text key={item}>• {item}</Text>
                  ))}
                </Stack>
              </Box>
              <Box borderRadius="2xl" border="2px solid" borderColor="#BBF7D0" bg="#ECFDF5" p={8}>
                <Heading size="md" color="#15803D" mb={4}>
                  ✅ With MyBridge
                </Heading>
                <Stack color="#166534" spacing={3} fontWeight="500">
                  {[
                    'Payroll processed in 2 hours',
                    '100% accurate automated calculations',
                    'Centralized cloud-based system',
                    'Automatic compliance updates',
                    'Real-time dashboards & analytics',
                    'Self-service portal for employees',
                  ].map((item) => (
                    <Text key={item}>• {item}</Text>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'modules',
      content: (
        <SectionContainer>
          <Stack spacing={8} maxW="7xl">
            <Heading textAlign="center">Modules (tap to view details)</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {modules.map((module) => (
                <Card key={module.id} cardBg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <Text fontSize="4xl">{module.icon}</Text>
                  <Heading size="md" mt={4} mb={3}>
                    {module.title}
                  </Heading>
                  <Text color={textSubtle} mb={6}>
                    {module.description}
                  </Text>
                  <Button colorScheme="purple" bgGradient="linear(to-r, #7C3AED, #F97316)" _hover={{ opacity: 0.9 }} onClick={() => openModule(module)}>
                    View Details
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'case-studies',
      content: (
        <SectionContainer>
          <Stack spacing={10} maxW="6xl">
            <Heading textAlign="center">Case Studies</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {caseStudies.map((study) => (
                <Card key={study.company} cardBg={cardBg} borderColor={borderColor}>
                  <Flex align="center" gap={4} mb={4}>
                    <Building2 color={accentColor} />
                    <Box>
                      <Heading size="md">{study.company}</Heading>
                      <Text color={textSubtle}>
                        {study.industry} • {study.employees}
                      </Text>
                    </Box>
                  </Flex>
                  <Stack spacing={3}>
                    <Text>
                      <chakra.span fontWeight="bold">Challenge:</chakra.span> {study.challenge}
                    </Text>
                    <Text>
                      <chakra.span fontWeight="bold">Solution:</chakra.span> {study.solution}
                    </Text>
                    <Box bg="#DCFCE7" border="1px solid" borderColor="#86EFAC" borderRadius="lg" p={4}>
                      <chakra.span fontWeight="bold" color="#047857">
                        Result:
                      </chakra.span>{' '}
                      {study.result}
                    </Box>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'success-stories',
      content: (
        <SectionContainer>
          <Stack spacing={10} maxW="6xl">
            <Heading textAlign="center">Success Stories</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} cardBg={cardBg} borderColor={borderColor}>
                  <Text fontSize="4xl" color="#FDE047" mb={3}>
                    “
                  </Text>
                  <Text color={textSubtle} mb={6}>
                    {testimonial.quote}
                  </Text>
                  <Divider mb={3} />
                  <Stack spacing={1}>
                    <Heading size="sm">{testimonial.name}</Heading>
                    <Text color={textSubtle} fontSize="sm">
                      {testimonial.role}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      {testimonial.company}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'integrations',
      content: (
        <SectionContainer>
          <Stack spacing={10} maxW="7xl">
            <Heading textAlign="center">Integrations & Clients</Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {customers.map((customer) => (
                <Card key={customer.name} cardBg={cardBg} borderColor={borderColor} align="center" textAlign="center">
                  <Image src={customer.logo} alt={customer.name} h={12} objectFit="contain" fallbackSrc="https://via.placeholder.com/140x40?text=Logo" />
                  <Heading size="sm" mt={3}>
                    {customer.name}
                  </Heading>
                  <Text color={textSubtle} fontSize="sm">
                    {customer.industry}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {otherLogos.map((customer) => (
                <Card key={customer.name} cardBg={cardBg} borderColor={borderColor}>
                  <Heading size="sm">{customer.name}</Heading>
                  <Text color={textSubtle} fontSize="sm">
                    {customer.industry}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {customer.employees} employees
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
              {integrations.map((integration) => (
                <Flex key={integration.name} borderRadius="xl" border="1px solid" borderColor={borderColor} bg={cardBg} h={28} align="center" justify="center" p={4}>
                  <Image src={integration.logo} alt={integration.name} h={10} objectFit="contain" fallbackSrc="https://via.placeholder.com/120x40?text=Logo" />
                </Flex>
              ))}
            </SimpleGrid>
            <Box textAlign="center">
              <Button variant="outline" colorScheme="purple" onClick={() => handleNav(sections.findIndex((s) => s.id === 'contact'))}>
                Need custom integration? Talk to us
              </Button>
            </Box>
          </Stack>
        </SectionContainer>
      ),
    },
    {
      id: 'contact',
      content: (
        <SectionContainer>
          <Stack spacing={10} maxW="6xl">
            <Heading textAlign="center">Contact Us</Heading>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
              <Card cardBg={cardBg} borderColor={borderColor}>
                <Heading size="md" mb={6}>
                  Send us a message
                </Heading>
                <chakra.form onSubmit={submitContact}>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input placeholder="Your name" name="name" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input placeholder="you@company.com" type="email" name="email" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Company</FormLabel>
                      <Input placeholder="Your company name" name="company" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
                      <Textarea placeholder="Tell us about your requirements..." rows={4} name="message" />
                    </FormControl>
                    <Button type="submit" colorScheme="purple" bgGradient="linear(to-r, #7C3AED, #F97316)">
                      Send Message
                    </Button>
                  </Stack>
                </chakra.form>
              </Card>
              <Stack spacing={4}>
                {[
                  { icon: <Mail color={accentColor} />, title: 'Email', lines: ['contact@mybridge.com', 'support@mybridge.com'] },
                  { icon: <Phone color={accentColor} />, title: 'Phone', lines: ['+91 1800-123-4567 (Toll Free)', 'Mon–Fri: 9 AM – 6 PM IST'] },
                  { icon: <MapPin color={accentColor} />, title: 'Office', lines: ['123 Tech Park, Bangalore', 'Karnataka 560001, India'] },
                ].map((info) => (
                  <Flex key={info.title} borderRadius="2xl" border="1px solid" borderColor={borderColor} bg={cardBg} p={6} gap={4}>
                    <Box>{info.icon}</Box>
                    <Stack spacing={1}>
                      <Heading size="sm">{info.title}</Heading>
                      {info.lines.map((line) => (
                        <Text key={line} color={textSubtle}>
                          {line}
                        </Text>
                      ))}
                    </Stack>
                  </Flex>
                ))}
                <Card cardBg="#FEF3C7" borderColor="#FCD34D">
                  <Heading size="sm" mb={2}>
                    Schedule a Demo
                  </Heading>
                  <Text color="#92400E" mb={4}>
                    See MyBridge in action with a personalized walkthrough.
                  </Text>
                  <Button colorScheme="orange" onClick={() => handleNav(sections.findIndex((s) => s.id === 'contact'))}>
                    Book Demo Call
                  </Button>
                </Card>
              </Stack>
            </Grid>
          </Stack>
        </SectionContainer>
      ),
    },
  ]

  return (
    <Box minH="100vh" bg={useColorModeValue('#F4F4FB', '#090914')} color={useColorModeValue('gray.900', 'white')}>
      {/* Header */}
      <Box position="fixed" top={0} left={0} right={0} zIndex={10} bg={navBg} borderBottom="1px solid" borderColor={borderColor}>
        <Flex maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} h={16} align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Box boxSize={10} borderRadius="lg" bgGradient={heroGradient} />
            <Text fontWeight="bold" fontSize="xl">
              MyBridge
            </Text>
          </Flex>
          <Flex gap={4} display={{ base: 'none', xl: 'flex' }}>
            {sections.map((section, index) => (
              <Button key={section.id} variant="ghost" fontWeight={currentPanel === index ? '700' : '500'} colorScheme={currentPanel === index ? 'orange' : undefined} onClick={() => handleNav(index)}>
                {section.label}
              </Button>
            ))}
          </Flex>
          <IconButton aria-label="Toggle menu" icon={mobileMenuOpen ? <X size={18} /> : <Menu size={18} />} display={{ base: 'inline-flex', xl: 'none' }} variant="ghost" onClick={() => setMobileMenuOpen((prev) => !prev)} />
        </Flex>
        {mobileMenuOpen && (
          <Stack px={4} py={4} borderTop="1px solid" borderColor={borderColor} bg={navBg}>
            {sections.map((section, index) => (
              <Button key={section.id} justifyContent="flex-start" variant="ghost" fontWeight={currentPanel === index ? '700' : '500'} onClick={() => handleNav(index)}>
                {section.label}
              </Button>
            ))}
          </Stack>
        )}
      </Box>

      {/* Controls */}
      <IconButton aria-label="Previous panel" icon={<ChevronLeft />} position="fixed" zIndex={5} top="50%" left={4} transform="translateY(-50%)" onClick={() => setCurrentPanel((prev) => Math.max(0, prev - 1))} isDisabled={currentPanel === 0} variant="outline" rounded="full" bg={navBg} display={{ base: 'none', md: 'inline-flex' }} />
      <IconButton aria-label="Next panel" icon={<ChevronRight />} position="fixed" zIndex={5} top="50%" right={4} transform="translateY(-50%)" onClick={() => setCurrentPanel((prev) => Math.min(sections.length - 1, prev + 1))} isDisabled={currentPanel === sections.length - 1} variant="outline" rounded="full" bg={navBg} display={{ base: 'none', md: 'inline-flex' }} />

      {/* Panel indicators */}
      <Flex position="fixed" bottom={4} left="50%" transform="translateX(-50%)" zIndex={5} gap={2}>
        {sections.map((_, index) => (
          <Box key={index} w={currentPanel === index ? 32 : 16} h={2} borderRadius="full" bg={currentPanel === index ? accentColor : useColorModeValue('gray.300', '#2F2D4A')} transition="all 0.3s" onClick={() => handleNav(index)} cursor="pointer" />
        ))}
      </Flex>

      {/* Panels */}
      <Box pt={20} overflow="hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchFinish}>
        <Flex ref={containerRef} width={`${panelContent.length * 100}vw`} transform={`translateX(-${currentPanel * 100}vw)`} transition="transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)">
          {panelContent.map((panel) => (
            <Box key={panel.id} flex="0 0 100vw" minH="100vh">
              {panel.content}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Module Modal */}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="5xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" bg={cardBg} border="1px solid" borderColor={borderColor}>
          <ModalHeader>
            {activeModule && (
              <Stack spacing={2} textAlign="center">
                <Text fontSize="4xl">{activeModule.icon}</Text>
                <Heading size="lg">{activeModule.title}</Heading>
                <Text color={textSubtle}>{activeModule.description}</Text>
              </Stack>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {activeModule && (
              <Stack spacing={8}>
                <Box>
                  <Heading size="md" textAlign="center" mb={4}>
                    Comprehensive Features
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {activeModule.detailedFeatures.map((feature) => (
                      <Card key={feature.title} cardBg={useColorModeValue('white', '#222242')} borderColor={borderColor} textAlign="center">
                        <Text fontSize="3xl">{feature.icon}</Text>
                        <Heading size="sm" mt={2} mb={1}>
                          {feature.title}
                        </Heading>
                        <Text fontSize="sm" color={textSubtle}>
                          {feature.description}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </Box>
                <Box bg={useColorModeValue('#EEF2FF', '#1C1F3A')} borderRadius="xl" p={6}>
                  <Heading size="md" mb={4}>
                    Complete Feature Set
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {activeModule.features.map((feature) => (
                      <Flex key={feature} align="center" gap={3} bg={useColorModeValue('white', '#2A2F54')} borderRadius="md" border="1px solid" borderColor={useColorModeValue('#C7D2FE', '#3F3C73')} p={3}>
                        <CheckCircle2 color={accentColor} size={18} />
                        <Text>{feature}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <Card cardBg="#ECFDF5" borderColor="#86EFAC">
                    <Heading size="sm" mb={3}>
                      Key Benefits
                    </Heading>
                    <List spacing={2} color="#15803D">
                      {activeModule.benefits.map((benefit) => (
                        <ListItem key={benefit}>
                          <ListIcon as={CheckCircle2} color="#10B981" />
                          {benefit}
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                  <Card cardBg="#F5F3FF" borderColor="#DDD6FE">
                    <Heading size="sm" mb={3}>
                      Ideal For
                    </Heading>
                    <List spacing={2} color="#5B21B6">
                      {activeModule.useCases.map((useCase) => (
                        <ListItem key={useCase}>• {useCase}</ListItem>
                      ))}
                    </List>
                  </Card>
                  <Card cardBg="#EFF6FF" borderColor="#BFDBFE">
                    <Heading size="sm" mb={3}>
                      Ready to Deploy
                    </Heading>
                    <Text color="#1E3A8A" mb={4}>
                      Implement this module and transform HR in weeks, not months.
                    </Text>
                    <Stack>
                      <Button colorScheme="purple" onClick={() => handleNav(sections.findIndex((s) => s.id === 'contact'))}>
                        Request Demo
                      </Button>
                      <Button variant="outline" onClick={() => handleNav(sections.findIndex((s) => s.id === 'case-studies'))}>
                        View Case Studies
                      </Button>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={modal.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh" px={{ base: 6, md: 16 }} py={{ base: 20, md: 24 }} justify="center" align="center">
      {children}
    </Flex>
  )
}

function Card({ cardBg, borderColor, children, ...rest }: { cardBg: string; borderColor: string; children: React.ReactNode } & Record<string, any>) {
  return (
    <Box bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={6} {...rest}>
      {children}
    </Box>
  )
}
