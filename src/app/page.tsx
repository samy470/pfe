'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/hero/hero';
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { searchItems } from "../redux/shopSlice";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const StoreMap = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <div style={{ height: '500px', width: '100%', background: '#000' }} />
});

export default function Home(onLogout: any) {
  return (
    <div className="flex flex-col">
      <div className="relative z-10">
        <Hero />
      </div>
      <StoreMap />
    </div>
  );
}
