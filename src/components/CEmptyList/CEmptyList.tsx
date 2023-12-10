import { CBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { MaterialIcons } from "@expo/vector-icons";

interface CEmptyListProps {
  title: string;
}

export const CEmptyList = ({ title }: CEmptyListProps) => {
  return (
    <CBox flex={1} alignItems="center" justifyContent="center" height={300}>
      <CText
        fontStyle="italic"
        fontSize={32}
        textAlign="center"
        color="bluePrimary"
        fontWeight="bold"
        mb="s10"
      >
        {title}
      </CText>
      <MaterialIcons name="search-off" size={80} color="#005999" />
    </CBox>
  );
};
