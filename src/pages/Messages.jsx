import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [autoReplies, setAutoReplies] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const handleSend = (newMessages = []) => {
    const replies = [...autoReplies];
    const lastMessage = newMessages[0];
    const text = lastMessage.text.toLowerCase();
  
    // Vérifiez si la réponse de l'utilisateur correspond à une réponse automatique
    const matchedReply = replies.find(reply => reply.trigger.toLowerCase() === text);
  
    if (matchedReply) {
      const replyMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: matchedReply.response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      setMessages(prevMessages => GiftedChat.append(prevMessages, [replyMessage]));
    } else {
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    }
  };
  useEffect(() => {
    setAutoReplies([
      {
        trigger: "J'ai un problème",
        response: 'Appeler nous directement',
      },
      {
        trigger: 'Image',
        response: "On a bien reçu la photo merci",
      },
      {
        trigger: 'Bonjour! ',
        response: 'Que pouvons nous faire pour vous?',
      },
    ]);
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const image = {
        _id: Math.round(Math.random() * 1000000),
        image: result.uri,
        user: {
          _id: 1,
          name: 'Me',
        },
        createdAt: new Date(),
      };
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [image]));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat messages={messages} onSend={handleSend} user={{ _id: 1 }} />
      <TouchableOpacity onPress={handlePickImage}>
        <Image source={require('./icone-d-image-rouge.png')} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
    </View>
  );
}
