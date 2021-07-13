import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore, format } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantParams {
  plant: PlantProps
}

export const PlantSave = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const { plant } = route.params as PlantParams;

  const navigation = useNavigation();

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState);
    }
    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha um horário no futuro! ⏰');
    }
    if(dateTime){
      setSelectedDateTime(dateTime);
    }
  };

  const handleOpenDateTimePickerForAndroid = () => {
    setShowDatePicker(oldState => !oldState);
  };

  const handleSave = async () => {
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que nós sempre iremos lembrar você de cuidar bem da sua plantinha com muito cuidado, amor e carinho',
        buttonTitle: 'Muito Obrigado',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch(error) {
      Alert.alert('Não foi possível salvar. 😭');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.plantInfo}>
            <SvgFromUri
              uri={plant.photo}
              height={150}
              width={150}
            />

            <Text style={styles.plantName}>
              {plant.name}
            </Text>
            <Text style={styles.plantAbout}>
              {plant.about}
            </Text>
          </View>

          <View style={styles.controllers}>
            <View style={styles.tipContainer}>
              <Image
                source={waterdrop}
                style={styles.tipImage}
              />
              <Text style={styles.tipText}>
                {plant.water_tips}
              </Text>
            </View>

            <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
            </Text>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode='time'
                display='spinner'
                onChange={handleChangeTime}
              />
            )}

            {Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar horário: ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )}

            <Button
              title='Cadastrar planta'
              onPress={handleSave}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  controllers: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 15,
    borderRadius: 15,
    position: 'relative',
    bottom: 50
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'left'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 20,
    fontFamily: fonts.text,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.green_dark,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});
