import React from 'react';

export enum RelationshipStatus {
  RUIN = 'RUIN',
  WARY = 'WARY',
  OPEN = 'OPEN',
  TRUST = 'TRUST'
}

export interface CharacterProfile {
  name: string;
  fullName: string;
  age: number;
  height: string;
  birthday: string;
  personality: string[];
  role: string;
}

export interface StoryPhase {
  title: string;
  description: string;
  icon: React.ReactNode;
}