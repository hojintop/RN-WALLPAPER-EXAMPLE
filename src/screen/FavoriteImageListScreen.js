import { FlatList, View } from "react-native";
import Typography from "../components/Typography";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderGroup from "../components/Header/HeaderGroup";
import HeaderButton from "../components/Header/HeaderButton";
import { useNavigation } from "@react-navigation/native";
import PhotoListItem from "../components/PhotoListItem";

export default(props)=>{
    const imageList = useSelector((state)=> state.favorite.favoriteList);
    const navigation = useNavigation();
    // console.log(imageList);

    function onPressBackButton(){
        navigation.goBack();
    }

    function renderItem({item}){
        return(
            <PhotoListItem url={item} />
        )
    }

    return(
        <View style={{flex:1 }}>
            <Header>
                <HeaderGroup>
                    <HeaderButton iconName="arrow-back" onPress={onPressBackButton}></HeaderButton>
                    <HeaderTitle title="FAVORITE LIST"></HeaderTitle>
                </HeaderGroup>
            </Header>

            <FlatList 
                data={imageList}
                renderItem={renderItem}
            />
        </View>
    )
}