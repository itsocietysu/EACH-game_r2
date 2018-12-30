import React from 'react';
import { View, Text, Dimensions, ActivityIndicator, PixelRatio } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ImageManipulator, Permissions, Camera} from 'expo';
import {MaterialIcons} from '@expo/vector-icons';
import {colors} from "../../utils/constants";
import Back from "../../components/icons/Back";

class CustomCamera extends React.Component {
    state = {
        imageLoaded: false,
        permissionGranted: false,
        targetHeight: null,
        targetWidth: null,
        loading: false,
        _isMounted: false,
    };

    async componentDidMount(){
        this.setState({_isMounted: true});
        const status =  await Permissions.askAsync(Permissions.CAMERA);

        if (status.status !== 'granted') {
            alert('To continue camera should be enabled');
            return;
        }

        if(this.state._isMounted)
            this.setState({permissionGranted: true});

        let targetWidth;
        let targetHeight;
        const aspectRatio = this.props.navigation.getParam('aspectRatio', 1);
        if (aspectRatio >= 1) {
            targetWidth = Dimensions.get('window').width * 0.8;
            targetHeight = targetWidth / aspectRatio;
        }
        else {
            targetHeight = Dimensions.get('window').height * 0.65 - 10 - 40;
            targetWidth = targetHeight * aspectRatio;
        }

        if(this.state._isMounted) {
            this.setState({
                targetWidth,
                targetHeight,
            });
        }
    }

    componentWillUnmount(){
        this.setState({_isMounted: false});
    }

    async _cropAndResize(image) {
        const H = image.height / 3;
        const W = image.width / 3;

        const screen = Dimensions.get('window');

        const hToCrop = (this.state.targetHeight / screen.height) * H;
        const wToCrop = (this.state.targetWidth / screen.width) * W;

        let manipResult;
        try {
            const x = (W - wToCrop) / 2;
            const y = (H - hToCrop) / 2;

            manipResult = await ImageManipulator.manipulate(
                image.uri,
                [
                    {
                        resize: {
                            width: W,
                            height: H,
                        },
                    },
                    {
                        crop: {
                            originX: x,
                            originY: y,
                            width: wToCrop,
                            height: hToCrop,
                        }
                    },

                ],
                {base64: true}
            );
        }
        catch(error){
            console.log(error);
            return image;
        }
        return manipResult;
    };

    async _takePhoto(){
        const m = 3;
        try {
            // const status =  await Permissions.askAsync(Permissions.CAMERA);
            const n = 3;
            /*if (status.status !== 'granted') {
                alert('To continue camera should be enabled');
                return;
            }*/
            const image = await this.cameraRef.takePictureAsync();
            if (image === undefined){
                alert('Ooops! Something went wrong');
                return;
            }
            const k = 5;
            const processedImage = await this._cropAndResize(image);
            const _validateImage = this.props.navigation.getParam('handler', '');
            _validateImage(processedImage);
        }
        catch(error){
            console.log(error);
            return;
        }

        // this.setState({loading: false});
        this.props.navigation.goBack();
    }

    async _process(){
        if(this.state._isMounted && !this.state.loading)
            // this.setState({loading: true}, this._takePhoto );
            await this._takePhoto();
    }
    render() {
        const { width, height} = Dimensions.get('window');
        const iconSize = 60;

        if (!this.state.permissionGranted) {
            return <ActivityIndicator/>;
        }
        if (this.state.permissionGranted) {
            let loadingInfo;
            if (this.state.loading)
                loadingInfo =
                    <View style={{position: 'absolute', left: 65}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.SECOND.light}}>Processing. Please wait...</Text>
                        <ActivityIndicator size={'large'} color={colors.SECOND.light}/>
                    </View>;

            return (
                <View style={{flex: 1}}>
                    <Camera
                        ref={ref=>{this.cameraRef = ref}}
                        style={{flex: 1}}
                    >
                        {loadingInfo}
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{
                                width: this.state.targetWidth,
                                height: this.state.targetHeight,
                                borderWidth: 3,
                                borderColor: colors.FRAME,
                                backgroundColor: 'transparent'
                            }}/>
                        </View>
                        <View style={{position: 'absolute', top: 15}}>
                            <Back onPress={ ()=>this.props.navigation.goBack() }/>
                        </View>


                    </Camera>
                    <View style={{position: 'absolute', left: (width-iconSize)/2, top: height *0.85}}>
                        <MaterialIcons name="photo-camera" size={iconSize} color={colors.SECOND.light}
                                       onPress={ ()=> this._process()}/>
                    </View>
                </View>
            );
        }
        return <Text>Ooops! No access to camera</Text>;
    }
}
export default (withNavigation)(CustomCamera)
