'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './Tabs.module.css';

interface Tab {
  label: string;
  id: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={cn(styles.tab, isActive && styles.active)}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={styles.tabPanel} role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
};
