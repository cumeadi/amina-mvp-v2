# Amina MVP V2 🏥✨

Amina is a personalized AI health companion designed to bridge the gap between identifying health needs and fulfilling them. It combines clinical guidance with commerce and financial tools to provide a holistic healthcare experience for users in emerging markets (Nigeria, etc.).

## 🌟 Key Features

### 1. AI Health Agents Suite
A diverse team of specialized agents to cater to specific health pillars:
- **🏥 General Health**: Everyday companion.
- **🩺 Triage Agent**: Urgency assessment and care routing.
- **💊 Medication Guide**: Dosage, interactions, and reminders.
- **📈 Chronic Care**: Management of diabetes, hypertension, etc.
- **🤱 Maternal Health**: Pregnancy and postnatal support.
- **🧠 Mental Health**: Emotional support and mindfulness.
- **🧸 Pediatric & Family**: Vaccinations and child milestones.
- **🌳 Longevity & Aging**: Preventative care for 50+.
- **🩹 Post-Op & Recovery**: Surgery aftercare.
- **🧬 Hormonal Health**: Menopause and hormonal balance.
- **🥗 Metabolism & Nutrition**: Nigerian-focused nutritional guidance.
- **🌙 Sleep & Recovery**: Circadian rhythm and sleep hygiene.
- **🏃 Physical Activity**: Functional mobility and activity nudges.
- **🌬️ Stress & Resilience**: Physiological stress management.

### 2. "Need-to-Fulfillment" Trays
Seamless workflows that keep users in context:
- **🛍️ Marketplace Tray**: Order medication refills with checks for interactions and secure payments.
- **📅 Booking Tray**: User-centric scheduling for consultations (Virtual/Physical) with vetted providers.
- **💳 Wallet & Insurance**: A dedicated financial pillar supporting Cards, Points, and Insurance linking (e.g., ASHIA, Reliance HMO).

### 3. Integrated Care Experience
- **Voice & Text Modes**: Fluidly switch between typing and immersive voice conversations.
- **Health Memory**: A centralized record of conditions, medications, allergies, and insights.
- **Onboarding**: Comprehensive flow capturing social determinants of health (Housing, Transport, Loneliness), location, language, and goals.

## 🛠️ Technology Stack
- **Frontend**: React, Vite, Tailwind CSS (Vanilla CSS approach).
- **Design System**: Custom, aesthetically pleasing UI/UX with smooth animations (Glassmorphism, Gradients).
- **State Management**: React `useState` / `useEffect`.

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🚧 Roadmap & Remaining Tasks

### Backend & Infrastructure
- [ ] **Database Integration**: Migrate from mock `USER_HEALTH_MEMORY` to a real database (PostgreSQL/MongoDB).
- [ ] **Authentication**: Implement secure Auth (Supabase/Firebase/NextAuth) replacing the mock login flow.
- [ ] **AI Backend**: Connect Agent UIs to real LLM backends (OpenAI/Anthropic APIs) with RAG for accurate medical knowledge.

### Commerce & Payments
- [ ] **Payment Gateways**: Integrate Flutterwave/Paystack for Naira transactions and Stripe for USD.
- [ ] **Insurance APIs**: Connect the "Scan to Link" feature to real HMO verification endpoints (ASHIA, Reliance).
- [ ] **Pharmacy Integration**: Connect Marketplace to pharmacy inventory APIs for real-time stock and pricing.

### Features & Polish
- [ ] **Real-time Notifications**: Push notifications for medication reminders and upcoming appointments.
- [ ] **Telemedicine**: Integrate video calling SDK (Agora/Twilio) for virtual consultations within the Booking Tray.
- [ ] **Wearable Sync**: Actual integration with Apple HealthKit/Google Fit APIs.

### Compliance
- [ ] **Data Privacy**: Ensure GDPR/NDPA compliance for health data storage.
- [ ] **Encryption**: End-to-end encryption for chat and medical records.
