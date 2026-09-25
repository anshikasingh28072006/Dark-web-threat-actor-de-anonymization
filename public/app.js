/**
 * NTRO // DE-ANON CONSOLE (Kessler-Intel)
 * Production-Grade Dark Web Threat Actor De-Anonymization Engine
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. THREAT PROFILES & GRAPH DATASETS (3 Multi-Actor Rebranding Scenarios)
  // =========================================================================
  const THREAT_PROFILES = {
    spectre: {
      id: 'spectre',
      name: 'Spectre_Syndicate',
      badge: 'TIER-1 THREAT',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      aliases: 'GhostBroker, SpectreOp, VaporZero, NemesisVendor',
      vector: 'Initial Access / RaaS',
      locale: 'Eastern Europe (RU/BY)',
      proceeds: '~158.4 BTC ($9.8M)',
      rebrand: 'Active Migration',
      diurnal: {
        zone: 'UTC+3 (MSK)',
        sleepTroughText: 'Sleep Trough: 02:00-07:00 UTC',
        sleepWindow: [2, 7],
        peakWindow: [14, 21],
        hourly: [2, 1, 0, 0, 0, 1, 0, 2, 8, 19, 28, 34, 45, 52, 68, 79, 88, 94, 82, 65, 48, 26, 12, 5],
        forums: 'Dread (412), Exploit (840), BreachForums (189)'
      },
      stylometric: {
        sentenceLength: '18.4 words',
        sentencePercent: 74,
        ttr: '0.762',
        ttrPercent: 76,
        tripleComma: '99.2% match (18x)',
        questionMark: '96.8% match (12x)',
        homoglyph: 'Detected (14 tokens)',
        leetspeak: '14.2% (sh3ll, w4ll3t)'
      },
      tef: {
        applicability: 94,
        technicalEase: 86,
        legalAdmissibility: 92
      },
      sec65b: {
        ref: 'NTRO/65B/2024-918',
        hash: 'e7f842b03698d5c414901f46820df38a164993ec974e6f481c0022416bc7ef09',
        custody: 'SECURE FORENSIC CUSTODY'
      },
      diffData: {
        sourceHandle: 'GhostBroker (Dread Forum, 2023)',
        targetHandle: 'VaporZero (BreachForums v2, 2024)',
        sourceText: 'Greetings to all members<span class="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">,,,</span> releasing our private active directory dumper <span class="bg-sky-500/30 text-sky-300 px-1 rounded font-bold"> ?</span> escrow accepted via <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">bc1q9v8p4...cold</span> only. <span class="bg-purple-500/30 text-purple-300 px-1 rounded">Do not waste time with fake proof</span>, ping me on Jabber <span class="text-rose-400">sh3ll</span> broker.',
        targetText: 'Hello breach community<span class="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">,,,</span> fresh domain controller dumps available <span class="bg-sky-500/30 text-sky-300 px-1 rounded font-bold"> ?</span> escrow deposit at <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">bc1q9v8p4...cold</span> ready. <span class="bg-purple-500/30 text-purple-300 px-1 rounded">Do not waste time with fake escrow</span>, ping on session with <span class="text-rose-400">sh3ll</span> access.'
      },
      nodes: [
        { id: 'actor_spectre', label: 'Spectre Syndicate\n(Core Persona)', type: 'actor', details: 'Mastermind coordinator of corporate ransomware access brokers.', firstSeen: '2021-04-12', confidence: 99.8 },
        { id: 'handle_ghostbroker', label: 'GhostBroker\n(Dread Forum)', type: 'handle', details: 'Historical primary vendor persona on Dread. Abandoned following Hydra seizure.', firstSeen: '2021-06-01', confidence: 95.0 },
        { id: 'handle_spectreop', label: 'SpectreOp\n(Exploit.in)', type: 'handle', details: 'High-reputation access broker handle on Exploit forum. Banned post exit scam.', firstSeen: '2022-02-14', confidence: 93.4 },
        { id: 'handle_vaporzero', label: 'VaporZero\n(BreachForums)', type: 'handle', details: 'Active high-value seller on BreachForums selling domain admin credentials.', firstSeen: '2023-11-20', confidence: 94.6 },
        { id: 'handle_nemesis', label: 'NemesisVendor\n(Nemesis)', type: 'handle', details: 'Automated escrow listing bot active on Nemesis Market.', firstSeen: '2023-08-10', confidence: 88.2 },
        { id: 'wallet_cold_btc', label: 'bc1q9v8...cold\n(OpSec Reserve)', type: 'wallet', details: 'Consolidation cold wallet holding 142.84 BTC in unspent outputs.', firstSeen: '2021-08-19', confidence: 98.5 },
        { id: 'wallet_hydra_dep', label: '1A1zP1e...hydra\n(Hydra Escrow)', type: 'wallet', details: 'Deposit address tied to historical Dread marketplace escrow.', firstSeen: '2022-01-11', confidence: 100.0 },
        { id: 'wallet_peel_chain', label: 'bc1q7w2...peel\n(Mixer Peel)', type: 'wallet', details: 'ChipMixer laundering peel hop transaction address.', firstSeen: '2023-04-05', confidence: 97.2 },
        { id: 'wallet_monero_sub', label: '888tNk5...monero\n(XMR Subaddress)', type: 'wallet', details: 'Stealth subaddress for confidential Monero transfers.', firstSeen: '2023-11-25', confidence: 95.5 },
        { id: 'wallet_binance_cashout', label: '3J98t1W...cashout\n(Deposit Leak)', type: 'wallet', details: 'Exchange deposit address flagged with KYC leak vectors.', firstSeen: '2024-01-15', confidence: 96.0 },
        { id: 'pgp_master', label: 'PGP 0x9E7A_2B1F\n(Master 4096R)', type: 'pgp', details: 'Root cryptographic OpenPGP key pair created 2021.', firstSeen: '2021-04-12', confidence: 100.0 },
        { id: 'pgp_subkey_dread', label: 'PGP 0x9E7A_SUB1\n(Dread Subkey)', type: 'pgp', details: 'Encryption subkey published in Dread signed message.', firstSeen: '2021-06-01', confidence: 100.0 },
        { id: 'pgp_subkey_breach', label: 'PGP 0x9E7A_SUB2\n(Breach Subkey)', type: 'pgp', details: 'Subkey published on BreachForums v2 verified by master 0x9E7A.', firstSeen: '2023-11-20', confidence: 99.8 },
        { id: 'pgp_revoc_cert', label: 'PGP 0x4C18_REVC\n(Revocation)', type: 'pgp', details: 'Emergency key revocation token uploaded to openpgp keyserver.', firstSeen: '2023-12-05', confidence: 90.1 },
        { id: 'infra_nginx', label: 'SRV-NGINX-1.18\n(Debian ETag)', type: 'infra', details: 'Nginx 1.18 Debian server banner with matching ETag collision: "5f8a-5b12c".', firstSeen: '2022-09-18', confidence: 89.4 },
        { id: 'infra_tor_guard', label: 'Tor Guard Relay\n(Clock Drift)', type: 'infra', details: 'Tor guard node with unique +142ms clock drift correlation.', firstSeen: '2023-03-22', confidence: 84.1 },
        { id: 'infra_404_hash', label: 'Onion 404 Hash\n(SHA-256 Match)', type: 'infra', details: 'Unique 404 error page HTML body hash e3b0c44...9a12 collision.', firstSeen: '2023-11-22', confidence: 98.0 },
        { id: 'infra_c2_vps', label: 'C2 VPS 193.106...\n(Moldova ASN)', type: 'infra', details: 'Clearnet reverse-proxy staging server hosted in Moldova.', firstSeen: '2023-10-02', confidence: 91.0 }
      ],
      edges: [
        { id: 'e1', source: 'actor_spectre', target: 'handle_ghostbroker', label: 'Attributed Identity', type: 'deterministic', vector: 'Handle', confidence: 99.0 },
        { id: 'e2', source: 'actor_spectre', target: 'pgp_master', label: 'Private Key Owner', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'e3', source: 'pgp_master', target: 'pgp_subkey_dread', label: 'Signed Subkey', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'e4', source: 'pgp_master', target: 'pgp_subkey_breach', label: 'Signed Subkey', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'e5', source: 'handle_ghostbroker', target: 'pgp_subkey_dread', label: 'Published Key', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'e6', source: 'handle_vaporzero', target: 'pgp_subkey_breach', label: 'Published Key', type: 'deterministic', vector: 'PGP', confidence: 99.8 },
        { id: 'e7', source: 'handle_ghostbroker', target: 'wallet_hydra_dep', label: 'Deposit OP', type: 'deterministic', vector: 'Wallets', confidence: 100.0 },
        { id: 'e8', source: 'wallet_hydra_dep', target: 'wallet_peel_chain', label: 'Co-Spend Joint Tx', type: 'deterministic', vector: 'Wallets', confidence: 98.5 },
        { id: 'e9', source: 'wallet_peel_chain', target: 'wallet_cold_btc', label: 'Consolidation Hop', type: 'deterministic', vector: 'Wallets', confidence: 97.2 },
        { id: 'e10', source: 'wallet_cold_btc', target: 'wallet_binance_cashout', label: 'Cashout Transfer', type: 'deterministic', vector: 'Wallets', confidence: 96.0 },
        { id: 'e11', source: 'infra_nginx', target: 'infra_404_hash', label: 'Server Signature', type: 'deterministic', vector: 'Infrastructure', confidence: 100.0 },
        { id: 'e12', source: 'infra_c2_vps', target: 'infra_nginx', label: 'Upstream Proxy', type: 'deterministic', vector: 'Infrastructure', confidence: 98.0 },
        { id: 'e13', source: 'handle_ghostbroker', target: 'handle_spectreop', label: 'Stylo-Syntax Match (94%)', type: 'probabilistic', vector: 'Stylometry', confidence: 91.5 },
        { id: 'e14', source: 'handle_spectreop', target: 'handle_vaporzero', label: 'Rebrand & Diurnal Match', type: 'probabilistic', vector: 'Stylometry', confidence: 93.4 },
        { id: 'e15', source: 'handle_vaporzero', target: 'handle_nemesis', label: 'Listing Template Match', type: 'probabilistic', vector: 'Stylometry', confidence: 88.2 },
        { id: 'e16', source: 'handle_spectreop', target: 'wallet_cold_btc', label: 'PM Wallet Leak', type: 'probabilistic', vector: 'Wallets', confidence: 89.0 },
        { id: 'e17', source: 'handle_vaporzero', target: 'wallet_monero_sub', label: 'Escrow Monero Leak', type: 'deterministic', vector: 'Wallets', confidence: 95.5 },
        { id: 'e18', source: 'handle_vaporzero', target: 'infra_nginx', label: 'ETag Collision', type: 'probabilistic', vector: 'Infrastructure', confidence: 86.4 },
        { id: 'e19', source: 'infra_tor_guard', target: 'handle_ghostbroker', label: 'Clock Skew (+142ms)', type: 'probabilistic', vector: 'Infrastructure', confidence: 84.1 },
        { id: 'e20', source: 'infra_tor_guard', target: 'infra_c2_vps', label: 'Traffic Burst Correlation', type: 'probabilistic', vector: 'Infrastructure', confidence: 87.5 },
        { id: 'e21', source: 'handle_spectreop', target: 'pgp_revoc_cert', label: 'Key Revocation', type: 'probabilistic', vector: 'PGP', confidence: 90.1 },
        { id: 'e22', source: 'actor_spectre', target: 'wallet_cold_btc', label: 'Beneficial Owner', type: 'deterministic', vector: 'Wallets', confidence: 99.2 },
        { id: 'e23', source: 'handle_nemesis', target: 'wallet_peel_chain', label: 'Tx Timing Cluster', type: 'probabilistic', vector: 'Wallets', confidence: 85.3 },
        { id: 'e24', source: 'handle_vaporzero', target: 'wallet_cold_btc', label: 'Joint Input UTXO', type: 'deterministic', vector: 'Wallets', confidence: 98.4 }
      ]
    },

    hydra: {
      id: 'hydra',
      name: 'HydraVendor_X',
      badge: 'NARCO-CARTEL',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      aliases: 'ChemKing_Ru, AlphaSynth_Solaris, Noxious_Mega, K-Lab_RuTor',
      vector: 'Synthetic Narcotics / Wholesale',
      locale: 'Central Asia / Urals (UTC+5)',
      proceeds: '~310.2 BTC ($19.2M)',
      rebrand: 'Multi-Market Splinter',
      diurnal: {
        zone: 'UTC+5 (YEK/ALA)',
        sleepTroughText: 'Sleep Trough: 20:00-04:00 UTC',
        sleepWindow: [20, 4],
        peakWindow: [7, 16],
        hourly: [0, 0, 0, 1, 3, 12, 28, 56, 78, 92, 85, 74, 69, 58, 42, 29, 14, 6, 2, 0, 0, 0, 0, 0],
        forums: 'Solaris (620), Mega (410), RuTor (290)'
      },
      stylometric: {
        sentenceLength: '12.1 words',
        sentencePercent: 48,
        ttr: '0.620',
        ttrPercent: 62,
        tripleComma: 'Double-hyphen (--) 98%',
        questionMark: 'Dead drop coords syntax',
        homoglyph: 'Bracket tags [1] [2]',
        leetspeak: '8.1% (k-l4b, ph4rm)'
      },
      tef: {
        applicability: 96,
        technicalEase: 82,
        legalAdmissibility: 90
      },
      sec65b: {
        ref: 'NTRO/65B/2024-HYD-401',
        hash: 'b4a928f0012e87c69a41982bdf10294e01928374a58190283746192847561928',
        custody: 'CHAIN-OF-CUSTODY VERIFIED'
      },
      diffData: {
        sourceHandle: 'ChemKing_Ru (Hydra, 2022)',
        targetHandle: 'AlphaSynth_Solaris (Solaris, 2024)',
        sourceText: 'Wholesale batch dispatch ready <span class="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">--</span> stealth dead-drop coordinates sealed in PGP. <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">bc1qar0srrr...5mdq</span> direct deposit. <span class="bg-purple-500/30 text-purple-300 px-1 rounded">[MAGNET_DROP_URALS]</span> courier confirms within 45m.',
        targetText: 'Fresh reagent stock live <span class="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">--</span> stealth dead-drop coordinates encrypted with subkey. Payout: <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">bc1qar0srrr...5mdq</span> only. <span class="bg-purple-500/30 text-purple-300 px-1 rounded">[MAGNET_DROP_URALS]</span> pick-up pin provided immediately.'
      },
      nodes: [
        { id: 'actor_hydra', label: 'HydraVendor_X\n(Core Cartel)', type: 'actor', details: 'High-volume narcotics dispatch cartel distributing via darknet dead-drops.', firstSeen: '2020-03-10', confidence: 99.5 },
        { id: 'handle_chemking', label: 'ChemKing_Ru\n(Hydra Market)', type: 'handle', details: 'Legendary Hydra vendor with over 15,000 verified transactions.', firstSeen: '2020-05-15', confidence: 98.0 },
        { id: 'handle_alphasynth', label: 'AlphaSynth\n(Solaris)', type: 'handle', details: 'Solaris marketplace rebrand using identical dead-drop packaging syntax.', firstSeen: '2022-09-01', confidence: 94.0 },
        { id: 'handle_noxious', label: 'Noxious_Wholesale\n(Mega Darknet)', type: 'handle', details: 'Mega Market bulk distribution handle linking identical Monero subaddresses.', firstSeen: '2023-02-12', confidence: 91.2 },
        { id: 'handle_klab', label: 'K-Lab_RuTor\n(RuTor Forum)', type: 'handle', details: 'Forum customer support liaison account providing drop dispute resolution.', firstSeen: '2021-11-04', confidence: 89.0 },
        { id: 'wallet_chem_btc', label: 'bc1qar0s...5mdq\n(Master Deposit)', type: 'wallet', details: 'Primary Bitcoin hot deposit address receiving Hydra vendor payouts.', firstSeen: '2020-07-20', confidence: 100.0 },
        { id: 'wallet_wasabi', label: '3J98t1W...wasabi\n(Wasabi CoinJoin)', type: 'wallet', details: 'CoinJoin mixing cluster processing 100+ rounds of obfuscation.', firstSeen: '2022-11-14', confidence: 96.0 },
        { id: 'wallet_xmr_primary', label: '44AFFq5...xmr\n(Monero Primary)', type: 'wallet', details: 'Primary Monero wallet address leaked in RuTor private dispute thread.', firstSeen: '2023-01-08', confidence: 97.5 },
        { id: 'wallet_escrow_mega', label: 'bc1q_mega_escrow\n(Escrow Pool)', type: 'wallet', details: 'Mega darknet multisig escrow wallet.', firstSeen: '2023-03-15', confidence: 92.0 },
        { id: 'pgp_chem_root', label: 'PGP 0x3B8F_D9A1\n(Hydra ChemKing)', type: 'pgp', details: 'Original ChemKing master OpenPGP signing key.', firstSeen: '2020-05-15', confidence: 100.0 },
        { id: 'pgp_chem_subkey', label: 'PGP 0x3B8F_SUBK\n(Solaris Subkey)', type: 'pgp', details: 'Subkey verified as cryptographically derived from 0x3B8F master key.', firstSeen: '2022-09-01', confidence: 100.0 },
        { id: 'pgp_rutor_liaison', label: 'PGP 0x77C2_NEWP\n(RuTor Liaison)', type: 'pgp', details: 'Dispute arbitration PGP key on RuTor.', firstSeen: '2021-11-04', confidence: 90.0 },
        { id: 'infra_caddy', label: 'SRV-CADDY-QUIC\n(HTTP/3 Leak)', type: 'infra', details: 'Caddy server configuration leaking origin IP in Alt-Svc headers.', firstSeen: '2023-05-10', confidence: 93.0 },
        { id: 'infra_ssh_key', label: 'SSH-ED25519-HOST\n(Fingerprint Match)', type: 'infra', details: 'Clearnet VPS SSH host key fingerprint matching hidden service backend.', firstSeen: '2023-06-12', confidence: 99.4 },
        { id: 'infra_mmh3_favicon', label: 'Favicon Hash MMH3\n(-1289471928)', type: 'infra', details: 'Unique MurmurHash3 favicon signature on custom onion vendor portal.', firstSeen: '2022-10-05', confidence: 98.2 },
        { id: 'infra_almaty_vps', label: 'VPS 185.112.9...\n(Kazakhstan ASN)', type: 'infra', details: 'Clearnet drop coordinate dispatch server in Almaty.', firstSeen: '2023-08-19', confidence: 88.0 }
      ],
      edges: [
        { id: 'he1', source: 'actor_hydra', target: 'handle_chemking', label: 'Original Persona', type: 'deterministic', vector: 'Handle', confidence: 99.5 },
        { id: 'he2', source: 'actor_hydra', target: 'pgp_chem_root', label: 'Master PGP Key', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'he3', source: 'pgp_chem_root', target: 'pgp_chem_subkey', label: 'Cryptographic Subkey', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'he4', source: 'handle_alphasynth', target: 'pgp_chem_subkey', label: 'Verified Profile Key', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'he5', source: 'handle_chemking', target: 'wallet_chem_btc', label: 'Public Hydra Deposit', type: 'deterministic', vector: 'Wallets', confidence: 100.0 },
        { id: 'he6', source: 'wallet_chem_btc', target: 'wallet_wasabi', label: 'CoinJoin Input Cluster', type: 'deterministic', vector: 'Wallets', confidence: 96.0 },
        { id: 'he7', source: 'wallet_wasabi', target: 'wallet_escrow_mega', label: 'Mega Escrow Top-up', type: 'deterministic', vector: 'Wallets', confidence: 92.0 },
        { id: 'he8', source: 'infra_caddy', target: 'infra_ssh_key', label: 'Host Key Match', type: 'deterministic', vector: 'Infrastructure', confidence: 99.4 },
        { id: 'he9', source: 'infra_ssh_key', target: 'infra_almaty_vps', label: 'VPS Host Identity', type: 'deterministic', vector: 'Infrastructure', confidence: 98.0 },
        { id: 'he10', source: 'handle_chemking', target: 'handle_alphasynth', label: 'Double-Hyphen & Tag Match', type: 'probabilistic', vector: 'Stylometry', confidence: 92.8 },
        { id: 'he11', source: 'handle_alphasynth', target: 'handle_noxious', label: 'Shared Dispatch Syntax', type: 'probabilistic', vector: 'Stylometry', confidence: 90.5 },
        { id: 'he12', source: 'handle_klab', target: 'handle_chemking', label: 'Support Cross-Link', type: 'probabilistic', vector: 'Stylometry', confidence: 89.0 },
        { id: 'he13', source: 'handle_noxious', target: 'wallet_xmr_primary', label: 'Leaked Support Chat XMR', type: 'deterministic', vector: 'Wallets', confidence: 97.5 },
        { id: 'he14', source: 'handle_alphasynth', target: 'infra_mmh3_favicon', label: 'Vendor Shop Favicon', type: 'deterministic', vector: 'Infrastructure', confidence: 98.2 },
        { id: 'he15', source: 'infra_mmh3_favicon', target: 'infra_caddy', label: 'TLS Stack Match', type: 'probabilistic', vector: 'Infrastructure', confidence: 89.0 },
        { id: 'he16', source: 'handle_klab', target: 'pgp_rutor_liaison', label: 'Registered Key', type: 'deterministic', vector: 'PGP', confidence: 95.0 },
        { id: 'he17', source: 'actor_hydra', target: 'wallet_chem_btc', label: 'Ultimate Beneficial Owner', type: 'deterministic', vector: 'Wallets', confidence: 99.0 },
        { id: 'he18', source: 'handle_alphasynth', target: 'wallet_chem_btc', label: 'Reused Wallet in PM', type: 'probabilistic', vector: 'Wallets', confidence: 91.0 },
        { id: 'he19', source: 'infra_almaty_vps', target: 'handle_alphasynth', label: 'Dispatch Timestamp Burst', type: 'probabilistic', vector: 'Infrastructure', confidence: 87.0 },
        { id: 'he20', source: 'wallet_wasabi', target: 'wallet_xmr_primary', label: 'Atomic Swap Bridge', type: 'probabilistic', vector: 'Wallets', confidence: 88.5 },
        { id: 'he21', source: 'handle_noxious', target: 'wallet_escrow_mega', label: 'Vendor Deposit Tx', type: 'deterministic', vector: 'Wallets', confidence: 94.0 },
        { id: 'he22', source: 'pgp_chem_root', target: 'pgp_rutor_liaison', label: 'Cross-Signature Certificate', type: 'probabilistic', vector: 'PGP', confidence: 89.5 }
      ]
    },

    darkexchanger: {
      id: 'darkexchanger',
      name: 'DarkExchanger',
      badge: 'FINANCIAL-OTC',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      aliases: 'CoinWipe_Alpha, CleanMix_Bitz, TetherOTC_VIP, InstantSats_TG',
      vector: 'Sanctions Evasion & Illicit OTC Desk',
      locale: 'East Asia / SE Asia (UTC+8)',
      proceeds: '~480.5 BTC ($29.7M)',
      rebrand: 'Continuous Rolling Aliases',
      diurnal: {
        zone: 'UTC+8 (SGT/HKT)',
        sleepTroughText: 'Sleep Trough: 12:00-18:00 UTC',
        sleepWindow: [12, 18],
        peakWindow: [1, 10],
        hourly: [32, 65, 88, 95, 91, 79, 72, 60, 45, 30, 15, 6, 1, 0, 0, 1, 0, 2, 8, 14, 21, 28, 30, 29],
        forums: 'Exploit (490), XSS (380), Telegram OTC (1200)'
      },
      stylometric: {
        sentenceLength: '14.6 words',
        sentencePercent: 58,
        ttr: '0.690',
        ttrPercent: 69,
        tripleComma: 'Exclamation tags (!!)',
        questionMark: 'Percentage spread notation',
        homoglyph: 'Fee rate syntax [3.5%]',
        leetspeak: '11.4% (otc, cl34n, usdt)'
      },
      tef: {
        applicability: 91,
        technicalEase: 88,
        legalAdmissibility: 94
      },
      sec65b: {
        ref: 'NTRO/65B/2024-OTC-771',
        hash: '9f81a74281c0022416bc7ef09e7f842b03698d5c414901f46820df38a164993e',
        custody: 'FINANCIAL INTELLIGENCE DOCKET'
      },
      diffData: {
        sourceHandle: 'CoinWipe_Alpha (Exploit, 2023)',
        targetHandle: 'CleanMix_Bitz (XSS, 2024)',
        sourceText: 'Fast liquidity swap!! Stolen DeFi funds converted to clean USDT <span class="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">[Fee: 3.5%]</span>. Send requests to <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">0x71C...TornCash</span> or BTC deposit. <span class="bg-purple-500/30 text-purple-300 px-1 rounded">No KYC ever required</span>, guaranteed clean ledger history.',
        targetText: 'Instant unflagged swap!! High-risk coin cleansed to spot Tether <span class="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">[Fee: 3.5%]</span>. Smart contract gateway: <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">0x71C...TornCash</span> deployed. <span class="bg-purple-500/30 text-purple-300 px-1 rounded">No KYC ever required</span>, automated smart router active.'
      },
      nodes: [
        { id: 'actor_exchanger', label: 'DarkExchanger\n(Core OTC Syndicate)', type: 'actor', details: 'Transnational illicit financial intermediary laundering ransomware and cyber heist yields.', firstSeen: '2021-01-20', confidence: 99.6 },
        { id: 'handle_coinwipe', label: 'CoinWipe_Alpha\n(Exploit Forum)', type: 'handle', details: 'Prominent OTC swap desk on Exploit.in handling millions in dirty Bitcoin.', firstSeen: '2021-03-10', confidence: 96.0 },
        { id: 'handle_cleanmix', label: 'CleanMix_Bitz\n(XSS Forum)', type: 'handle', details: 'Rebranded desk on XSS.is offering Tornado Cash un-mixing and Tether swaps.', firstSeen: '2023-04-18', confidence: 94.5 },
        { id: 'handle_tetherotc', label: 'TetherOTC_VIP\n(Private Telegram)', type: 'handle', details: 'High-volume invite-only VIP OTC channel on Telegram.', firstSeen: '2023-09-02', confidence: 92.0 },
        { id: 'handle_instantsats', label: 'InstantSats_TG\n(Automated Bot)', type: 'handle', details: 'Telegram bot processing automated deposit vouchers.', firstSeen: '2023-11-15', confidence: 89.0 },
        { id: 'wallet_torn_bridge', label: '0x71C...TornCash\n(Smart Contract)', type: 'wallet', details: 'Relayer smart contract address tied to Tornado.Cash deposit pools.', firstSeen: '2022-08-11', confidence: 99.0 },
        { id: 'wallet_btc_peel', label: 'bc1q_peel_901\n(Peel Chain Consolidator)', type: 'wallet', details: '10-hop peel chain node holding 220 BTC in split utxos.', firstSeen: '2022-10-04', confidence: 97.0 },
        { id: 'wallet_tether_whale', label: '1Lbc...TetherWhale\n(Omni/TRC20)', type: 'wallet', details: 'High-balance USDT liquidity pool holding $14.2M in stablecoins.', firstSeen: '2023-05-19', confidence: 98.2 },
        { id: 'wallet_binance_leak', label: 'bc1q_binance_leak\n(Exchange Hot Wallet)', type: 'wallet', details: 'Centralized exchange deposit address linked to KYC passport leak.', firstSeen: '2024-02-01', confidence: 95.0 },
        { id: 'pgp_otc_root', label: 'PGP 0x88F1_AA02\n(Master Key)', type: 'pgp', details: 'OpenPGP master key used for signing bulk settlement vouchers.', firstSeen: '2021-01-20', confidence: 100.0 },
        { id: 'pgp_otc_subkey', label: 'PGP 0x88F1_SUB9\n(CleanMix Key)', type: 'pgp', details: 'Subkey published on XSS verified by 0x88F1 master key.', firstSeen: '2023-04-18', confidence: 100.0 },
        { id: 'pgp_telegram_key', label: 'PGP 0x992B_OTC1\n(Bot Gateway)', type: 'pgp', details: 'Ephemeral PGP encryption subkey for automated API bots.', firstSeen: '2023-11-15', confidence: 91.0 },
        { id: 'infra_haproxy', label: 'SRV-HAPROXY-TLS\n(Serial Leak)', type: 'infra', details: 'HAProxy load balancer with leaked TLS certificate serial number #889104.', firstSeen: '2023-07-22', confidence: 94.0 },
        { id: 'infra_api_typo', label: 'API Signature Typo\n("err_codde")', type: 'infra', details: 'Unique JSON error response typo ("err_codde": 401) across 2 APIs.', firstSeen: '2023-08-30', confidence: 99.2 },
        { id: 'infra_tg_webhook', label: 'TG Webhook DNS\n(Origin IP Leak)', type: 'infra', details: 'Telegram bot setWebhook API call leaked backend IP: 103.253.144.18.', firstSeen: '2023-12-01', confidence: 97.4 },
        { id: 'infra_singapore_host', label: 'VPS 103.253...\n(Singapore ASN)', type: 'infra', details: 'Backend gateway host located in Singapore hosting the swap routing engine.', firstSeen: '2023-12-05', confidence: 92.0 }
      ],
      edges: [
        { id: 'de1', source: 'actor_exchanger', target: 'handle_coinwipe', label: 'Original Identity', type: 'deterministic', vector: 'Handle', confidence: 99.6 },
        { id: 'de2', source: 'actor_exchanger', target: 'pgp_otc_root', label: 'Cryptographic Root', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'de3', source: 'pgp_otc_root', target: 'pgp_otc_subkey', label: 'Subkey Signature', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'de4', source: 'handle_cleanmix', target: 'pgp_otc_subkey', label: 'Published Key on XSS', type: 'deterministic', vector: 'PGP', confidence: 100.0 },
        { id: 'de5', source: 'handle_coinwipe', target: 'wallet_btc_peel', label: 'Deposit Ledger', type: 'deterministic', vector: 'Wallets', confidence: 97.0 },
        { id: 'de6', source: 'wallet_btc_peel', target: 'wallet_torn_bridge', label: 'Bridge Relayer Tx', type: 'deterministic', vector: 'Wallets', confidence: 99.0 },
        { id: 'de7', source: 'wallet_torn_bridge', target: 'wallet_tether_whale', label: 'Liquidity Provider Swap', type: 'deterministic', vector: 'Wallets', confidence: 98.2 },
        { id: 'de8', source: 'wallet_tether_whale', target: 'wallet_binance_leak', label: 'Direct OTC Cashout', type: 'deterministic', vector: 'Wallets', confidence: 95.0 },
        { id: 'de9', source: 'infra_haproxy', target: 'infra_api_typo', label: 'API Gateway Signature', type: 'deterministic', vector: 'Infrastructure', confidence: 99.2 },
        { id: 'de10', source: 'infra_tg_webhook', target: 'infra_singapore_host', label: 'DNS A-Record Leak', type: 'deterministic', vector: 'Infrastructure', confidence: 97.4 },
        { id: 'de11', source: 'handle_coinwipe', target: 'handle_cleanmix', label: 'Fee Tag & Punctuation Match', type: 'probabilistic', vector: 'Stylometry', confidence: 94.2 },
        { id: 'de12', source: 'handle_cleanmix', target: 'handle_tetherotc', label: 'VIP Bot Promotion', type: 'probabilistic', vector: 'Stylometry', confidence: 91.0 },
        { id: 'de13', source: 'handle_instantsats', target: 'infra_tg_webhook', label: 'Bot Webhook Endpoint', type: 'deterministic', vector: 'Infrastructure', confidence: 96.0 },
        { id: 'de14', source: 'handle_tetherotc', target: 'wallet_tether_whale', label: 'Settlement Wallet', type: 'deterministic', vector: 'Wallets', confidence: 97.0 },
        { id: 'de15', source: 'handle_instantsats', target: 'pgp_telegram_key', label: 'Bot Encryption Key', type: 'deterministic', vector: 'PGP', confidence: 91.0 },
        { id: 'de16', source: 'pgp_otc_root', target: 'pgp_telegram_key', label: 'Subkey Certification', type: 'probabilistic', vector: 'PGP', confidence: 89.0 },
        { id: 'de17', source: 'actor_exchanger', target: 'wallet_tether_whale', label: 'Ultimate Beneficial Owner', type: 'deterministic', vector: 'Wallets', confidence: 99.0 },
        { id: 'de18', source: 'handle_cleanmix', target: 'wallet_torn_bridge', label: 'Contract Gateway Post', type: 'deterministic', vector: 'Wallets', confidence: 96.5 },
        { id: 'de19', source: 'infra_haproxy', target: 'infra_singapore_host', label: 'Reverse Proxy Route', type: 'probabilistic', vector: 'Infrastructure', confidence: 90.0 },
        { id: 'de20', source: 'handle_coinwipe', target: 'wallet_binance_leak', label: 'Early Deposit Link', type: 'probabilistic', vector: 'Wallets', confidence: 87.0 },
        { id: 'de21', source: 'handle_tetherotc', target: 'handle_instantsats', label: 'Sub-Desk Bot Forwarder', type: 'probabilistic', vector: 'Stylometry', confidence: 93.0 }
      ]
    }
  };

  // State Management
  let currentProfileKey = 'spectre';
  let cy = null;
  let currentThreshold = 70;
  let activeFilters = {
    PGP: true,
    Stylometry: true,
    Wallets: true,
    Infrastructure: true
  };
  let currentSearchTerm = '';
  let simulationTimer = null;
  let isSimulating = false;

  // =========================================================================
  // 2. CYTOSCAPE GRAPH INITIALIZATION & STYLING
  // =========================================================================
  function getCyElements(profile) {
    const nodes = profile.nodes.map(n => ({
      data: {
        id: n.id,
        label: n.label,
        type: n.type,
        details: n.details,
        firstSeen: n.firstSeen,
        confidence: n.confidence
      }
    }));

    const edges = profile.edges.map(e => ({
      data: {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        type: e.type,
        vector: e.vector,
        confidence: e.confidence
      }
    }));

    return [...nodes, ...edges];
  }

  function initCytoscape() {
    const container = document.getElementById('cy');
    if (!container) return;

    const profile = THREAT_PROFILES[currentProfileKey];
    const elements = getCyElements(profile);

    // Node & Edge Stylesheet per user specifications
    const cyStyles = [
      // Core Base Node
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'color': '#f8fafc',
          'font-size': '10px',
          'font-family': 'ui-monospace, monospace',
          'text-valign': 'bottom',
          'text-margin-y': 6,
          'text-wrap': 'wrap',
          'text-max-width': '120px',
          'transition-property': 'background-color, border-color, width, height, opacity',
          'transition-duration': '0.25s'
        }
      },
      // 1. Red Circle: Core Threat Actor / Persona
      {
        selector: 'node[type = "actor"]',
        style: {
          'shape': 'ellipse',
          'background-color': '#ef4444',
          'border-width': 3,
          'border-color': '#fca5a5',
          'width': 44,
          'height': 44,
          'font-weight': 'bold',
          'font-size': '11px',
          'shadow-blur': 15,
          'shadow-color': 'rgba(239, 68, 68, 0.4)'
        }
      },
      // 2. Blue Square: Marketplace Handles / Forum Aliases
      {
        selector: 'node[type = "handle"]',
        style: {
          'shape': 'round-rectangle',
          'background-color': '#38bdf8',
          'border-width': 2,
          'border-color': '#bae6fd',
          'width': 36,
          'height': 36
        }
      },
      // 3. Gold Diamond: Crypto Wallets
      {
        selector: 'node[type = "wallet"]',
        style: {
          'shape': 'diamond',
          'background-color': '#f59e0b',
          'border-width': 2,
          'border-color': '#fde68a',
          'width': 38,
          'height': 38
        }
      },
      // 4. Green Hexagon: PGP Key Fingerprints
      {
        selector: 'node[type = "pgp"]',
        style: {
          'shape': 'hexagon',
          'background-color': '#10b981',
          'border-width': 2,
          'border-color': '#a7f3d0',
          'width': 36,
          'height': 36
        }
      },
      // 5. Slate Triangle: Server Infrastructure / Fingerprints
      {
        selector: 'node[type = "infra"]',
        style: {
          'shape': 'triangle',
          'background-color': '#94a3b8',
          'border-width': 2,
          'border-color': '#e2e8f0',
          'width': 36,
          'height': 36
        }
      },
      // Edge: Base
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.8,
          'font-size': '8px',
          'font-family': 'ui-monospace, monospace',
          'color': '#94a3b8',
          'text-rotation': 'autorotate',
          'text-margin-y': -6,
          'transition-property': 'line-color, opacity, width',
          'transition-duration': '0.2s'
        }
      },
      // Edge: Solid Line (Deterministic)
      {
        selector: 'edge[type = "deterministic"]',
        style: {
          'line-style': 'solid',
          'width': 2.5,
          'line-color': '#38bdf8',
          'target-arrow-color': '#38bdf8'
        }
      },
      // Edge: Dashed Line (Probabilistic)
      {
        selector: 'edge[type = "probabilistic"]',
        style: {
          'line-style': 'dashed',
          'line-dash-pattern': [6, 3],
          'width': 2,
          'line-color': '#c084fc',
          'target-arrow-color': '#c084fc'
        }
      },
      // Active / Highlighted States
      {
        selector: '.highlighted',
        style: {
          'border-width': 4,
          'border-color': '#ffffff',
          'shadow-blur': 25,
          'shadow-color': '#38bdf8',
          'opacity': 1
        }
      },
      {
        selector: '.highlighted-edge',
        style: {
          'width': 4,
          'line-color': '#f43f5e',
          'target-arrow-color': '#f43f5e',
          'opacity': 1,
          'z-index': 999
        }
      },
      {
        selector: '.dimmed',
        style: {
          'opacity': 0.15
        }
      },
      {
        selector: '.search-hit',
        style: {
          'border-width': 4,
          'border-color': '#38bdf8',
          'shadow-blur': 25,
          'shadow-color': '#38bdf8',
          'opacity': 1
        }
      }
    ];

    if (cy) {
      cy.destroy();
    }

    cy = cytoscape({
      container: container,
      elements: elements,
      style: cyStyles,
      layout: {
        name: 'cose',
        animate: true,
        randomize: false,
        componentSpacing: 100,
        nodeOverlap: 20,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      minZoom: 0.2,
      maxZoom: 3.5,
      wheelSensitivity: 0.2
    });

    // Node & Edge Interaction Handlers
    cy.on('tap', 'node', function (evt) {
      const node = evt.target;
      highlightConnected(node);
      updateInspectorWithNode(node.data());
    });

    cy.on('tap', 'edge', function (evt) {
      const edge = evt.target;
      highlightEdge(edge);
      updateInspectorWithEdge(edge.data());

      // If edge links two handles, auto-open Zone 4 comparator
      const sourceNode = cy.getElementById(edge.data('source'));
      const targetNode = cy.getElementById(edge.data('target'));
      if (sourceNode && targetNode) {
        if (sourceNode.data('type') === 'handle' || targetNode.data('type') === 'handle') {
          openEvidenceDrawer('stylo');
        } else if (edge.data('vector') === 'Wallets') {
          openEvidenceDrawer('blockchain');
        } else if (edge.data('vector') === 'Infrastructure') {
          openEvidenceDrawer('server');
        } else if (edge.data('vector') === 'PGP') {
          openEvidenceDrawer('pgp');
        }
      }
    });

    cy.on('tap', function (evt) {
      if (evt.target === cy) {
        resetHighlights();
      }
    });

    applyFiltersAndThreshold();
    updateHUDCounts();
  }

  function highlightConnected(node) {
    cy.batch(() => {
      cy.elements().removeClass('highlighted highlighted-edge search-hit dimmed');
      const neighborhood = node.neighborhood().add(node);
      cy.elements().not(neighborhood).addClass('dimmed');
      neighborhood.nodes().addClass('highlighted');
      neighborhood.edges().addClass('highlighted-edge');
    });
  }

  function highlightEdge(edge) {
    cy.batch(() => {
      cy.elements().removeClass('highlighted highlighted-edge search-hit dimmed');
      const connected = edge.connectedNodes().add(edge);
      cy.elements().not(connected).addClass('dimmed');
      connected.nodes().addClass('highlighted');
      edge.addClass('highlighted-edge');
    });
  }

  function resetHighlights() {
    cy.batch(() => {
      cy.elements().removeClass('highlighted highlighted-edge search-hit dimmed');
    });
    // Reset inspector to default threat profile
    const profile = THREAT_PROFILES[currentProfileKey];
    updateInspectorWithProfile(profile);
  }

  function updateHUDCounts() {
    if (!cy) return;
    const visibleNodes = cy.nodes(':visible').length;
    const visibleEdges = cy.edges(':visible').length;
    const hudNodes = document.getElementById('hudNodesCount');
    const hudEdges = document.getElementById('hudEdgesCount');
    if (hudNodes) hudNodes.textContent = `${visibleNodes} nodes`;
    if (hudEdges) hudEdges.textContent = `${visibleEdges} edges`;
  }

  // Filter application based on vector checkboxes and TEF threshold
  function applyFiltersAndThreshold() {
    if (!cy) return;

    cy.batch(() => {
      // 1. Filter edges based on threshold and checkboxes
      cy.edges().forEach(edge => {
        const conf = edge.data('confidence') || 0;
        const vector = edge.data('vector') || '';
        const vectorAllowed = activeFilters[vector] !== false;
        const thresholdPass = conf >= currentThreshold;

        if (vectorAllowed && thresholdPass) {
          edge.show();
        } else {
          edge.hide();
        }
      });

      // 2. Hide nodes if isolated and confidence < threshold
      cy.nodes().forEach(node => {
        const conf = node.data('confidence') || 0;
        const connectedVisibleEdges = node.connectedEdges(':visible').length;
        const isCore = node.data('type') === 'actor';

        if (isCore || connectedVisibleEdges > 0 || conf >= currentThreshold) {
          node.show();
        } else {
          node.hide();
        }
      });
    });

    updateHUDCounts();
  }

  // =========================================================================
  // 3. 24-HOUR DIURNAL POSTING CURVE CANVAS ENGINE
  // =========================================================================
  function renderDiurnalChart() {
    const canvas = document.getElementById('diurnalCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const profile = THREAT_PROFILES[currentProfileKey];
    const data = profile.diurnal.hourly;

    // Handle high-DPI crisp rendering
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 12, bottom: 20, left: 10, right: 10 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const barWidth = chartW / 24;
    const maxVal = Math.max(...data, 10);

    // Sleep Window Shading
    const [sleepStart, sleepEnd] = profile.diurnal.sleepWindow;
    ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
    if (sleepStart < sleepEnd) {
      const sX = padding.left + sleepStart * barWidth;
      const sW = (sleepEnd - sleepStart) * barWidth;
      ctx.fillRect(sX, padding.top, sW, chartH);
    } else {
      // Wraparound midnight
      const sX1 = padding.left + sleepStart * barWidth;
      const sW1 = (24 - sleepStart) * barWidth;
      ctx.fillRect(sX1, padding.top, sW1, chartH);
      const sX2 = padding.left;
      const sW2 = sleepEnd * barWidth;
      ctx.fillRect(sX2, padding.top, sW2, chartH);
    }

    // Grid baseline
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Render 24 hourly bars
    for (let h = 0; h < 24; h++) {
      const val = data[h];
      const barH = (val / maxVal) * (chartH - 6);
      const x = padding.left + h * barWidth + 1.5;
      const y = height - padding.bottom - barH;
      const w = Math.max(1, barWidth - 3);

      // Color coding: Sleep trough = muted rose/slate, Peak = emerald, Normal = sky
      const isSleep = (sleepStart < sleepEnd)
        ? (h >= sleepStart && h < sleepEnd)
        : (h >= sleepStart || h < sleepEnd);

      if (isSleep) {
        ctx.fillStyle = '#f43f5e';
        ctx.globalAlpha = 0.5;
      } else if (val > maxVal * 0.65) {
        ctx.fillStyle = '#10b981'; // Peak active
        ctx.globalAlpha = 0.9;
      } else {
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = 0.75;
      }

      ctx.fillRect(x, y, w, barH);
      ctx.globalAlpha = 1.0;

      // Labels every 4 hours
      if (h % 4 === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '9px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${h}h`, x + w / 2, height - 6);
      }
    }

    // Update Diurnal text tags
    const zoneBadge = document.getElementById('diurnalInferredZone');
    const sleepTroughBadge = document.getElementById('diurnalSleepTrough');
    if (zoneBadge) zoneBadge.textContent = profile.diurnal.zone;
    if (sleepTroughBadge) sleepTroughBadge.textContent = profile.diurnal.sleepTroughText;
  }

  // Interactive hover tooltip for diurnal canvas
  function setupDiurnalCanvasTooltip() {
    const canvas = document.getElementById('diurnalCanvas');
    const tooltip = document.getElementById('diurnalTooltip');
    if (!canvas || !tooltip) return;

    canvas.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - 10;
      const barW = (rect.width - 20) / 24;
      const hour = Math.min(23, Math.max(0, Math.floor(x / barW)));

      const profile = THREAT_PROFILES[currentProfileKey];
      const count = profile.diurnal.hourly[hour] || 0;

      tooltip.style.left = `${Math.min(rect.width - 120, Math.max(10, e.clientX - rect.left))}px`;
      tooltip.style.top = `10px`;
      tooltip.classList.remove('hidden');
      tooltip.innerHTML = `<strong>${String(hour).padStart(2, '0')}:00 UTC</strong>: ${count} posts<br><span class="text-slate-400 text-[9px]">${profile.diurnal.zone} match</span>`;
    });

    canvas.addEventListener('mouseleave', function () {
      tooltip.classList.add('hidden');
    });
  }

  // =========================================================================
  // 4. LIVE TEF SCORE METER & VERIFICATION CHECKLIST
  // =========================================================================
  function calculateTEF(A, T, L) {
    // Formula: TS = (0.385 * Applicability) + (0.204 * Technical_Ease) + (0.412 * Legal_Admissibility)
    return ((0.385 * A) + (0.204 * T) + (0.412 * L)).toFixed(1);
  }

  function updateTEFMeter(A, T, L) {
    const score = calculateTEF(A, T, L);
    const scoreVal = document.getElementById('tefScoreValue');
    const radialCircle = document.getElementById('tefRadialCircle');
    const metricA = document.getElementById('tefMetricA');
    const metricT = document.getElementById('tefMetricT');
    const metricL = document.getElementById('tefMetricL');
    const barA = document.getElementById('tefBarA');
    const barT = document.getElementById('tefBarT');
    const barL = document.getElementById('tefBarL');

    if (scoreVal) scoreVal.textContent = `${score}%`;
    if (metricA) metricA.textContent = `${A}%`;
    if (metricT) metricT.textContent = `${T}%`;
    if (metricL) metricL.textContent = `${L}%`;
    if (barA) barA.style.width = `${A}%`;
    if (barT) barT.style.width = `${T}%`;
    if (barL) barL.style.width = `${L}%`;

    // Circumference = 2 * PI * 40 ≈ 251.2
    if (radialCircle) {
      const circ = 251.2;
      const offset = circ - (circ * (parseFloat(score) / 100));
      radialCircle.style.strokeDashoffset = offset;
      
      // Color progression
      if (score >= 90) {
        radialCircle.setAttribute('stroke', '#38bdf8'); // Sky blue confident
      } else if (score >= 75) {
        radialCircle.setAttribute('stroke', '#10b981'); // Emerald
      } else {
        radialCircle.setAttribute('stroke', '#f59e0b'); // Amber
      }
    }
  }

  // =========================================================================
  // 5. INSPECTOR & SIDEBAR PROFILE SYNC
  // =========================================================================
  function updateInspectorWithProfile(profile) {
    const typeBadge = document.getElementById('inspectorTypeBadge');
    const inspectId = document.getElementById('inspectId');
    const inspectLabel = document.getElementById('inspectLabel');
    const inspectDetails = document.getElementById('inspectDetails');
    const inspectFirstSeen = document.getElementById('inspectFirstSeen');
    const inspectConfidence = document.getElementById('inspectConfidence');

    if (typeBadge) {
      typeBadge.textContent = 'ACTOR';
      typeBadge.className = 'text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-850';
    }
    if (inspectId) inspectId.textContent = profile.id;
    if (inspectLabel) inspectLabel.textContent = profile.name;
    if (inspectDetails) inspectDetails.textContent = `Core Threat Actor Profile. Vector: ${profile.vector}. Inferred Locale: ${profile.locale}. Total linked network assets: ${profile.nodes.length} nodes, ${profile.edges.length} forensic edges.`;
    if (inspectFirstSeen) inspectFirstSeen.textContent = '2021-04-12 14:22 UTC';
    if (inspectConfidence) inspectConfidence.textContent = '99.8% (Deterministic Root)';

    // Reset TEF meter to profile baseline
    updateTEFMeter(profile.tef.applicability, profile.tef.technicalEase, profile.tef.legalAdmissibility);
  }

  function updateInspectorWithNode(data) {
    const typeBadge = document.getElementById('inspectorTypeBadge');
    const inspectId = document.getElementById('inspectId');
    const inspectLabel = document.getElementById('inspectLabel');
    const inspectDetails = document.getElementById('inspectDetails');
    const inspectFirstSeen = document.getElementById('inspectFirstSeen');
    const inspectConfidence = document.getElementById('inspectConfidence');

    if (typeBadge) {
      typeBadge.textContent = (data.type || 'ENTITY').toUpperCase();
      let badgeClass = 'text-[9px] font-mono px-1.5 py-0.2 rounded ';
      if (data.type === 'actor') badgeClass += 'bg-rose-950 text-rose-300 border border-rose-850';
      else if (data.type === 'handle') badgeClass += 'bg-sky-950 text-sky-300 border border-sky-850';
      else if (data.type === 'wallet') badgeClass += 'bg-amber-950 text-amber-300 border border-amber-850';
      else if (data.type === 'pgp') badgeClass += 'bg-emerald-950 text-emerald-300 border border-emerald-850';
      else badgeClass += 'bg-slate-800 text-slate-300 border border-slate-700';
      typeBadge.className = badgeClass;
    }

    if (inspectId) inspectId.textContent = data.id;
    if (inspectLabel) inspectLabel.textContent = data.label.replace('\n', ' ');
    if (inspectDetails) inspectDetails.textContent = data.details || 'No forensic anomalies recorded.';
    if (inspectFirstSeen) inspectFirstSeen.textContent = data.firstSeen || '2022-01-01';
    if (inspectConfidence) inspectConfidence.textContent = `${data.confidence || 90}% Correlation`;

    // Adjust TEF dynamically based on node confidence
    const conf = data.confidence || 90;
    updateTEFMeter(Math.min(100, conf), Math.min(100, conf - 5), Math.min(100, conf + 2));
  }

  function updateInspectorWithEdge(data) {
    const typeBadge = document.getElementById('inspectorTypeBadge');
    const inspectId = document.getElementById('inspectId');
    const inspectLabel = document.getElementById('inspectLabel');
    const inspectDetails = document.getElementById('inspectDetails');
    const inspectFirstSeen = document.getElementById('inspectFirstSeen');
    const inspectConfidence = document.getElementById('inspectConfidence');

    if (typeBadge) {
      typeBadge.textContent = 'LINK: ' + (data.type || 'EDGE').toUpperCase();
      typeBadge.className = 'text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-850';
    }

    if (inspectId) inspectId.textContent = `${data.source} ➔ ${data.target}`;
    if (inspectLabel) inspectLabel.textContent = `${data.vector} Vector: ${data.label}`;
    if (inspectDetails) inspectDetails.textContent = `Forensic Evidence Vector: ${data.vector}. Link Classification: ${data.type.toUpperCase()}. Evaluated mathematically at ${data.confidence}% confidence under Section 65B forensics.`;
    if (inspectFirstSeen) inspectFirstSeen.textContent = 'Cross-Referenced in Intelligence Graph';
    if (inspectConfidence) inspectConfidence.textContent = `${data.confidence}% (${data.type})`;

    const conf = data.confidence || 90;
    updateTEFMeter(Math.min(100, conf + 1), Math.min(100, conf - 3), Math.min(100, conf));
  }

  function loadProfile(key) {
    if (!THREAT_PROFILES[key]) return;
    currentProfileKey = key;
    const p = THREAT_PROFILES[key];

    // Zone 1 Text fields
    const dName = document.getElementById('dossierName');
    const dBadge = document.getElementById('dossierBadge');
    const dAliases = document.getElementById('dossierAliases');
    const dVector = document.getElementById('dossierVector');
    const dLocale = document.getElementById('dossierLocale');
    const dProceeds = document.getElementById('dossierProceeds');
    const dRebrand = document.getElementById('dossierRebrand');

    if (dName) dName.textContent = p.name;
    if (dBadge) {
      dBadge.textContent = p.badge;
      dBadge.className = `text-[9px] px-1.5 py-0.2 rounded font-mono border ${p.badgeClass}`;
    }
    if (dAliases) dAliases.textContent = `Aliases: ${p.aliases}`;
    if (dVector) dVector.textContent = p.vector;
    if (dLocale) dLocale.textContent = p.locale;
    if (dProceeds) dProceeds.textContent = p.proceeds;
    if (dRebrand) dRebrand.textContent = p.rebrand;

    // Stylometrics
    const sLen = document.getElementById('metricSentenceLength');
    const bLen = document.getElementById('barSentenceLength');
    const sTtr = document.getElementById('metricTTR');
    const bTtr = document.getElementById('barTTR');
    const sComma = document.getElementById('metricTripleComma');
    const sQmark = document.getElementById('metricQuestionMark');
    const sHomo = document.getElementById('metricHomoglyph');
    const sLeet = document.getElementById('metricLeetspeak');

    if (sLen) sLen.textContent = p.stylometric.sentenceLength;
    if (bLen) bLen.style.width = `${p.stylometric.sentencePercent}%`;
    if (sTtr) sTtr.textContent = p.stylometric.ttr;
    if (bTtr) bTtr.style.width = `${p.stylometric.ttrPercent}%`;
    if (sComma) sComma.textContent = p.stylometric.tripleComma;
    if (sQmark) sQmark.textContent = p.stylometric.questionMark;
    if (sHomo) sHomo.textContent = p.stylometric.homoglyph;
    if (sLeet) sLeet.textContent = p.stylometric.leetspeak;

    // 65B Fields
    const ref = document.getElementById('sec65bRef');
    const hash = document.getElementById('sec65bHash');
    if (ref) ref.textContent = p.sec65b.ref;
    if (hash) {
      hash.textContent = p.sec65b.hash.slice(0, 8) + '...' + p.sec65b.hash.slice(-4);
      hash.title = p.sec65b.hash;
    }

    // Zone 4 Diff texts
    const diffSrcHandle = document.getElementById('diffSourceHandle');
    const diffTgtHandle = document.getElementById('diffTargetHandle');
    const diffSrcText = document.getElementById('diffSourceText');
    const diffTgtText = document.getElementById('diffTargetText');
    if (diffSrcHandle) diffSrcHandle.textContent = p.diffData.sourceHandle;
    if (diffTgtHandle) diffTgtHandle.textContent = p.diffData.targetHandle;
    if (diffSrcText) diffSrcText.innerHTML = p.diffData.sourceText;
    if (diffTgtText) diffTgtText.innerHTML = p.diffData.targetText;

    // Redraw Diurnal Canvas
    renderDiurnalChart();

    // Re-init Cytoscape with new profile
    initCytoscape();

    // Reset Inspector
    updateInspectorWithProfile(p);
  }

  // =========================================================================
  // 6. ZONE 4 EVIDENCE COMPARATOR DRAWER & TABS
  // =========================================================================
  function toggleEvidenceDrawer(forceOpen) {
    const drawer = document.getElementById('evidenceDrawer');
    const chevron = document.getElementById('drawerChevron');
    if (!drawer) return;

    const isClosed = drawer.classList.contains('translate-y-[calc(100%-36px)]');
    if (forceOpen === true || isClosed) {
      drawer.classList.remove('translate-y-[calc(100%-36px)]');
      drawer.classList.add('translate-y-0');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
      drawer.classList.add('translate-y-[calc(100%-36px)]');
      drawer.classList.remove('translate-y-0');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }

  function openEvidenceDrawer(tab) {
    toggleEvidenceDrawer(true);
    switchDrawerTab(tab);
  }

  function switchDrawerTab(tabName) {
    const tabs = ['Stylo', 'Blockchain', 'Server', 'PGP'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tabBtn${t}`);
      const content = document.getElementById(`tabContent${t}`);
      const match = t.toLowerCase() === tabName.toLowerCase();

      if (btn) {
        if (match) {
          btn.className = 'px-3 py-1 rounded text-xs font-mono font-medium bg-purple-900/40 text-purple-300 border border-purple-500/50';
        } else {
          btn.className = 'px-3 py-1 rounded text-xs font-mono font-medium bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200';
        }
      }

      if (content) {
        if (match) content.classList.remove('hidden');
        else content.classList.add('hidden');
      }
    });
  }

  // =========================================================================
  // 7. WORKING SEARCH, THRESHOLD SLIDER & CONTROLS
  // =========================================================================
  function setupSearch() {
    const input = document.getElementById('globalSearch');
    const countBadge = document.getElementById('searchMatchCount');
    const clearBtn = document.getElementById('clearSearchBtn');
    if (!input) return;

    input.addEventListener('input', function (e) {
      const val = e.target.value.trim().toLowerCase();
      currentSearchTerm = val;

      if (!val) {
        if (countBadge) countBadge.classList.add('hidden');
        if (clearBtn) clearBtn.classList.add('hidden');
        resetHighlights();
        return;
      }

      if (clearBtn) clearBtn.classList.remove('hidden');

      if (!cy) return;
      cy.batch(() => {
        cy.elements().removeClass('highlighted highlighted-edge search-hit dimmed');
        const matches = cy.nodes().filter(n => {
          const d = n.data();
          const lbl = (d.label || '').toLowerCase();
          const id = (d.id || '').toLowerCase();
          const details = (d.details || '').toLowerCase();
          return lbl.includes(val) || id.includes(val) || details.includes(val);
        });

        if (matches.length > 0) {
          cy.elements().not(matches).addClass('dimmed');
          matches.addClass('search-hit');
          if (countBadge) {
            countBadge.classList.remove('hidden');
            countBadge.textContent = `${matches.length} hits`;
          }
          cy.animate({
            fit: {
              eles: matches,
              padding: 60
            },
            duration: 400
          });
        } else {
          cy.elements().addClass('dimmed');
          if (countBadge) {
            countBadge.classList.remove('hidden');
            countBadge.textContent = `0 hits`;
          }
        }
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        currentSearchTerm = '';
        countBadge.classList.add('hidden');
        clearBtn.classList.add('hidden');
        resetHighlights();
        cy.fit(null, 40);
      });
    }

    // Keyboard shortcut Ctrl+K or Cmd+K
    window.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  function setupControls() {
    // Actor Selector
    const actorSelect = document.getElementById('actorSelect');
    if (actorSelect) {
      actorSelect.addEventListener('change', function (e) {
        loadProfile(e.target.value);
      });
    }

    // Layout Selector
    const layoutSelect = document.getElementById('layoutSelect');
    if (layoutSelect) {
      layoutSelect.addEventListener('change', function (e) {
        if (!cy) return;
        const layoutName = e.target.value;
        const layout = cy.layout({
          name: layoutName,
          animate: true,
          animationDuration: 500,
          fit: true,
          padding: 50
        });
        layout.run();
      });
    }

    // Threshold Slider
    const slider = document.getElementById('thresholdSlider');
    const thresholdVal = document.getElementById('thresholdVal');
    if (slider) {
      slider.addEventListener('input', function (e) {
        currentThreshold = parseInt(e.target.value, 10);
        if (thresholdVal) thresholdVal.textContent = `≥${currentThreshold}%`;
        applyFiltersAndThreshold();
      });
    }

    // Edge Filter Checkboxes
    const filters = [
      { id: 'filterPGP', key: 'PGP' },
      { id: 'filterStylometry', key: 'Stylometry' },
      { id: 'filterWallets', key: 'Wallets' },
      { id: 'filterInfra', key: 'Infrastructure' }
    ];

    filters.forEach(f => {
      const el = document.getElementById(f.id);
      if (el) {
        el.addEventListener('change', function (e) {
          activeFilters[f.key] = e.target.checked;
          applyFiltersAndThreshold();
        });
      }
    });

    // Zoom and Pan buttons
    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnFitView = document.getElementById('btnFitView');
    const btnResetView = document.getElementById('btnResetView');

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (cy) cy.zoom({ level: cy.zoom() * 1.25, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (cy) cy.zoom({ level: cy.zoom() * 0.8, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
      });
    }

    if (btnFitView) {
      btnFitView.addEventListener('click', () => {
        if (cy) cy.fit(null, 40);
      });
    }

    if (btnResetView) {
      btnResetView.addEventListener('click', () => {
        if (cy) {
          resetHighlights();
          cy.fit(null, 40);
        }
      });
    }

    // Clear Filters Button in Top Navbar
    const btnClearFilters = document.getElementById('btnClearFilters');
    if (btnClearFilters) {
      btnClearFilters.addEventListener('click', function () {
        if (slider) {
          slider.value = 70;
          currentThreshold = 70;
          if (thresholdVal) thresholdVal.textContent = '≥70%';
        }
        filters.forEach(f => {
          const el = document.getElementById(f.id);
          if (el) el.checked = true;
          activeFilters[f.key] = true;
        });

        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
          searchInput.value = '';
          const countBadge = document.getElementById('searchMatchCount');
          const clearBtn = document.getElementById('clearSearchBtn');
          if (countBadge) countBadge.classList.add('hidden');
          if (clearBtn) clearBtn.classList.add('hidden');
        }

        resetHighlights();
        applyFiltersAndThreshold();
        if (cy) cy.fit(null, 40);
      });
    }

    // Launch Evidence Comparator from Zone 1
    const btnOpenComp = document.getElementById('btnOpenComparator');
    if (btnOpenComp) {
      btnOpenComp.addEventListener('click', () => openEvidenceDrawer('stylo'));
    }

    // Zone 4 Drawer Toggle Bar
    const drawerToggleBar = document.getElementById('drawerToggleBar');
    if (drawerToggleBar) {
      drawerToggleBar.addEventListener('click', () => toggleEvidenceDrawer());
    }

    // Zone 4 Tab buttons
    document.getElementById('tabBtnStylo')?.addEventListener('click', () => switchDrawerTab('Stylo'));
    document.getElementById('tabBtnBlockchain')?.addEventListener('click', () => switchDrawerTab('Blockchain'));
    document.getElementById('tabBtnServer')?.addEventListener('click', () => switchDrawerTab('Server'));
    document.getElementById('tabBtnPGP')?.addEventListener('click', () => switchDrawerTab('PGP'));

    // Section 65B Modal Dialog Handlers
    const modal = document.getElementById('modal65b');
    const btnView65b = document.getElementById('btnViewCertificate');
    const closeBtn1 = document.getElementById('closeModal65b');
    const closeBtn2 = document.getElementById('btnClose65bBottom');
    const printBtn = document.getElementById('btnPrint65b');

    if (btnView65b && modal) {
      btnView65b.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (closeBtn1 && modal) {
      closeBtn1.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (closeBtn2 && modal) {
      closeBtn2.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // =========================================================================
  // 8. EXPORT ENGINE: STIX 2.1 JSON & FORENSIC CSV
  // =========================================================================
  function setupExports() {
    // Export STIX 2.1 Dossier
    const btnSTIX = document.getElementById('btnExportSTIX');
    if (btnSTIX) {
      btnSTIX.addEventListener('click', function () {
        const profile = THREAT_PROFILES[currentProfileKey];
        const timestamp = new Date().toISOString();
        const actorId = `threat-actor--${profile.id}-ntro-intel`;

        const stixBundle = {
          type: 'bundle',
          id: `bundle--${crypto.randomUUID ? crypto.randomUUID() : 'c98a-412f-98ab'}`,
          spec_version: '2.1',
          objects: [
            {
              type: 'threat-actor',
              spec_version: '2.1',
              id: actorId,
              created: timestamp,
              modified: timestamp,
              name: profile.name,
              description: `De-anonymized Darknet Threat Actor Profile. Operating across forums with verified PGP and diurnal fingerprinting. Primary vector: ${profile.vector}. Inferred locale: ${profile.locale}.`,
              threat_actor_types: ['cybercrime-syndicate', 'ransomware-operator'],
              aliases: profile.aliases.split(',').map(s => s.trim()),
              confidence: profile.tef.applicability
            },
            {
              type: 'identity',
              spec_version: '2.1',
              id: `identity--ntro-forensics-agency`,
              created: timestamp,
              modified: timestamp,
              name: 'National Technical Research Organisation (NTRO) - Digital Forensics Wing',
              identity_class: 'government',
              sectors: ['national-security', 'cyber-defense']
            },
            // Indicators for Wallets, PGP, and Infra
            ...profile.nodes.map(n => ({
              type: 'indicator',
              spec_version: '2.1',
              id: `indicator--${n.id}`,
              created: timestamp,
              modified: timestamp,
              name: n.label.replace('\n', ' '),
              description: n.details,
              indicator_types: [n.type === 'wallet' ? 'malicious-activity' : (n.type === 'pgp' ? 'attribution' : 'infrastructure')],
              pattern: `[${n.type}:id = '${n.id}']`,
              pattern_type: 'stix',
              confidence: n.confidence
            })),
            // Relationships
            ...profile.edges.map(e => ({
              type: 'relationship',
              spec_version: '2.1',
              id: `relationship--${e.id}`,
              created: timestamp,
              modified: timestamp,
              relationship_type: e.type === 'deterministic' ? 'attributed-to' : 'related-to',
              source_ref: `indicator--${e.source}`,
              target_ref: `indicator--${e.target}`,
              description: `Forensic vector: ${e.vector}. Confidence: ${e.confidence}%`,
              confidence: e.confidence
            }))
          ]
        };

        const blob = new Blob([JSON.stringify(stixBundle, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `STIX-2.1-Dossier-${profile.name}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Export CSV Forensic Evidence Table
    const btnCSV = document.getElementById('btnExportCSV');
    if (btnCSV) {
      btnCSV.addEventListener('click', function () {
        const profile = THREAT_PROFILES[currentProfileKey];
        const headers = [
          'Target_Handle',
          'Vector_Type',
          'Source_Artifact',
          'Target_Artifact',
          'Relationship_Label',
          'Classification',
          'Confidence_Score',
          'TEF_Score',
          'Sec_65B_Certified',
          'Timestamp'
        ];

        const rows = profile.edges.map(e => {
          const tefVal = calculateTEF(e.confidence, Math.max(70, e.confidence - 5), Math.max(75, e.confidence));
          return [
            `"${profile.name}"`,
            `"${e.vector}"`,
            `"${e.source}"`,
            `"${e.target}"`,
            `"${e.label.replace(/"/g, '""')}"`,
            `"${e.type.toUpperCase()}"`,
            `${e.confidence}%`,
            `${tefVal}%`,
            `"YES (Sec 65B Compliant)"`,
            `"${new Date().toISOString()}"`
          ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NTRO-DeAnon-Forensic-Evidence-${profile.name}-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }

  // =========================================================================
  // 9. LIVE SIMULATION MODE ENGINE
  // =========================================================================
  function setupSimulation() {
    const btnSim = document.getElementById('btnSimulation');
    const banner = document.getElementById('simBanner');
    const simTitle = document.getElementById('simTitle');
    const simDesc = document.getElementById('simDesc');
    const stopBtn = document.getElementById('simStopBtn');

    if (!btnSim) return;

    function stopSimulation() {
      if (simulationTimer) clearInterval(simulationTimer);
      isSimulating = false;
      if (banner) banner.classList.add('hidden');
      resetHighlights();
    }

    if (stopBtn) stopBtn.addEventListener('click', stopSimulation);

    btnSim.addEventListener('click', function () {
      if (isSimulating) {
        stopSimulation();
        return;
      }

      isSimulating = true;
      if (banner) banner.classList.remove('hidden');

      const simSteps = [
        {
          title: 'STEP 1/5: INGESTING FORUM SCRAPE DUMP',
          desc: 'BreachForums v2 parsed: Extracting public vendor PGP signature & Jabber handle...',
          highlightNode: 'handle_vaporzero',
          zoom: true,
          tef: [78, 70, 80]
        },
        {
          title: 'STEP 2/5: CRYPTOGRAPHIC SUBKEY CORRELATION',
          desc: 'Matching 0x9E7A_SUB2 back to master key 0x9E7A_2B1F published on Dread in 2021...',
          highlightNode: 'pgp_subkey_breach',
          zoom: true,
          tef: [88, 80, 89]
        },
        {
          title: 'STEP 3/5: CIRCADIAN DIURNAL SLEEP TROUGH MATCH',
          desc: 'Circadian physiological trough at 02:00-07:00 UTC aligns with Eastern European UTC+3 timezone...',
          highlightNode: 'handle_ghostbroker',
          zoom: true,
          tef: [92, 85, 91]
        },
        {
          title: 'STEP 4/5: SATOSHI CO-SPEND BLOCKCHAIN TRACE',
          desc: 'Joint UTXO transaction txid: 7c89a01f... verifies co-ownership of Hydra & Breach wallets...',
          highlightNode: 'wallet_peel_chain',
          zoom: true,
          tef: [97, 88, 95]
        },
        {
          title: 'STEP 5/5: COMPLETE DE-ANONYMIZATION CERTIFIED',
          desc: 'TEF Score: 94.6% -> Section 65B Indian Evidence Act Statutory Certificate Generated!',
          highlightNode: 'actor_spectre',
          zoom: true,
          tef: [98, 92, 96]
        }
      ];

      let stepIndex = 0;

      function executeStep() {
        if (!isSimulating || stepIndex >= simSteps.length) {
          setTimeout(() => {
            stopSimulation();
            openEvidenceDrawer('stylo');
          }, 2000);
          return;
        }

        const step = simSteps[stepIndex];
        if (simTitle) simTitle.textContent = step.title;
        if (simDesc) simDesc.textContent = step.desc;

        if (cy) {
          const targetNode = cy.getElementById(step.highlightNode);
          if (targetNode && targetNode.length > 0) {
            highlightConnected(targetNode);
            updateInspectorWithNode(targetNode.data());
            cy.animate({
              center: { eles: targetNode },
              zoom: 1.3,
              duration: 500
            });
          }
        }

        updateTEFMeter(step.tef[0], step.tef[1], step.tef[2]);
        stepIndex++;
      }

      executeStep();
      simulationTimer = setInterval(executeStep, 3500);
    });
  }

  // =========================================================================
  // 10. INITIALIZATION LIFECYCLE
  // =========================================================================
  function init() {
    // 1. Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 2. Setup controls and event listeners
    setupControls();
    setupSearch();
    setupExports();
    setupSimulation();
    setupDiurnalCanvasTooltip();

    // 3. Load initial profile
    loadProfile('spectre');

    // 4. Handle Window Resize for Cytoscape and Diurnal Canvas
    window.addEventListener('resize', () => {
      renderDiurnalChart();
      if (cy) cy.resize();
    });

    // Re-trigger Lucide icons to catch dynamically injected items
    setTimeout(() => {
      if (window.lucide) window.lucide.createIcons();
    }, 150);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
