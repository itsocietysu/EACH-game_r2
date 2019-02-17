import React from "react";
import {ScrollView, View} from "react-native";
import {Dialog} from "react-native-popup-dialog";
import {colors, fonts} from "../utils/constants";
import {Rectangle, PopUpContentText, PopUpTittleText} from "../containers/styles";




export default function showDialog(parent, Tittle, Content){
    return(
        <Dialog
            ref={(refDialog)=>{parent.refDialog = refDialog}}
            dialogStyle={{height: '40%',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.MAIN,}}
        >
            <View style={{flex: 1, borderRadius: 10, backgroundColor: colors.BASE[parent.props.theme]}}>
                <View style={{height: '25%', alignItems: 'center', justifyContent: 'center'}}>
                    <PopUpTittleText color={colors.MAIN} font={fonts.EACH}>
                       {Tittle}
                   </PopUpTittleText>
                </View>
                <Rectangle width={'100%'} height={1} backgroundColor={colors.MAIN}/>
                <ScrollView style={{flex: 1, paddingLeft: 5}}>
                    <PopUpContentText font={fonts.MURRAY} color={colors.TEXT[parent.props.theme]}>
                        {Content}
                    </PopUpContentText>
                </ScrollView>
            </View>
        </Dialog>
    );
}
