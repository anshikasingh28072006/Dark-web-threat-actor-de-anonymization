# Dark Web Threat Actor De-Anonymization Platform

 **AI-Powered Cyber Threat Intelligence (CTI), Multi-Hop Entity Resolution, and Statutory Electronic Evidence Certification**
An end-to-end cyber-forensics platform engineered to unmask anonymous threat actors operating across encrypted networks (Tor). The platform correlates fragmented digital footprints—including forum aliases, PGP keyblocks, cryptocurrency wallets, infrastructure misconfigurations, and circadian activity curves—to resolve obscured identities into actionable intelligence graphs and generate court-admissible evidence trails.

## Core Features

* **Isolated Ingestion Mesh:** Crawls hidden services (.onion) using isolated Tor SOCKS5 proxy routing to harvest threat actor handles, PGP key signatures, and payment addresses without leaking investigator IP footprints.
* **Shadow Infrastructure Detection:** Identifies exposed server status pages (mod_status), default banners, and SSL/TLS certificate serial reuses across public scanners to locate clearnet origin hosting IPs.
* **Bi-Focal Stylometry & Circadian Profiling:** Analyzes forum communication corpuses via character n-gram cosine similarities while mapping 24-hour diurnal posting activity to establish the threat actor's geographic timezone.
* **Blockchain Co-Spend Clustering:** Applies Satoshi multi-input UTXO heuristics to link unhosted Bitcoin wallets under common ownership and traces peel-chains to centralized KYC exchange gateways.
* **Deterministic TEF Scoring:** Eliminates black-box AI hallucinations by evaluating cross-source attribution confidence using the Traceability Evaluation Framework (TS = 0.385A + 0.204T + 0.412L).
* **Courtroom-Ready Admissibility:** Locks evidence graphs and scraped artifacts with continuous SHA-256 state hashing to automatically generate statutory certificates compliant with Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), 2023.

##  Tech Stack

* **Frontend:** React, TypeScript, Vite, Tailwind CSS
* **Backend & API:** FastAPI (Python), Node.js / Express (`server.ts`)
* **Analytics & NLP:** Hugging Face, Scikit-learn, NumPy, SciPy
* **Data & Graph Layer:** Neo4j, Elasticsearch, SQLite
* **Standards & Protocols:** STIX 2.1 JSON, Tor SOCKS5 Proxy Mesh

##  Forensic Pipeline
<img width="1143" height="1376" alt="ChatGPT Image Sep 26, 2026, 01_24_19 AM" src="https://github.com/user-attachments/assets/1102cd32-7df8-4838-aa64-edf50f754fb3" />


##  Research & Scientific Baselines

1. **Kainz et al. (2026):** *De-Anonymization Techniques in the Tor Network Using an Experimental Testbed* — Baseline for practical Tor infrastructure and endpoint exposure.
2. **Wangchuk & Rathod (2023):** *Open Source Intelligence and Dark Web User De-Anonymisation (Dark2Clear)* — Framework for automated harvesting and cross-platform OSINT correlation.
3. **Shin & Shin (2026):** *A Vulnerability Taxonomy for Tor-Based Hidden Services: Toward a De-Anonymization Framework for Cybercrime Investigation* — Multi-criteria decision model prioritizing legal admissibility ($L = 41.2\%$).
4. **Statutory Admissibility:** Native automated evidence hashing aligned with Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), 2023.

---

##  Getting Started

### Prerequisites

* Node.js (v18+) or Bun
* Python 3.10+
* Git
### Installation

1. **Clone the repository:**

   Open your terminal and run:
   ```bash
   git clone [https://github.com/anshikasingh28072006/Dark-web-threat-actor-de-anonymization.git](https://github.com/anshikasingh28072006/Dark-web-threat-actor-de-anonymization.git)
   cd Dark-web-threat-actor-de-anonymization

2. **Setup environment variables:**
    ```cp .env.example .env```

3. **Install frontend dependencies:**
    ```npm install```
    or
    ```bun install```

4. **Install backend dependencies:**
    ```pip install -r requirements.txt```

5. **Run the development servers:**
     **Start Python backend service**
    ```python backend.py```

     **Start frontend interface**
    ```npm run dev```


## 🔒 Security & Compliance

This tool is designed strictly for authorized cyber threat intelligence (CTI), law enforcement investigations, and institutional security research. All network interactions are performed through isolated proxies, and evidence data structures are cryptographically hashed to ensure integrity throughout the chain of custody.
