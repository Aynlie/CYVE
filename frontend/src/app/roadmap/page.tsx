'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useProfile, type PreferredRole } from '@/context/ProfileContext';
import { useRoadmap, type RoadmapStep } from '@/context/RoadmapContext';
import { ROLE_TIMELINES, ROLE_COMPANIES, ROLE_TITLES, ROLE_OVERVIEW, ROLE_SKILLS, ROLE_CERTIFICATIONS, STEP_EXTRA, type RoleKey } from './roadmapData';
import RoadmapMap from '@/components/RoadmapMap';
import styles from './roadmap.module.css';

import {
  GamepadIcon,
  GraduationIcon,
  SecurityIcon,
  SkullIcon
} from '@/components/Icons';

function StepIcon({ type }: { type: string }) {
  const size = 32;
  const color = '#f5be1e';

  switch (type) {
    case 'game':
      return <GamepadIcon width={size} height={size} color={color} />;
    case 'foundations':
      return <GraduationIcon width={size} height={size} color={color} />;
    case 'defensive':
      return <SecurityIcon width={size} height={size} color={color} />;
    case 'offensive':
      return <SkullIcon width={size} height={size} color={color} />;
    default:
      return null;
  }
}

export default function RoadmapPage() {
  return (
    <ProtectedRoute>
      <RoadmapContent />
    </ProtectedRoute>
  );
}

function RoadmapContent() {
  const { profile, updateProfile } = useProfile();
  const { steps, selectedField, selectField, toggleStepCompletion, getProgress } = useRoadmap();
  const [isSwitching, setIsSwitching] = useState(false);

  const role: RoleKey | null = isSwitching ? null : (profile.preferredRole ?? selectedField);

  useEffect(() => {
    if (profile.preferredRole && profile.preferredRole !== selectedField && !isSwitching) {
      selectField(profile.preferredRole);
    }
  }, [profile.preferredRole, selectedField, selectField, isSwitching]);

  const handleRoleSelect = (r: PreferredRole) => {
    updateProfile({ preferredRole: r });
    selectField(r);
    setIsSwitching(false);
  };

  if (role === null) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.hexPattern} aria-hidden />
          <h1 className={styles.mainTitle}>CHOOSE YOUR PATH</h1>
          <p className={styles.choosePathHint}>
            To build your custom roadmap, select the specialization that matches your career objectives within the cybersecurity ecosystem.
          </p>
          <div className={styles.roleSelector}>
            <button type="button" onClick={() => handleRoleSelect('red')} className={styles.roleBtn}>
              <span className={styles.roleBtnIcon}>🛡️</span>
              <span className={styles.roleBtnLabel}>Red Team</span>
              <span className={styles.roleBtnDesc}>Offensive Security: Penetration testing, exploit development, and simulation.</span>
            </button>
            <button type="button" onClick={() => handleRoleSelect('blue')} className={styles.roleBtn}>
              <span className={styles.roleBtnIcon}>🏹</span>
              <span className={styles.roleBtnLabel}>Blue Team</span>
              <span className={styles.roleBtnDesc}>Defensive Security: Threat detection, incident response, and infrastructure protection.</span>
            </button>
            <button type="button" onClick={() => handleRoleSelect('purple')} className={styles.roleBtn}>
              <span className={styles.roleBtnIcon}>⚡</span>
              <span className={styles.roleBtnLabel}>Purple Team</span>
              <span className={styles.roleBtnDesc}>Hybrid Strategy: Bridging the gap between offensive and defensive operations.</span>
            </button>
          </div>
        </section>
      </div>
    );
  }

  const timeline = ROLE_TIMELINES[role];
  const companies = ROLE_COMPANIES[role];
  const roleTitle = ROLE_TITLES[role];
  const stepsMap = new Map(steps.map(s => [s.id, s]));

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.hexPattern} aria-hidden />
        <h1 className={styles.mainTitle}>ROADMAP</h1>
        <p className={styles.roleSubtitle}>{roleTitle}</p>
        <div className={styles.heroActions}>
          <button className={styles.changeRoleBtn} onClick={() => setIsSwitching(true)}>
            Change Specialization
          </button>
        </div>
        <div className={styles.progressWrap}>
          <span className={styles.progressLabel}>Current Operative Progress</span>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${getProgress()}%` }} />
          </div>
          <span className={styles.progressPercent}>{getProgress()}%</span>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <h2 className={styles.overviewTitle}>About this path</h2>
        <p className={styles.overviewText}>{ROLE_OVERVIEW[role]}</p>
      </section>

      <section className={styles.skillsCertSection}>
        <div className={styles.skillsCertGrid}>
          <div className={styles.skillsCertCard}>
            <h3 className={styles.skillsCertHeading}>Skills you&apos;ll gain</h3>
            <ul className={styles.skillsList}>
              {ROLE_SKILLS[role].map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className={styles.skillsCertCard}>
            <h3 className={styles.skillsCertHeading}>Certifications to consider</h3>
            <ul className={styles.skillsList}>
              {ROLE_CERTIFICATIONS[role].map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className={styles.timeline}>
          {timeline.map((config, index) => (
            <div key={config.stepLabel + index} className={styles.step}>
              <span className={styles.stepLabel}>{config.stepLabel}</span>
              <span className={styles.stepSubtitle}>{config.subtitle}</span>
              <div className={styles.stepIcon}>
                <StepIcon type={config.icon} />
              </div>
              <div className={styles.stepContentBlocks}>
                {config.stepIds.map(stepId => {
                  const step = stepsMap.get(stepId);
                  const extra = STEP_EXTRA[stepId];
                  if (!step) return <div key={stepId} className={styles.contentBlock} />;
                  return (
                    <ContentBlock key={step.id} step={step} extra={extra} onToggle={() => toggleStepCompletion(step.id)} />
                  );
                })}

              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mapSection}>
        <p className={styles.mapSectionLabel}>Career map — recommended companies by location</p>
        <RoadmapMap companies={companies} />
      </section>

      <section className={styles.companiesSection}>
        <h2 className={styles.companiesTitle}>RECOMMENDED COMPANIES</h2>
        <p className={styles.companiesSubtitle}>Companies hiring for {role === 'red' ? 'offensive' : role === 'blue' ? 'defensive' : 'hybrid'} security roles</p>
        <div className={styles.companiesList}>
          {companies.map((company, i) => (
            <div key={i} className={styles.companyCard}>
              <p className={styles.companyName}>{company.name}</p>
              <p className={styles.companyAddress}>{company.address}</p>
              <p className={styles.companyDescription}>{company.description}</p>
              {company.roles && company.roles.length > 0 && (
                <p className={styles.companyRoles}>
                  <strong>Example roles:</strong> {company.roles.join(' · ')}
                </p>
              )}
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                  Learn more & careers →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContentBlock({
  step,
  extra,
  onToggle,
}: {
  step: RoadmapStep;
  extra?: { duration: string; skills: string[]; resources: { label: string; url: string }[] };
  onToggle: () => void;
}) {
  return (
    <div className={`${styles.contentBlock} ${step.completed ? styles.contentBlockDone : ''}`}>
      <div className={styles.contentBlockInner}>
        <span className={styles.contentBlockTitle}>{step.title}</span>
        <p className={styles.contentBlockDesc}>{step.description}</p>
        {extra && (
          <>
            <p className={styles.contentBlockMeta}><strong>Duration:</strong> {extra.duration}</p>
            {extra.skills.length > 0 && (
              <p className={styles.contentBlockMeta}><strong>Skills:</strong> {extra.skills.join(', ')}</p>
            )}
            {extra.resources.length > 0 && (
              <div className={styles.contentBlockResources}>
                <strong>Resources:</strong>
                <ul>
                  {extra.resources.map((r, i) => (
                    <li key={i}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <button
          type="button"
          onClick={onToggle}
          className={step.completed ? styles.btnCompleteDone : styles.btnComplete}
        >
          {step.completed ? '✓ Completed' : 'Mark complete'}
        </button>
      </div>
    </div>
  );
}
