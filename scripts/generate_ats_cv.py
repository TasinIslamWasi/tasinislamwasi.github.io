import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def add_heading_with_bottom_border(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(13)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(text.upper())
    run.font.name = 'Calibri'
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(15, 23, 42)  # Professional Slate 900
    
    # Add clean solid bottom rule (100% ATS friendly)
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
                     r'<w:bottom w:val="single" w:sz="6" w:space="2" w:color="2563EB"/>'
                     r'</w:pBdr>')
    pPr.append(pBdr)
    return p

def add_bullet(doc, text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1.5)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.12
    p.paragraph_format.left_indent = Inches(0.25)
    
    if bold_prefix:
        r_prefix = p.add_run(bold_prefix)
        r_prefix.font.name = 'Calibri'
        r_prefix.font.size = Pt(9.5)
        r_prefix.font.bold = True
        r_prefix.font.color.rgb = RGBColor(17, 24, 39)
        
    r_text = p.add_run(text)
    r_text.font.name = 'Calibri'
    r_text.font.size = Pt(9.5)
    r_text.font.color.rgb = RGBColor(55, 65, 81)
    return p

def create_ats_resume(output_path):
    doc = docx.Document()
    
    # Set standard ATS page margins (0.65 in / ~47pt for optimal balance and ATS parsing)
    for section in doc.sections:
        section.top_margin = Inches(0.6)
        section.bottom_margin = Inches(0.6)
        section.left_margin = Inches(0.65)
        section.right_margin = Inches(0.65)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
    
    # Default typography
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(9.5)
    font.color.rgb = RGBColor(31, 41, 55)
    
    # -------------------------------------------------------------------------
    # 1. HEADER (Single Column - 100% ATS Safe)
    # -------------------------------------------------------------------------
    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(2)
    
    r_name = p_name.add_run("TASIN ISLAM WASI")
    r_name.font.name = 'Calibri'
    r_name.font.size = Pt(19)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(15, 23, 42)
    
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(4)
    
    r_title = p_title.add_run("Embedded Systems Engineer | IoT Solutions & Full-Stack Developer")
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(11)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(2, 132, 199)
    
    p_addr = doc.add_paragraph()
    p_addr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_addr.paragraph_format.space_before = Pt(0)
    p_addr.paragraph_format.space_after = Pt(2)
    r_addr = p_addr.add_run("Apt 8/D, Plot 242/6, 194 Adarsha Road, Section-10, Kafrul, Mirpur-1216, Dhaka, Bangladesh")
    r_addr.font.size = Pt(9)
    r_addr.font.color.rgb = RGBColor(75, 85, 99)
    
    p_contact = doc.add_paragraph()
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_contact.paragraph_format.space_before = Pt(0)
    p_contact.paragraph_format.space_after = Pt(2)
    r_c1 = p_contact.add_run("Phone: (+880) 01828601634  •  Email: tasinwasi646@gmail.com  •  Nationality: Bangladeshi")
    r_c1.font.size = Pt(9)
    r_c1.font.color.rgb = RGBColor(75, 85, 99)
    
    p_links = doc.add_paragraph()
    p_links.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_links.paragraph_format.space_before = Pt(0)
    p_links.paragraph_format.space_after = Pt(8)
    r_c2 = p_links.add_run("Portfolio: tasinislamwasi.github.io  •  LinkedIn: linkedin.com/in/tasinislamwasi  •  GitHub: github.com/TasinIslamWasi")
    r_c2.font.size = Pt(9)
    r_c2.font.color.rgb = RGBColor(75, 85, 99)
    
    # -------------------------------------------------------------------------
    # 2. PROFESSIONAL SUMMARY
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Professional Summary")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_before = Pt(3)
    p_sum.paragraph_format.space_after = Pt(6)
    p_sum.paragraph_format.line_spacing = 1.15
    r_sum = p_sum.add_run(
        "Electrical and Electronics Engineering graduate (BSc in EEE) and Full-Stack IoT Developer with specialized expertise in "
        "embedded systems, microcontroller programming, industrial automation, and end-to-end cloud platforms. Experienced in machine "
        "learning applications, AI data annotation and quality auditing, industrial automation (PLC/SCADA), circuit diagnostics, and "
        "energy-efficient hardware architectures. Strong foundation in hardware-software integration, research-driven systems, rapid prototyping, "
        "and AI-assisted development (Vibe Coding). Proven track record across corporate enterprise environments, site engineering, and "
        "mission-critical IT operations, building scalable IoT telemetry dashboards that bridge physical sensors with cloud services."
    )
    r_sum.font.size = Pt(9.5)
    r_sum.font.color.rgb = RGBColor(55, 65, 81)
    
    # -------------------------------------------------------------------------
    # 3. TECHNICAL SKILLS & TOOLS
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Technical Skills & Competencies")
    
    skills_data = [
        ("Core Engineering: ", "Embedded Systems, Internet of Things (IoT), Electronic Engineering, Circuit Design & Analysis, PCB Design, PLC Programming, Power Distribution, Industrial Automation, SCADA, Hardware Prototyping, Telemetry & Sensor Interfacing."),
        ("Software & Tools (23): ", "VS Code, Arduino IDE, PlatformIO, Proteus, MATLAB, Simulink, LTspice, KiCad, AutoCAD (2D/3D), Rhino, Firebase, Blynk, ThingSpeak, WordPress, cPanel, WHM, MySQL, Git, GitHub, Docker, Postman, Power BI, Zoho, Slack, MS Office."),
        ("Languages & Frameworks: ", "C++, Python, JavaScript, HTML5, CSS3, Object-Oriented Programming (OOP), SQL, Linux Shell Scripting, REST APIs."),
        ("Focus Areas & AI Workflows: ", "Vibe Coding, AI-Assisted Development, Autonomous AI Workflows, Rapid Prototyping, Prompt Engineering, Web Applications, Machine Learning, Data Analytics & Mining, Data Visualization, QA & Testing, Product Engineering.")
    ]
    
    for label, val in skills_data:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_before = Pt(1.5)
        p_sk.paragraph_format.space_after = Pt(2)
        p_sk.paragraph_format.line_spacing = 1.12
        p_sk.paragraph_format.left_indent = Inches(0.15)
        
        r_l = p_sk.add_run(label)
        r_l.font.bold = True
        r_l.font.size = Pt(9.5)
        r_l.font.color.rgb = RGBColor(15, 23, 42)
        
        r_v = p_sk.add_run(val)
        r_v.font.size = Pt(9.5)
        r_v.font.color.rgb = RGBColor(55, 65, 81)
        
    # -------------------------------------------------------------------------
    # 4. PROFESSIONAL WORK EXPERIENCE
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Work Experience")
    
    experiences = [
        {
            "role": "IoT & Full Stack Developer",
            "company": "Bangladesh IT Institute",
            "location": "Dhaka, Bangladesh",
            "dates": "01/10/2025 – Present",
            "bullets": [
                "Architect and deploy end-to-end IoT solutions, microcontroller sensor nodes, and smart telemetry controllers for client and organizational operations.",
                "Build full-stack web platforms and interactive dashboard interfaces, integrating responsive frontend design with secure REST APIs and cloud services.",
                "Manage IT infrastructure, local area networking, server deployment, and database connectivity to guarantee 99.9% uptime for operational systems.",
                "Lead hardware-software system integration, technical troubleshooting, diagnostic testing, and continuous firmware enhancement for outsourced technology projects.",
                "Support technical project planning, agile sprints, system documentation, and ongoing maintenance lifecycle."
            ]
        },
        {
            "role": "AI Data Annotator",
            "company": "Acote Group",
            "location": "Dhaka, Bangladesh",
            "dates": "01/08/2025 – 30/09/2025",
            "bullets": [
                "Performed multimodal data annotation across image, video, and audio streams for production computer vision and machine learning model training.",
                "Executed precise 2D/3D bounding boxes, polygon semantic segmentation, keypoint landmarking, object tracking, OCR transcriptions, and audio timestamping.",
                "Conducted rigorous data quality checks, benchmark validation, and discrepancy corrections, maintaining strict quality adherence (>98% accuracy)."
            ]
        },
        {
            "role": "Data Analyst",
            "company": "Eastern IT",
            "location": "Dhaka, Bangladesh",
            "dates": "01/03/2025 – 30/04/2025",
            "bullets": [
                "Analyzed commercial datasets spanning sales pipelines, customer leads, and revenue streams to identify growth opportunities and behavioral trends.",
                "Engineered automated business intelligence dashboards and performance KPI reports utilizing Microsoft Power BI and advanced Excel modeling.",
                "Executed data cleaning, schema validation, and trend analysis to inform strategic decision-making across executive and sales operations."
            ]
        },
        {
            "role": "Site Engineer (Contractual)",
            "company": "Regnum Resource Limited",
            "location": "Dhaka, Bangladesh",
            "dates": "01/07/2024 – 30/08/2024",
            "bullets": [
                "Supervised 24/7 mission-critical toll plaza IT infrastructure, automated toll collection devices, data networks, and telemetry peripherals.",
                "Executed on-site device setup, hardware mounting, network switch configuration, troubleshooting, and continuous data link synchronization.",
                "Monitored live network communications, diagnosed hardware/software anomalies in real-time, and eliminated operational downtime."
            ]
        },
        {
            "role": "Machine Learning Engineer (Intern)",
            "company": "ACI Ltd (Advanced Chemical Industries)",
            "location": "Dhaka, Bangladesh",
            "dates": "01/12/2023 – 31/03/2024",
            "bullets": [
                "Gained valuable experience in creating professional-grade automated factories using open-source hardware, Arduino, and embedded controllers.",
                "Responsibilities included circuit design, device programming, code development, design planning, and developing web forms for IoT devices.",
                "Programmed and tested embedded microcontrollers for automated power management and localized machine control.",
                "Performed circuit diagnostics, PCB schematic analysis, sensor calibration, and prepared detailed engineering documentation and test logs."
            ]
        },
        {
            "role": "Assistant Engineer",
            "company": "Believer Power & Engineering Ltd.",
            "location": "Dhaka, Bangladesh",
            "dates": "01/06/2022 – 31/08/2023",
            "bullets": [
                "Imported, marketed, and set up industrial devices including passenger/cargo elevators and heavy industrial diesel generators from international suppliers.",
                "Acquired hands-on expertise in device installation, electrical wiring, preventative maintenance, troubleshooting, and field project coordination.",
                "Executed on-site circuit and motor diagnostics to ensure uninterrupted operations and strict adherence to electrical safety protocols."
            ]
        }
    ]
    
    for exp in experiences:
        p_item = doc.add_paragraph()
        p_item.paragraph_format.space_before = Pt(5)
        p_item.paragraph_format.space_after = Pt(2)
        p_item.paragraph_format.keep_with_next = True
        
        r_role = p_item.add_run(exp["role"])
        r_role.font.bold = True
        r_role.font.size = Pt(10)
        r_role.font.color.rgb = RGBColor(15, 23, 42)
        
        r_sep = p_item.add_run("  |  ")
        r_sep.font.color.rgb = RGBColor(156, 163, 175)
        
        r_co = p_item.add_run(f"{exp['company']} — {exp['location']}")
        r_co.font.bold = False
        r_co.font.size = Pt(9.5)
        r_co.font.color.rgb = RGBColor(75, 85, 99)
        
        r_sp = p_item.add_run(f"  ({exp['dates']})")
        r_sp.font.italic = True
        r_sp.font.size = Pt(9)
        r_sp.font.color.rgb = RGBColor(2, 132, 199)
        
        for b in exp["bullets"]:
            add_bullet(doc, b)
            
    # -------------------------------------------------------------------------
    # 5. PROFESSIONAL TRAINING & CERTIFICATIONS
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Professional Training & Certifications")
    
    p_tr = doc.add_paragraph()
    p_tr.paragraph_format.space_before = Pt(4)
    p_tr.paragraph_format.space_after = Pt(2)
    p_tr.paragraph_format.keep_with_next = True
    
    r_tr_title = p_tr.add_run("Digital Business Operations")
    r_tr_title.font.bold = True
    r_tr_title.font.size = Pt(10)
    r_tr_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_tr_inst = p_tr.add_run("  |  Bangladesh IT Institute (SICIP) — Dhaka, Bangladesh  (2026-07-14 to 2026-09-13)")
    r_tr_inst.font.size = Pt(9.5)
    r_tr_inst.font.color.rgb = RGBColor(75, 85, 99)
    
    training_topics = [
        "Digital Business Operations & Process Optimization; IT Infrastructure & Technology Operations.",
        "IoT Systems & Smart Device Operations; Cloud Computing & Digital Infrastructure Management.",
        "AI-Powered Business Automation & Workflow Integration; CRM, ERP & Enterprise System Operations.",
        "Data Analytics, Business Intelligence & Dashboard Development; API Integration & Software Management.",
        "Cybersecurity, Data Protection & Digital Risk Management; Digital Transformation & Technology Project Management."
    ]
    for top in training_topics:
        add_bullet(doc, top)
        
    # -------------------------------------------------------------------------
    # 6. KEY ENGINEERING & CAPSTONE PROJECTS
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Key Engineering & Technical Projects")
    
    projects = [
        {
            "name": "Smart Poultry Farm Monitoring System (Internship)",
            "dates": "02/03/2024 – 28/03/2024",
            "tech": "IoT, ESP32, Gas Sensors (NH3/CO/CO2), Cloud Telemetry, Mobile App",
            "desc": "Innovative IoT device engineered for continuous 24/7 poultry farm surveillance. Detects critical environmental factors including ammonia and toxic gas concentrations, ambient temperature, and humidity. Integrates vision monitoring and allows remote mobile command over water pumps, lighting, and ventilation fans."
        },
        {
            "name": "Soap Manufacturing Automation Unit (Internship)",
            "dates": "05/02/2024 – 15/02/2024",
            "tech": "PLC Ladder Logic, DC Steppers, Optical Presence Sensors, Relay Safety Logic",
            "desc": "Automated miniature continuous soap factory integrating raw material dispensing, conveyor transport, and pneumatic packaging. Governed by PLC ladder logic with clearly structured motor drivers and interlock control wiring. (GitHub: github.com/TasinIslamWasi/-Soap-manufacturing-automation-unit-Internship-)"
        },
        {
            "name": "Smart Traffic Management System Using Piezo Electric (Final Year Capstone Project)",
            "dates": "03/03/2023 – 18/04/2023",
            "tech": "Arduino Microcontroller, Piezoelectric Sensors, Energy Harvester, Traffic Signal Logic",
            "desc": "Capstone final project utilizing piezoelectric sensors embedded beneath roadway surfaces to detect vehicle weight and pressure vibrations. Arduino processes real-time density to dynamically adapt traffic signal cycles while harvesting kinetic footstep/vehicle energy for self-sustaining operation."
        },
        {
            "name": "Energy Harvesting from Footsteps (Piezoelectric Tiles)",
            "dates": "06/12/2022 – 08/12/2022",
            "tech": "Piezoelectric Transducers, Energy Harvesting Circuitry, Battery Storage",
            "desc": "Designed a sustainable micro-generation system converting human footstep impact on tiles into electrical energy stored in battery banks for low-power urban infrastructure and smart streetlighting."
        },
        {
            "name": "Smart Traffic Light Control System",
            "dates": "01/11/2022 – 12/11/2022",
            "tech": "Optical Vehicle Sensors, Algorithm Optimization, Arduino",
            "desc": "Intelligent traffic controller adjusting green-phase timing based on real-time vehicle flow to reduce intersection congestion and urban fuel consumption."
        },
        {
            "name": "IoT-Based Meteorological Weather Monitoring System",
            "dates": "20/06/2022 – 25/06/2022",
            "tech": "ESP8266/ESP32, Barometric & Humidity Sensors, Cloud IoT Platform, REST API",
            "desc": "Cloud-connected outdoor telemetry station gathering atmospheric metrics (temperature, humidity, pressure) and streaming live data packets to a remote dashboard for climate and environmental analytics."
        },
        {
            "name": "Solar-Powered Smart Irrigation System",
            "dates": "01/04/2022 – 15/04/2022",
            "tech": "Solar MPPT, Soil Moisture Probes, Automated Relay Actuators",
            "desc": "Eco-friendly precision irrigation system leveraging solar power and capacitive soil sensors to automate water delivery based on real-time soil moisture content."
        }
    ]
    
    for proj in projects:
        p_pr = doc.add_paragraph()
        p_pr.paragraph_format.space_before = Pt(4.5)
        p_pr.paragraph_format.space_after = Pt(1.5)
        p_pr.paragraph_format.keep_with_next = True
        
        r_pname = p_pr.add_run(proj["name"])
        r_pname.font.bold = True
        r_pname.font.size = Pt(9.5)
        r_pname.font.color.rgb = RGBColor(15, 23, 42)
        
        r_pdates = p_pr.add_run(f"  ({proj['dates']})")
        r_pdates.font.size = Pt(8.5)
        r_pdates.font.italic = True
        r_pdates.font.color.rgb = RGBColor(2, 132, 199)
        
        add_bullet(doc, proj["desc"], bold_prefix=f"Tech Stack: {proj['tech']} — ")
        
    # -------------------------------------------------------------------------
    # 7. EDUCATION
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Education")
    
    edu_items = [
        {
            "degree": "Bachelor of Science in Electrical and Electronic Engineering (BSc in EEE)",
            "school": "Manarat International University",
            "location": "Dhaka, Bangladesh",
            "dates": "01/01/2019 – 07/09/2024",
            "grade": "Final Grade: 2.84 / 4.00",
            "credits": "Completed Credits: 147 Credit Hours",
            "eqf": "Level in EQF: EQF Level 6",
            "website": "manarat.ac.bd",
            "note": "Field of Study: Electrical and Electronic Engineering. Major focus on Embedded Systems, Industrial Automation, Circuit Diagnostics & Power Engineering."
        },
        {
            "degree": "Higher Secondary Certificate (HSC) — Science",
            "school": "Dhaka Model College",
            "location": "Dhaka, Bangladesh",
            "dates": "01/06/2016 – 19/07/2018",
            "grade": "Final Grade: 3.83 / 5.00",
            "credits": "Field of Study: Science",
            "eqf": "Level in EQF: EQF Level 5",
            "website": "dmdcollege.edu.bd",
            "note": "Core Subjects: Physics, Chemistry, Higher Mathematics, Biology."
        },
        {
            "degree": "Secondary School Certificate (SSC) — Science",
            "school": "Bangladesh Muktizodha Ucha Bidyalay",
            "location": "Dhaka, Bangladesh",
            "dates": "01/01/2014 – 11/05/2016",
            "grade": "Final Grade: 4.72 / 5.00",
            "credits": "Field of Study: Science",
            "eqf": "Level in EQF: EQF Level 4",
            "website": "www.bmhsdhaka.edu.bd",
            "note": "Core Subjects: General Science, Mathematics, Physics, Chemistry."
        }
    ]
    
    for edu in edu_items:
        p_ed = doc.add_paragraph()
        p_ed.paragraph_format.space_before = Pt(4)
        p_ed.paragraph_format.space_after = Pt(1)
        p_ed.paragraph_format.keep_with_next = True
        
        r_deg = p_ed.add_run(edu["degree"])
        r_deg.font.bold = True
        r_deg.font.size = Pt(10)
        r_deg.font.color.rgb = RGBColor(15, 23, 42)
        
        r_inst = p_ed.add_run(f" — {edu['school']}, {edu['location']} ({edu['dates']})")
        r_inst.font.size = Pt(9.5)
        r_inst.font.color.rgb = RGBColor(75, 85, 99)
        
        p_ed_meta = doc.add_paragraph()
        p_ed_meta.paragraph_format.space_before = Pt(0)
        p_ed_meta.paragraph_format.space_after = Pt(3)
        p_ed_meta.paragraph_format.left_indent = Inches(0.2)
        
        r_meta = p_ed_meta.add_run(f"• {edu['grade']}  |  {edu['credits']}  |  {edu['eqf']}  |  Website: {edu['website']}\n  {edu['note']}")
        r_meta.font.size = Pt(9)
        r_meta.font.color.rgb = RGBColor(107, 114, 128)
        
    # -------------------------------------------------------------------------
    # 8. TECHNICAL CONFERENCES, WORKSHOPS & INDUSTRIAL TOURS
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Conferences, Seminars & Technical Workshops")
    
    activities = [
        ("International Fire, Safety, and Security Expo (IFSSE 2024): ", "15/09/2024 – 17/09/2024, Dhaka — Participated in the 9th IFSSE 2024, examining intelligent building safety, industrial security solutions, and fire alarm telemetry."),
        ("POWER-GEN Expo 2024: ", "16/05/2024 – 18/05/2024, Dhaka — Attended the 9th International POWER-GEN Expo, exploring high-voltage substations, smart solar inverters, and grid power advancements."),
        ("Workshop on 'A to Z of Transformer': ", "04/12/2021, Manarat International University — Technical training on transformer design, core laminations, and fault diagnostics conducted by Mr. M A Masud Khan (Manager Grade-1, Sena Kalyan Electric Industries). (Certificate: drive.google.com/file/d/1ecJTVJiNijx4niHlbQgzbMZwzEisEdTZ/view)"),
        ("IoT and Embedded Systems Workshop: ", "08/10/2022, Manarat International University — Hands-on sensor interfacing, PCB wiring, and firmware programming."),
        ("Industrial Tour — Ghorashal 108 MW Gas Power Plant: ", "11/02/2023 — On-site inspection of turbine generation units, high-pressure boilers, and central synchronization panels."),
        ("Industrial Tour — 132/33 kV Grid Substation (PGCB Mirpur): ", "09/10/2022 — Field inspection of power transformers, circuit breakers, SF6 switchgear, and protection relay systems."),
        ("Project Showcasing Fest 2022: ", "17/04/2022 — Demonstrated prototype of Solar Powered Smart Irrigation System at MIU EEE Club exhibition.")
    ]
    for pfx, act in activities:
        add_bullet(doc, act, bold_prefix=pfx)
        
    # -------------------------------------------------------------------------
    # 9. LANGUAGES & HOBBIES
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Language Skills & Extracurricular Interests")
    
    p_lang = doc.add_paragraph()
    p_lang.paragraph_format.space_before = Pt(2)
    p_lang.paragraph_format.space_after = Pt(2)
    p_lang.paragraph_format.left_indent = Inches(0.15)
    
    r_l1 = p_lang.add_run("Bengali: ")
    r_l1.font.bold = True
    r_l1.font.size = Pt(9.5)
    r_l1.font.color.rgb = RGBColor(15, 23, 42)
    r_l1_v = p_lang.add_run("Mother Tongue (Native Proficiency)   |   ")
    r_l1_v.font.size = Pt(9.5)
    r_l1_v.font.color.rgb = RGBColor(55, 65, 81)
    
    r_l2 = p_lang.add_run("English: ")
    r_l2.font.bold = True
    r_l2.font.size = Pt(9.5)
    r_l2.font.color.rgb = RGBColor(15, 23, 42)
    r_l2_v = p_lang.add_run("CEFR B2 Level (Listening: B2, Reading: B2, Spoken Interaction: B2, Spoken Production: B2, Writing: B2)")
    r_l2_v.font.size = Pt(9.5)
    r_l2_v.font.color.rgb = RGBColor(55, 65, 81)
    
    p_hob = doc.add_paragraph()
    p_hob.paragraph_format.space_before = Pt(2)
    p_hob.paragraph_format.space_after = Pt(4)
    p_hob.paragraph_format.left_indent = Inches(0.15)
    
    r_h1 = p_hob.add_run("Interests & Extracurricular: ")
    r_h1.font.bold = True
    r_h1.font.size = Pt(9.5)
    r_h1.font.color.rgb = RGBColor(15, 23, 42)
    
    r_h1_v = p_hob.add_run("Virtual Geographical Exploration (geospatial analysis & infrastructure mapping via Google Maps/Street View), Photography, Technical Videography, Hardware Prototyping & Miniature Making.")
    r_h1_v.font.size = Pt(9.5)
    r_h1_v.font.color.rgb = RGBColor(55, 65, 81)
    
    # -------------------------------------------------------------------------
    # 10. PROFESSIONAL REFERENCES & RECOMMENDATIONS
    # -------------------------------------------------------------------------
    add_heading_with_bottom_border(doc, "Professional References & Recommendations")
    
    refs = [
        {
            "name": "K.M. Aktheruzzaman",
            "title": "Head & Associate Professor, Department of Electrical & Electronic Engineering",
            "org": "Manarat International University (MIU), Dhaka, Bangladesh",
            "phone": "(+880) 01715408417",
            "endorsement": "Can attest to academic commitment, intellectual curiosity, technical excellence, and potential for advanced engineering research."
        },
        {
            "name": "Md. Rahat Khan Redoy",
            "title": "IoT Developer, Department of Management Information Systems (MIS)",
            "org": "Advanced Chemical Industries Limited (ACI Ltd), Dhaka, Bangladesh",
            "phone": "(+880) 01704114243",
            "endorsement": "Can speak to technical competencies in IoT development, hardware-software integration, professional conduct, and problem-solving skills."
        }
    ]
    
    for ref in refs:
        p_rf = doc.add_paragraph()
        p_rf.paragraph_format.space_before = Pt(3.5)
        p_rf.paragraph_format.space_after = Pt(1)
        p_rf.paragraph_format.keep_with_next = True
        
        r_rname = p_rf.add_run(ref["name"])
        r_rname.font.bold = True
        r_rname.font.size = Pt(9.5)
        r_rname.font.color.rgb = RGBColor(15, 23, 42)
        
        r_rtitle = p_rf.add_run(f" — {ref['title']}")
        r_rtitle.font.size = Pt(9.5)
        r_rtitle.font.color.rgb = RGBColor(75, 85, 99)
        
        p_rf_det = doc.add_paragraph()
        p_rf_det.paragraph_format.space_before = Pt(0)
        p_rf_det.paragraph_format.space_after = Pt(3)
        p_rf_det.paragraph_format.left_indent = Inches(0.2)
        
        r_rf_det = p_rf_det.add_run(f"• Institution: {ref['org']}  |  Phone: {ref['phone']}\n  Endorsement: {ref['endorsement']}")
        r_rf_det.font.size = Pt(9)
        r_rf_det.font.color.rgb = RGBColor(107, 114, 128)

    # Save document
    doc.save(output_path)
    print(f"Comprehensive ATS Resume successfully created at: {output_path}")

if __name__ == '__main__':
    create_ats_resume('Tasin_Islam_Wasi_ATS_Resume.docx')
