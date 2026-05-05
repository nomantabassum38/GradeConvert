const { calculateConversion, SYSTEMS } = require('./app.js');

describe('Universal Grade Conversion Engine', () => {
  
  test('Germany (1-5) to US GPA (0-4)', () => {
    // A German 1.0 is the best (100th percentile)
    // Should map to US 4.0
    const result = calculateConversion(1.0, 4.0, 1.0, true, 0.0, 4.0, false, 'germany', 'usa_gpa');
    expect(result.pct).toBe(1);
    expect(result.targetGrade).toBe(4.0);
  });

  test('Pakistan GPA (0-4) to Germany (1-5)', () => {
    // Pakistan 3.5 on a 4.0 scale -> percentile = (3.5 - 2.0)/(4.0 - 2.0) = 1.5/2.0 = 0.75
    // Modified Bavarian: 1 + 3*(1 - 0.75) = 1 + 3*(0.25) = 1 + 0.75 = 1.75
    const result = calculateConversion(3.5, 2.0, 4.0, false, 5.0, 1.0, true, 'pakistan_gpa', 'germany');
    expect(result.pct).toBe(0.75);
    expect(result.targetGrade).toBe(1.75);
  });

  test('India Percentage (40-100) to UK Percentage (40-100)', () => {
    // 70% in India -> percentile = (70 - 40)/(100 - 40) = 30 / 60 = 0.5
    // 0.5 mapped to UK 40-100 -> 40 + 0.5*(60) = 70
    const result = calculateConversion(70, 40, 100, false, 40, 100, false, 'india_pct', 'uk');
    expect(result.pct).toBe(0.5);
    expect(result.targetGrade).toBe(70);
  });

  test('Italy Degree (66-110) to Germany (1-5)', () => {
    // 110 in Italy -> percentile = 1
    // Modified Bavarian: 1.0
    const result = calculateConversion(110, 66, 110, false, 5.0, 1.0, true, 'italy_degree', 'germany');
    expect(result.pct).toBe(1);
    expect(result.targetGrade).toBe(1.0);
  });
  
  test('Inverted to Inverted (Austria to Germany)', () => {
    // Austria 1 (Best) to Germany
    const result = calculateConversion(1, 4, 1, true, 4, 1, true, 'austria', 'germany');
    expect(result.pct).toBe(1);
    expect(result.targetGrade).toBe(1.0);
  });

});
