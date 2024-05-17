import { useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { PaginatedData } from "src/models/paginatedData.model";

export const usePaginatedList = <Data>(
  getList: (
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => Promise<PaginatedData<Data>>
) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [startAfter, setStartAfter] =
    useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null>(
      null
    );
  const [lastItem, setLastItem] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data, lastVisible } = await getList(startAfter);

      setData(data);
      setStartAfter(lastVisible);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      if (!lastItem && startAfter !== null) {
        const { data, lastVisible } = await getList(startAfter);

        setData((prev) => [...prev, ...data]);
        setStartAfter(lastVisible);
        if (data.length < 10) {
          setLastItem(true);
        }
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    fetchData,
    fetchMoreData,
    loading,
    lastItem,
    startAfter,
  };
};
