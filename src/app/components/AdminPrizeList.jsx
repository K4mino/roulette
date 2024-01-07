import { useEffect, useState } from "react";
import { onSnapshot, collection, deleteDoc, doc, addDoc,setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import { db } from "../firebase";
import styles from "../admin/admin.module.css";
import Table from "./Table";

const AdminPrizeList = () => {
  const [items, setItems] = useState([]);
  const [prizeName, setPrizeName] = useState("");
  const [prizeChance, setPrizeChance] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "prizes"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push(doc.data());
      });
      setItems(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleDeletePrize = async (id) => {
    try {
      console.log(id);
      await deleteDoc(doc(db, "prizes", id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPrize = async () => {
    const id = uuidv4();
    const chance = Number(prizeChance.trim())/100;
    try {
      await setDoc(doc(db, "prizes",id), {
          id,
          name: prizeName,
          chance
      })

      setPrizeName("");
      setPrizeChance("");
    } catch (error) {
       alert('Произошла ошибка при добавлении приза')
      console.log(error);
    }
  }

  const handleSetChance = (val) => {
    try {
      setPrizeChance(val);  
    }catch (error) {
      alert('Произошла ошибка при добавлении приза')
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Список призов</h1>
      <div className={styles.addPrizeContainer}>
        <input
          value={prizeName}
          onChange={(e) => setPrizeName(e.target.value)}
          className={styles.input}
          placeholder="Название приза"
          type="text"
        />
        <input
          value={prizeChance}
          onChange={(e) => handleSetChance(e.target.value)}
          className={styles.input}
          placeholder="Шанс %"
          type="text"
        />
        <button onClick={handleAddPrize} className={styles.addButton}>Add</button>
      </div>
        <Table handleDelete={handleDeletePrize} data={items}/>
    </div>
  );
};

export default AdminPrizeList;
