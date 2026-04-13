"use client"
import React from 'react';

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  closeModal: () => void
}

export function Modal({ isVisible, children, closeModal }: ModalProps) {

  if (!isVisible) return null;

  return (
    <div
      className='flex items-center justify-center fixed inset-0 w-full h-full bg-zinc-950/40 backdrop-blur-lg'
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div
        className='bg-zinc-800 p-5 rounded-md w-full max-w-125 z-10'
        onClick={(e) => e.isPropagationStopped()}
      >
        {children}
      </div>
    </div>
  );
};
