"""
Mock career guidance service - generates recommendations based on user profile
"""

from typing import Dict, List, Any
from app.models.schemas import (
    CareerRecommendation, SkillGapAnalysis,
    JobRecommendation, ResumeGuidance
)


class CareerGuidanceService:
    """Service for generating career guidance based on user profile"""

    def __init__(self):
        # Certifications for each career path
        self.certifications = {
            "software_engineer": {
                "entry_level": [
                    {"name": "Google IT Support Professional Certificate", "provider": "Google", "link": "https://www.coursera.org/professional-certificates/google-it-support", "duration": "6 months", "cost": "₹3,500/month"},
                    {"name": "AWS Certified Cloud Practitioner", "provider": "Amazon", "link": "https://aws.amazon.com/certification/certified-cloud-practitioner/", "duration": "3 months", "cost": "₹10,000"},
                    {"name": "Microsoft Certified: Azure Fundamentals", "provider": "Microsoft", "link": "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/", "duration": "2 months", "cost": "₹5,000"}
                ],
                "intermediate": [
                    {"name": "Google Data Analytics Professional Certificate", "provider": "Google", "link": "https://www.coursera.org/professional-certificates/google-data-analytics", "duration": "6 months", "cost": "₹3,500/month"},
                    {"name": "Meta React Developer Certificate", "provider": "Meta", "link": "https://www.coursera.org/professional-certificates/meta-react-developer", "duration": "7 months", "cost": "₹3,500/month"},
                    {"name": "AWS Certified Developer - Associate", "provider": "Amazon", "link": "https://aws.amazon.com/certification/certified-developer-associate/", "duration": "4 months", "cost": "₹15,000"}
                ],
                "advanced": [
                    {"name": "Google Cloud Professional Developer", "provider": "Google", "link": "https://cloud.google.com/certification/cloud-developer", "duration": "6 months", "cost": "₹20,000"},
                    {"name": "Microsoft Certified: Azure Developer Associate", "provider": "Microsoft", "link": "https://learn.microsoft.com/en-us/certifications/azure-developer-associate/", "duration": "5 months", "cost": "₹18,000"}
                ]
            },
            "full_stack_developer": {
                "entry_level": [
                    {"name": "IBM Full Stack Software Developer", "provider": "IBM", "link": "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer", "duration": "6 months", "cost": "₹3,500/month"},
                    {"name": "Meta Front-End Developer", "provider": "Meta", "link": "https://www.coursera.org/professional-certificates/meta-front-end-developer", "duration": "7 months", "cost": "₹3,500/month"}
                ],
                "intermediate": [
                    {"name": "MERN Stack Developer Certification", "provider": "Udacity", "link": "https://www.udacity.com/course/react-nanodegree--nd019", "duration": "4 months", "cost": "₹4,000/month"},
                    {"name": "Full Stack Web Development", "provider": "freeCodeCamp", "link": "https://www.freecodecamp.org/learn/full-stack-developer/", "duration": "12 months", "cost": "Free"}
                ],
                "advanced": [
                    {"name": "AWS Certified Solutions Architect", "provider": "Amazon", "link": "https://aws.amazon.com/certification/certified-solutions-architect-associate/", "duration": "6 months", "cost": "₹25,000"}
                ]
            },
            "data_scientist": {
                "entry_level": [
                    {"name": "Google Data Analytics", "provider": "Google", "link": "https://www.coursera.org/professional-certificates/google-data-analytics", "duration": "6 months", "cost": "₹3,500/month"},
                    {"name": "IBM Data Analyst", "provider": "IBM", "link": "https://www.coursera.org/professional-certificates/ibm-data-analyst", "duration": "5 months", "cost": "₹3,500/month"}
                ],
                "intermediate": [
                    {"name": "TensorFlow Developer Certificate", "provider": "Google", "link": "https://www.tensorflow.org/certificate", "duration": "3 months", "cost": "₹15,000"},
                    {"name": "AWS Certified Machine Learning", "provider": "Amazon", "link": "https://aws.amazon.com/certification/certified-machine-learning-specialty/", "duration": "6 months", "cost": "₹30,000"}
                ],
                "advanced": [
                    {"name": "Deep Learning Specialization", "provider": "deeplearning.ai", "link": "https://www.coursera.org/specializations/deep-learning", "duration": "6 months", "cost": "₹4,000/month"},
                    {"name": "Machine Learning Engineer Nanodegree", "provider": "Udacity", "link": "https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009t", "duration": "4 months", "cost": "₹4,000/month"}
                ]
            },
            "devops_engineer": {
                "entry_level": [
                    {"name": "Google Cloud Fundamentals", "provider": "Google", "link": "https://cloud.google.com/certification/cloud-digital-leader", "duration": "2 months", "cost": "₹8,000"},
                    {"name": "AWS Certified Cloud Practitioner", "provider": "Amazon", "link": "https://aws.amazon.com/certification/certified-cloud-practitioner/", "duration": "3 months", "cost": "₹10,000"}
                ],
                "intermediate": [
                    {"name": "Docker Certified Associate", "provider": "Docker", "link": "https://docker.com/products/docker-desktop", "duration": "2 months", "cost": "₹15,000"},
                    {"name": "Kubernetes Certified Administrator", "provider": "CNCF", "link": "https://www.cncf.io/certification/cka/", "duration": "3 months", "cost": "₹20,000"}
                ],
                "advanced": [
                    {"name": "AWS Certified DevOps Engineer", "provider": "Amazon", "link": "https://aws.amazon.com/certification/certified-devops-engineer-professional/", "duration": "6 months", "cost": "₹35,000"},
                    {"name": "Certified Kubernetes Administrator", "provider": "Linux Foundation", "link": "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/", "duration": "4 months", "cost": "₹25,000"}
                ]
            },
            "cybersecurity_analyst": {
                "entry_level": [
                    {"name": "Google Cybersecurity Certificate", "provider": "Google", "link": "https://www.coursera.org/professional-certificates/google-cybersecurity", "duration": "6 months", "cost": "₹3,500/month"},
                    {"name": "CompTIA Security+", "provider": "CompTIA", "link": "https://www.comptia.org/certifications/security", "duration": "3 months", "cost": "₹12,000"}
                ],
                "intermediate": [
                    {"name": "Certified Ethical Hacker (CEH)", "provider": "EC-Council", "link": "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/", "duration": "4 months", "cost": "₹20,000"},
                    {"name": "CISSP Certification", "provider": "ISC2", "link": "https://www.isc2.org/certifications/cissp", "duration": "6 months", "cost": "₹30,000"}
                ],
                "advanced": [
                    {"name": "Certified Information Systems Security Professional", "provider": "ISC2", "link": "https://www.isc2.org/certifications/cissp", "duration": "6 months", "cost": "₹35,000"},
                    {"name": "Offensive Security Certified Professional", "provider": "Offensive Security", "link": "https://www.offsec.com/courses/pen-200/", "duration": "3 months", "cost": "₹50,000"}
                ]
            }
        }

        # Modern industry skills for 2024-2025
        self.career_paths = {
            "student": {
                "software_engineer": {
                    "required_skills": ["Python", "JavaScript", "SQL", "Git", "Problem Solving", "Teamwork", "Data Structures", "APIs"],
                    "recommended_skills": ["React", "Node.js", "Docker", "AWS", "TypeScript", "MongoDB", "GitHub", "Linux"],
                    "jobs": [
                        {
                            "title": "Software Engineer",
                            "company": "Google",
                            "salary_fresher": "18-25 LPA",
                            "salary_intermediate": "25-35 LPA",
                            "salary_senior": "35-50 LPA",
                            "apply_link": "https://careers.google.com/jobs/results/?query=software%20engineer",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=bangalore",
                            "location": "Bangalore, India"
                        },
                        {
                            "title": "Software Development Engineer",
                            "company": "Amazon",
                            "salary_fresher": "12-18 LPA",
                            "salary_intermediate": "20-30 LPA",
                            "salary_senior": "30-45 LPA",
                            "apply_link": "https://www.amazon.jobs/en/search-jobs?base_query=software+development+engineer",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=software%20development%20engineer&location=hyderabad",
                            "location": "Hyderabad/Bangalore, India"
                        },
                        {
                            "title": "Software Engineer",
                            "company": "Microsoft",
                            "salary_fresher": "15-22 LPA",
                            "salary_intermediate": "22-35 LPA",
                            "salary_senior": "35-55 LPA",
                            "apply_link": "https://careers.microsoft.com/us/en/search-results?query=software%20engineer",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=hyderabad&f_C=1035",
                            "location": "Hyderabad/Bangalore, India"
                        }
                    ]
                },
                "full_stack_developer": {
                    "required_skills": ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Git", "REST APIs", "HTML/CSS"],
                    "recommended_skills": ["TypeScript", "Next.js", "PostgreSQL", "Docker", "AWS", "GraphQL", "Redis", "Testing"],
                    "jobs": [
                        {
                            "title": "Full Stack Developer",
                            "company": "Flipkart",
                            "salary_fresher": "8-15 LPA",
                            "salary_intermediate": "15-25 LPA",
                            "salary_senior": "25-40 LPA",
                            "apply_link": "https://www.flipkartcareers.com/#!/joblist",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=full%20stack%20developer&location=bangalore&f_C=3159",
                            "location": "Bangalore, India"
                        },
                        {
                            "title": "MERN Stack Developer",
                            "company": "Swiggy",
                            "salary_fresher": "6-12 LPA",
                            "salary_intermediate": "12-20 LPA",
                            "salary_senior": "20-35 LPA",
                            "apply_link": "https://careers.swiggy.com/#!/",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=mern%20stack%20developer&location=bangalore&f_C=1047",
                            "location": "Bangalore, India"
                        },
                        {
                            "title": "Full Stack Engineer",
                            "company": "Zomato",
                            "salary_fresher": "7-14 LPA",
                            "salary_intermediate": "14-22 LPA",
                            "salary_senior": "22-38 LPA",
                            "apply_link": "https://careers.zomato.com/jobs",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=full%20stack%20engineer&location=gurgaon&f_C=2461",
                            "location": "Gurgaon/Delhi NCR, India"
                        }
                    ]
                },
                "data_analyst": {
                    "required_skills": ["Python", "SQL", "Excel", "Statistics", "Data Visualization", "Pandas", "NumPy"],
                    "recommended_skills": ["Tableau", "Power BI", "Machine Learning", "R", "Apache Spark", "AWS Redshift", "Google Analytics"],
                    "jobs": [
                        {"title": "Data Analyst", "company": "Analytics Inc", "salary_fresher": "3-5 LPA", "salary_intermediate": "6-10 LPA", "salary_senior": "12-18 LPA"},
                        {"title": "Business Intelligence Analyst", "company": "BizData", "salary_fresher": "4-6 LPA", "salary_intermediate": "8-12 LPA", "salary_senior": "15-22 LPA"}
                    ]
                },
                "data_scientist": {
                    "required_skills": ["Python", "Machine Learning", "Statistics", "SQL", "Pandas", "Scikit-learn", "Jupyter"],
                    "recommended_skills": ["TensorFlow", "PyTorch", "Deep Learning", "NLP", "Computer Vision", "AWS SageMaker", "Docker"],
                    "jobs": [
                        {
                            "title": "Data Scientist",
                            "company": "Netflix",
                            "salary_fresher": "20-30 LPA",
                            "salary_intermediate": "30-45 LPA",
                            "salary_senior": "45-70 LPA",
                            "apply_link": "https://jobs.netflix.com/search?q=data+scientist",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=data%20scientist&f_C=165158",
                            "location": "Remote/Global"
                        },
                        {
                            "title": "Machine Learning Engineer",
                            "company": "Meta",
                            "salary_fresher": "18-28 LPA",
                            "salary_intermediate": "28-42 LPA",
                            "salary_senior": "42-65 LPA",
                            "apply_link": "https://www.metacareers.com/jobs/?q=machine+learning",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=machine%20learning%20engineer&location=hyderabad&f_C=10667",
                            "location": "Hyderabad, India"
                        },
                        {
                            "title": "Data Scientist",
                            "company": "PayPal",
                            "salary_fresher": "12-20 LPA",
                            "salary_intermediate": "20-32 LPA",
                            "salary_senior": "32-50 LPA",
                            "apply_link": "https://www.paypal.com/us/webapps/mpp/jobs",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=data%20scientist&location=bangalore&f_C=1667",
                            "location": "Chennai/Bangalore, India"
                        }
                    ]
                },
                "devops_engineer": {
                    "required_skills": ["Linux", "Git", "Docker", "Kubernetes", "AWS", "CI/CD", "Shell Scripting", "Monitoring"],
                    "recommended_skills": ["Terraform", "Jenkins", "Ansible", "Prometheus", "Grafana", "Python", "Go", "Helm"],
                    "jobs": [
                        {
                            "title": "DevOps Engineer",
                            "company": "Uber",
                            "salary_fresher": "15-25 LPA",
                            "salary_intermediate": "25-38 LPA",
                            "salary_senior": "38-55 LPA",
                            "apply_link": "https://www.uber.com/global/en/careers/list/?query=devops",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=devops%20engineer&location=bangalore&f_C=1815218",
                            "location": "Bangalore, India"
                        },
                        {
                            "title": "Site Reliability Engineer",
                            "company": "Spotify",
                            "salary_fresher": "18-28 LPA",
                            "salary_intermediate": "28-42 LPA",
                            "salary_senior": "42-65 LPA",
                            "apply_link": "https://www.spotifyjobs.com/search-jobs/?keywords=site%20reliability%20engineer",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=site%20reliability%20engineer&f_C=4688",
                            "location": "Remote/Global"
                        },
                        {
                            "title": "Cloud Engineer",
                            "company": "Airbnb",
                            "salary_fresher": "16-26 LPA",
                            "salary_intermediate": "26-40 LPA",
                            "salary_senior": "40-60 LPA",
                            "apply_link": "https://careers.airbnb.com/positions/",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=cloud%20engineer&f_C=1592",
                            "location": "Remote/Global"
                        }
                    ]
                },
                "cybersecurity_analyst": {
                    "required_skills": ["Network Security", "Ethical Hacking", "Linux", "Python", "Risk Assessment", "Firewalls", "Cryptography"],
                    "recommended_skills": ["Kali Linux", "Metasploit", "SIEM", "Cloud Security", "CISSP", "CEH", "Penetration Testing"],
                    "jobs": [
                        {
                            "title": "Cybersecurity Analyst",
                            "company": "Cisco",
                            "salary_fresher": "8-15 LPA",
                            "salary_intermediate": "15-25 LPA",
                            "salary_senior": "25-40 LPA",
                            "apply_link": "https://jobs.cisco.com/jobs/SearchJobs/?3_109_3=cybersecurity",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=cybersecurity%20analyst&location=bangalore&f_C=1063",
                            "location": "Bangalore, India"
                        },
                        {
                            "title": "Information Security Analyst",
                            "company": "IBM",
                            "salary_fresher": "7-14 LPA",
                            "salary_intermediate": "14-22 LPA",
                            "salary_senior": "22-35 LPA",
                            "apply_link": "https://www.ibm.com/employment/us-en/search-jobs.html?query=cybersecurity",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=information%20security%20analyst&location=india&f_C=1009",
                            "location": "Multiple Locations, India"
                        },
                        {
                            "title": "Security Operations Center Analyst",
                            "company": "Deloitte",
                            "salary_fresher": "6-12 LPA",
                            "salary_intermediate": "12-20 LPA",
                            "salary_senior": "20-32 LPA",
                            "apply_link": "https://www2.deloitte.com/us/en/careers/careers.html",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=security%20operations%20center&location=mumbai&f_C=1038",
                            "location": "Mumbai/Delhi, India"
                        }
                    ]
                }
            },
            "fresher": {
                "software_engineer": {
                    "required_skills": ["Python", "JavaScript", "SQL", "Git", "Data Structures", "Algorithms", "System Design", "APIs"],
                    "recommended_skills": ["React", "Node.js", "Docker", "AWS", "TypeScript", "MongoDB", "Testing", "Microservices"],
                    "jobs": [
                        {
                            "title": "Associate Software Engineer",
                            "company": "TCS",
                            "salary_fresher": "3-5 LPA",
                            "salary_intermediate": "6-10 LPA",
                            "salary_senior": "12-18 LPA",
                            "apply_link": "https://www.tcs.com/careers",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=india&f_C=1353",
                            "location": "Multiple Locations, India"
                        },
                        {
                            "title": "Software Engineer Trainee",
                            "company": "Infosys",
                            "salary_fresher": "3-4 LPA",
                            "salary_intermediate": "6-9 LPA",
                            "salary_senior": "10-15 LPA",
                            "apply_link": "https://www.infosys.com/careers.html",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=india&f_C=1283",
                            "location": "Multiple Locations, India"
                        },
                        {
                            "title": "Graduate Software Engineer",
                            "company": "Wipro",
                            "salary_fresher": "3-5 LPA",
                            "salary_intermediate": "6-10 LPA",
                            "salary_senior": "12-18 LPA",
                            "apply_link": "https://careers.wipro.com/",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=india&f_C=1411",
                            "location": "Multiple Locations, India"
                        }
                    ]
                }
            },
            "professional": {
                "senior_software_engineer": {
                    "required_skills": ["Python", "JavaScript", "SQL", "Git", "System Architecture", "Leadership", "Mentoring", "Technical Design"],
                    "recommended_skills": ["Cloud Architecture", "Microservices", "DevOps", "AI/ML", "Team Management", "Agile", "Scrum"],
                    "jobs": [
                        {
                            "title": "Senior Software Engineer",
                            "company": "Adobe",
                            "salary_fresher": "20-32 LPA",
                            "salary_intermediate": "32-45 LPA",
                            "salary_senior": "45-70 LPA",
                            "apply_link": "https://www.adobe.com/careers.html",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=senior%20software%20engineer&location=bangalore&f_C=1480",
                            "location": "Noida/Bangalore, India"
                        },
                        {
                            "title": "Principal Engineer",
                            "company": "LinkedIn",
                            "salary_fresher": "25-40 LPA",
                            "salary_intermediate": "40-60 LPA",
                            "salary_senior": "60-90 LPA",
                            "apply_link": "https://www.linkedin.com/company/linkedin/jobs/",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=principal%20engineer&location=bangalore&f_C=1337",
                            "location": "Bangalore, India"
                        },
                        {
                            "title": "Engineering Manager",
                            "company": "Stripe",
                            "salary_fresher": "30-45 LPA",
                            "salary_intermediate": "45-65 LPA",
                            "salary_senior": "65-100 LPA",
                            "apply_link": "https://stripe.com/jobs",
                            "linkedin_link": "https://www.linkedin.com/jobs/search/?keywords=engineering%20manager&f_C=2136",
                            "location": "Remote/Global"
                        }
                    ]
                }
            }
        }

        # Detailed topics for each skill
        self.skill_topics = {
            "Python": {
                "Fundamentals": ["Variables & Data Types", "Control Structures", "Functions", "Modules & Packages", "Error Handling"],
                "Data Structures": ["Lists", "Tuples", "Dictionaries", "Sets", "List Comprehensions"],
                "Advanced": ["Object-Oriented Programming", "Decorators", "Generators", "Context Managers", "Metaclasses"],
                "Libraries": ["NumPy", "Pandas", "Matplotlib", "Requests", "Beautiful Soup", "Flask/Django"],
                "Modern Python": ["Type Hints", "Async/Await", "Data Classes", "Pattern Matching", "Structural Pattern Matching"]
            },
            "JavaScript": {
                "Fundamentals": ["Variables & Data Types", "Operators", "Control Structures", "Functions", "Scope & Closures"],
                "ES6+": ["Arrow Functions", "Template Literals", "Destructuring", "Spread/Rest Operators", "Modules"],
                "Advanced": ["Promises & Async/Await", "Event Loop", "Prototypes", "Classes", "Error Handling"],
                "Frameworks": ["React Basics", "Node.js Fundamentals", "Express.js", "Next.js", "Vue.js"],
                "Modern JS": ["TypeScript Basics", "Web APIs", "Service Workers", "Web Components", "Module Bundlers"]
            },
            "React": {
                "Fundamentals": ["JSX", "Components", "Props", "State", "Lifecycle Methods"],
                "Hooks": ["useState", "useEffect", "useContext", "useReducer", "Custom Hooks"],
                "Advanced": ["Context API", "Render Props", "Higher-Order Components", "Error Boundaries", "Refs"],
                "Modern React": ["React 18 Features", "Concurrent Features", "Suspense", "Server Components", "React Query"],
                "Ecosystem": ["React Router", "Redux/Zustand", "Testing Library", "Styled Components", "Next.js"]
            },
            "Node.js": {
                "Fundamentals": ["Modules", "NPM", "File System", "Events", "Streams"],
                "Web Development": ["Express.js", "Middleware", "Routing", "REST APIs", "Authentication"],
                "Advanced": ["Child Processes", "Clusters", "Worker Threads", "Performance", "Security"],
                "Databases": ["MongoDB", "PostgreSQL", "Redis", "ORMs", "Connection Pooling"],
                "Modern Node": ["ES Modules", "TypeScript", "Microservices", "GraphQL", "Serverless"]
            },
            "SQL": {
                "Fundamentals": ["SELECT Queries", "WHERE Clauses", "JOIN Operations", "GROUP BY", "ORDER BY"],
                "Advanced": ["Subqueries", "Window Functions", "Common Table Expressions", "Indexes", "Views"],
                "Databases": ["PostgreSQL", "MySQL", "SQLite", "MongoDB (NoSQL)", "Redis"],
                "Performance": ["Query Optimization", "Execution Plans", "Indexing Strategies", "Normalization"],
                "Modern SQL": ["JSON Operations", "Full-Text Search", "Geospatial Queries", "Time Series Data"]
            },
            "Docker": {
                "Fundamentals": ["Containers vs VMs", "Docker Images", "Dockerfiles", "Docker Commands", "Volumes"],
                "Advanced": ["Multi-stage Builds", "Docker Compose", "Networking", "Security", "Docker Hub"],
                "Orchestration": ["Kubernetes Basics", "Pods", "Services", "Deployments", "ConfigMaps"],
                "DevOps": ["CI/CD Pipelines", "Docker in AWS", "Monitoring", "Logging", "Scaling"],
                "Best Practices": ["Image Optimization", "Security Scanning", "Multi-architecture", "Docker Desktop"]
            },
            "AWS": {
                "Compute": ["EC2", "Lambda", "Elastic Beanstalk", "ECS/EKS", "Lightsail"],
                "Storage": ["S3", "EBS", "EFS", "Glacier", "RDS"],
                "Networking": ["VPC", "CloudFront", "Route 53", "API Gateway", "Load Balancers"],
                "Security": ["IAM", "KMS", "CloudTrail", "GuardDuty", "WAF"],
                "Modern AWS": ["Serverless", "Containers", "AI/ML Services", "IoT", "Edge Computing"]
            },
            "Machine Learning": {
                "Fundamentals": ["Supervised Learning", "Unsupervised Learning", "Regression", "Classification", "Clustering"],
                "Algorithms": ["Linear Regression", "Decision Trees", "Neural Networks", "SVM", "Random Forest"],
                "Deep Learning": ["CNN", "RNN", "Transformers", "GANs", "Reinforcement Learning"],
                "Tools": ["Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Jupyter"],
                "Applications": ["Computer Vision", "NLP", "Recommendation Systems", "Time Series", "Anomaly Detection"]
            },
            "Git": {
                "Fundamentals": ["Repository Setup", "Basic Commands", "Branching", "Merging", "Stashing"],
                "Advanced": ["Rebasing", "Interactive Rebase", "Cherry Picking", "Bisect", "Submodules"],
                "Collaboration": ["Pull Requests", "Code Reviews", "GitHub Flow", "GitLab Flow", "Conflict Resolution"],
                "Tools": ["GitHub Desktop", "GitKraken", "SourceTree", "Git Extensions", "Git Hooks"],
                "Best Practices": ["Commit Messages", "Branch Naming", "Gitignore", "Large File Storage", "Security"]
            },
            "TypeScript": {
                "Fundamentals": ["Type Annotations", "Interfaces", "Classes", "Generics", "Union Types"],
                "Advanced": ["Mapped Types", "Conditional Types", "Template Literal Types", "Decorators", "Utility Types"],
                "React + TS": ["Component Props", "Hooks with TS", "Generic Components", "Form Handling"],
                "Tools": ["tsconfig.json", "ESLint", "Prettier", "Type Definitions", "Declaration Files"],
                "Modern TS": ["TS 4.0+ Features", "Module Resolution", "Project References", "Strict Mode"]
            },
            "MongoDB": {
                "Fundamentals": ["Documents", "Collections", "Databases", "CRUD Operations", "Query Operators"],
                "Advanced": ["Aggregation Pipeline", "Indexing", "Transactions", "Change Streams", "GridFS"],
                "Schema Design": ["Embedding vs Referencing", "Data Modeling", "Relationships", "Validation"],
                "Performance": ["Query Optimization", "Sharding", "Replication", "Profiling", "Monitoring"],
                "Integration": ["Node.js Driver", "Mongoose ODM", "Python Driver", "Spring Data", "Atlas"]
            }
        }

    def generate_career_recommendations(self, profile: Dict[str, Any]) -> CareerRecommendation:
        """Generate career recommendations based on profile with certification links"""
        experience_level = profile.get("experience_level", "student")
        career_goals = profile.get("career_goals", "").lower()

        # Determine career path and certification level
        certification_level = "entry_level"
        if experience_level in ["professional", "mid_level", "senior"]:
            certification_level = "advanced"
        elif experience_level in ["fresher", "intermediate"]:
            certification_level = "intermediate"

        if "software" in career_goals or "developer" in career_goals or "engineer" in career_goals:
            career_path = "Software Engineering"
            short_term = ["Complete online courses in advanced topics", "Build personal projects", "Network with professionals"]
            long_term = ["Get industry certifications", "Specialize in a niche area", "Consider leadership roles"]
            salary_potential = "₹8-35 LPA depending on experience and location"
            certifications = self.certifications.get("software_engineer", {}).get(certification_level, [])
        elif "full stack" in career_goals or "mern" in career_goals:
            career_path = "Full Stack Development"
            short_term = ["Master React/Node.js fundamentals", "Build full-stack projects", "Learn deployment"]
            long_term = ["Get MERN stack certifications", "Master cloud platforms", "Build scalable applications"]
            salary_potential = "₹6-40 LPA depending on expertise"
            certifications = self.certifications.get("full_stack_developer", {}).get(certification_level, [])
        elif "data scientist" in career_goals or "machine learning" in career_goals:
            career_path = "Data Science & Machine Learning"
            short_term = ["Master Python and statistics", "Learn ML algorithms", "Work on real datasets"]
            long_term = ["Get TensorFlow/AWS ML certifications", "Specialize in NLP/CV", "Pursue PhD/research"]
            salary_potential = "₹8-70 LPA depending on specialization"
            certifications = self.certifications.get("data_scientist", {}).get(certification_level, [])
        elif "devops" in career_goals or "sre" in career_goals:
            career_path = "DevOps/Site Reliability Engineering"
            short_term = ["Learn Docker and Kubernetes", "Master CI/CD pipelines", "Understand cloud platforms"]
            long_term = ["Get AWS/Azure DevOps certifications", "Master infrastructure as code", "Focus on reliability"]
            salary_potential = "₹8-55 LPA depending on cloud expertise"
            certifications = self.certifications.get("devops_engineer", {}).get(certification_level, [])
        elif "cybersecurity" in career_goals or "security" in career_goals:
            career_path = "Cybersecurity"
            short_term = ["Learn ethical hacking basics", "Master networking concepts", "Get security fundamentals"]
            long_term = ["Earn CEH/CISSP certifications", "Specialize in penetration testing", "Focus on compliance"]
            salary_potential = "₹6-50 LPA depending on specialization"
            certifications = self.certifications.get("cybersecurity_analyst", {}).get(certification_level, [])
        elif "data" in career_goals or "analyst" in career_goals:
            career_path = "Data Analytics"
            short_term = ["Learn SQL and Python", "Practice with real datasets", "Get data visualization skills"]
            long_term = ["Pursue advanced analytics", "Consider data science role", "Get industry certifications"]
            salary_potential = "₹5-35 LPA depending on specialization"
            certifications = self.certifications.get("data_scientist", {}).get(certification_level, [])
        else:
            career_path = "Technology Professional"
            short_term = ["Identify specific career interests", "Build foundational skills", "Gain practical experience"]
            long_term = ["Specialize in chosen field", "Pursue advanced education", "Build professional network"]
            salary_potential = "₹5-30 LPA depending on role and experience"
            certifications = self.certifications.get("software_engineer", {}).get(certification_level, [])

        # Add certification goals to long term goals
        if certifications:
            cert_names = [cert["name"] for cert in certifications[:2]]  # Top 2 certifications
            long_term.insert(0, f"Get certified: {', '.join(cert_names)}")

        return CareerRecommendation(
            career_path=career_path,
            short_term_goals=short_term,
            long_term_goals=long_term,
            industry_trends=["AI/ML integration", "Cloud computing", "Remote work", "Continuous learning", "Industry certifications"],
            salary_potential=salary_potential,
            certifications=certifications
        )

    def analyze_skill_gaps(self, profile: Dict[str, Any]) -> SkillGapAnalysis:
        """Analyze skill gaps based on profile with detailed categories and learning resources"""
        experience_level = profile.get("experience_level", "student")
        current_skills = profile.get("current_skills", {})
        current_technical = set(current_skills.get("technical", []))
        current_soft = set(current_skills.get("soft", []))

        # Get required skills for experience level
        career_data = self.career_paths.get(experience_level, {}).get("software_engineer", {})
        required_skills = set(career_data.get("required_skills", []))
        recommended_skills = career_data.get("recommended_skills", [])

        # Find missing skills
        missing_skills = list(required_skills - current_technical)

        # Define skill categories
        skill_categories = {
            # Programming Languages
            "Python": "Programming Language",
            "JavaScript": "Programming Language",
            "Java": "Programming Language",
            "C++": "Programming Language",
            "TypeScript": "Programming Language",

            # Databases
            "SQL": "Database",
            "MongoDB": "Database",
            "PostgreSQL": "Database",

            # Web Technologies
            "React": "Frontend Framework",
            "Node.js": "Backend Framework",
            "HTML": "Web Technology",
            "CSS": "Web Technology",

            # Tools & Version Control
            "Git": "Version Control",
            "Docker": "Containerization",
            "Kubernetes": "Container Orchestration",
            "AWS": "Cloud Platform",

            # Soft Skills
            "Problem Solving": "Soft Skill",
            "Communication": "Soft Skill",
            "Teamwork": "Soft Skill",
            "Leadership": "Soft Skill",

            # Data & Analytics
            "Tableau": "Data Visualization",
            "Power BI": "Data Visualization",
            "Machine Learning": "Data Science",
            "Statistics": "Mathematics",

            # DevOps
            "Jenkins": "CI/CD",
            "Terraform": "Infrastructure as Code"
        }

        # Comprehensive learning resources for each skill
        learning_resources = {
            "Python": [
                {"name": "Python Official Documentation", "url": "https://docs.python.org/3/", "type": "Documentation"},
                {"name": "freeCodeCamp Python Course", "url": "https://www.freecodecamp.org/learn/scientific-computing-with-python/", "type": "Course"},
                {"name": "Python for Everybody (Coursera)", "url": "https://www.coursera.org/specializations/python", "type": "Course"},
                {"name": "Automate the Boring Stuff with Python", "url": "https://automatetheboringstuff.com/", "type": "Book"}
            ],
            "JavaScript": [
                {"name": "MDN JavaScript Guide", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", "type": "Documentation"},
                {"name": "JavaScript.info", "url": "https://javascript.info/", "type": "Tutorial"},
                {"name": "Eloquent JavaScript", "url": "https://eloquentjavascript.net/", "type": "Book"},
                {"name": "freeCodeCamp JavaScript", "url": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", "type": "Course"}
            ],
            "SQL": [
                {"name": "SQLZoo Interactive SQL", "url": "https://sqlzoo.net/", "type": "Interactive"},
                {"name": "W3Schools SQL Tutorial", "url": "https://www.w3schools.com/sql/", "type": "Tutorial"},
                {"name": "Mode Analytics SQL Tutorial", "url": "https://mode.com/sql-tutorial/", "type": "Tutorial"},
                {"name": "LeetCode SQL Problems", "url": "https://leetcode.com/problemset/database/", "type": "Practice"}
            ],
            "Git": [
                {"name": "Git Official Documentation", "url": "https://git-scm.com/doc", "type": "Documentation"},
                {"name": "Learn Git Branching", "url": "https://learngitbranching.js.org/", "type": "Interactive"},
                {"name": "GitHub Learning Lab", "url": "https://lab.github.com/", "type": "Tutorial"},
                {"name": "Atlassian Git Tutorials", "url": "https://www.atlassian.com/git/tutorials", "type": "Tutorial"}
            ],
            "React": [
                {"name": "React Official Tutorial", "url": "https://react.dev/learn/tutorial-tic-tac-toe", "type": "Tutorial"},
                {"name": "React Documentation", "url": "https://react.dev/", "type": "Documentation"},
                {"name": "freeCodeCamp React Course", "url": "https://www.freecodecamp.org/learn/front-end-development-libraries/", "type": "Course"},
                {"name": "React Router Documentation", "url": "https://reactrouter.com/en/main/start/tutorial", "type": "Documentation"}
            ],
            "Node.js": [
                {"name": "Node.js Official Documentation", "url": "https://nodejs.org/en/docs/", "type": "Documentation"},
                {"name": "Node.js Learn", "url": "https://nodejs.org/en/learn/", "type": "Tutorial"},
                {"name": "Express.js Guide", "url": "https://expressjs.com/en/guide/routing.html", "type": "Documentation"},
                {"name": "Node.js Best Practices", "url": "https://github.com/goldbergyoni/nodebestpractices", "type": "Guide"}
            ],
            "Docker": [
                {"name": "Docker Official Docs", "url": "https://docs.docker.com/", "type": "Documentation"},
                {"name": "Docker for Beginners", "url": "https://docker-curriculum.com/", "type": "Tutorial"},
                {"name": "Play with Docker", "url": "https://labs.play-with-docker.com/", "type": "Interactive"},
                {"name": "Docker Cheat Sheet", "url": "https://dockerlabs.collabnix.com/docker/cheatsheet/", "type": "Reference"}
            ],
            "AWS": [
                {"name": "AWS Free Tier", "url": "https://aws.amazon.com/free/", "type": "Platform"},
                {"name": "AWS Training", "url": "https://aws.training/", "type": "Course"},
                {"name": "AWS Documentation", "url": "https://docs.aws.amazon.com/", "type": "Documentation"},
                {"name": "A Cloud Guru AWS Course", "url": "https://acloudguru.com/course/aws-certified-solutions-architect-associate", "type": "Course"}
            ],
            "Problem Solving": [
                {"name": "LeetCode", "url": "https://leetcode.com/", "type": "Practice Platform"},
                {"name": "HackerRank", "url": "https://www.hackerrank.com/", "type": "Practice Platform"},
                {"name": "CodeSignal", "url": "https://codesignal.com/", "type": "Practice Platform"},
                {"name": "GeeksforGeeks Problem Solving", "url": "https://www.geeksforgeeks.org/problem-solving/", "type": "Tutorial"}
            ],
            "Communication": [
                {"name": "Toastmasters International", "url": "https://www.toastmasters.org/", "type": "Organization"},
                {"name": "Coursera Communication Skills", "url": "https://www.coursera.org/courses?query=communication%20skills", "type": "Course"},
                {"name": "LinkedIn Learning Communication", "url": "https://www.linkedin.com/learning/topics/communication-skills", "type": "Course"},
                {"name": "TED Talks on Communication", "url": "https://www.ted.com/topics/communication", "type": "Videos"}
            ],
            "Machine Learning": [
                {"name": "Coursera ML by Andrew Ng", "url": "https://www.coursera.org/learn/machine-learning", "type": "Course"},
                {"name": "fast.ai Practical Deep Learning", "url": "https://course.fast.ai/", "type": "Course"},
                {"name": "Scikit-learn Documentation", "url": "https://scikit-learn.org/stable/user_guide.html", "type": "Documentation"},
                {"name": "Kaggle Learn ML", "url": "https://www.kaggle.com/learn", "type": "Interactive"}
            ],
            "Tableau": [
                {"name": "Tableau Public", "url": "https://public.tableau.com/", "type": "Platform"},
                {"name": "Tableau eLearning", "url": "https://elearning.tableau.com/", "type": "Course"},
                {"name": "Tableau Training Videos", "url": "https://www.tableau.com/learn/training", "type": "Video"},
                {"name": "Tableau Community", "url": "https://community.tableau.com/", "type": "Community"}
            ]
        }

        # Add default resources for skills not in the detailed list
        for skill in missing_skills + recommended_skills:
            if skill not in learning_resources:
                learning_resources[skill] = [
                    {"name": f"Google '{skill}' Tutorial", "url": f"https://www.google.com/search?q={skill.replace(' ', '+')}+tutorial", "type": "Search"},
                    {"name": f"YouTube {skill} Course", "url": f"https://www.youtube.com/results?search_query={skill.replace(' ', '+')}+course", "type": "Video"},
                    {"name": f"Udemy {skill} Courses", "url": f"https://www.udemy.com/topic/{skill.replace(' ', '-')}/", "type": "Course"},
                    {"name": f"LinkedIn Learning {skill}", "url": f"https://www.linkedin.com/learning/search?keywords={skill.replace(' ', '%20')}", "type": "Course"}
                ]

        # Skill priorities and time estimates
        skill_priority = {}
        time_to_acquire = {}

        for skill in missing_skills + recommended_skills:
            if skill in ["Python", "JavaScript", "SQL", "Git", "Problem Solving", "Communication"]:
                skill_priority[skill] = "High"
                time_to_acquire[skill] = "1-3 months"
            elif skill in ["React", "Node.js", "Docker", "AWS", "Tableau"]:
                skill_priority[skill] = "Medium"
                time_to_acquire[skill] = "2-6 months"
            else:
                skill_priority[skill] = "Low"
                time_to_acquire[skill] = "3-12 months"

        return SkillGapAnalysis(
            missing_skills=missing_skills,
            recommended_skills=recommended_skills,
            skill_priority=skill_priority,
            time_to_acquire=time_to_acquire,
            skill_categories=skill_categories,
            learning_resources=learning_resources,
            skill_topics=self.skill_topics
        )

    def generate_job_recommendations(self, profile: Dict[str, Any]) -> List[JobRecommendation]:
        """Generate job recommendations based on profile with Indian salary ranges"""
        experience_level = profile.get("experience_level", "student")
        career_goals = profile.get("career_goals", "").lower()

        # Select appropriate job pool based on career goals
        if "full stack" in career_goals or "mern" in career_goals:
            job_pool = self.career_paths.get(experience_level, {}).get("full_stack_developer", {}).get("jobs", [])
        elif "data scientist" in career_goals or "machine learning" in career_goals:
            job_pool = self.career_paths.get(experience_level, {}).get("data_scientist", {}).get("jobs", [])
        elif "devops" in career_goals or "sre" in career_goals:
            job_pool = self.career_paths.get(experience_level, {}).get("devops_engineer", {}).get("jobs", [])
        elif "cybersecurity" in career_goals or "security" in career_goals:
            job_pool = self.career_paths.get(experience_level, {}).get("cybersecurity_analyst", {}).get("jobs", [])
        elif "software" in career_goals or "developer" in career_goals:
            job_pool = self.career_paths.get(experience_level, {}).get("software_engineer", {}).get("jobs", [])
        elif "data" in career_goals or "analyst" in career_goals:
            job_pool = self.career_paths.get(experience_level, {}).get("data_analyst", {}).get("jobs", [])
        else:
            job_pool = self.career_paths.get("student", {}).get("software_engineer", {}).get("jobs", [])

        # Convert to JobRecommendation objects with Indian salary ranges
        recommendations = []
        for job in job_pool[:3]:  # Limit to top 3
            # Determine salary based on experience level
            if experience_level == "student":
                salary_range = job.get("salary_fresher", "4-6 LPA")
            elif experience_level in ["fresher", "entry_level"]:
                salary_range = job.get("salary_intermediate", "8-12 LPA")
            elif experience_level in ["mid_level", "intermediate"]:
                salary_range = job.get("salary_senior", "15-25 LPA")
            else:
                salary_range = job.get("salary_senior", "20-35 LPA")

            # Get location from job data or default
            location = job.get("location", "Remote/Hybrid (India)")

            recommendations.append(JobRecommendation(
                title=job["title"],
                company=job["company"],
                location=location,
                salary_range=salary_range,
                match_score=85 + len(recommendations) * 5,  # Decreasing match scores
                required_skills=["Python", "JavaScript", "SQL", "Problem Solving", "Communication"][:3 + len(recommendations)],
                description=f"Exciting opportunity to work as a {job['title']} at {job['company']}. Competitive salary, great benefits, and excellent growth potential in India's tech ecosystem.",
                apply_link=job.get("apply_link", "#"),
                linkedin_link=job.get("linkedin_link", "#")
            ))

        return recommendations

    def generate_resume_guidance(self, profile: Dict[str, Any]) -> ResumeGuidance:
        """Generate resume improvement guidance"""
        education = profile.get("education", {})
        current_skills = profile.get("current_skills", {})
        experience_level = profile.get("experience_level", "student")

        # Analyze strengths
        strengths = []
        if education.get("degree"):
            strengths.append(f"Strong educational background in {education.get('field', 'your field')}")
        if current_skills.get("technical"):
            strengths.append(f"Technical skills in {', '.join(current_skills['technical'][:3])}")
        if current_skills.get("soft"):
            strengths.append("Good soft skills foundation")

        # Areas for improvement
        improvements = []
        if not current_skills.get("certifications"):
            improvements.append("Add relevant certifications to strengthen your profile")
        if len(current_skills.get("technical", [])) < 3:
            improvements.append("Expand your technical skill set")
        improvements.append("Include quantifiable achievements and metrics")

        # Suggested sections
        suggested_sections = [
            "Professional Summary",
            "Skills",
            "Professional Experience",
            "Education",
            "Projects",
            "Certifications"
        ]

        # Keywords based on career goals
        career_goals = profile.get("career_goals", "").lower()
        if "software" in career_goals:
            keywords = ["Python", "JavaScript", "React", "Node.js", "SQL", "Git", "Agile", "Scrum"]
        elif "data" in career_goals:
            keywords = ["Python", "SQL", "Tableau", "Excel", "Statistics", "Data Analysis", "Visualization"]
        else:
            keywords = ["Problem Solving", "Communication", "Teamwork", "Project Management"]

        return ResumeGuidance(
            strengths=strengths,
            areas_for_improvement=improvements,
            suggested_sections=suggested_sections,
            keyword_suggestions=keywords,
            ats_friendly_tips=[
                "Use standard fonts (Arial, Calibri)",
                "Include relevant keywords from job descriptions",
                "Use quantifiable achievements",
                "Keep file format as .docx or .pdf",
                "Avoid tables and complex formatting"
            ]
        )


# Global instance
career_guidance_service = CareerGuidanceService()