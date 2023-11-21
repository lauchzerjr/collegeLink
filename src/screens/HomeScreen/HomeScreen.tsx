import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { CBox, CTouchableOpacityBox } from "../../components/CBox/CBox";
import { CScreen } from "../../components/CScreen/CScreen";
import { CText } from "../../components/CText/CText";
import { CTextInput } from "../../components/CTextInput/CTextInput";
import { FlatList } from "react-native";
import { compareByName, dataCourses } from "../../utils/dataCourses";
import { CActivityIndicator } from "../../components/CActivityIndicator/CActivityIndicator";

export function HomeScreen() {
  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const MemoizedItem: React.FC<{ item: { id: number; name: string } }> =
    React.memo(({ item }) => {
      return (
        <CTouchableOpacityBox
          activeOpacity={0.7}
          backgroundColor="bluePrimary"
          p="s12"
          borderRadius="s12"
        >
          <CText color="grayWhite" fontSize={18} fontWeight="bold">
            {item.name}
          </CText>
        </CTouchableOpacityBox>
      );
    });

  const renderItem = ({ item }) => {
    return <MemoizedItem item={item} />;
  };

  const loadMoreData = React.useCallback(() => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 500);
  }, []);

  const filteredData = React.useMemo(() => {
    const filteredCourses = dataCourses
      .filter((course) =>
        course.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort(compareByName);

      console.log("filteredCourses ========>", filteredCourses.length)

    return filteredCourses.slice(0, page * itemsPerPage);
  }, [searchText, page]);

  React.useEffect(() => {
    console.log("filteredData", filteredData.length);
    console.log("page", page);
  }, [filteredData, page]);

  return (
    <CScreen>
      <CBox
        width="100%"
        height={125}
        alignItems="center"
        justifyContent="space-around"
        flexDirection="row"
      >
        <CText fontSize={32} fontWeight="bold" color="bluePrimary">
          CollegeLink
        </CText>
        <FontAwesome5 name="graduation-cap" size={100} color="#005999" />
      </CBox>

      <CBox width="100%" height={2} bg="gray3" mb="s16" />

      <CTextInput
        iconLeft={<FontAwesome5 name="search" size={24} color="#005999" />}
        placeholder="Pesquise por curso"
        boxProps={{ mb: "s16" }}
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 210 }}
        ItemSeparatorComponent={() => <CBox height={10} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponentStyle={{ marginTop: 10 }}
        ListFooterComponent={() =>
          // filteredData.length >= page * itemsPerPage && (
            <CActivityIndicator size="small" color="bluePrimary" />
          // )
        }
      />
    </CScreen>
  );
}
