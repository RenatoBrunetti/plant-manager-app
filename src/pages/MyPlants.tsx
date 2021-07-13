import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { PlantProps, loadPlant, removePlant } from '../libs/storage';

export const MyPlants = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  const handleRemove = (plant: PlantProps) => {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😭',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants(oldData => oldData.filter((item) => item.id !== plant.id));
          } catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ]);
  };

  useEffect(() => {
    const loadStorageData = async () => {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatered(
        `Lembre-se de regar a ${plantsStoraged[0].name} à ${nextTime}.`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    };

    loadStorageData();
  },[]);

  if(loading){
    return <Load/>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header/>

        <View style={styles.spotlight}>
          <Image
            source={waterdrop}
            style={styles.spotlightImage}
          />

          <Text style={styles.spotlightText}>
            {nextWatered}
          </Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>
            Próximas regadas
          </Text>

          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemove={() => {handleRemove(item)}}
              />
            )}
            showsVerticalScrollIndicator={false}
            /* contentContainerStyle={{ flex: 1 }} */
          />
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    margin : 20
  }
});
