"use client";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import RouletteItem from "./RouletteItem";
import Controls from "./Controls";
import { getPrizes, spin, randomRange } from "../utils/methods";
import {
  setDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const Roulette = ({ items }) => {
  const [prizes, setPrizes] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinEnd, setIsSpinEnd] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [winnerId, setWinnerId] = useState(-1);
  //const [nickname, setNickname] = useState("");
  const prizesRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addTimeout, setAddTimeOut] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const arr = new Array(18).fill({}); //fillArrayWithChances(18, items);
    setPrizes(arr);

  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
    const emptyArr = new Array(18).fill({name:""});
    setPrizes(emptyArr);
    prepare()
  }
  function transitionEndHandler() {
    setIsSpinning(false);
    setIsSpinEnd(true);
    
    setModalVisible(true);
  }

  function prepare() {
    prizesRef.current.style.transition = "none";
    prizesRef.current.style.left = "0px";
  }

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function fillArrayWithChances(targetSize, prizes, rotationCount = 1) {
    const resultArray = [];
    const totalChance = prizes.reduce((sum, prize) => sum + prize.chance, 0); 
    const modifiedChances = prizes.map(prize => prize.chance / totalChance * Math.pow(rotationCount, -1)); 
    
    while (resultArray.length < targetSize) {
    let randomValue = Math.random(); 
    let index = 0; 
    while (randomValue > 0 && index < prizes.length) {
    randomValue -= modifiedChances[index]; 
    index++; 
    }
    resultArray.push(prizes[index - 1]);
    }
  
    return resultArray;
  }


  function selectWinner(prizes) {
    const totalPrizes = prizes.length;
  
    const randomValue = Math.random();
  
    let cumulativeChance = 0;
    for (const prize of prizes) {
      cumulativeChance += prize.chance;
      if (randomValue <= cumulativeChance) {
        return prize;
      }
    }
  
    return prizes[totalPrizes - 1];
  }
  

  const load = async (tempWinnerId) => {
   /* let data;
    let spinCount = 1;
   const collectionRef = collection(db, "participants");
    const q = query(collectionRef, where("name", "==", nickname));
    const querySnapshot = await getDocs(q);

    try {
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        const docRef = document.ref;
        data = document.data();
        spinCount = data.spinCount + 1;

        try {
          if (spinCount >= 5) {
            await updateDoc(docRef, {
              spinCount: 1,
            });
          } else {
            await updateDoc(docRef, {
              spinCount: increment(1),
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (querySnapshot.empty) {
        const id = uuidv4();
        try {
          await setDoc(doc(db, "participants", id), {
            name: nickname,
            spinCount: 1,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } */

    const tempPrizes = fillArrayWithChances(150, items);
    const winner = selectWinner(tempPrizes);

    const id = uuidv4();
    try {
      const timeoutId = setTimeout(async() => {
        await setDoc(doc(db, "history", id), {
          id,
          prize: winner.name,
          date: Timestamp.now()
        });
      },12000)
      setAddTimeOut(timeoutId)
    } catch (error) {
      console.log(error);
    } finally{
      clearTimeout(addTimeout)
    }

    const finalPrizes = getPrizes(tempPrizes, 150, winner, tempWinnerId);
    setPrizes(finalPrizes);
  };

  const play = () => {
    if (isReplay) {
      prepare();
    }
    setIsSpinning(true);
    const tempWinnerId = randomRange(150 / 2, 150 - 5);
    load(tempWinnerId);
    setWinnerId(tempWinnerId);

    setTimeout(() => {
      setIsSpinning(true);
      audioRef.current.play();
      spin(tempWinnerId, prizesRef);
      setIsReplay(true);
    }, 1000);
  };

  return (
    <div>
      <div className="roulette-wrapper">
        <div className="stick"></div>
        <div
          className="roulette"
          ref={prizesRef}
          onTransitionEnd={transitionEndHandler}
        >
          {prizes.map((item, i) => (
            <RouletteItem
              key={i}
              text={item?.name}
              isLoser={i !== winnerId && !isSpinning && isSpinEnd}
              rarity={
                item?.chance == 0.12
                  ? "common"
                  : item?.chance == 0.1 ||
                    item?.chance == 0.08 ||
                    item?.chance == 0.09
                  ? "rare"
                  : item?.chance == 0.04
                  ? "mythical"
                  : item?.chance == 0.03
                  ? "legendary"
                  : item?.chance <= 0.015
                  ? "immortal"
                  : ""
              }
            />
          ))}
        </div>
      </div>
      <Controls
        start={play}
        isDisabled={isSpinning}
      />
      {modalVisible && !isSpinning && isSpinEnd && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{prizes[winnerId].name}</h2>
            <button className="close-button" onClick={handleCloseModal}>
              Ок
            </button>
          </div>
        </div>
      )}
       <audio
        ref={audioRef}
        src="/audio.mp3">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
    </div>
  );
};

export default Roulette;
