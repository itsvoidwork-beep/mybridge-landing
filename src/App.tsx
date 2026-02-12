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
import { useMemo, useState } from 'react'
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
    benefits: ['Eliminate buddy punching', '99% attendance accuracy', '70% reduction in leave queries', 'Real-time workforce visibility'],
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
    benefits: ['Align goals with strategy', 'Spot top performers early', 'Reduce turnover with engagement', 'Data-driven promotions'],
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
      { title: 'Resume Screening', description: 'AI parsing, scoring, and talent pools', icon: '🔍' },
      { title: 'Interview Management', description: 'Slots, panels, and structured feedback', icon: '🎤' },
      { title: 'Offer Management', description: 'Templates, e-sign, negotiation tracking', icon: '📄' },
      { title: 'Digital Onboarding', description: 'Pre-joining portal & document uploads', icon: '🚀' },
      { title: 'Training & Buddy', description: 'Checklist, mentor, and training progress', icon: '🎓' },
    ],
    benefits: ['60% faster time-to-hire', 'Better candidate experience', '50% faster onboarding', 'Higher new-hire retention'],
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
      'Mobile app for access anywhere',
    ],
    detailedFeatures: [
      { title: 'Employee Profile', description: 'Self-manage addresses, bank, documents', icon: '👤' },
      { title: 'Leave Management', description: 'Apply, track balances, view calendars', icon: '🏖️' },
      { title: 'Attendance Portal', description: 'Regularize punches, see monthly trends', icon: '⏰' },
      { title: 'Payroll Access', description: 'Payslips, Form 16, investment proofs', icon: '💵' },
      { title: 'Claims & Expenses', description: 'Submit bills, track reimbursement status', icon: '🧾' },
      { title: 'Mobile App', description: 'iOS & Android with push notifications', icon: '📲' },
    ],
    benefits: ['80% fewer HR queries', 'Higher employee satisfaction', '24/7 HR desk', 'Paperless workflows'],
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

const benefits = [
  { icon: '⚡', title: 'Save 80% Time', description: 'Automate repetitive HR tasks' },
  { icon: '✅', title: '100% Compliance', description: 'Stay updated with labor laws' },
  { icon: '📊', title: 'Real-time Insights', description: 'Data-driven HR decisions' },
  { icon: '🔒', title: 'Secure & Reliable', description: 'Bank-grade data security' },
  { icon: '☁️', title: 'Cloud-based', description: 'Access from anywhere, anytime' },
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

const gradientBg = 'linear-gradient(135deg, #0052CC 0%, #0D8BFF 50%, #6C63FF 100%)'

const SectionWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <Box id={id} as="section" py={{ base: 16, md: 24 }} px={{ base: 4, md: 10 }} position="relative">
    {children}
  </Box>
)

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeModule, setActiveModule] = useState<(typeof modules)[number] | null>(null)
  const modal = useDisclosure()
  const toast = useToast()
  const navBg = useColorModeValue('white', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenu(false)
    }
  }

  const openModule = (module: (typeof modules)[number]) => {
    setActiveModule(module)
    modal.onOpen()
  }

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({ title: 'Message sent', description: 'Our team will contact you shortly.', status: 'success', duration: 4000 })
    ;(event.target as HTMLFormElement).reset()
  }

  const otherLogos = useMemo(() => otherCustomers, [])

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Navigation */}
      <Box as="header" position="fixed" top={0} left={0} right={0} zIndex={20} bg={navBg} borderBottom="1px solid" borderColor={borderColor}>
        <Flex maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} h={16} align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Box boxSize={10} borderRadius="xl" bgGradient={gradientBg} />
            <Text fontWeight="bold" fontSize="xl" color="#0052CC">
              MyBridge
            </Text>
          </Flex>
          <Flex gap={6} display={{ base: 'none', xl: 'flex' }}>
            {sections.map((section) => (
              <Button key={section.id} variant="ghost" fontWeight="600" onClick={() => handleScroll(section.id)}>
                {section.label}
              </Button>
            ))}
          </Flex>
          <IconButton
            aria-label="Toggle navigation"
            icon={mobileMenu ? <X size={18} /> : <Menu size={18} />}
            display={{ base: 'inline-flex', xl: 'none' }}
            variant="ghost"
            onClick={() => setMobileMenu((prev) => !prev)}
          />
        </Flex>
        {mobileMenu && (
          <Stack px={4} py={4} gap={2} borderTop="1px solid" borderColor={borderColor} bg={navBg}>
            {sections.map((section) => (
              <Button key={section.id} justifyContent="flex-start" variant="ghost" onClick={() => handleScroll(section.id)}>
                {section.label}
              </Button>
            ))}
          </Stack>
        )}
      </Box>

      <Box pt={{ base: 20, md: 24 }}>
        {/* Home */}
        <SectionWrapper id="home">
          <Box bgGradient={gradientBg} color="white" borderRadius="3xl" p={{ base: 8, md: 16 }} overflow="hidden" position="relative">
            <Box position="absolute" top={-10} right={-10} boxSize={48} borderRadius="full" bg="whiteAlpha.200" />
            <Stack spacing={8} maxW="4xl">
              <Tag size="lg" w="fit-content" bg="whiteAlpha.200">
                The Future of Workforce Management
              </Tag>
              <Heading fontSize={{ base: '4xl', md: '6xl' }}>
                Transform Your <chakra.span color="blue.100">HR Operations</chakra.span>
              </Heading>
              <Text fontSize="xl" opacity={0.9} maxW="3xl">
                A complete HRMS solution designed to automate payroll, attendance, and performance so you can focus on your people.
              </Text>
              <Flex gap={4} wrap="wrap">
                <Button size="lg" colorScheme="whiteAlpha" color="#0052CC" bg="white" onClick={() => handleScroll('contact')}>
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" color="white" borderColor="whiteAlpha.700" onClick={() => handleScroll('modules')}>
                  Explore Modules
                </Button>
              </Flex>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                {[{ label: 'Active Users', value: '10K+' }, { label: 'Companies', value: '500+' }, { label: 'Uptime', value: '99.9%' }, { label: 'Support', value: '24/7' }].map((stat) => (
                  <Box key={stat.label} p={5} borderRadius="xl" bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.300">
                    <Heading size="lg">{stat.value}</Heading>
                    <Text opacity={0.8}>{stat.label}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        </SectionWrapper>

        {/* About */}
        <SectionWrapper id="about">
          <Stack spacing={10} maxW="6xl" mx="auto">
            <Heading textAlign="center">About MyBridge</Heading>
            <Text fontSize="lg" textAlign="center" maxW="4xl" mx="auto" color="gray.600">
              We make HR operations simple, efficient, and delightful. Built for India’s compliance landscape with the agility modern teams expect.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {[
                { icon: <TrendingUp color="#0052CC" />, title: 'Growing Fast', text: '500+ companies onboarded' },
                { icon: <Award color="#0052CC" />, title: 'Award Winning', text: 'Best HR Tech 2024' },
                { icon: <Users color="#0052CC" />, title: 'Expert Team', text: '50+ HR specialists' },
              ].map((item) => (
                <Box key={item.title} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={8} textAlign="center">
                  <Box mb={4}>{item.icon}</Box>
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                  <Text color="gray.600">{item.text}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Features */}
        <SectionWrapper id="features">
          <Stack spacing={8} maxW="6xl" mx="auto">
            <Heading textAlign="center">Complete HR Suite</Heading>
            <Text textAlign="center" color="gray.600">
              Everything you need to manage your workforce.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {[
                { emoji: '🎯', title: 'Core HR Management', text: 'Employee database, org charts, document management, lifecycle tracking.' },
                { emoji: '📊', title: 'Analytics & Reports', text: 'Real-time dashboards, custom reports, predictive analytics, exports.' },
                { emoji: '🔐', title: 'Security & Compliance', text: 'Role-based access, audit trails, GDPR-ready, security reviews.' },
                { emoji: '🔄', title: 'Seamless Integration', text: 'REST APIs, webhooks, and pre-built connectors.' },
              ].map((feature) => (
                <Box key={feature.title} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={6}>
                  <Text fontSize="3xl">{feature.emoji}</Text>
                  <Heading size="md" mt={3} mb={2}>
                    {feature.title}
                  </Heading>
                  <Text color="gray.600">{feature.text}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Benefits */}
        <SectionWrapper id="benefits">
          <Stack spacing={8} maxW="6xl" mx="auto">
            <Heading textAlign="center">Benefits</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {benefits.map((benefit) => (
                <Box key={benefit.title} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={6}>
                  <Text fontSize="3xl">{benefit.icon}</Text>
                  <Heading size="md" mt={3} mb={2}>
                    {benefit.title}
                  </Heading>
                  <Text color="gray.600">{benefit.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Why MyBridge */}
        <SectionWrapper id="why-mybridge">
          <Stack spacing={8} maxW="6xl" mx="auto">
            <Heading textAlign="center">Why MyBridge</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box border="2px solid" borderColor="red.100" bg="red.50" borderRadius="2xl" p={8}>
                <Heading size="md" color="red.600" mb={4}>
                  ❌ Manual Process
                </Heading>
                <Stack color="red.700" spacing={3}>
                  {['10+ days for monthly payroll', 'High risk of calculation errors', 'Spreadsheet-based tracking', 'Compliance penalties', 'No real-time visibility', 'Poor employee experience'].map((item) => (
                    <Text key={item}>• {item}</Text>
                  ))}
                </Stack>
              </Box>
              <Box border="2px solid" borderColor="green.100" bg="green.50" borderRadius="2xl" p={8}>
                <Heading size="md" color="green.600" mb={4}>
                  ✅ With MyBridge
                </Heading>
                <Stack color="green.700" spacing={3}>
                  {['Payroll in 2 hours', '100% automated accuracy', 'Centralized cloud platform', 'Automatic compliance updates', 'Real-time dashboards', 'Employee self-service portal'].map((item) => (
                    <Text key={item}>• {item}</Text>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Modules */}
        <SectionWrapper id="modules">
          <Stack spacing={8} maxW="7xl" mx="auto">
            <Heading textAlign="center">Modules (tap to explore)</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {modules.map((module) => (
                <Box key={module.id} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={8} boxShadow="xl">
                  <Text fontSize="4xl">{module.icon}</Text>
                  <Heading size="md" mt={4} mb={3}>
                    {module.title}
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    {module.description}
                  </Text>
                  <Button colorScheme="blue" onClick={() => openModule(module)}>
                    View Details
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Case Studies */}
        <SectionWrapper id="case-studies">
          <Stack spacing={10} maxW="6xl" mx="auto">
            <Heading textAlign="center">Case Studies</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {caseStudies.map((study) => (
                <Box key={study.company} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={8}>
                  <Flex align="center" gap={4} mb={4}>
                    <Building2 color="#0052CC" />
                    <Box>
                      <Heading size="md">{study.company}</Heading>
                      <Text color="gray.500">
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
                    <Box bg="green.50" border="1px solid" borderColor="green.100" borderRadius="lg" p={4}>
                      <chakra.span fontWeight="bold" color="green.700">
                        Result:
                      </chakra.span>{' '}
                      {study.result}
                    </Box>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Success Stories */}
        <SectionWrapper id="success-stories">
          <Stack spacing={10} maxW="6xl" mx="auto">
            <Heading textAlign="center">Success Stories</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {testimonials.map((testimonial) => (
                <Box key={testimonial.name} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={6}>
                  <Text fontSize="4xl" color="yellow.400" mb={4}>
                    “
                  </Text>
                  <Text color="gray.700" mb={6}>
                    {testimonial.quote}
                  </Text>
                  <Divider mb={4} />
                  <Stack spacing={1}>
                    <Heading size="sm">{testimonial.name}</Heading>
                    <Text color="gray.600" fontSize="sm">
                      {testimonial.role}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      {testimonial.company}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Logos + additional customers */}
        <SectionWrapper id="logos">
          <Stack spacing={10} maxW="6xl" mx="auto">
            <Heading textAlign="center">Trusted by Enterprises</Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              {customers.map((customer) => (
                <Stack key={customer.name} align="center" bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={6}>
                  <Image src={customer.logo} alt={customer.name} h={12} objectFit="contain" fallbackSrc="https://via.placeholder.com/150?text=Logo" />
                  <Text fontWeight="600">{customer.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {customer.industry}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {otherLogos.map((customer) => (
                <Stack key={customer.name} borderRadius="xl" bg={cardBg} border="1px solid" borderColor={borderColor} p={4}>
                  <Heading size="sm">{customer.name}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    {customer.industry}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {customer.employees} employees
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </SectionWrapper>

        {/* Integrations */}
        <SectionWrapper id="integrations">
          <Stack spacing={10} maxW="7xl" mx="auto">
            <Heading textAlign="center">Integrations</Heading>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={6}>
              {integrations.map((integration) => (
                <Flex
                  key={integration.name}
                  bg={cardBg}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  align="center"
                  justify="center"
                  h={32}
                  p={6}
                >
                  <Image src={integration.logo} alt={integration.name} h={12} objectFit="contain" fallbackSrc="https://via.placeholder.com/120x40?text=Logo" />
                </Flex>
              ))}
            </SimpleGrid>
            <Box textAlign="center">
              <Button variant="outline" colorScheme="blue" onClick={() => handleScroll('contact')}>
                Need custom integration? Talk to us
              </Button>
            </Box>
          </Stack>
        </SectionWrapper>

        {/* Contact */}
        <SectionWrapper id="contact">
          <Stack spacing={10} maxW="6xl" mx="auto">
            <Heading textAlign="center">Contact Us</Heading>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
              <Box bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={8}>
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
                    <Button type="submit" colorScheme="blue" size="lg">
                      Send Message
                    </Button>
                  </Stack>
                </chakra.form>
              </Box>
              <Stack spacing={4}>
                {[
                  { icon: <Mail color="#0052CC" />, title: 'Email', lines: ['contact@mybridge.com', 'support@mybridge.com'] },
                  { icon: <Phone color="#0052CC" />, title: 'Phone', lines: ['+91 1800-123-4567 (Toll Free)', 'Mon–Fri: 9 AM – 6 PM IST'] },
                  { icon: <MapPin color="#0052CC" />, title: 'Office', lines: ['123 Tech Park, Bangalore', 'Karnataka 560001, India'] },
                ].map((info) => (
                  <Flex key={info.title} bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={6} gap={4}>
                    <Box>{info.icon}</Box>
                    <Stack spacing={1}>
                      <Heading size="sm">{info.title}</Heading>
                      {info.lines.map((line) => (
                        <Text key={line} color="gray.600">
                          {line}
                        </Text>
                      ))}
                    </Stack>
                  </Flex>
                ))}
                <Box bg="blue.50" borderRadius="2xl" border="1px solid" borderColor="blue.100" p={6}>
                  <Heading size="sm" mb={3}>
                    Schedule a Demo
                  </Heading>
                  <Text color="gray.600" mb={4}>
                    See MyBridge in action with a personalized walkthrough.
                  </Text>
                  <Button colorScheme="blue" w="full" onClick={() => handleScroll('contact')}>
                    Book Demo Call
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Stack>
        </SectionWrapper>
      </Box>

      {/* Module Modal */}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="5xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" p={{ base: 4, md: 6 }}>
          <ModalHeader>
            {activeModule && (
              <Stack spacing={2} textAlign="center">
                <Text fontSize="4xl">{activeModule.icon}</Text>
                <Heading size="lg">{activeModule.title}</Heading>
                <Text color="gray.600">{activeModule.description}</Text>
              </Stack>
            )}
          </ModalHeader>
          <ModalCloseButton top={4} right={4} />
          <ModalBody>
            {activeModule && (
              <Stack spacing={8}>
                <Box>
                  <Heading size="md" mb={4} textAlign="center">
                    Comprehensive Features
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {activeModule.detailedFeatures.map((feature) => (
                      <Box key={feature.title} bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} p={4} textAlign="center">
                        <Text fontSize="3xl">{feature.icon}</Text>
                        <Heading size="sm" mt={2} mb={1}>
                          {feature.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          {feature.description}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
                <Box bg="blue.50" borderRadius="xl" p={6}>
                  <Heading size="md" mb={4}>
                    Complete Feature Set
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {activeModule.features.map((feature) => (
                      <Flex key={feature} bg="white" borderRadius="md" border="1px solid" borderColor="blue.100" p={3} align="center" gap={3}>
                        <CheckCircle2 color="#0D8BFF" size={18} />
                        <Text>{feature}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <Box bg="green.50" borderRadius="xl" border="1px solid" borderColor="green.100" p={5}>
                    <Heading size="sm" mb={3}>
                      Key Benefits
                    </Heading>
                    <List spacing={2} color="green.700">
                      {activeModule.benefits.map((benefit) => (
                        <ListItem key={benefit}>
                          <ListIcon as={CheckCircle2} color="green.500" />
                          {benefit}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box bg="purple.50" borderRadius="xl" border="1px solid" borderColor="purple.100" p={5}>
                    <Heading size="sm" mb={3}>
                      Ideal For
                    </Heading>
                    <List spacing={2} color="purple.700">
                      {activeModule.useCases.map((useCase) => (
                        <ListItem key={useCase}>• {useCase}</ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box bg="blue.50" borderRadius="xl" border="1px solid" borderColor="blue.100" p={5}>
                    <Heading size="sm" mb={3}>
                      Ready to Deploy
                    </Heading>
                    <Text color="gray.700" mb={4}>
                      Ready to implement this module and transform HR?
                    </Text>
                    <Stack>
                      <Button colorScheme="blue" onClick={() => handleScroll('contact')}>
                        Request Demo
                      </Button>
                      <Button variant="outline" onClick={() => handleScroll('case-studies')}>
                        View Case Studies
                      </Button>
                    </Stack>
                  </Box>
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

export default App
