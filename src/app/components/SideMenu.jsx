"use client"
import Link from 'next/link'
import {useEffect,useState} from 'react'
import {
    onSnapshot,
    collection,
  } from "firebase/firestore";

import { db } from "../firebase";
import HistoryList from './HistoryList';

const SideMenu = ({close,isActive}) => {
    const [history, setHistory] = useState(() => {
        if (typeof window !== 'undefined') {
          const localStorageData = localStorage.getItem('history');
          return localStorageData ? JSON.parse(localStorageData) : [];
        }
        return []
      }
    );
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsub = onSnapshot(collection(db, "history"), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push(doc.data());
        });
        setHistory(list);
        setFilteredHistory(list);
        localStorage.setItem("history", JSON.stringify(list));
      });
      setLoading(false);
      return () => {
        unsub();
      };
    }, []);

    const handleUserSearch = (e) => {
        const user = e.target.value.toLowerCase();
        setSearchValue(user)

        const newHistory = history.filter((item) => item.user.toLowerCase().includes(user))
        setFilteredHistory(newHistory)
    }

  return (
    <div className={`side-menu ${isActive ? 'active' : ''}`}>
        <img className='arrow' src="/arrow.png" alt="arrow"  onClick={close}/>
        <Link className='side-menu-link' href='/admin'>Админка</Link>
        <h2 style={{color: 'white',marginBottom: '5px',marginTop: '5px'}}>История</h2>
        <div className='side-menu-content'>
            <input value={searchValue} onChange={handleUserSearch} className='side-menu-input' type="text" placeholder='Никнейм'/>
            {loading && <div className='side-menu-empty'>Загрузка...</div>}
            {
              !loading && filteredHistory.length === 0
              ? <div className='side-menu-empty'>Ничего не найдено</div> 
              : <HistoryList filteredHistory={filteredHistory}/>
            }
        </div>
    </div>
  )
}

export default SideMenu