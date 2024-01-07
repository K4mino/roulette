"use client";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
} from "firebase/firestore";

import Roulette from './components/Roulette'
import Header from './components/Header'
import RunningStroke from './components/RunningStroke'
import PrizeList from './components/PrizeList'
import Burger from "./components/Burger";
import SideMenu from "./components/SideMenu";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const localStorageData = localStorage.getItem('prizes');
      return localStorageData ? JSON.parse(localStorageData) : [];
    }
    return []
  });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "prizes"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push(doc.data());
      });
      localStorage.setItem("prizes", JSON.stringify(list));
    });
    
    return () => {
      unsub();
    };
  }, []);

  const handleCloseMenu = () => {
    setIsSideMenuOpen(false);
  }

  return (
    <main className="main">
      <Burger onClick={() => setIsSideMenuOpen(true)}/>
      <SideMenu isActive={isSideMenuOpen} close={handleCloseMenu}/>
      <Header/>
      <RunningStroke/>
      <Roulette items={items}/>
      <PrizeList prizes={items}/>
    </main>
  )
}
