import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';



const ImageOptions = {
    title: 'select image', storageOptions: {skipBackup: true, path: 'images'},
    maxWidth: 150, maxHeight: 150, chooseFromLibraryButtonTitle: 'Choose from gallery',
};
export default class App extends React.Component {
   ImageUpload() {
        console.log('UPLOADImage====')
        ImagePicker.showImagePicker(ImageOptions, (response) => {
            console.log('Image Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {filename: response.fileName, type: response.type, uri: response.fileSize};
                const self = this;
                const userId = '';
                console.log('source', source)

                let formData = new FormData();
                formData.append("filename", source);

                // console.log('UPLOADImage====111334')
                this.setState({spinnerBool: true}, () => {
                    axios({
                        method: 'POST',
                        url: 'http://localhoast:8090/api/UploadProfilePic',
                        data: formData,
                        headers: {
                            'Content-Type' :'multipart/form-data'
                        },

                    }).then((response) => {
                        console.log('response', response)
                        if (response.status === 200) {
                            console.log('status 200', response)
                            alert("submitted", '')
                        }
                    })
                        .catch((error) => {
                            console.log('error res', response)
                            self.setState({spinnerBool: false, MyProfileResp: ''}, () => {
                                alert("Error,Message Not submitted")
                                console.log('Error', error.response);
                            });
                        })
                });
            }
        });
    }


  render() {
    return (
  <View style={{flex:1}}>
  <TouchableOpacity style={{marginTop:80}} onPress={()=>this.ImageUpload()}>
  <Text>UplodButton</Text>
  </TouchableOpacity>
  </View>
    );
  }
}
