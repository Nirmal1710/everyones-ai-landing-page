import React from 'react';

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  videoUrl: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode; 
  href: string;
  samplePrompt: string;
}

export interface Mission {
  id: string;
  title: string;
  instruction: string;
  ctaText: string;
  colorClass: string;
  formUrl: string; 
}

export interface NavItem {
  id: string;
  label: string;
}