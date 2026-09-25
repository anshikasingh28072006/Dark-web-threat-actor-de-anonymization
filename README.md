# Dark Web Threat Actor De-Anonymization Platform

 **AI-Powered Cyber Threat Intelligence (CTI), Multi-Hop Entity Resolution, and Statutory Electronic Evidence Certification**
An end-to-end cyber-forensics platform engineered to unmask anonymous threat actors operating across encrypted networks (Tor). The platform correlates fragmented digital footprints including forum aliases, PGP keyblocks, cryptocurrency wallets, infrastructure misconfigurations, and circadian activity curves—to resolve obscured identities into actionable intelligence graphs and generate court-admissible evidence trails.

## Core Features

* **Isolated Ingestion Mesh:** Crawls hidden services (.onion) using isolated Tor SOCKS5 proxy routing to harvest threat actor handles, PGP key signatures, and payment addresses without leaking investigator IP footprints.
* **Shadow Infrastructure Detection:** Identifies exposed server status pages (mod_status), default banners, and SSL/TLS certificate serial reuses across public scanners to locate clearnet origin hosting IPs.
* **Bi-Focal Stylometry & Circadian Profiling:** Analyzes forum communication corpuses via character n-gram cosine similarities while mapping 24-hour diurnal posting activity to establish the threat actor's geographic timezone.
* **Blockchain Co-Spend Clustering:** Applies Satoshi multi-input UTXO heuristics to link unhosted Bitcoin wallets under common ownership and traces peel-chains to centralized KYC exchange gateways.
* **Deterministic TEF Scoring:** Eliminates black-box AI hallucinations by evaluating cross-source attribution confidence using the Traceability Evaluation Framework ```(TS = 0.385A + 0.204T + 0.412L)```.
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
 
     **Start Python backend service** :-
    ```python backend.py```

     **Start frontend interface** :-
    ```npm run dev```


##  Security & Compliance

This tool is designed strictly for authorized cyber threat intelligence (CTI), law enforcement investigations, and institutional security research. All network interactions are performed through isolated proxies, and evidence data structures are cryptographically hashed to ensure integrity throughout the chain of custody.

##  Live Prototype & Platform Walkthrough

>  **Live Demo:** https://dark-web-threat-actor-de-anonymizat.vercel.app/

---

### 1. Unified Detection Vector & Recon Entry

<img width="1917" height="871" alt="Unified Detection Vector" src="https://github.com/user-attachments/assets/c190c6b8-f83d-49fc-ad3e-e93b693ff353" />

* **Dual-Vector Ingestion:** Allows investigators to initiate targeted reconnaissance by providing either an anonymous darknet forum alias (Option 1) or an unhosted cryptocurrency transaction address (Option 2).
* **Multi-Modal AI & Deterministic Routing:** Automatically routes target data through Sentence-BERT transformer embeddings, TF-IDF stylometry, and multi-input UTXO clustering engines simultaneously.

---

### 2. Multi-Hop Attribution Graph & Hybrid Confidence Scoring

<img width="1917" height="868" alt="Attribution Graph" src="https://github.com/user-attachments/assets/c5288112-34c4-41fa-a611-21dc51c1a525" />

* **4-Pole Attribution Topology:** Interactively maps connections across four operational dimensions: Digital Personas, Cryptographic Proofs/Keys, Network Infrastructure, and Fiat Off-Ramp Anchors.
* **Dual-Engine Confidence (91.8%):** Combines the deterministic **Mathematical TS Score (91.6%)**—evaluating applicability, ease, and legal admissibility—with the **AI Neural Ensemble Score (92%)** based on semantic sentence embeddings and chronobiology.

---

### 3. Statutory Digital Evidence Certification (Section 63 BSA)

<img width="1917" height="867" alt="Section 63 BSA Certificate" src="https://github.com/user-attachments/assets/4da10f8d-e81c-4e6f-9ed0-735a15c49534" />

* **Court-Admissible Evidence Dossier:** Automatically generates an exportable legal certificate compliant with Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), 2023.
* **Continuous Cryptographic Sealing:** Fixes an unalterable SHA-256 integrity hash across all ingested graph nodes, scraped posts, and transaction ledgers to guarantee strict chain-of-custody compliance.

---

### 4. Circadian Chronobiology & Diurnal Sleep Analysis

<img width="1917" height="866" alt="Diurnal Heatmap" src="https://github.com/user-attachments/assets/d8dbdc1b-7809-42d8-8fd4-01bdeb55bcfa" />

* **7-Day Activity Heatmap:** Aggregates timestamped forum communications into an hourly posting density matrix to identify biological downtime (sleep curve between 02:00–06:00 UTC).
* **Deterministic Timezone Inference:** Correlates physiological activity troughs to infer operational timezones with 98.4% confidence (e.g., UTC+03:00 / Moscow / East Europe), ruling out false geographical leads.

---

### 5. Cross-Marketplace Stylometric NLP Difference Engine

<img width="1917" height="853" alt="Stylometry Diff Engine" src="https://github.com/user-attachments/assets/d5154f51-57f9-4f91-8a39-8e17246a5835" />

* **Character N-Gram & Syntax Matching:** Side-by-side linguistic comparison engine computing a 91.4% TF-IDF Cosine similarity between target posts across disparate darknet platforms (Dread vs Exploit.in).
* **Habitual Marker Extraction:** Flags idiosyncratic punctuation habits, specific PGP key fingerprints (`7C3B901A`), and negotiation syntax to confirm identical authorship across multiple aliases.
