'use client';
import React from 'react';
import styles from './FlipText.module.css';

export default function FlipTextReveal({ word = "CONNECT" }) {
  return (
    <div className={styles.flipContainer}>
      <h1 className={styles.title} aria-label={word}>
        {word.split("").map((char, i) => (
          <span
            key={i}
            className={styles.char}
            style={{ "--index": i } as React.CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}
