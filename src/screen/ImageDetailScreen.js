import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import Typography from "../components/Typography";
import Header from "../components/Header/Header";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderGroup from "../components/Header/HeaderGroup";
import HeaderButton from "../components/Header/HeaderButton";
import RemoteImage from "../components/RemoteImage";
import Button from "../components/Button";
import Icons from "../components/Icons";
import Spacer from "../components/Spacer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClickFavorite } from "../actions/favorite";

export default (props) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const [isDownLoading , setIsDownLoading] = useState(false);

  const dispatch = useDispatch();

  const isFavorite = useSelector((state)=>{
    return state.favorite.favoriteList.filter((item)=> item === route.params.url).length > 0;
  })

  function onPressFavorite(){
    dispatch(onClickFavorite(route.params.url));
  }

  function onPressBackButton() {
    navigation.goBack();
  }

  async function onPressDownload() {
    setIsDownLoading(true);
    const downloadResumable = FileSystem.createDownloadResumable(
        route.params.url,
        `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    )

    try{
        const {uri} = await downloadResumable.downloadAsync();
        console.log("Finished downloading to ", uri);

        const permissionResult = await MediaLibrary.getPermissionsAsync(true);
        console.log("permissionResult",permissionResult);
        
        if (permissionResult.status === "denied") {
            // 첫 번째 요청에서 거부되었을 때 처리
            setIsDownLoading(false);
            return;
        }

        if (permissionResult.status === "undetermined") {
            // 처음 권한을 물어보지 않았을 경우, 권한 요청
            const requestResult = await MediaLibrary.requestPermissionsAsync();
            console.log("requestResult", requestResult);

            if (requestResult.status === "denied") {
                setIsDownLoading(false);
                alert('권한을 거부하셨습니다. 앱 설정에서 권한을 변경해 주세요.');
                return;
            }
        }

        const asset = await MediaLibrary.createAssetAsync(uri);
        // 앨범 생성후 resent (생성 필요없을시 주석)
        const album = await MediaLibrary.createAlbumAsync("default",asset, false);
        console.log(album);
        setIsDownLoading(false);

    }catch(e){
        setIsDownLoading(false);
        console.error(e);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderGroup>
          <HeaderButton iconName="arrow-back" onPress={onPressBackButton} />
          <HeaderTitle title={"ImageDetail"} />
        </HeaderGroup>

        <HeaderButton iconName={isFavorite ? "heart" : "heart-outline"} onPress={onPressFavorite} color="red"/>
      </Header>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <RemoteImage
          url={route.params.url}
          width={width}
          height={width * 1.5}
        />
      </View>

      <Button onPress={onPressDownload}>
        <View style={{paddingBottom: 24, backgroundColor: "black",}}>
            {isDownLoading ? (
                <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height:52,
                    flexDirection: "row",
                }}
                >
                    <ActivityIndicator />
                </View>
            ) : (
                <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height:52,
                    flexDirection: "row",
                }}
                >
                    <Typography fontSize={20} color="white">DOWNLOAD</Typography>
    
                    <Spacer horizontal space={15} />
                    
                    <Icons name="download" color="white" size={24} />
                </View>
            )}
            
        </View>
      </Button>
    </View>
  );
};
