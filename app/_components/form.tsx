import React, { useState } from 'react';

export function CreateAbsenceForm(){
  const [playerName, setPlayerName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const handleTodayDate = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    setDate(today);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., console.log or send data to backend)
    console.log({ playerName, reason, date });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-5'>
      <div className='w-full text-4xl font-medium text-zinc-200 py-4'>
        Quem Ramelou?
      </div>
      <label>
        Nome do Ramelão:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className='w-full py-1.5 px-1 mt-2 border border-zinc-500 focus:border-blue-500'
        />
      </label>

      <label>
        Rasão:
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className='w-full py-1.5 px-1 mt-2 border border-zinc-500 focus:border-blue-500'
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Data:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="button" onClick={handleTodayDate} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Hoje
        </button>
      </label>

      <button type="submit" style={{ padding: '12px', background: '#007BFF', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
};
