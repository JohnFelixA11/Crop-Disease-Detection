import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./config";

export const fetchLastFiveFromFirestore = async () => {
  const q = query(
    collection(db, "Diseases"), // 🔁 Replace with your actual collection
    orderBy("time", "desc"), // 👈 Make sure `time` is a timestamp or ISO string
    limit(5)
  );

  const querySnapshot = await getDocs(q);
  const data = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};
