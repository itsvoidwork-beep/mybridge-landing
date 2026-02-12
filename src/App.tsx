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
      { title: 'Flexible Pay Structure', description: 'Create unlimited salary components', icon: '🏗️' },
      { title: 'Automated Tax Calculations', description: 'Always-on compliance with the latest slabs', icon: '🧮' },
      { title: 'Statutory Reports', description: 'Form 16, 24Q, PF ECR, ESI returns in one click', icon: '📋' },
      { title: 'Payslip Distribution', description: 'Secure email or ESS delivery with passwords', icon: '📧' },
      { title: 'Bank Integration', description: 'Generate NEFT/RTGS files for every bank', icon: '🏦' },
      { title: 'Arrears & Bonus', description: 'Handle arrears, incentives, and bonus effortlessly', icon: '💸' },
    ],
    benefits: ['95% faster payroll processing', 'Zero calculation errors', '100% statutory compliance', 'Real-time audit trails'],
    useCases: [
      'Manufacturing units with complex shift allowances',
      'Multi-location enterprises with state-specific compliance',
      'Service companies with variable pay structures',
    ],
  },
  {
    id: 'attendance-leave',
    title: 'Attendance & Leave Management',
    icon: '📅',
    description: 'Smart attendance tracking with leave automation',
    features: [
      'Biometric device integration (all leading brands)',
      'Geo-fencing & GPS-based attendance',
      'Flexible shift management and roster planning',
      'Multi-level leave request workflows',
      'Holiday calendar with location-based holidays',
      'Real-time attendance dashboards and alerts',
    ],
    detailedFeatures: [
      { title: 'Biometric Integration', description: 'Fingerprint, face recognition, RFID devices', icon: '👆' },
      { title: 'Mobile Attendance', description: 'Geo-fenced mobile punch with selfie capture', icon: '📱' },
      { title: 'Shift Rosters', description: 'Rotating, night, split shifts with overtime rules', icon: '🔄' },
      { title: 'Leave Policies', description: 'Unlimited leave types & custom accruals', icon: '📝' },
      { title: 'Approval Workflow', description: 'Multi-level approvals with alerts', icon: '✔️' },
      { title: 'Analytics', description: 'Late, early, absenteeism analytics', icon: '📊' },
    ],
    benefits: ['Eliminate buddy punching', '99% attendance accuracy', '70% reduction in leave queries', 'Real-time visibility'],
    useCases: ['Manufacturing with 24x7 shifts', 'Field sales teams', 'Hospitals with complex rosters'],
  },
  {
    id: 'performance',
    title: 'Performance Management',
    icon: '🎯',
    description: 'Goal setting and continuous performance tracking',
    features: [
      'KPI & OKR framework with goal cascading',
      '360° feedback from peers and managers',
      'Quarterly and annual performance reviews',
      'Goal tracking with real-time progress updates',
      'One-on-one meeting notes and action items',
      'Performance analytics and ratings distribution',
    ],
    detailedFeatures: [
      { title: 'Goal Management', description: 'Set SMART goals linked to company priorities', icon: '🎯' },
      { title: '360° Feedback', description: 'Peers, managers, reports, and self-feedback', icon: '🔄' },
      { title: 'Performance Reviews', description: 'Structured cycles with normalization', icon: '⭐' },
      { title: 'Continuous Feedback', description: 'In-the-moment praise and coaching', icon: '💬' },
      { title: '1:1 Meetings', description: 'Agenda templates and action tracking', icon: '👥' },
      { title: 'Analytics Dashboard', description: 'Rating distribution, top performers, risks', icon: '📈' },
    ],
    benefits: ['Align goals with strategy', 'Spot top performers early', 'Reduce turnover', 'Data-driven promotions'],
    useCases: ['IT services', 'Sales orgs', 'Service companies'],
  },
  {
    id: 'recruitment',
    title: 'Recruitment & Onboarding',
    icon: '👥',
    description: 'End-to-end hiring automation',
    features: [
      'Multi-channel job posting',
      'Applicant tracking with resume parsing',
      'Interview scheduling with calendar integration',
      'Offer letter generation and e-signature',
      'Digital onboarding with document collection',
      'New hire buddy assignment and training tracking',
    ],
    detailedFeatures: [
      { title: 'Job Posting', description: 'Broadcast to LinkedIn, Naukri, portals', icon: '📢' },
      { title: 'Resume Screening', description: 'AI parsing, scoring, talent pools', icon: '🔍' },
      { title: 'Interview Management', description: 'Slots, panels, structured feedback', icon: '🎤' },
      { title: 'Offer Management', description: 'Templates, e-sign, negotiation tracking', icon: '📄' },
      { title: 'Digital Onboarding', description: 'Pre-joining portal & document uploads', icon: '🚀' },
      { title: 'Training & Buddy', description: 'Checklist, mentor, training progress', icon: '🎓' },
    ],
    benefits: ['60% faster time-to-hire', 'Better candidate experience', '50% faster onboarding', 'Higher retention'],
    useCases: ['Retail/BPO volume hiring', 'Campus hiring', 'Leadership hiring'],
  },
  {
    id: 'employee-self-service',
    title: 'Employee Self Service',
    icon: '📱',
    description: 'Empower employees with a unified portal',
    features: [
      'Personal info & documents',
      'Leave application and balance tracking',
      'Attendance regularization',
      'Payslip downloads & tax declarations',
      'Reimbursement claims',
      'Mobile app access',
    ],
    detailedFeatures: [
      { title: 'Employee Profile', description: 'Self-manage addresses, bank, documents', icon: '👤' },
      { title: 'Leave Management', description: 'Apply, track balances, calendars', icon: '🏖️' },
      { title: 'Attendance Portal', description: 'Regularize punches, monthly trends', icon: '⏰' },
      { title: 'Payroll Access', description: 'Payslips, Form 16, investment proofs', icon: '💵' },
      { title: 'Claims & Expenses', description: 'Submit bills, track reimbursements', icon: '🧾' },
      { title: 'Mobile App', description: 'iOS & Android with push notifications', icon: '📲' },
    ],
    benefits: ['80% fewer HR queries', 'Higher satisfaction', '24/7 HR desk', 'Paperless workflows'],
    useCases: ['Distributed workforce', 'Field employees', 'Remote & hybrid orgs'],
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
      'Accounting integrations',
      'Budget tracking and overspend alerts',
    ],
    detailedFeatures: [
      { title: 'Policy Engine', description: 'Per-diem, class, hotel, and limit rules', icon: '📜' },
      { title: 'Receipt OCR', description: 'Scan receipts, auto-categorize spend', icon: '📸' },
      { title: 'Approvals', description: 'Role-based approvals & finance checks', icon: '✅' },
      { title: 'Travel', description: 'Mileage calculator & itinerary expenses', icon: '✈️' },
      { title: 'Reimbursement', description: 'Salary credit, bank transfer, or cheque', icon: '💰' },
      { title: 'Analytics', description: 'Category spend & GST-ready reports', icon: '📊' },
    ],
    benefits: ['Faster reimbursements', '100% receipt compliance', 'Budget discipline', 'Reduced expense fraud'],
    useCases: ['Travel-heavy teams', 'Consulting projects', 'Billable organizations'],
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
    challenge: 'Manual payroll processing taking 10 days/month across multiple plants',
    solution: 'MyBridge automated payroll with multi-location support',
    result: '90% reduction in processing time, zero errors, seamless compliance',
  },
  {
    company: 'Zydus Pharma',
    industry: 'Pharma',
    employees: '2500+',
    challenge: 'Complex shift management and attendance tracking for R&D + manufacturing',
    solution: 'Biometric + geo-fencing attendance with roster automation',
    result: '95% attendance accuracy and real-time visibility',
  },
  {
    company: 'ShopKirana',
    industry: 'Retail Tech',
    employees: '800+',
    challenge: 'High turnover, slow onboarding, distributed workforce',
    solution: 'Digital onboarding with self-service mobile access',
    result: '50% faster onboarding, 30% higher retention',
  },
  {
    company: 'Vasu Chemicals',
    industry: 'Chemical Manufacturing',
    employees: '600+',
    challenge: 'Statutory complexity & multi-location payroll',
    solution: 'Centralized HRMS with automated compliance alerts',
    result: '100% compliance and 80% time saved for HR',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'HR Director',
    company: 'TechCorp India',
    quote: 'MyBridge transformed payroll for us—what took 10 days now takes 2 hours.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Operations Head',
    company: 'Global Manufacturing Co.',
    quote: 'Geo-fencing based attendance is a game changer for our multi-site workforce.',
  },
  {
    name: 'Anita Desai',
    role: 'CEO',
    company: 'Retail Chain',
    quote: 'Employee engagement improved drastically with the mobile-first self-service portal.',
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
          <Stack spacing={8} maxW="5xl">
            <Tag size="lg" bg="whiteAlpha.200" w="fit-content" borderRadius="full">
              Intelligent Spend & HR Governance
            </Tag>
            <Heading fontSize={{ base: '4xl', md: '6xl' }} lineHeight="1.1">
              Run HR, Finance & Compliance in one <chakra.span color={accentColor}>unified workspace</chakra.span>
            </Heading>
            <Text fontSize="lg" opacity={0.9} maxW="3xl">
              The MyBridge council of automation keeps payroll precise, attendance transparent, budgets optimized, and employees delighted—all with audit-ready traceability.
            </Text>
            <Flex gap={4} wrap="wrap">
              <Button size="lg" colorScheme="orange" bg={accentColor} onClick={() => handleNav(sections.findIndex((s) => s.id === 'contact'))}>
                Book Demo
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
            <Text textAlign="center" color={textSubtle} maxW="4xl" mx="auto">
              Inspired by the visual language of MyVyay, MyBridge blends deep compliance expertise with a fluid experience for HR, Finance, and Business teams.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {[
                { icon: <TrendingUp color={accentColor} />, title: 'Growing Fast', text: '500+ companies onboarded' },
                { icon: <Award color={accentColor} />, title: 'Award Winning', text: 'Best HR Tech 2024' },
                { icon: <Users color={accentColor} />, title: 'Expert Team', text: '50+ HR specialists' },
              ].map((item) => (
                <Card key={item.title} cardBg={cardBg} borderColor={borderColor}>
                  <Box mb={4}>{item.icon}</Box>
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                  <Text color={textSubtle}>{item.text}</Text>
                </Card>
              ))}
            </SimpleGrid>
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
                { emoji: '🎯', title: 'Core HR Management', text: 'Employee database, org charts, lifecycle automation, document vault.' },
                { emoji: '📊', title: 'Analytics & Insights', text: 'Cross-module dashboards, anomaly alerts, predictive visuals.' },
                { emoji: '🔐', title: 'Security & Compliance', text: 'Role-based access, full audit log, policy templates, DLP controls.' },
                { emoji: '🧩', title: 'Integration Fabric', text: 'REST APIs, webhooks, connectors for ERP, payroll, collaboration tools.' },
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
                  {['10+ days for payroll', 'Error-prone spreadsheets', 'Opaque approvals', 'Penalty-prone compliance', 'No real-time view'].map((item) => (
                    <Text key={item}>• {item}</Text>
                  ))}
                </Stack>
              </Box>
              <Box borderRadius="2xl" border="2px solid" borderColor="#BBF7D0" bg="#ECFDF5" p={8}>
                <Heading size="md" color="#15803D" mb={4}>
                  ✅ With MyBridge
                </Heading>
                <Stack color="#166534" spacing={3} fontWeight="500">
                  {['Payroll in 2 hours', 'Auto compliance updates', 'Transparent approvals', 'Live dashboards', 'Self-service for teams'].map((item) => (
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
