import { ThreatActorProfile } from '../types';

export const THREAT_PROFILES: Record<string, ThreatActorProfile> = {
  spectre: {
    id: 'spectre',
    name: 'Spectre_Syndicate',
    badge: 'TIER-1 CYBER THREAT',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    aliases: ['GhostBroker', 'SpectreOp', 'VaporZero', 'NemesisVendor'],
    vector: 'Initial Access / Enterprise RaaS Broker',
    locale: 'Eastern Europe / Moscow (RU/BY)',
    proceeds: '~158.4 BTC ($9.8M USD)',
    rebrand: 'Active Forum Rebrand & Migration',
    diurnal: {
      zone: 'UTC+03:00 (Moscow / MSK)',
      inferredOffset: '+03:00',
      sleepWindow: [2, 7],
      peakWindow: [14, 21],
      hourly: [2, 1, 0, 0, 0, 1, 0, 2, 8, 19, 28, 34, 45, 52, 68, 79, 88, 94, 82, 65, 48, 26, 12, 5],
      forums: 'Dread (412 posts), Exploit.in (840 posts), BreachForums (189 posts)',
      confidence: 96.2
    },
    stylometric: {
      sourceHandle: 'GhostBroker (Dread Forum, 2023)',
      targetHandle: 'VaporZero (BreachForums v2, 2024)',
      sampleA: `Greetings to all members,,, releasing our private active directory dumper ? escrow accepted via bc1q9v8p4...cold only. Do not waste time with fake proof, ping me on Jabber sh3ll broker. Fresh enterprise corporate access available with uncompromised domain admin hash dump,,, escrow fee borne by buyer.`,
      sampleB: `Hello breach community,,, fresh domain controller dumps available ? escrow deposit at bc1q9v8p4...cold ready. Do not waste time with fake escrow, ping on session with sh3ll access. Verified enterprise corporate access available with uncompromised domain admin credentials,,, bulk price negotiable.`,
      sentenceLength: '18.4 words/sentence',
      ttr: 0.762,
      tripleCommaMatch: 18,
      questionMarkDetached: 12,
      homoglyphCount: 14,
      leetspeakTokens: ['sh3ll', 'w4ll3t', 'p4ssw0rd', '3scr0w']
    },
    tef: {
      applicability: 94,
      technicalEase: 86,
      legalAdmissibility: 92
    },
    sec65b: {
      ref: 'NTRO/65B/2024-SPEC-918',
      hash: 'e7f842b03698d5c414901f46820df38a164993ec974e6f481c0022416bc7ef09',
      custody: 'CONTINUOUS ENCRYPTED AIR-GAPPED FORENSIC VAULT',
      custodian: 'Superintendent of Digital Forensics (NTRO Cyber Division)',
      hardwareUuid: 'NTRO-HW-RIG-09-4A91-88FE'
    },
    nodes: [
      // Threat Actor Root
      { id: 'actor_spectre', label: 'Spectre Syndicate\n[Target Core]', type: 'actor', details: 'Mastermind coordinator of corporate initial access and ransomware affiliate group.', firstSeen: '2021-04-12', confidence: 99.8 },

      // Forum Handles (Blue)
      { id: 'handle_ghostbroker', label: 'GhostBroker\n(Dread)', type: 'handle', details: 'Primary legacy vendor persona on Dread forum. Highly active 2021-2023.', firstSeen: '2021-06-01', confidence: 96.0 },
      { id: 'handle_spectreop', label: 'SpectreOp\n(Exploit.in)', type: 'handle', details: 'Access broker on Exploit.in specializing in VPN & Citrix gateway dumps.', firstSeen: '2022-02-14', confidence: 94.2 },
      { id: 'handle_vaporzero', label: 'VaporZero\n(BreachForums)', type: 'handle', details: 'Active vendor persona on BreachForums v2 selling domain controller dumps.', firstSeen: '2023-11-20', confidence: 95.5 },
      { id: 'handle_nemesis', label: 'NemesisVendor\n(Nemesis)', type: 'handle', details: 'Automated escrow listing vendor bot on Nemesis Market.', firstSeen: '2023-08-10', confidence: 89.4 },
      { id: 'handle_xss_ghost', label: 'Ghost_IAB\n(XSS.is)', type: 'handle', details: 'Verified access broker persona on XSS.is offering RDP backdoors.', firstSeen: '2022-09-03', confidence: 91.8 },
      { id: 'handle_rampfan', label: 'RampShadow\n(RAMP Forum)', type: 'handle', details: 'Chinese/Russian bilingual broker active on RAMP darknet board.', firstSeen: '2023-01-19', confidence: 88.0 },

      // Wallets (Gold)
      { id: 'wallet_cold_btc', label: 'bc1q9v8...cold\n(Cold Vault)', type: 'wallet', details: 'Primary consolidation cold wallet holding 142.84 BTC in unspent outputs.', firstSeen: '2021-08-19', confidence: 98.5 },
      { id: 'wallet_hydra_dep', label: '1A1zP1e...hydra\n(Hydra Escrow)', type: 'wallet', details: 'Deposit address tied to historical Dread marketplace escrow transactions.', firstSeen: '2022-01-11', confidence: 100.0 },
      { id: 'wallet_peel_chain', label: 'bc1q7w2...peel\n(ChipMixer Peel)', type: 'wallet', details: 'ChipMixer laundering peel hop transaction address.', firstSeen: '2023-04-05', confidence: 97.2 },
      { id: 'wallet_breach_payout', label: '3J98t1W...payout\n(Breach Payout)', type: 'wallet', details: 'Direct payout wallet designated in BreachForums escrow trade.', firstSeen: '2023-12-01', confidence: 99.1 },
      { id: 'wallet_wasabi_out', label: 'bc1qxx5...wasabi\n(Wasabi CoinJoin)', type: 'wallet', details: 'Wasabi Wallet 2.0 CoinJoin coordinator output change address.', firstSeen: '2024-02-14', confidence: 93.8 },
      { id: 'wallet_tether_bridge', label: '0x71C...USDT\n(Tron Bridge)', type: 'wallet', details: 'TRC-20 USDT bridge address used for off-ramping illicit crypto proceeds.', firstSeen: '2023-07-22', confidence: 92.4 },

      // PGP Keys (Green)
      { id: 'pgp_master_4096', label: 'PGP-4096\n0x9E7A412F', type: 'pgp', details: 'RSA-4096 master signing key utilized across Dread and Exploit forum announcements.', firstSeen: '2021-05-10', confidence: 99.9 },
      { id: 'pgp_subkey_enc', label: 'SUBKEY-0x9E7A-E\n[Encryption]', type: 'pgp', details: 'PGP subkey utilized for encrypting session and tox contact exchanges.', firstSeen: '2021-05-10', confidence: 98.4 },
      { id: 'pgp_vapor_subkey', label: 'SUBKEY-0x9E7A-S\n[Breach Sign]', type: 'pgp', details: 'Subkey used by VaporZero on BreachForums, signed by identical master key.', firstSeen: '2023-11-20', confidence: 100.0 },
      { id: 'pgp_exploit_cert', label: 'PGP-Exploit\n0x88BA12C0', type: 'pgp', details: 'Historical PGP key published in Exploit.in profile signature.', firstSeen: '2022-03-01', confidence: 96.0 },

      // Infrastructure / Server / C2 (Gray)
      { id: 'infra_c2_vps', label: '185.220.101.45\n(Bulgarian VPS)', type: 'infra', details: 'Reverse proxy host running darknet shop front and automated escrow bot.', firstSeen: '2022-10-14', confidence: 94.0 },
      { id: 'infra_nginx_hash', label: 'Nginx-404-Hash\n0xFA391C10', type: 'infra', details: 'Custom HTTP 404 response header hash matching across three darknet mirrors.', firstSeen: '2023-02-18', confidence: 96.5 },
      { id: 'infra_jarm_fp', label: 'JARM-TLS\n27d3ed3ed...', type: 'infra', details: 'JARM TLS fingerprint: 27d3ed3ed0003ed1dc42d43d43d41d9426f42319f39000a6f8742fb6e46820.', firstSeen: '2023-03-12', confidence: 98.0 },
      { id: 'infra_ssh_hostkey', label: 'SSH-ED25519\nSHA256:7mG89q...', type: 'infra', details: 'Identical OpenSSH host key fingerprint observed across target server cluster.', firstSeen: '2023-05-30', confidence: 99.4 },
      { id: 'infra_tor_exit', label: 'ExitNode-51.15.8\n(Tor Guard)', type: 'infra', details: 'Pinned Tor middle guard relay configured on threat actor development machine.', firstSeen: '2023-09-11', confidence: 87.2 },
      { id: 'infra_jabber_srv', label: 'xmpp.sh3ll.is\n(Jabber Node)', type: 'infra', details: 'Private hardened XMPP/OTR relay host referenced in pastebin drop.', firstSeen: '2022-07-09', confidence: 93.1 },
      { id: 'infra_tox_relay', label: 'Tox-Bootstrap-04\n(P2P Node)', type: 'infra', details: 'Tox DHT bootstrap daemon hosting threat actor encrypted communications.', firstSeen: '2024-01-05', confidence: 89.0 }
    ],
    edges: [
      // Deterministic Edges (Solid)
      { id: 'e1', source: 'actor_spectre', target: 'handle_ghostbroker', label: 'Master Persona Link', type: 'deterministic', vector: 'PGP', confidence: 99.0, details: 'Signed identity claim published on dread proof ledger.' },
      { id: 'e2', source: 'actor_spectre', target: 'pgp_master_4096', label: 'Master Key Holder', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0x9E7A412F', details: 'Primary OpenPGP identity token.' },
      { id: 'e3', source: 'pgp_master_4096', target: 'pgp_subkey_enc', label: 'Subkey Binding Signature', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0x9E7A-E', details: 'Cryptographically certified by Master Key 0x9E7A412F.' },
      { id: 'e4', source: 'pgp_master_4096', target: 'pgp_vapor_subkey', label: 'Subkey Cross-Certification', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0x9E7A-S', details: 'VaporZero subkey generated and signed by identical master RSA key.' },
      { id: 'e5', source: 'handle_ghostbroker', target: 'wallet_hydra_dep', label: 'Escrow Deposit Publication', type: 'deterministic', vector: 'Wallets', confidence: 99.0, details: 'Address published in dread post #41209.' },
      { id: 'e6', source: 'wallet_hydra_dep', target: 'wallet_cold_btc', label: 'Co-Spend UTXO Consolidation', type: 'deterministic', vector: 'Wallets', confidence: 100.0, txHash: '7c89a01f89bc2143de8745129038abce128793410294821a08734291834232bd', details: 'Common-input ownership proof: both addresses spent inputs into 7c89a01f.' },
      { id: 'e7', source: 'wallet_cold_btc', target: 'wallet_peel_chain', label: 'Mixer Peel Hop', type: 'deterministic', vector: 'Wallets', confidence: 98.0, txHash: '4a19b88e1029c782019482319082341490218934891283948192839182391283', details: 'ChipMixer laundering hop traced with unspent change.' },
      { id: 'e8', source: 'wallet_cold_btc', target: 'wallet_breach_payout', label: 'Direct Wallet Transfer', type: 'deterministic', vector: 'Wallets', confidence: 99.5, txHash: '9183bce820194821039481029384019283019283019283019283019283019283', details: 'Direct funding of BreachForums deposit bond.' },
      { id: 'e9', source: 'infra_c2_vps', target: 'infra_ssh_hostkey', label: 'SSH Host Key Bind', type: 'deterministic', vector: 'Infrastructure', confidence: 100.0, details: 'Identical ED25519 host key returned on port 2222.' },
      { id: 'e10', source: 'infra_c2_vps', target: 'infra_jarm_fp', label: 'JARM Fingerprint Match', type: 'deterministic', vector: 'Infrastructure', confidence: 98.0, details: 'Custom OpenSSL build returning anomalous TLS handshake hash.' },
      { id: 'e11', source: 'handle_vaporzero', target: 'pgp_vapor_subkey', label: 'Active Profile Key', type: 'deterministic', vector: 'PGP', confidence: 99.0, details: 'VaporZero BreachForums profile signature.' },
      { id: 'e12', source: 'wallet_cold_btc', target: 'wallet_wasabi_out', label: 'CoinJoin Coordinator Ingest', type: 'deterministic', vector: 'Wallets', confidence: 94.0, txHash: '2b48d91029481029384019283019283019283019283019283019283019283019', details: 'CoinJoin equal-output transaction round.' },

      // Probabilistic Edges (Dashed)
      { id: 'e13', source: 'handle_ghostbroker', target: 'handle_vaporzero', label: 'Stylometric Similarity (94.8%)', type: 'probabilistic', vector: 'Stylometry', confidence: 94.8, details: 'Triple comma idiosyncratic punctuation and lexical collocation match.' },
      { id: 'e14', source: 'handle_ghostbroker', target: 'handle_spectreop', label: 'Diurnal Posting Curve (96.2%)', type: 'probabilistic', vector: 'Stylometry', confidence: 96.2, details: 'Identical UTC+3 circadian posting trough between 02:00-07:00 UTC.' },
      { id: 'e15', source: 'handle_spectreop', target: 'handle_vaporzero', label: 'Vocabulary & Leetspeak Match', type: 'probabilistic', vector: 'Stylometry', confidence: 91.5, details: 'Shared slang n-grams: "sh3ll broker", "domain admin hash dump".' },
      { id: 'e16', source: 'handle_vaporzero', target: 'infra_c2_vps', label: 'Reverse Proxy DNS Leak', type: 'probabilistic', vector: 'Infrastructure', confidence: 89.2, details: 'Direct IP exposed during 302 redirect on shop mirror.' },
      { id: 'e17', source: 'handle_nemesis', target: 'wallet_cold_btc', label: 'Vendor Escrow Clustering', type: 'probabilistic', vector: 'Wallets', confidence: 87.5, details: 'UTXO heuristics cluster Nemesis bot with cold vault change addresses.' },
      { id: 'e18', source: 'handle_ghostbroker', target: 'handle_xss_ghost', label: 'Stylometric N-gram Match', type: 'probabilistic', vector: 'Stylometry', confidence: 92.0, details: 'Detached question mark layout convention: "dumper ? escrow".' },
      { id: 'e19', source: 'infra_nginx_hash', target: 'infra_c2_vps', label: '404 Template Header Match', type: 'probabilistic', vector: 'Infrastructure', confidence: 96.5, details: 'Byte-for-byte identical customized 404 response payload.' },
      { id: 'e20', source: 'handle_xss_ghost', target: 'pgp_exploit_cert', label: 'Profile Signature Key', type: 'probabilistic', vector: 'PGP', confidence: 88.4, details: 'Cross-posted public key fingerprint.' },
      { id: 'e21', source: 'handle_rampfan', target: 'handle_ghostbroker', label: 'Language Collocation & Diurnal', type: 'probabilistic', vector: 'Stylometry', confidence: 86.0, details: 'Concurrent active trading hours and identical Cyrillic homoglyphs.' },
      { id: 'e22', source: 'infra_tor_exit', target: 'infra_c2_vps', label: 'Pinned Relay Traffic', type: 'probabilistic', vector: 'Infrastructure', confidence: 88.0, details: 'Guard node IP observed consistently initiating administrative SSH sessions.' },
      { id: 'e23', source: 'handle_ghostbroker', target: 'infra_jabber_srv', label: 'OTR Handle Domain Match', type: 'probabilistic', vector: 'Infrastructure', confidence: 93.0, details: 'Jabber broker contact hosted on custom domain.' },
      { id: 'e24', source: 'wallet_breach_payout', target: 'wallet_tether_bridge', label: 'Cross-Chain Bridge Swap', type: 'probabilistic', vector: 'Wallets', confidence: 89.0, details: 'Swap timing correlation (<120s between BTC input and USDT mint).' },
      { id: 'e25', source: 'handle_nemesis', target: 'infra_tox_relay', label: 'Automated Bot Relay', type: 'probabilistic', vector: 'Infrastructure', confidence: 85.0, details: 'Tox bootstrap daemon pinged by automated vendor listing scraper.' },
      { id: 'e26', source: 'actor_spectre', target: 'handle_vaporzero', label: 'Composite Attribution (TEF 92.4%)', type: 'probabilistic', vector: 'Stylometry', confidence: 94.0, details: 'High-confidence attribution corroborated across 4 independent vectors.' },
      { id: 'e27', source: 'handle_vaporzero', target: 'wallet_cold_btc', label: 'Beneficial Ownership', type: 'probabilistic', vector: 'Wallets', confidence: 96.0, details: 'Ultimate sink address for all BreachForums exploit sales.' }
    ]
  },

  hydra: {
    id: 'hydra',
    name: 'HydraVendor_X',
    badge: 'NARCOTICS & WEAPONS SYNDICATE',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    aliases: ['Khimik_Supply', 'NordicPure', 'AeroChems', 'SilkRoute_24'],
    vector: 'Synthetic Precursors / Dead-Drop Geolocation Ops',
    locale: 'Western Russia / Saint Petersburg',
    proceeds: '~342.1 BTC ($21.2M USD)',
    rebrand: 'Post-Hydra Takedown Dispersion',
    diurnal: {
      zone: 'UTC+03:00 (St. Petersburg / MSK)',
      inferredOffset: '+03:00',
      sleepWindow: [3, 8],
      peakWindow: [16, 23],
      hourly: [4, 2, 1, 0, 0, 0, 1, 1, 12, 24, 38, 45, 59, 64, 76, 88, 97, 104, 91, 84, 72, 45, 23, 9],
      forums: 'Hydra Marketplace (Legacy), Solaris (1,240 posts), Mega Market (410 posts)',
      confidence: 94.8
    },
    stylometric: {
      sourceHandle: 'Khimik_Supply (Hydra Market, 2022)',
      targetHandle: 'NordicPure (Mega Market, 2024)',
      sampleA: `Reliable dead-drop guaranteed in SPB north district !!! Coordinate packaging: double vacuum foil with magnet clamp. Quality tested 98.4% lab purity,,, minimum order 50g. Pay only through automated escrow bot or bc1qhydra...reserve. No refunds without unedited unboxing video.`,
      sampleB: `Certified dead-drop stash ready in north SPB sector !!! Packaging standard: double vacuum foil with heavy magnet clamp. Laboratory batch 98.6% purity verified,,, min purchase 50g. Settlement via verified escrow gateway or bc1qhydra...reserve. Strict policy: no dispute without unboxing video.`,
      sentenceLength: '14.2 words/sentence',
      ttr: 0.812,
      tripleCommaMatch: 14,
      questionMarkDetached: 9,
      homoglyphCount: 22,
      leetspeakTokens: ['dr0p', 'b0t', 'm4gn3t', 'p4ck']
    },
    tef: {
      applicability: 91,
      technicalEase: 82,
      legalAdmissibility: 88
    },
    sec65b: {
      ref: 'NTRO/65B/2024-HYD-401',
      hash: 'f921820a48b91029c78201948231908234149021893489128394819283918239',
      custody: 'CONTINUOUS ENCRYPTED AIR-GAPPED FORENSIC VAULT',
      custodian: 'Joint Cyber Narcotics Taskforce / NTRO Liaison',
      hardwareUuid: 'NTRO-HW-RIG-14-99C1-77BA'
    },
    nodes: [
      { id: 'actor_hydra', label: 'HydraVendor_X\n[Target Core]', type: 'actor', details: 'Large-scale synthetic chemical synthesizer and regional distributor.', firstSeen: '2019-11-04', confidence: 99.5 },
      { id: 'handle_khimik', label: 'Khimik_Supply\n(Hydra Market)', type: 'handle', details: 'Top-rated vendor on Hydra with over 45,000 confirmed transactions.', firstSeen: '2020-01-15', confidence: 98.0 },
      { id: 'handle_nordic', label: 'NordicPure\n(Mega Market)', type: 'handle', details: 'Rebranded shop persona established immediately after Hydra server seizure.', firstSeen: '2022-05-18', confidence: 94.5 },
      { id: 'handle_aerochems', label: 'AeroChems\n(Solaris)', type: 'handle', details: 'Wholesale chemical precursor vendor on Solaris darknet market.', firstSeen: '2022-08-01', confidence: 91.0 },
      { id: 'handle_silk24', label: 'SilkRoute_24\n(Blacksprut)', type: 'handle', details: 'Regional franchise vendor bot managing urban courier drop-zones.', firstSeen: '2023-03-12', confidence: 87.0 },
      { id: 'handle_spb_drop', label: 'SPB_Logistics\n(Telegram VIP)', type: 'handle', details: 'Telegram bot forwarding GPS coordinate dead-drop batches to runners.', firstSeen: '2023-06-20', confidence: 92.4 },

      { id: 'wallet_hydra_master', label: 'bc1qhydra...reserve\n(Master Vault)', type: 'wallet', details: 'Vendor cold wallet accumulating over 340 BTC across 3 years.', firstSeen: '2020-03-10', confidence: 99.0 },
      { id: 'wallet_mega_deposit', label: '3M8k19...mega\n(Mega Escrow)', type: 'wallet', details: 'Vendor deposit address on Mega Market.', firstSeen: '2022-05-20', confidence: 97.5 },
      { id: 'wallet_solaris_escrow', label: '1P92bc...solaris\n(Solaris Trade)', type: 'wallet', details: 'Solaris marketplace vendor settlement address.', firstSeen: '2022-08-14', confidence: 96.0 },
      { id: 'wallet_courier_tips', label: 'bc1q99x...courier\n(Courier Payout)', type: 'wallet', details: 'Automated weekly payroll wallet distributing micro-transactions to runners.', firstSeen: '2023-01-10', confidence: 93.0 },
      { id: 'wallet_monero_bridge', label: '888tX9...XMR\n(LocalMonero Node)', type: 'wallet', details: 'Monero stealth address bridge laundering BTC proceeds into privacy coin.', firstSeen: '2023-09-02', confidence: 95.0 },

      { id: 'pgp_khimik_root', label: 'PGP-4096\n0x4A10CD88', type: 'pgp', details: 'Original master PGP key for Khimik_Supply registered on Hydra in 2020.', firstSeen: '2020-01-15', confidence: 100.0 },
      { id: 'pgp_nordic_sub', label: 'SUBKEY-0x4A10-N\n[Nordic Mega]', type: 'pgp', details: 'Subkey published by NordicPure, signed by Khimik 0x4A10CD88 root key.', firstSeen: '2022-05-18', confidence: 100.0 },
      { id: 'pgp_telegram_bot', label: 'PGP-Ed25519\n0x38BB01FF', type: 'pgp', details: 'Automated dispatcher PGP key used for encrypting GPS coordinates.', firstSeen: '2023-06-20', confidence: 94.0 },

      { id: 'infra_gps_vault', label: '91.240.118.12\n(GPS Dead-Drop DB)', type: 'infra', details: 'Exposed Elasticsearch cluster containing dead-drop photos and GPS tags.', firstSeen: '2023-04-14', confidence: 98.0 },
      { id: 'infra_spb_nginx', label: 'Nginx-Custom\n0x992B14C1', type: 'infra', details: 'Custom HTTP header Server: nginx-hydra-guard deployed across backend mirrors.', firstSeen: '2022-09-10', confidence: 96.0 },
      { id: 'infra_ssh_saintp', label: 'SSH-RSA-4096\nSaintP-Bastion', type: 'infra', details: 'Shared SSH administration jumpbox hosting courier dispatch scripts.', firstSeen: '2023-02-11', confidence: 97.0 },
      { id: 'infra_vpn_gw', label: '194.87.140.22\n(Mullvad WireGuard)', type: 'infra', details: 'Dedicated WireGuard VPN peer endpoint used for server management.', firstSeen: '2023-10-05', confidence: 88.0 },
      { id: 'infra_mirror_onion', label: 'khimik77...onion\n(V3 Hidden Service)', type: 'infra', details: 'Tor v3 onion address serving web catalog and automated PGP ordering.', firstSeen: '2022-06-01', confidence: 99.0 }
    ],
    edges: [
      { id: 'he1', source: 'actor_hydra', target: 'handle_khimik', label: 'Historical Core Identity', type: 'deterministic', vector: 'PGP', confidence: 99.0 },
      { id: 'he2', source: 'actor_hydra', target: 'pgp_khimik_root', label: 'Master Key Custody', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0x4A10CD88' },
      { id: 'he3', source: 'pgp_khimik_root', target: 'pgp_nordic_sub', label: 'Direct Cryptographic Subkey Binding', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0x4A10-N' },
      { id: 'he4', source: 'handle_nordic', target: 'pgp_nordic_sub', label: 'Profile Signature Key', type: 'deterministic', vector: 'PGP', confidence: 99.0 },
      { id: 'he5', source: 'wallet_hydra_master', target: 'wallet_mega_deposit', label: 'Common-Input Co-Spend', type: 'deterministic', vector: 'Wallets', confidence: 99.4, txHash: '1102938401928301928301928301928301928301928301928301928301928301' },
      { id: 'he6', source: 'wallet_mega_deposit', target: 'wallet_courier_tips', label: 'Batch Payroll Sweep', type: 'deterministic', vector: 'Wallets', confidence: 96.0, txHash: '5566778899001122334455667788990011223344556677889900112233445566' },
      { id: 'he7', source: 'infra_gps_vault', target: 'infra_ssh_saintp', label: 'Shared Jumpbox Auth', type: 'deterministic', vector: 'Infrastructure', confidence: 98.0 },
      { id: 'he8', source: 'handle_khimik', target: 'infra_mirror_onion', label: 'Official Storefront V3', type: 'deterministic', vector: 'Infrastructure', confidence: 100.0 },

      { id: 'he9', source: 'handle_khimik', target: 'handle_nordic', label: 'Stylometric Triple Exclamation & Syntax', type: 'probabilistic', vector: 'Stylometry', confidence: 95.2 },
      { id: 'he10', source: 'handle_nordic', target: 'handle_aerochems', label: 'Diurnal Posting Match (03:00 Trough)', type: 'probabilistic', vector: 'Stylometry', confidence: 94.0 },
      { id: 'he11', source: 'wallet_hydra_master', target: 'wallet_monero_bridge', label: 'Fixed-Amount Mixing Loop', type: 'probabilistic', vector: 'Wallets', confidence: 91.0 },
      { id: 'he12', source: 'infra_spb_nginx', target: 'infra_gps_vault', label: 'Header Fingerprint Correlation', type: 'probabilistic', vector: 'Infrastructure', confidence: 96.0 },
      { id: 'he13', source: 'handle_spb_drop', target: 'pgp_telegram_bot', label: 'Bot Dispatch Key', type: 'probabilistic', vector: 'PGP', confidence: 94.0 },
      { id: 'he14', source: 'handle_silk24', target: 'handle_nordic', label: 'Packaging Phrase Match ("double vacuum foil")', type: 'probabilistic', vector: 'Stylometry', confidence: 93.5 },
      { id: 'he15', source: 'infra_vpn_gw', target: 'infra_gps_vault', label: 'VPN Admin Egress', type: 'probabilistic', vector: 'Infrastructure', confidence: 89.0 }
    ]
  },

  exchanger: {
    id: 'exchanger',
    name: 'DarkExchanger_Op',
    badge: 'UNLICENSED CRYPTO LAUNDERING DESK',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    aliases: ['CoinWipe_Mix', 'TetherOTC_Desk', 'CleanMix_Pro', 'InstantSats_Bot'],
    vector: 'High-Volume P2P Mixer / Cross-Border Capital Flight',
    locale: 'Southeast Asia / China Border (SGT / UTC+8)',
    proceeds: '~890.5 BTC ($55.2M USD)',
    rebrand: 'Multi-Bot Distributed Escrow',
    diurnal: {
      zone: 'UTC+08:00 (Singapore / HK / SGT)',
      inferredOffset: '+08:00',
      sleepWindow: [18, 23], // In UTC: 18:00-23:00 corresponds to 02:00-07:00 local SGT
      peakWindow: [4, 11],
      hourly: [45, 52, 68, 79, 88, 92, 95, 87, 82, 70, 58, 42, 28, 18, 12, 8, 4, 1, 0, 0, 0, 1, 3, 14],
      forums: 'Telegram OTC Channels (5,200 deals), Dread (890 reviews), BTT (1,400 posts)',
      confidence: 97.0
    },
    stylometric: {
      sourceHandle: 'CoinWipe_Mix (Dread Forum, 2023)',
      targetHandle: 'CleanMix_Pro (Telegram OTC, 2024)',
      sampleA: `Automated mixing engine v4.2 active,,, zero logs guaranteed with 12-hop delayed peel ? service fee 1.5% fixed. Deposit settlement to bc1qexchanger...root only. Contact VIP desk on Session sh3ll desk for high volume transactions > 10 BTC.`,
      sampleB: `Instant crypto clean desk active,,, no logs policy strictly enforced with 12-hop peel delay ? commission rate 1.5% fixed. Direct deposit to bc1qexchanger...root ready. Ping operator on Session sh3ll desk for bulk volume OTC deals > 10 BTC.`,
      sentenceLength: '16.8 words/sentence',
      ttr: 0.745,
      tripleCommaMatch: 16,
      questionMarkDetached: 11,
      homoglyphCount: 8,
      leetspeakTokens: ['sh3ll', 'm1x', 'c01n', 'b0t']
    },
    tef: {
      applicability: 96,
      technicalEase: 90,
      legalAdmissibility: 95
    },
    sec65b: {
      ref: 'NTRO/65B/2024-EXC-772',
      hash: '3a88491029481029384019283019283019283019283019283019283019283019',
      custody: 'CONTINUOUS ENCRYPTED AIR-GAPPED FORENSIC VAULT',
      custodian: 'Financial Intelligence Unit & NTRO Crypto Forensics Lab',
      hardwareUuid: 'NTRO-HW-RIG-22-11FE-33CC'
    },
    nodes: [
      { id: 'actor_exchanger', label: 'DarkExchanger\n[Target Core]', type: 'actor', details: 'Operator of multi-market high volume Bitcoin & USDT mixing operation.', firstSeen: '2020-08-19', confidence: 99.9 },
      { id: 'handle_coinwipe', label: 'CoinWipe_Mix\n(Dread OTC)', type: 'handle', details: 'Primary mixing desk persona on Dread operating automated deposit addresses.', firstSeen: '2021-01-05', confidence: 97.0 },
      { id: 'handle_tetherotc', label: 'TetherOTC_Desk\n(Telegram Channel)', type: 'handle', details: 'High-volume cash-to-USDT desk operating in Telegram group @tether_vip.', firstSeen: '2022-03-15', confidence: 95.0 },
      { id: 'handle_cleanmix', label: 'CleanMix_Pro\n(Darknet Mirror)', type: 'handle', details: 'Web automated crypto cleaner claiming zero-logs policy.', firstSeen: '2023-07-10', confidence: 96.2 },
      { id: 'handle_instantsats', label: 'InstantSats_Bot\n(Session Messenger)', type: 'handle', details: 'Session messenger bot executing micro-exchanges.', firstSeen: '2023-10-01', confidence: 91.0 },

      { id: 'wallet_exchanger_root', label: 'bc1qexchanger...root\n(Laundering Sink)', type: 'wallet', details: 'Core liquidity pool containing 890.5 BTC.', firstSeen: '2020-11-20', confidence: 100.0 },
      { id: 'wallet_tether_whale', label: '0x3E8...USDT\n(Tron Treasury)', type: 'wallet', details: 'TRC-20 USDT contract address holding $18.4M in stablecoins.', firstSeen: '2022-04-10', confidence: 98.0 },
      { id: 'wallet_binance_leak', label: '1NDyJ...binance\n(KYC Deposit Leak)', type: 'wallet', details: 'Exchange deposit address that received un-mixed funds with leaked passport KYC.', firstSeen: '2023-05-19', confidence: 99.8 },
      { id: 'wallet_torn_bridge', label: '0x47CE...Tornado\n(ETH Mixer)', type: 'wallet', details: 'Tornado Cash 100 ETH deposit pool interaction.', firstSeen: '2022-12-05', confidence: 94.0 },

      { id: 'pgp_otc_root', label: 'PGP-4096\n0xEE81720A', type: 'pgp', details: 'Master OTC proof key registered on Bitcointalk in 2020.', firstSeen: '2020-09-01', confidence: 99.5 },
      { id: 'pgp_telegram_key', label: 'SUBKEY-0xEE81-T\n[Telegram VIP]', type: 'pgp', details: 'Subkey verified across Telegram VIP channel announcements.', firstSeen: '2022-03-15', confidence: 99.0 },

      { id: 'infra_tg_webhook', label: '103.253.44.18\n(Singapore Proxy)', type: 'infra', details: 'Telegram bot webhook server hosted in Singapore data center.', firstSeen: '2022-08-11', confidence: 98.0 },
      { id: 'infra_haproxy', label: 'HAProxy-2.8\n0x8821BC01', type: 'infra', details: 'Custom HAProxy TCP load balancer distributing darknet mirror requests.', firstSeen: '2023-01-20', confidence: 96.0 },
      { id: 'infra_singapore_host', label: 'SG-DC-04\nAS13335 (Cloudflare)', type: 'infra', details: 'Cloudflare origin IP leaked via misconfigured Mail MX record.', firstSeen: '2023-06-14', confidence: 99.2 }
    ],
    edges: [
      { id: 'de1', source: 'actor_exchanger', target: 'handle_coinwipe', label: 'Primary Brand Persona', type: 'deterministic', vector: 'PGP', confidence: 99.0 },
      { id: 'de2', source: 'actor_exchanger', target: 'pgp_otc_root', label: 'Master Key Holder', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0xEE81720A' },
      { id: 'de3', source: 'pgp_otc_root', target: 'pgp_telegram_key', label: 'Subkey Cryptographic Binding', type: 'deterministic', vector: 'PGP', confidence: 100.0, pgpSubkey: '0xEE81-T' },
      { id: 'de4', source: 'handle_tetherotc', target: 'pgp_telegram_key', label: 'Channel Proof Signature', type: 'deterministic', vector: 'PGP', confidence: 99.0 },
      { id: 'de5', source: 'handle_coinwipe', target: 'wallet_exchanger_root', label: 'Published Liquidity Sink', type: 'deterministic', vector: 'Wallets', confidence: 99.5 },
      { id: 'de6', source: 'wallet_exchanger_root', target: 'wallet_binance_leak', label: 'Direct Unmixed Transfer (KYC Link)', type: 'deterministic', vector: 'Wallets', confidence: 100.0, txHash: '8877665544332211009988776655443322110099887766554433221100998877' },
      { id: 'de7', source: 'infra_tg_webhook', target: 'infra_singapore_host', label: 'DNS A-Record Direct Leak', type: 'deterministic', vector: 'Infrastructure', confidence: 99.2 },

      { id: 'de8', source: 'handle_coinwipe', target: 'handle_cleanmix', label: 'Stylometric 12-hop Syntax (96.5%)', type: 'probabilistic', vector: 'Stylometry', confidence: 96.5 },
      { id: 'de9', source: 'handle_coinwipe', target: 'handle_tetherotc', label: 'Circadian Posting Trough (UTC+8)', type: 'probabilistic', vector: 'Stylometry', confidence: 97.0 },
      { id: 'de10', source: 'wallet_exchanger_root', target: 'wallet_tether_whale', label: 'USDT Cross-Chain Arbitrage', type: 'probabilistic', vector: 'Wallets', confidence: 93.0 },
      { id: 'de11', source: 'wallet_exchanger_root', target: 'wallet_torn_bridge', label: 'Tornado Cash Pool Inflow', type: 'probabilistic', vector: 'Wallets', confidence: 94.0 },
      { id: 'de12', source: 'infra_haproxy', target: 'infra_tg_webhook', label: 'Shared Subnet Host Cluster', type: 'probabilistic', vector: 'Infrastructure', confidence: 92.0 },
      { id: 'de13', source: 'handle_instantsats', target: 'handle_coinwipe', label: 'Session Slang & Leetspeak Collocation', type: 'probabilistic', vector: 'Stylometry', confidence: 94.0 }
    ]
  }
};
