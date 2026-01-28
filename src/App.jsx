import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ODEExamples = () => {
  const [selectedModel, setSelectedModel] = useState('cooling');

  // Newton's Cooling Law
  const generateCoolingData = () => {
    const k = 0.1; // cooling constant
    const T_room = 20; // room temperature
    const T0 = 90; // initial temperature
    const data = [];
    
    for (let t = 0; t <= 50; t += 0.5) {
      const T = T_room + (T0 - T_room) * Math.exp(-k * t);
      data.push({ time: t, value: T });
    }
    return data;
  };

  // Exponential Growth (Population)
  const generateGrowthData = () => {
    const r = 0.1; // growth rate
    const P0 = 100; // initial population
    const data = [];
    
    for (let t = 0; t <= 50; t += 0.5) {
      const P = P0 * Math.exp(r * t);
      data.push({ time: t, value: P });
    }
    return data;
  };

  // Radioactive Decay
  const generateDecayData = () => {
    const lambda = 0.15; // decay constant
    const N0 = 1000; // initial amount
    const data = [];
    
    for (let t = 0; t <= 30; t += 0.5) {
      const N = N0 * Math.exp(-lambda * t);
      data.push({ time: t, value: N });
    }
    return data;
  };

  // Logistic Growth
  const generateLogisticData = () => {
    const r = 0.5; // growth rate
    const K = 1000; // carrying capacity
    const P0 = 50; // initial population
    const data = [];
    
    for (let t = 0; t <= 20; t += 0.2) {
      const P = (K * P0 * Math.exp(r * t)) / (K + P0 * (Math.exp(r * t) - 1));
      data.push({ time: t, value: P });
    }
    return data;
  };

  // SIR Model (Epidemic)
  const generateSIRData = () => {
    const beta = 0.5; // infection rate
    const gamma = 0.1; // recovery rate
    const N = 1000; // total population
    let S = 999, I = 1, R = 0;
    const dt = 0.1;
    const data = [];
    
    for (let t = 0; t <= 100; t += dt) {
      data.push({ 
        time: parseFloat(t.toFixed(1)), 
        susceptible: S, 
        infected: I, 
        recovered: R 
      });
      
      const dS = -beta * S * I / N;
      const dI = beta * S * I / N - gamma * I;
      const dR = gamma * I;
      
      S += dS * dt;
      I += dI * dt;
      R += dR * dt;
    }
    return data.filter((_, idx) => idx % 10 === 0); // reduce data points
  };

  // Predator-Prey Model
  const generatePredatorPreyData = () => {
    const alpha = 0.1;   // prey growth
    const beta = 0.02;   // predation rate
    const delta = 0.01;  // predator growth from prey
    const gamma = 0.1;   // predator death
    
    let R = 40; // rabbits
    let F = 9;  // foxes
    const dt = 0.1;
    const data = [];
    
    for (let t = 0; t <= 200; t += dt) {
      if (t % 2 < 0.1) {
        data.push({ 
          time: parseFloat(t.toFixed(1)), 
          rabbits: R, 
          foxes: F 
        });
      }
      
      const dR = alpha * R - beta * R * F;
      const dF = delta * R * F - gamma * F;
      
      R += dR * dt;
      F += dF * dt;
      
      // Prevent negative populations
      R = Math.max(0, R);
      F = Math.max(0, F);
    }
    return data;
  };

  // Damped Harmonic Oscillator
  const generateOscillatorData = () => {
    const omega0 = 2; // natural frequency
    const zeta = 0.1; // damping ratio
    const x0 = 1; // initial displacement
    const v0 = 0; // initial velocity
    
    let x = x0;
    let v = v0;
    const dt = 0.01;
    const data = [];
    
    for (let t = 0; t <= 10; t += dt) {
      if (t % 0.1 < 0.01) {
        data.push({ time: parseFloat(t.toFixed(2)), value: x });
      }
      
      const a = -2 * zeta * omega0 * v - omega0 * omega0 * x;
      v += a * dt;
      x += v * dt;
    }
    return data;
  };

  // Drug Concentration (Two-compartment)
  const generateDrugData = () => {
    const k12 = 0.2; // blood to tissue
    const k21 = 0.1; // tissue to blood
    const k10 = 0.15; // elimination
    const dose = 100;
    
    let C1 = dose; // blood
    let C2 = 0;    // tissue
    const dt = 0.1;
    const data = [];
    
    for (let t = 0; t <= 50; t += dt) {
      if (t % 0.5 < 0.1) {
        data.push({ 
          time: parseFloat(t.toFixed(1)), 
          blood: C1, 
          tissue: C2 
        });
      }
      
      const dC1 = -k12 * C1 - k10 * C1 + k21 * C2;
      const dC2 = k12 * C1 - k21 * C2;
      
      C1 += dC1 * dt;
      C2 += dC2 * dt;
    }
    return data;
  };

  const models = {
    cooling: {
      name: 'Newton\'un Soğuma Kanunu',
      equation: 'dT/dt = -k(T - T_room)',
      description: 'Sıcak kahve oda sıcaklığına soğuyor',
      data: generateCoolingData(),
      lines: [{ key: 'value', name: 'Sıcaklık (°C)', color: '#e74c3c' }],
      yLabel: 'Sıcaklık (°C)',
      xLabel: 'Zaman (dakika)'
    },
    growth: {
      name: 'Üstel Büyüme',
      equation: 'dP/dt = r·P',
      description: 'Bakteriler kısıtlamasız çoğalıyor',
      data: generateGrowthData(),
      lines: [{ key: 'value', name: 'Popülasyon', color: '#2ecc71' }],
      yLabel: 'Popülasyon',
      xLabel: 'Zaman (saat)'
    },
    decay: {
      name: 'Radyoaktif Bozunma',
      equation: 'dN/dt = -λ·N',
      description: 'Radyoaktif madde zamanla bozunuyor',
      data: generateDecayData(),
      lines: [{ key: 'value', name: 'Miktar', color: '#9b59b6' }],
      yLabel: 'Miktar',
      xLabel: 'Zaman (yıl)'
    },
    logistic: {
      name: 'Lojistik Büyüme',
      equation: 'dP/dt = r·P(1 - P/K)',
      description: 'Sınırlı kaynaklarla nüfus artışı',
      data: generateLogisticData(),
      lines: [{ key: 'value', name: 'Popülasyon', color: '#3498db' }],
      yLabel: 'Popülasyon',
      xLabel: 'Zaman'
    },
    sir: {
      name: 'SIR Epidemik Modeli',
      equation: 'dS/dt = -βSI, dI/dt = βSI - γI, dR/dt = γI',
      description: 'Hastalık popülasyonda yayılıyor',
      data: generateSIRData(),
      lines: [
        { key: 'susceptible', name: 'Duyarlı (S)', color: '#3498db' },
        { key: 'infected', name: 'Enfekte (I)', color: '#e74c3c' },
        { key: 'recovered', name: 'İyileşmiş (R)', color: '#2ecc71' }
      ],
      yLabel: 'Kişi Sayısı',
      xLabel: 'Zaman (gün)'
    },
    predatorprey: {
      name: 'Av-Avcı (Lotka-Volterra)',
      equation: 'dR/dt = αR - βRF, dF/dt = δRF - γF',
      description: 'Tavşan ve tilki popülasyonları döngüsel değişiyor',
      data: generatePredatorPreyData(),
      lines: [
        { key: 'rabbits', name: 'Tavşanlar', color: '#95a5a6' },
        { key: 'foxes', name: 'Tilkiler', color: '#e67e22' }
      ],
      yLabel: 'Popülasyon',
      xLabel: 'Zaman'
    },
    oscillator: {
      name: 'Sönümlü Osilatör',
      equation: 'd²x/dt² + 2ζω₀(dx/dt) + ω₀²x = 0',
      description: 'Yay-kütle sistemi sürtünme ile sönümleniyor',
      data: generateOscillatorData(),
      lines: [{ key: 'value', name: 'Konum', color: '#1abc9c' }],
      yLabel: 'Konum',
      xLabel: 'Zaman (saniye)'
    },
    drug: {
      name: 'İki Bölmeli İlaç Modeli',
      equation: 'dC₁/dt = -k₁₂C₁ - k₁₀C₁ + k₂₁C₂',
      description: 'İlaç kan ve doku arasında dağılıyor',
      data: generateDrugData(),
      lines: [
        { key: 'blood', name: 'Kan', color: '#e74c3c' },
        { key: 'tissue', name: 'Doku', color: '#3498db' }
      ],
      yLabel: 'Konsantrasyon (mg/L)',
      xLabel: 'Zaman (saat)'
    }
  };

  const currentModel = models[selectedModel];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Sürekli Modeller - ODE Örnekleri</h1>
      <p className="text-slate-600 mb-6">scipy.integrate.odeint benzeri sayısal çözümler</p>
      
      {/* Model Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Object.entries(models).map(([key, model]) => (
          <button
            key={key}
            onClick={() => setSelectedModel(key)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedModel === key
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 shadow'
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>

      {/* Model Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentModel.name}</h2>
        <div className="bg-slate-100 p-3 rounded-lg mb-3 font-mono text-sm">
          {currentModel.equation}
        </div>
        <p className="text-slate-600">{currentModel.description}</p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={currentModel.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              label={{ value: currentModel.xLabel, position: 'insideBottom', offset: -5 }}
              stroke="#64748b"
            />
            <YAxis 
              label={{ value: currentModel.yLabel, angle: -90, position: 'insideLeft' }}
              stroke="#64748b"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Legend />
            {currentModel.lines.map(line => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Python Code Example */}
      <div className="bg-slate-800 rounded-lg shadow-md p-6 mt-6 text-slate-100">
        <h3 className="text-lg font-bold mb-3 text-slate-200">Python Kodu (scipy.integrate):</h3>
        <pre className="text-sm overflow-x-auto">
          <code>{`from scipy.integrate import odeint
import numpy as np
import matplotlib.pyplot as plt

# ${currentModel.name}
def model(y, t):
    # ${currentModel.equation}
    return dydt

t = np.linspace(0, 50, 500)
y0 = [initial_conditions]
sol = odeint(model, y0, t)

plt.plot(t, sol)
plt.xlabel('${currentModel.xLabel}')
plt.ylabel('${currentModel.yLabel}')
plt.show()`}</code>
        </pre>
      </div>
    </div>
  );
};

export default ODEExamples;