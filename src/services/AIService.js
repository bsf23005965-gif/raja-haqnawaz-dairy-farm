// AI Service for Raja Haqnawaz Dairy Farm
// Connects to secure backend routes (/api/ai/...) with deterministic client-side recommendation engine

export const AIService = {
  HEALTH_DISCLAIMER: 'This AI feature provides general informational suggestions only and is not a veterinary diagnosis. Consult a qualified veterinarian for medical decisions.',

  // 1. General AI Chatbot Inquiry
  async askFarmAssistant(message, history = []) {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversationHistory: history })
      });
      if (!response.ok) throw new Error('AI API responded with status ' + response.status);
      const data = await response.json();
      return data.reply;
    } catch (err) {
      console.warn('Backend AI route failed, using offline dairy farm advisor engine:', err);
      return `Assalam-o-Alaikum! Raja Haqnawaz Dairy Farm has been breeding pedigree Sahiwal, Cholistani, and Nili Ravi dairy cattle for over 30 years. All animals are vaccinated and undergo clinical milk yield certification. Please call 0300 6072070 or WhatsApp 0345 2923974 for personalized live assistance.`;
    }
  },

  // 2. AI Health Symptom Checker
  async assessHealth({
    breed,
    age,
    symptoms,
    temperature,
    eatingBehavior,
    activity,
    milkProduction,
    vaccination
  }) {
    try {
      const response = await fetch('/api/ai/health-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          breed,
          age,
          symptoms,
          temperature,
          eatingBehavior,
          activity,
          milkProduction,
          vaccination
        })
      });
      if (!response.ok) throw new Error('Health assessment failed');
      return await response.json();
    } catch (err) {
      // Deterministic expert clinical decision heuristic
      const tempNum = parseFloat(temperature) || 101.5;
      const isFever = tempNum > 102.5;
      const poorEating = eatingBehavior === 'Off Feed' || eatingBehavior === 'Reduced';
      const isUrgent = isFever && poorEating;

      return {
        generalObservation: `Health evaluation recorded for ${breed || 'Dairy animal'} (${age || 'Adult'}). Current temperature is ${temperature || 'Normal'} with ${eatingBehavior || 'Regular'} appetite.`,
        possibleConcern: isUrgent 
          ? 'Potential febrile infection (e.g. Hemorrhagic Septicemia, Tick Fever, or acute ruminal acidosis).'
          : 'Mild dietary adjustment or environmental thermal stress.',
        suggestedNextStep: isUrgent
          ? 'Immediately isolate animal, provide cold shade with electrolytes, and summon veterinary surgeon for parenteral antibiotic/antipyretic therapy.'
          : 'Check rumination cycles, offer fresh clean berseem/sorghum, and re-record temperature in 4 hours.',
        urgency: isUrgent ? 'Immediate Veterinary Attention Required' : 'Medium',
        disclaimer: this.HEALTH_DISCLAIMER
      };
    }
  },

  // 3. Smart Animal Recommendation Engine with Deterministic Scoring
  // Price = 30%, Breed = 20%, Milk = 25%, Age = 10%, Health = 10%, Availability = 5%
  // Never recommend Sold animals!
  computeDeterministicRecommendations(animals, preferences) {
    const {
      budget = 500000,
      breed = 'All',
      type = 'All',
      minMilk = 0,
      maxAge = 6,
      gender = 'All'
    } = preferences;

    // Filter out Sold animals strictly
    const candidates = animals.filter(a => a.availability !== 'Sold');

    const scored = candidates.map(animal => {
      let score = 0;

      // 1. Price Score (30%)
      const budgetNum = Number(budget) || 500000;
      if (animal.price <= budgetNum) {
        // Closer to budget gets higher efficiency score
        const ratio = animal.price / budgetNum;
        score += 30 * (0.6 + 0.4 * ratio);
      } else {
        const excess = (animal.price - budgetNum) / budgetNum;
        const penalty = Math.max(0, 30 - excess * 60);
        score += penalty;
      }

      // 2. Breed Score (20%)
      if (breed === 'All') {
        score += 20;
      } else if (animal.breed.toLowerCase() === breed.toLowerCase()) {
        score += 20;
      } else if (animal.breed.toLowerCase().includes('cross')) {
        score += 12;
      } else {
        score += 5;
      }

      // 3. Milk Production Score (25%)
      const targetMilk = Number(minMilk) || 0;
      if (targetMilk === 0) {
        // Reward naturally high producers
        const milkRatio = Math.min(1, animal.milkProductionPerDay / 30);
        score += 25 * milkRatio;
      } else if (animal.milkProductionPerDay >= targetMilk) {
        score += 25;
      } else {
        const ratio = animal.milkProductionPerDay / targetMilk;
        score += 25 * Math.max(0, ratio);
      }

      // 4. Age Score (10%)
      const preferredAge = Number(maxAge) || 5;
      if (animal.age <= preferredAge) {
        score += 10;
      } else {
        const diff = animal.age - preferredAge;
        score += Math.max(0, 10 - diff * 3);
      }

      // 5. Health Status Score (10%)
      if (animal.healthStatus && animal.healthStatus.toLowerCase().includes('excellent')) {
        score += 10;
      } else if (animal.vaccinationStatus && animal.vaccinationStatus.toLowerCase().includes('fully')) {
        score += 8;
      } else {
        score += 6;
      }

      // 6. Availability Score (5%)
      if (animal.availability === 'Available') {
        score += 5;
      } else if (animal.availability === 'Reserved') {
        score += 1; // Lower priority
      }

      // Type and Gender modifiers if specified
      if (type !== 'All' && animal.type !== type) {
        score *= 0.5;
      }
      if (gender !== 'All' && animal.gender !== gender) {
        score *= 0.5;
      }

      return {
        ...animal,
        matchScore: Math.round(Math.min(100, Math.max(10, score)))
      };
    });

    // Sort descending by matchScore
    return scored.sort((a, b) => b.matchScore - a.matchScore);
  },

  // 4. AI Explanation for Recommendations
  async getRecommendationInsights(topAnimals, preferences) {
    try {
      const response = await fetch('/api/ai/recommendation-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topAnimals, preferences })
      });
      if (!response.ok) throw new Error('AI insights call failed');
      const data = await response.json();
      return data.insights;
    } catch (err) {
      return `Based on Raja Haqnawaz Dairy Farm's 30+ years of cattle experience, these selected cattle provide the highest daily milk output per rupee invested. Their native genetics ensure heat endurance, disease resistance, and continuous lactation reliability.`;
    }
  }
};
