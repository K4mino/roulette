"use client";
import React from 'react'
import {useEffect,useState} from 'react'
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    limit
  } from "firebase/firestore";

import { db } from "../firebase";

const HistoryList = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const prizesCollection = collection(db, 'history');

        const q = query(prizesCollection, orderBy('date', 'desc'), limit(6));

        const unsub = onSnapshot(q, (snapShot) => {
            const lastSixPrizes = snapShot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))

            setHistory(lastSixPrizes);
        });

        return () => {
          unsub();
        };
      }, []);

  return (
    <div className='history'>
        <div className='history-item history-title'>
            Последние выигрыши
        </div>
    {
        history.map((item) => {
            return (
                <div className='history-item' key={item.id}>
                    {item.prize}
                </div>
            )
        })
    }
    </div>
  )
}

export default HistoryList