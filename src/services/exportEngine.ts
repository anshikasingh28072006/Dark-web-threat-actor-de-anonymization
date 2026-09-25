import { ThreatActorProfile, NodeEntity, EdgeEntity, TEFCalculationResult } from '../types';

/**
 * Functional STIX 2.1 JSON and Section 63 BSA / 65B IEA Forensic CSV Exporters.
 */

// Simple deterministic UUID v4 generator without extra dependencies
function generateSTIXUUID(prefix: string): string {
  const hexChars = '0123456789abcdef';
  let s = '';
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) s += '-';
    if (i === 12) s += '4';
    else if (i === 16) s += hexChars[(Math.random() * 4 | 8)];
    else s += hexChars[Math.floor(Math.random() * 16)];
  }
  return `${prefix}--${s}`;
}

export function buildSTIX21Bundle(
  profile: ThreatActorProfile,
  visibleNodes: NodeEntity[],
  visibleEdges: EdgeEntity[],
  tefResult: TEFCalculationResult
) {
  const timestamp = new Date().toISOString();
  const bundleId = generateSTIXUUID('bundle');
  const threatActorId = generateSTIXUUID('threat-actor');

  // STIX 2.1 Objects array
  const objects: any[] = [];

  // 1. Threat Actor SDO
  const threatActorSDO = {
    type: 'threat-actor',
    spec_version: '2.1',
    id: threatActorId,
    created: timestamp,
    modified: timestamp,
    name: profile.name,
    description: `De-anonymized cyber threat syndicate operating across darknet forums. Primary vector: ${profile.vector}. Estimated proceeds: ${profile.proceeds}.`,
    threat_actor_types: ['criminal-syndicate', 'ransomware-operator', 'access-broker'],
    aliases: profile.aliases,
    roles: ['coordinator', 'administrator'],
    primary_motivation: 'financial-gain',
    sophistication: 'expert',
    resource_level: 'syndicate',
    confidence: Math.round(tefResult.totalScore),
    external_references: [
      {
        source_name: 'NTRO Section 63 BSA Forensics',
        external_id: profile.sec65b.ref,
        description: `Cryptographic SHA-256 Digest: ${profile.sec65b.hash}`
      }
    ],
    custom_properties: {
      inferred_timezone: profile.diurnal.zone,
      tef_composite_score: tefResult.totalScore,
      legal_admissibility_status: tefResult.isLegallyAdmissible ? 'ADMISSIBLE_SEC_63_BSA' : 'INTELLIGENCE_ONLY'
    }
  };
  objects.push(threatActorSDO);

  // 2. Identity and Observed Data SDOs for nodes
  const nodeToStixId = new Map<string, string>();

  for (const node of visibleNodes) {
    if (node.type === 'actor') {
      nodeToStixId.set(node.id, threatActorId);
      continue;
    }

    let stixType = 'identity';
    if (node.type === 'wallet' || node.type === 'infra' || node.type === 'pgp') {
      stixType = 'observed-data';
    }

    const sdoId = generateSTIXUUID(stixType);
    nodeToStixId.set(node.id, sdoId);

    if (stixType === 'identity') {
      objects.push({
        type: 'identity',
        spec_version: '2.1',
        id: sdoId,
        created: timestamp,
        modified: timestamp,
        name: node.label.replace('\n', ' '),
        identity_class: 'individual',
        description: node.details,
        custom_properties: {
          darknet_forum: node.metadata?.forum || 'Dark Web',
          first_observed: node.firstSeen,
          attribution_confidence: node.confidence
        }
      });
    } else {
      objects.push({
        type: 'observed-data',
        spec_version: '2.1',
        id: sdoId,
        created: timestamp,
        modified: timestamp,
        first_observed: node.firstSeen + 'T00:00:00Z',
        last_observed: timestamp,
        number_observed: 1,
        objects: {
          '0': {
            type: node.type === 'wallet' ? 'cryptocurrency-wallet' : node.type === 'pgp' ? 'x-pgp-key' : 'network-infrastructure',
            value: node.label.replace('\n', ' '),
            description: node.details,
            confidence: node.confidence
          }
        }
      });
    }
  }

  // 3. STIX Relationship SROs for visible edges
  for (const edge of visibleEdges) {
    const sourceId = nodeToStixId.get(edge.source) || threatActorId;
    const targetId = nodeToStixId.get(edge.target);
    if (!targetId) continue;

    const relId = generateSTIXUUID('relationship');
    objects.push({
      type: 'relationship',
      spec_version: '2.1',
      id: relId,
      created: timestamp,
      modified: timestamp,
      relationship_type: edge.type === 'deterministic' ? 'attributed-to' : 'communicates-with',
      source_ref: sourceId,
      target_ref: targetId,
      confidence: Math.round(edge.confidence),
      description: `${edge.label} (Forensic Vector: ${edge.vector})`,
      custom_properties: {
        proof_vector: edge.vector,
        is_deterministic: edge.type === 'deterministic',
        transaction_hash: edge.txHash || null,
        pgp_fingerprint: edge.pgpSubkey || null
      }
    });
  }

  return {
    type: 'bundle',
    id: bundleId,
    spec_version: '2.1',
    objects
  };
}

export function buildForensicCSV(
  profile: ThreatActorProfile,
  visibleNodes: NodeEntity[],
  visibleEdges: EdgeEntity[],
  tefResult: TEFCalculationResult
): string {
  const timestamp = new Date().toISOString();
  const rows: string[][] = [
    // Header Banner
    ['# NATIONAL TECHNICAL RESEARCH ORGANISATION (NTRO) // CYBER INTELLIGENCE FORENSICS'],
    ['# STATUTORY DIGITAL EVIDENCE RECORD UNDER SECTION 63 BSA / SECTION 65B(4) IEA'],
    [`# Evidence Certificate Ref: ${profile.sec65b.ref}`],
    [`# Hardware Workstation UUID: ${profile.sec65b.hardwareUuid}`],
    [`# Master Evidence SHA-256 Digest: ${profile.sec65b.hash}`],
    [`# Generated Timestamp: ${timestamp}`],
    [`# Primary Threat Target: ${profile.name} (TEF Composite Score: ${tefResult.totalScore}%)`],
    [`# Statutory Admissibility Status: ${tefResult.isLegallyAdmissible ? 'ADMISSIBLE (CORROBORATED BY >= 2 VECTORS)' : 'PROBATIVE INTELLIGENCE ONLY'}`],
    [],
    // Table 1: Entity Attribution Graph Table
    [
      'RECORD_TYPE',
      'ENTITY_ID',
      'CATEGORY',
      'IDENTIFIER_LABEL',
      'FIRST_SEEN_UTC',
      'CONFIDENCE_PCT',
      'CHAIN_OF_CUSTODY_DETAILS'
    ]
  ];

  for (const n of visibleNodes) {
    rows.push([
      'NODE',
      n.id,
      n.type.toUpperCase(),
      `"${n.label.replace(/\n/g, ' ')}"`,
      n.firstSeen,
      `${n.confidence}%`,
      `"${n.details.replace(/"/g, '""')}"`
    ]);
  }

  rows.push([]);
  rows.push([
    'RECORD_TYPE',
    'RELATIONSHIP_ID',
    'SOURCE_ENTITY',
    'TARGET_ENTITY',
    'RELATION_LABEL',
    'LINK_NATURE',
    'FORENSIC_VECTOR',
    'CONFIDENCE_PCT',
    'TRANSACTION_OR_FINGERPRINT_HASH'
  ]);

  for (const e of visibleEdges) {
    rows.push([
      'EDGE',
      e.id,
      e.source,
      e.target,
      `"${e.label}"`,
      e.type.toUpperCase(),
      e.vector,
      `${e.confidence}%`,
      e.txHash || e.pgpSubkey || 'N/A'
    ]);
  }

  rows.push([]);
  rows.push(['# TEF AHP WEIGHTED COMPONENT BREAKDOWN']);
  rows.push(['CRITERION', 'RAW_INPUT_VALUE', 'AHP_WEIGHT', 'WEIGHTED_POINTS']);
  rows.push(['Applicability (0.385)', `${profile.tef.applicability}`, '0.385', `${tefResult.applicabilityWeighted}`]);
  rows.push(['Technical Ease (0.204)', `${profile.tef.technicalEase}`, '0.204', `${tefResult.technicalEaseWeighted}`]);
  rows.push(['Legal Admissibility (0.412)', `${profile.tef.legalAdmissibility}`, '0.412', `${tefResult.legalAdmissibilityWeighted}`]);
  rows.push(['TOTAL COMPOSITE TEF SCORE', '', '1.000', `${tefResult.totalScore}%`]);

  return rows.map(r => r.join(',')).join('\n');
}

/**
 * Trigger direct file download in browser
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
