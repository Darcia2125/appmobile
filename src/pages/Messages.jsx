import React, { Component } from 'react';
import { FlatList, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, TouchableOpacity, TextInput, Image, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      fbData: [{

        userID: 'efgh1234',
        text: `Salut! comment pouvons nous vous aidez?`,
        uID: 'a002',
        userName: 'Hoag Target',
      }],
      getChatText: ""
    };
  }

  async componentDidMount() {

    this.setState({
      loading: false,
    });
  }
  _sendMsg = async () => {

    if ("" === this.state.getChatText) {
      return Alert.alert("",
        `S'il vous palit! Entrez votre message ici`, [{
          text: 'OK', onPress: () => { }
        },],
        { cancelable: false },
      );
    }

    const tempDate = new Date();
    let curDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;

    const userID = 'abcd1234';
    const text = this.state.getChatText + "";
    const uID = 'a001';
    const userName = 'Me';
    const chatDate = curDate;

    const chatData = {
      userID,
      text,
      uID,
      userName,
      chatDate
    }

    this.setState({
      fbData: this.state.fbData.concat(chatData),
      getChatText: ""
    }, () => {
      setTimeout(() => {
        const response = {
          userID: 'efgh1234',
          text: `Nous sommes un peu saturé pour le moment. Veuillez appeler directement ce numéro : 034 78 666 66 pour avoir une reponse plus rapidement.`,
          uID: 'a002',
          userName: 'Hoag Target',
          chatDate: curDate
        }
        this.setState({
          fbData: this.state.fbData.concat(response)
        });
      }, 3000);
    })
  }


  render() {
    let { fbData } = this.state;
    const Layout = {
      window: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      fsS: 14,
      fsXXS: 10
    }

    if (this.state.loading) { return (<Text>Loading...</Text>); }

    return (
      <View style={styles.container}>
        <View style={styles.tracking}>
            <Text style={styles.title}>Messages</Text>
        </View>
        <SafeAreaView>
          <KeyboardAvoidingView behavior="padding" enabled>

            <View style={{ flexDirection: "row", padding: 10, flex: 1, marginBottom: 50 }}>
              <FlatList
                ref={(ref) => { this.chatFlatList = ref; }}
                onContentSizeChange={() => this.chatFlatList.scrollToEnd()}
                data={fbData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(fbDataItem) =>

                  fbDataItem.item.uID === 'a001' ? (
                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10, justifyContent: 'flex-end' }}>
                      <View style={{ marginRight: 5, justifyContent: 'flex-end' }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end' }}>
                          <Text style={{ fontSize: Layout.fsXXS, marginRight: 5, marginTop: 3 }}>{fbDataItem.item.chatDate}</Text>
                          <Text style={{ fontSize: Layout.fsS, fontWeight: '600' }}>{fbDataItem.item.userName}</Text>
                        </View>
                        <Text style={{ maxWidth: Layout.window.width - 85, minWidth: 100, padding: 10, backgroundColor: '#f1be3a', borderRadius: 8, marginTop: 5, justifyContent: 'flex-end', textAlign: 'right' }}>{fbDataItem.item.text}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                      <View
                        style={{ height: 50, width: 50, resizeMode: "cover", borderRadius: 25, backgroundColor: 'blue' }}
                      ></View>

                      <View style={{ marginLeft: 5 }}>
                        <View style={{ flexDirection: "row", }}>
                          <Text style={{ fontSize: Layout.fsS, fontWeight: '600' }}>{fbDataItem.item.userName}</Text>
                          <Text style={{ fontSize: Layout.fsXXS, marginLeft: 5, marginTop: 3 }}>{fbDataItem.item.chatDate}</Text>
                        </View>
                        <Text style={{ maxWidth: Layout.window.width - 85, minWidth: 100, padding: 10, backgroundColor: '#ffffff', borderRadius: 8, marginTop: 5 }}>{fbDataItem.item.text}</Text>
                      </View>
                    </View>
                  )
                }
              />
            </View>

            <View style={{ flexDirection: 'row', width: Layout.window.width - 40, height: 50, marginBottom: 80, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#f09033', borderRadius: 25, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput style={{ width: Layout.window.width - 130, height: 50 }}
                onChangeText={(getChatText) => this.setState({ getChatText })}
                value={this.state.getChatText}
                placeholder={'Entrez votre message ici!'}></TextInput>
              <TouchableOpacity onPress={() => { this._sendMsg() }} title ='ok' style={{backgroundColor:'yellow', width: 70,height: 30, marginRight:10, borderRadius:4}} >
                <Text style={{color:'blue', marginLeft: 12, marginTop:5, fontWeight:'bold'}}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tracking: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: -42,
  },
});

export default Message;