import styles from "../styles/styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';



const HomeOptions = () => {
  const userRedux = useSelector(state => state.user);

 
  const getTitle = () => {
    if (userRedux && userRedux.name) {
      return `Hello, ${userRedux.name}`;
    } else {
      return 'Hello';
    }
  };

  const homeOptions = {
    title: getTitle(),
    headerStyle: { backgroundColor: styles.colors.textColor },
  };

  return homeOptions;
};

export default HomeOptions;

