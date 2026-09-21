import React from 'react';
import AnimalProductDetailView from '../../components/AnimalProductDetailView.jsx';

/**
 * AnimalDetailsScreen
 * Renders the detailed product view component for the marketplace.
 */
export default function AnimalDetailsScreen({ onNavigate }) {
  return <AnimalProductDetailView onNavigate={onNavigate} />;
}
