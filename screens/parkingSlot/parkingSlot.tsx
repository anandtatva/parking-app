import { StatusBar } from 'expo-status-bar';
import { Platform, Alert, Text, StyleSheet, View, FlatList } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { useSelector, useDispatch } from "react-redux";
import { SlotContainer } from './slot-container';
import { ParkingSlotType } from '../../types/parking-slot-type';
import { string } from '../../utils';
import moment from "moment";
import { setParkingSlot } from '../../redux/reducer/parking-slot-slice';

export default function ParkingSlot({ navigation }) {
  const dispatch = useDispatch()
  const parkingSlots = useSelector(state => state.parkingSlot)
  const removeCarAlert = (index: number, item: ParkingSlotType) => {
    if (Platform.OS === "web") {
      const resp = confirm("Are you sure you want to remove car from parking?");
      resp && removeCar(index, item);

    } else {
      Alert.alert('', 'Are you sure you want to remove car from parking?', [
        { text: 'Cancel', onPress: () => null },
        { text: 'OK', onPress: () => removeCar(index, item) },
      ], { cancelable: false })
    }

  }

  const removeCar = (index: number, item: ParkingSlotType) => {
    let updateCar: ParkingSlotType = { ...parkingSlots.parkingSlots[index] };
    updateCar.exitTime = moment().unix()
    const tempList = JSON.parse(JSON.stringify(parkingSlots.parkingSlots));
    tempList.splice(index, 1, updateCar)
    dispatch(setParkingSlot(tempList))
    navigation.navigate("PaymentScreen", { slotDetail: updateCar })
  }
  const renderItem = ({ item, index }) => (
    <SlotContainer
      item={item}
      index={index}
      onRemoveCar={removeCarAlert}
    />
  )
  return (
    <View style={styles.container}>
      {parkingSlots?.parkingSlots?.length ? (
        <Text style={styles.helpTxt}>{string.noteRemoveCar}</Text>
      ) : null}

      <FlatList
        testID="Slot-List"
        numColumns={2}
        keyExtractor={(_, index) => String(index)}
        data={parkingSlots?.parkingSlots || []}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.title} testID={"Empty-Slots"}>{string.emptySlot}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  helpTxt: {
    opacity: 0.8,
    padding: 10,
    textAlign: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
