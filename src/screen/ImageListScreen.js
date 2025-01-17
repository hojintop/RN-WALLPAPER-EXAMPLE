import { FlatList, Text, View } from "react-native"
import Typography from "../components/Typography"
import TabIcon from "../components/TabIcon"
import Header from "../components/Header/Header"
import HeaderTitle from "../components/Header/HeaderTitle"
import { IMAGE_LIST } from "../constants"
import PhotoListItem from "../components/PhotoListItem"

export default(props)=>{
    function RenderItem({item}){
        return(
            <PhotoListItem url={item} />
        )
    }

    return(
        <View style={{flex: 1, }}>
            <Header>
                <HeaderTitle title="IMAGE LIST" />
            </Header>

            <FlatList
                data={IMAGE_LIST}
                renderItem={RenderItem}
                style={{flex:1,}}
            />
        </View>
    )
}