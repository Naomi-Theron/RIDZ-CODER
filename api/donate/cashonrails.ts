// /api/donate/cashonrails.ts
const cashonrails = async (phoneNumber: string, amount: number, countryCode: string, provider: string) => {
  const response = await fetch('https://api.cashonrails.com/v1/payments/mobile-money', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CASHONRAILS_API_KEY
    },
    body: JSON.stringify({
      amount,
      currency: getCurrency(countryCode),
      phone_number: phoneNumber,
      country: countryCode,
      provider, // 'M-PESA', 'Airtel', 'MTN', 'Tigo', 'Halotel'
      reference: `DON-${Date.now()}`
    })
  });
  return response.json();
};