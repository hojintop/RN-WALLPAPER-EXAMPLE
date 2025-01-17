import { View } from "react-native";
import Typography from "../components/Typography";

export default(props)=>{
    return(
        <View style={{flex:1 , justifyContent: "center", alignItems: "center"}}>
            <Typography fontSize={15}>Favorite Image</Typography>
        </View>
    )
}